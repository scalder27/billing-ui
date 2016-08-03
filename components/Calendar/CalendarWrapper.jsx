import { Component, PropTypes } from "react";
import cx from "classNames";
import moment, { formatDate } from "../../libs/moment";
import TextInput from "../TextInput";
import Picker from "./Picker";
import Icon, { IconTypes } from "../Icon";
import styles from "./CalendarWrapper.scss";

class CalendarWrapper extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            textValue: formatDate(props.value),
            opened: false
        };

        this._focused = false;
    }

    componentWillReceiveProps(newProps) {
        if (!this._focused) {
            this.setState({textValue: formatDate(newProps.value)});
        }
    }

    handleChange(value) {
        const textValue = value.replace(/[^\d\.]/g, "");
        this.setState({
            textValue: textValue
        });
    }

    handleFocus() {
        this._focused = true;

        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    handleBlur() {
        const { onChange, onBlur, value } = this.props;
        const { textValue } = this.state;
        this._focused = false;

        const date = moment(textValue, "DD.MM.YYYY");

        this.setState({
            textValue: formatDate(value)
        });

        if (onChange && date.isSame(moment(value, "DD.MM.YYYY"))) {
            onChange(textValue, value);
        }

        if (onBlur) {
            onBlur();
        }
    }

    handlePickerKey(evt) {
        if (evt.key === "Escape") {
            this.close(true);
        }
    }

    handlePick(date) {
        if (this.props.onChange) {
            this.props.onChange(formatDate(date), date);
        }
        this.close(true);
    }

    handlePickerClose() {
        this.close(false);
    }

    open() {
        if (!this.props.disabled) {
            this.setState({ opened: true });
        }
    }

    close(focus) {
        this.setState({opened: false});

        if (focus) {
            setTimeout(() => this.refs.input.focus(), 0);
        }
    }

    renderPicker() {
        if (!this.state.opened) {
            return;
        }

        const {value, minYear, maxYear} = this.props;

        return (
            <div className={styles.picker} onKeyDown={this.handlePickerKey}>
                <Picker value={value}
                    minYear={minYear}
                    maxYear={maxYear}
                    onPick={this.handlePick}
                    onClose={this.handlePickerClose}
                />
            </div>
        );
    }

    render() {
        const { className, width, disabled } = this.props;

        const picker = this.renderPicker();
        const wrapperClassNames = cx(styles.root, className);
        const openButtonClassNames = cx(styles["open-button"], {
            [styles.disabled]: disabled
        });

        const inputProps = {
            value: this.state.textValue,
            maxLength: "10",
            width: "100%",
            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus
        };

        return (
            <span className={wrapperClassNames} style={{width: width}}>
                <TextInput ref="input" {...this.props} {...inputProps} />
                <Icon type={IconTypes.Calendar} className={openButtonClassNames} onClick={this.open} />
                {picker}
            </span>
        );
    }
}

CalendarWrapper.defaultProps = {
    width: 120,
    minYear: 1900,
    maxYear: 2100,
    className: "",
    disabled: false
};

CalendarWrapper.propTypes = {
    disabled: PropTypes.bool,
    maxYear: PropTypes.number,
    minYear: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func
};

export default CalendarWrapper;
