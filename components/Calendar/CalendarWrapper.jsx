import { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import moment, { formatDate, convertString, convertISOString } from "../../libs/moment";
import CustomPropTypes from "../../helpers/CustomPropTypes";

import TextInput from "../TextInput";
import Picker from "./Picker";
import Icon, { IconTypes } from "../Icon";
import rangeSelector from "./StartInputSelection";
import keyCodes from "../../helpers/KeyCodes";
import validationErrorType from "./ValidationErrorType";

import cx from "classnames";
import styles from "./CalendarWrapper.scss";

class CalendarWrapper extends Component {
    _selectionRanges = [{ start: 0, end: 2, type: "days" }, { start: 3, end: 5, type: "months" }, { start: 6, end: 10, type: "years" }];
    _selectedBlock = null;
    _focused = false;

    constructor(props, context) {
        super(props, context);

        this.state = {
            height: null,
            opened: false
        };
    }

    componentWillMount() {
        this.changeDate(this.props.value);
    }

    componentWillReceiveProps(newProps) {
        if (!this._focused) {
            this.changeDate(newProps.value);
        }
    }

    componentDidUpdate() {
        const height = ReactDOM.findDOMNode(this).getBoundingClientRect().height;

        if (this.state.height !== height) {
            this.setState({ height })
        }
    }

    validate(date) {
        const { minDate, maxDate } = this.props;

        if (!date.isValid()) {
            if (date.creationData().input.indexOf("_") !== -1) {
                return {
                    isValid: false,
                    errorType: validationErrorType.unfilledDate
                }
            }

            return {
                isValid: false,
                errorType: validationErrorType.invalidDate
            }
        }

        if (minDate && date.isBefore(convertISOString(minDate), "day")) {
            return {
                isValid: false,
                errorType: validationErrorType.minDateExceed
            }
        }

        if (maxDate && date.isAfter(convertISOString(maxDate), "day")) {
            return {
                isValid: false,
                errorType: validationErrorType.maxDateExceed
            }
        }

        return {
            isValid: true,
            errorType: null
        }
    }

    handleChange = (textValue) => {
        const date = convertString(textValue);
        this.changeDate(date);
    };

    handleClick = () => {
        if (this._focused) {
            this.handleSelectBlock();
        }
    };

    handleFocus = () => {
        this._focused = true;

        setTimeout(() => {
            this.handleSelectBlock();
        }, 0);
    };

    handleBlur = () => {
        const { onChange, value } = this.props;
        const { date, isValid, errorType } = this.state;
        this._focused = false;
        this._selectedBlock = null;

        this.changeDate(value);

        if (onChange && !date.isSame(convertISOString(value), "day")) {
            onChange(date.toISOString(), {
                date,
                isValid,
                errorType
            });
        }
    };

    handlePickerKey = (evt) => {
        if (evt.key === "Escape") {
            this.close(true);
        }
    };

    handlePick = (date) => {
        const { onChange, value } = this.props;
        const { isValid, errorType } = this.validate(date);

        this.setState({
            date,
            isValid,
            errorType
        });

        if (onChange && !date.isSame(convertISOString(value), "day")) {
            onChange(date.toISOString(), {
                date,
                isValid,
                errorType
            });
        }

        this.close(true);
    };

    handlePickerClose = () => {
        this.close(false);
    };

    handleKey = (evt) => {
        switch (evt.keyCode) {
            case keyCodes.top:
                this._increase();
                evt.preventDefault();
                break;
            case keyCodes.bottom:
                this._decrease();
                evt.preventDefault();
                break;
            case keyCodes.left:
                this._selectPrevBlock();
                break;

            case keyCodes.space:
            case keyCodes.right:
            case keyCodes.dot:
                this._selectNextBlock();
                break;
        }
    };

    handleSelectBlock() {
        var selection = rangeSelector.getSelection(this._textInput.getDomNode()).start;

        if (selection > this._selectionRanges[this._selectionRanges.length - 1].end) {
            this._selectBlock(0);
        } else {
            for (let i = 0; i < this._selectionRanges.length; i++) {
                if (selection <= this._selectionRanges[i].end && selection >= this._selectionRanges[i].start) {
                    if (this._selectedBlock === i) {
                        break;
                    }

                    this._selectBlock(i);
                    break;
                }
            }
        }
    }

    open = () => {
        if (!this.props.disabled) {
            this.setState({ opened: true });
        }
    };

    close(focus) {
        this.setState({ opened: false });

        if (focus) {
            this._selectBlock(0);
            setTimeout(() => this._textInput.focus(), 0);
        }
    }

    changeDate(date) {
        const momentDate = convertISOString(date);
        const { isValid, errorType } = this.validate(momentDate);

        this.setState({
            date: momentDate,
            isValid,
            errorType
        });
    }

    _increase() {
        const nextDate = moment(this.state.date).add(1, this._selectionRanges[this._selectedBlock].type);
        this.changeDate(nextDate);
        this._selectBlock(this._selectedBlock);
    }

    _decrease() {
        const prevDate = moment(this.state.date).subtract(1, this._selectionRanges[this._selectedBlock].type);
        this.changeDate(prevDate);
        this._selectBlock(this._selectedBlock);
    }

    _selectBlock(blockNumber) {
        setTimeout(() => {
            rangeSelector.setSelection(this._textInput.getDomNode(), this._selectionRanges[blockNumber]);
            this._selectedBlock = blockNumber;
        }, 0);
    }

    _selectNextBlock() {
        let selectedBlock = this._selectedBlock;
        this._selectBlock(selectedBlock === this._selectionRanges.length - 1 ? selectedBlock : selectedBlock + 1);
    }

    _selectPrevBlock() {
        let selectedBlock = this._selectedBlock;
        this._selectBlock(selectedBlock === 0 ? 0 : selectedBlock - 1);
    }

    renderPicker() {
        if (!this.state.opened) {
            return;
        }

        const { value, minYear, maxYear } = this.props;

        return (
            <div className={styles.picker} onKeyDown={this.handlePickerKey}>
                <Picker value={convertISOString(value)}
                    verticalShift={this.state.height}
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
        const { isValid, errorType, date } = this.state;

        const picker = this.renderPicker();
        const wrapperClassNames = cx(styles.root, className);
        const openButtonClassNames = cx(styles["open-button"], {
            [styles.disabled]: disabled
        });

        const inputProps = {
            value: errorType === validationErrorType.unfilledDate ? date.creationData().input : formatDate(date),
            isValid: this.props.isValid && isValid,
            maxLength: "10",
            width: "100%",
            onClick: this.handleClick,
            onKeyDown: this.handleKey,
            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            mask: "99.99.9999"
        };

        return (
            <span className={wrapperClassNames} style={{ width: width }}>
                <TextInput {...this.props} {...inputProps} ref={(el) => {
                    this._textInput = el
                }} />
                <span className={openButtonClassNames} onClick={this.open}>
                    <Icon className={styles.icon} type={IconTypes.Calendar} />
                </span>
                {picker}
            </span>
        );
    }
}

CalendarWrapper.propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    maxYear: PropTypes.number,
    minYear: PropTypes.number,
    maxDate: CustomPropTypes.date,
    minDate: CustomPropTypes.date,
    value: CustomPropTypes.date,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string
};

CalendarWrapper.defaultProps = {
    value: moment(),
    width: 115,
    minYear: 1900,
    maxYear: 2100,
    className: "",
    disabled: false,
    isValid: true
};

export default CalendarWrapper;
