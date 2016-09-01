import { PureComponent, PropTypes } from "react";
import ReactDOM from "react-dom";
import Input from "./TextInput";
import Clear from "./Clear";

import { validate } from "../../helpers/ValidationHelpers";
import textInputStyles from "./CompactTextInput.scss";
import classnames from "classnames";

class CompactTextInput extends PureComponent {
    state = {
        isFocused: false
    };

    handleFocus = (evt, data) => {
        this.setState({
            isFocused: true
        });

        if (this.props.onFocus) {
            this.props.onFocus(evt, data);
        }
    };

    handleBlur = (evt, data) => {
        this.setState({
            isFocused: false
        });

        if (this.props.onBlur) {
            this.props.onBlur(evt, data);
        }
    };

    handleChange = (value, evt, data) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(value, evt, data);
        }
    };

    handleClearClick = (evt) => {
        this.input.focus();
        this.handleChange("", evt, {
            validationResult: validate("", this.props.validateFunction)
        });
    };

    render() {
        const { styles, wrapperClassName, labelClassName, placeholder, value, clearable, width, isTextArea, ...inputProps } = this.props;

        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const labelClassNames = classnames(styles.label, labelClassName, {
            [styles.filled]: value || this.state.isFocused
        });

        return (
            <div className={wrapperClassNames}>
                <Input
                    {...inputProps}
                    value={value}
                    styles={styles}
                    width={width}
                    isTextArea={isTextArea}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    ref={(el) => {
                        var inputNode = ReactDOM.findDOMNode(el);
                        this.input = inputNode && (inputNode.getElementsByTagName("input")[0] || inputNode.getElementsByTagName("textarea")[0]);
                    }}
                />
                <span className={styles.highlight} />
                <span className={labelClassNames}>{placeholder}</span>
                {(clearable && value) && <Clear className={styles.clear} onClick={this.handleClearClick} />}
            </div>
        );
    }
}

CompactTextInput.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    isTextArea: PropTypes.bool,
    clearable: PropTypes.bool,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    isValid: PropTypes.bool,
    validateFunction: PropTypes.oneOf([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
    maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    alwaysShowMask: PropTypes.bool,
    wrapperClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    styles: PropTypes.object
};

CompactTextInput.defaultProps = {
    styles: textInputStyles,
    clearable: false
};

export default CompactTextInput;
