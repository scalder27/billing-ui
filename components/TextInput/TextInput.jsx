import { Component, PropTypes } from "react";
import MaskedInput from "react-input-mask";
import classnames from "classnames";

class TextInput extends Component {
    render() {
        const { width, mask, maskChar, alwaysShowMask, styles, isValid, inputClassName, ...others } = this.props;

        const inputClassNames = classnames(styles.input, inputClassName, {
            [styles["input-validation-error"]]: !isValid,
            [styles.readonly]: others.readonly,
            [styles.disabled]: others.disabled
        });

        const inputProps = {
            ...others,
            style: { "width": width },
            type: "text",
            className: inputClassNames
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
    value: PropTypes.string,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    isValid: PropTypes.bool,
    maxLength: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    alwaysShowMask: PropTypes.bool,
    inputClassName: PropTypes.string,
    styles: PropTypes.object
};

export default TextInput;
