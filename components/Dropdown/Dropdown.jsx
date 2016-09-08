import { Component, PropTypes, Children, cloneElement } from "react";
import ReactDOM from "react-dom";
import events from "add-event-listener";
import KeyCodes from "./../../helpers/KeyCodes";
import Icon, { IconTypes } from "./../Icon";
import Option from "./Option.jsx";
import dropdownStyles from "./Dropdown.scss";
import classnames from "classnames";
import { getScrollTopMenu, getSiblingOptions } from "./DropdownHelpers";

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

    constructor(props) {
        const { defaultCaption } = props;

        super(props);
        this._caption = defaultCaption;
    }

    componentWillMount() {
        events.addEventListener(document, "click", this._handleDocumentClick);
        events.addEventListener(document, "keydown", this._handleKeyDown);
    }

    componentWillUpdate(nextProps) {
        this._initOptions({ ...nextProps });
    }

    componentDidUpdate() {
        this.setScrollTop();
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

    setValue(newValue) {
        const { value, onSelect } = this.props;
        this.toggleOptions(false);

        if (newValue !== value && onSelect) {
            onSelect(newValue);
        }
    }

    toggleOptions(isOpened) {
        if (!this.props.disabled) {
            this.setState({
                activeOption: null,
                isOpened: isOpened
            })
        }
    }

    setScrollTop() {
        const { activeOption } = this.state;

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
        evt.preventDefault();
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
                    this.setValue(activeOption);
                }
                break;
        }
    }

    handleMouseOver(activeOption) {
        if (!this._ignoreMouseOver) {
            this.setActiveOption(activeOption);
        }
    }

    _initOptions({ value, children, defaultCaption }) {
        const options = Children.toArray(children).filter(option => option.type === Option);

        const availableOptions = options.filter(option => !option.props.disabled && value !== option.props.value);
        this.optionValues = availableOptions.map(option => option.props.value);

        const optionCaptions = options.reduce((result, option) => {
            result[option.props.value] = option.props.caption;
            return result;
        }, {});

        this._caption = value ? optionCaptions[value] : defaultCaption;
    }

    getOptionsList() {
        const { value, styles, children } = this.props;

        const options = Children.map(children, option => {
            if (option && option.type === Option) {
                return cloneElement(option, {
                    key: option.props.key || option.props.value,
                    isSelected: value === option.props.value,
                    isActive: this.state.activeOption === option.props.value,
                    ref: option.props.value,
                    onClick: this.setValue.bind(this),
                    onMouseOver: this.handleMouseOver.bind(this)
                });
            }
            return option;
        });

        if (options) {
            return (
                <div className={styles.options} ref={node => { this._optionsListNode = node }}>
                    {options}
                </div>
            )
        }

        return null;
    }

    render() {
        const { value, additionalData, width, disabled, styles, className } = this.props;
        const wrapperClassNames = classnames(styles.wrapper, className);
        const selectClassNames = classnames(styles.select, {
            [styles.disabled]: disabled,
            [styles.inactive]: !value
        });

        return (
            <div className={wrapperClassNames}>
                <span className={selectClassNames} onClick={this.handleClick.bind(this)} title={this._caption}>
                    <span className={styles["select-input"]} style={{"width": width}}>
                        <span className={styles.caption}>{this._caption}</span>
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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    defaultCaption: PropTypes.string,
    additionalData: PropTypes.string,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    styles: PropTypes.object,
    children: PropTypes.node.isRequired
};

Dropdown.defaultProps = {
    styles: dropdownStyles,
    defaultCaption: "Выберите"
};

export default Dropdown;
