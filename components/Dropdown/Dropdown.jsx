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

const getPreviousOption = (indexActiveOption, options) => {
    if (indexActiveOption === -1 || indexActiveOption === 0) {
        return options[options.length - 1]
    }

    return options[indexActiveOption - 1];
};

const getNextOption = (indexActiveOption, options) => {
    if (indexActiveOption === -1 || indexActiveOption === options.length - 1) {
        return options[0]
    }

    return options[indexActiveOption + 1];
};

class Dropdown extends Component {
    state = {
        activeOption: null,
        isOpen: false
    };
    mounted = true;

    componentWillMount() {
        events.addEventListener(document, "click", this.handleDocumentClick.bind(this));
        events.addEventListener(document, "keydown", this.handleKeyDown.bind(this));
    }

    componentDidMount() {
        this.initOptions();
    }

    componentDidUpdate() {
        this.initOptions();
    }

    componentWillUnmount() {
        this.mounted = false;
        events.removeEventListener(document, 'click', this.handleDocumentClick.bind(this));
        events.removeEventListener(document, 'keydown', this.handleKeyDown.bind(this));
    }

    setValue(value, caption) {
        this.toggleOptions(false);
        this.fireChangeEvent(value, caption);
    }

    setActiveOption(activeOption) {
        const newState = {
            ...this.state,
            activeOption: activeOption,
        };
        this.setState(newState);
    }

    fireChangeEvent(newValue, newCaption) {
        const { value, onSelect } = this.props;

        if (newValue !== value && onSelect) {
            onSelect(newValue, newCaption);
        }
    }

    handleClick(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        this.toggleOptions(!this.state.isOpen);
    }

    toggleOptions(isOpen) {
        const { disabled } = this.props;

        if (!disabled) {
            this.setState({
                activeOption: null,
                isOpen: isOpen
            })
        }
    }

    handleDocumentClick(evt) {
        if (this.state.isOpen && this.mounted && !ReactDOM.findDOMNode(this).contains(evt.target)) {
            this.toggleOptions(false);
        }
    }

    handleKeyDown(evt) {
        const { activeOption, isOpen } = this.state;

        if (!isOpen || !this.optionValues) {
            return;
        }

        const indexActiveOption = this.optionValues.indexOf(activeOption);
        const previousOption = getPreviousOption(indexActiveOption, this.optionValues)
        const nextOption = getNextOption(indexActiveOption, this.optionValues);

        switch (evt.keyCode) {
            case KeyCodes.top:
                this.setActiveOption(previousOption);
                break;
            case KeyCodes.bottom:
                this.setActiveOption(nextOption);
                break;
            case KeyCodes.esc:
                this.toggleOptions(false);
                break;
            case KeyCodes.enter:
                activeOption && this.setValue(activeOption, this.optionCaptions[activeOption]);
                break;
        }
    }

    initOptions() {
        const { value, styles, children } = this.props;

        const availableOptions = getAvailableOptions(children, value);
        this.optionValues = availableOptions.map(option => option.props.value);
        this.optionCaptions = availableOptions.reduce((result, option) => {
            result[option.props.value] = option.props.caption;
            return result;
        }, {});
    }

    getOptions() {
        const { value, styles, children } = this.props;

        const options = Children.map(children, option => {
            if (option.type === Option) {
                return cloneElement(option, {
                        key: option.props.value,
                        isSelected: value === option.props.value,
                        isActive: this.state.activeOption === option.props.value,
                        onClick: this.setValue.bind(this),
                        onMouseOver: this.setActiveOption.bind(this)
                    }
                )
            }
            return option;
        });

        return (
            <div className={styles.options}>
                {options}
            </div>
        )
    }

    render() {
        const { value, caption, additionalData, width, disabled, styles, className } = this.props;
        const options = this.state.isOpen && this.getOptions();
        const classNames = classnames(styles.wrapper, className);
        const selectClassNames = classnames(styles.select, {
            [styles.disabled]: disabled,
            [styles["inactive"]]: !value
        });

        return (
            <div className={classNames}>
                <span className={selectClassNames} onClick={this.handleClick.bind(this)}>
                    <span className={styles["select-input"]} style={{"width": width}}>
                        <span className={styles.caption}>{caption}</span>
                        <span className={styles["additional-text"]}>{additionalData}</span>
                    </span>
                    <Icon className={styles.icon} type={IconTypes.ArrowTriangleDown} />
                </span>

                {options}
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
