import { PureComponent, PropTypes } from "react";
import ReactDOM from "react-dom";
import Input from "./TextInput";
import Clear from "./Clear";

import textInputStyles from "./CompactTextInput.scss";
import classnames from "classnames";

class CompactTextInput extends PureComponent {
    state = {
        isFocused: false
    };

    handleFocus = () => {
        this.setState({
            isFocused: true
        });

        if (this.props.onFocus) {
            this.props.onFocus();
        }
    };

    handleBlur = () => {
        this.setState({
            isFocused: false
        });

        if (this.props.onBlur) {
            this.props.onBlur();
        }
    };

    handleChange = (evt, value) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(value || evt.target.value || "", evt);
        }
    };

    handleClearClick = (evt) => {
        this.input.focus();
        this.handleChange(evt, "");
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
