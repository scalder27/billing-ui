import { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import moment, { formatDate } from "../../libs/moment";

import TextInput from "../TextInput";
import Picker from "./Picker";
import Icon, { IconTypes } from "../Icon";
import rangeSelector from "./StartInputSelection";
import keyCodes from "../../helpers/KeyCodes";

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
        this.handleChange(this.props.value);
    }

    componentWillReceiveProps(newProps) {
        if (!this._focused) {
            this.handleChange(newProps.value);
        }
    }

    componentDidUpdate() {
        const height = ReactDOM.findDOMNode(this).getBoundingClientRect().height;

        if (this.state.height !== height) {
            this.setState({ height })
        }
    }

    handleChange(value) {
        const newDate = moment(value, "DD.MM.YYYY");
        const isValid = newDate.isValid();
        const textValue = newDate.isValid() ? formatDate(newDate) : value;

        this.setState({
            textValue,
            isValid
        });
    }

    handleClick() {
        if (this._focused) {
            this.handleSelectBlock();
        }
    }

    handleFocus() {
        this._focused = true;

        this.handleSelectBlock();
    }

    handleBlur() {
        const { onChange, value } = this.props;
        const { textValue } = this.state;
        this._focused = false;
        this._selectedBlock = null;

        const date = moment(textValue, "DD.MM.YYYY");

        this.handleChange(value);

        if (onChange && !date.isSame(moment(value, "DD.MM.YYYY"))) {
            onChange(textValue, date);
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

    handleKey(evt) {
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
    }

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

    open() {
        if (!this.props.disabled) {
            this.setState({ opened: true });
        }
    }

    close(focus) {
        this.setState({ opened: false });

        if (focus) {
            setTimeout(() => this._textInput.focus(), 0);
            this._selectBlock(0);
        }
    }

    _increase() {
        const date = moment(this.state.textValue, "DD.MM.YYYY");

        this.handleChange(formatDate(date.add(1, this._selectionRanges[this._selectedBlock].type)));
        this._selectBlock(this._selectedBlock);
    }

    _decrease() {
        const date = moment(this.state.textValue, "DD.MM.YYYY");

        this.handleChange(formatDate(date.subtract(1, this._selectionRanges[this._selectedBlock].type)));
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
            <div className={styles.picker} onKeyDown={(evt) => this.handlePickerKey(evt)}>
                <Picker value={moment(value, "DD.MM.YYYY")}
                    verticalShift={this.state.height}
                    minYear={minYear}
                    maxYear={maxYear}
                    onPick={(date) => this.handlePick(date)}
                    onClose={() => this.handlePickerClose()}
                />
            </div>
        );
    }

    render() {
        const { className, width, disabled, isValid } = this.props;

        const picker = this.renderPicker();
        const wrapperClassNames = cx(styles.root, className);
        const openButtonClassNames = cx(styles["open-button"], {
            [styles.disabled]: disabled
        });

        const inputProps = {
            value: this.state.textValue,
            isValid: isValid && this.state.isValid,
            maxLength: "10",
            width: "100%",
            onClick: this.handleClick.bind(this),
            onKeyDown: this.handleKey.bind(this),
            onChange: this.handleChange.bind(this),
            onBlur: this.handleBlur.bind(this),
            onFocus: (evt) => setTimeout(() => this.handleFocus(evt), 0),
            mask: "99.99.9999"
        };

        return (
            <span className={wrapperClassNames} style={{width: width}}>
                <TextInput {...this.props} {...inputProps} ref={(input) => { this._textInput = input }} />
                <span className={openButtonClassNames} onClick={() => this.open()}>
                    <Icon className={styles.icon} type={IconTypes.Calendar} />
                </span>
                {picker}
            </span>
        );
    }
}

CalendarWrapper.defaultProps = {
    value: moment(),
    width: 115,
    minYear: 1900,
    maxYear: 2100,
    className: "",
    disabled: false,
    isValid: true
};

CalendarWrapper.propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    maxYear: PropTypes.number,
    minYear: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.instanceOf(moment), PropTypes.object, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string
};

export default CalendarWrapper;
