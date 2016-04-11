import { Component, PropTypes } from "react";
import MaskedInput from "react-input-mask";

class TextInput extends Component {
    render() {
        const { value, maxLength, readonly, disabled, width, mask, maskChar, alwaysShowMask, inputClassName,
            onChange, onBlur, onFocus, onKeyDown} = this.props;
        const inputProps = {
            style: { "width": width },
            type: "text",
            className: inputClassName,
            value: value,
            maxLength: maxLength,
            disabled: disabled,
            readOnly: readonly,
            onChange: onChange,
            onBlur: onBlur,
            onFocus: onFocus,
            onKeyDown: onKeyDown
        };

        if (mask) {
            return (<MaskedInput {...inputProps}
                mask={mask}
                maskChar={maskChar || '_'}
                alwaysShowMask={alwaysShowMask} />)
        } else {
            return (<input {...inputProps} />)
        }
    }
}

TextInput.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    isValid: PropTypes.bool,
    maxLength: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    alwaysShowMask: PropTypes.bool,
    value: PropTypes.string,
    inputClassName: PropTypes.string
};

export default TextInput;
