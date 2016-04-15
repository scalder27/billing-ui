import { Component, PropTypes, Children, cloneElement } from "react";
import events from "add-event-listener";
import KeyCodes from "../../common_scripts/KeyCodes";
import Icon, { IconTypes } from "../Icon";
import Option from "./Option.jsx";
import dropdownStyles from "./Dropdown.scss";
import classnames from "classnames";

const getAvailableOptions = (options, value) => {
    return options.filter(option => option.type === Option && !option.props.disabled && value !== option.props.value);
};

const getScrollTopMenu = (scrollTop, topOption, heightOption, heightMenu) => {
    if (topOption - scrollTop < 0) {
        return topOption;
    }

    if (topOption + heightOption - scrollTop > heightMenu) {
        return topOption + heightOption - heightMenu;
    }

    return scrollTop;
};

const getSiblingOptions = (optionValues, activeOption) => {
    const indexActiveOption = optionValues.indexOf(activeOption);
    const lastIndex = optionValues.length - 1;

    let previous = optionValues[indexActiveOption - 1]
    if (indexActiveOption === -1 || indexActiveOption === 0) {
        previous = optionValues[lastIndex]
    }

    let next = optionValues[indexActiveOption + 1];
    if (indexActiveOption === -1 || indexActiveOption === lastIndex) {
        next = optionValues[0]
    }


    return {
        previous: previous,
        next: next,
        first: optionValues[0],
        last: optionValues[lastIndex],
    }
};

class Dropdown extends Component {
    state = {
        activeOption: null,
        isOpened: false
    };
    _ignoreMouseOver = false;
    _optionsListNode = null;
    _ignoreTimeout = null;
    _handleDocumentClick = this.handleDocumentClick.bind(this);
    _handleKeyDown = this.handleKeyDown.bind(this);

    componentWillMount() {
        events.addEventListener(document, "click", this._handleDocumentClick);
        events.addEventListener(document, "keydown", this._handleKeyDown);
    }

    componentDidMount() {
        this._initOptions();
    }

    componentDidUpdate() {
        const { value, children } = this.props;
        const { activeOption } = this.state;
        this._initOptions();

        clearTimeout(this._ignoreTimeout);
        if (this._optionsListNode && activeOption) {
            const activeOptionNode = ReactDOM.findDOMNode(this.refs[activeOption]);

            this._optionsListNode.scrollTop = getScrollTopMenu(this._optionsListNode.scrollTop,
                activeOptionNode.offsetTop,
                activeOptionNode.offsetHeight,
                this._optionsListNode.offsetHeight);

            this._ignoreTimeout = setTimeout(() => {
                this._ignoreMouseOver = false;
            }, 200);
        }
    }

    componentWillUnmount() {
        events.removeEventListener(document, "click", this._handleDocumentClick);
        events.removeEventListener(document, "keydown", this._handleKeyDown);
    }

    setActiveOption(activeOption) {
        const newState = {
            ...this.state,
            activeOption: activeOption
        };

        this.setState(newState);
    }

    setValue(newValue, newCaption) {
        const { value, onSelect } = this.props;
        this.toggleOptions(false);

        if (newValue !== value && onSelect) {
            onSelect(newValue, newCaption);
        }
    }

    toggleOptions(isOpened) {
        const { disabled } = this.props;

        if (!disabled) {
            this.setState({
                activeOption: null,
                isOpened: isOpened
            })
        }
    }

    handleClick(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        this.toggleOptions(!this.state.isOpened);
    }

    handleDocumentClick(evt) {
        if (this.state.isOpened && !ReactDOM.findDOMNode(this).contains(evt.target)) {
            this.toggleOptions(false);
        }
    }

    handleKeyDown(evt) {
        const { activeOption, isOpened } = this.state;

        if (!isOpened || !this.optionValues) {
            return;
        }

        evt.stopPropagation();
        const siblingOptions = getSiblingOptions(this.optionValues, activeOption);

        switch (evt.keyCode) {
            case KeyCodes.top:
                this.setActiveOption(siblingOptions.previous);
                this._ignoreMouseOver = true;
                break;
            case KeyCodes.bottom:
                this.setActiveOption(siblingOptions.next);
                this._ignoreMouseOver = true;
                break;
            case KeyCodes.home:
                this.setActiveOption(siblingOptions.first);
                this._ignoreMouseOver = true;
                break;
            case KeyCodes.end:
                this.setActiveOption(siblingOptions.last);
                this._ignoreMouseOver = true;
                break;
            case KeyCodes.pageUp:
                this._optionsListNode.scrollTop -= this._optionsListNode.offsetHeight;
                break;
            case KeyCodes.pageDown:
                this._optionsListNode.scrollTop += this._optionsListNode.offsetHeight;
                break;
            case KeyCodes.esc:
                this.toggleOptions(false);
                break;
            case KeyCodes.enter:
                if (activeOption) {
                    this.setValue(activeOption, this.optionCaptions[activeOption]);
                }
                break;
        }
    }

    handleMouseOver(activeOption) {
        if (!this._ignoreMouseOver) {
            this.setActiveOption(activeOption);
        }
    }

    _initOptions() {
        const { value, styles, children } = this.props;

        const availableOptions = children.filter(option => option.type === Option && !option.props.disabled && value !== option.props.value);
        this.optionValues = availableOptions.map(option => option.props.value);
        this.optionCaptions = availableOptions.reduce((result, option) => {
            result[option.props.value] = option.props.caption;
            return result;
        }, {});
    }

    getOptionsList() {
        const { value, styles, children } = this.props;

        const options = Children.map(children, option => {
            if (option.type === Option) {
                return cloneElement(option, {
                        key: option.props.value,
                        isSelected: value === option.props.value,
                        isActive: this.state.activeOption === option.props.value,
                        ref: option.props.value,
                        onClick: this.setValue.bind(this),
                        onMouseOver: this.handleMouseOver.bind(this)
                    }
                );
            }
            return option;
        });

        return (
            <div className={styles.options} ref={node => this._optionsListNode = node}>
                {options}
            </div>
        )
    }

    render() {
        const { value, caption, additionalData, width, disabled, styles, className } = this.props;
        const wrapperClassNames = classnames(styles.wrapper, className);
        const selectClassNames = classnames(styles.select, {
            [styles.disabled]: disabled,
            [styles.inactive]: !value
        });

        return (
            <div className={wrapperClassNames}>
                <span className={selectClassNames} onClick={this.handleClick.bind(this)}>
                    <span className={styles["select-input"]} style={{"width": width}}>
                        <span className={styles.caption}>{caption}</span>
                        <span className={styles["additional-text"]}>{additionalData}</span>
                    </span>
                    <Icon className={styles.icon} type={IconTypes.ArrowTriangleDown} />
                </span>

                {this.state.isOpened && this.getOptionsList()}
            </div>
        );
    }
}

Dropdown.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.string,
    caption: PropTypes.string.isRequired,
    additionalData: PropTypes.string,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    styles: PropTypes.object
};

Dropdown.defaultProps = {
    styles: dropdownStyles,
    caption: "Выберите"
};

export default Dropdown;
