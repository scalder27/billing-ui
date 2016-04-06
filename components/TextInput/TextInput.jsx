import { Component, PropTypes } from "react";
import textInputStyles from "./TextInput.scss";
import classnames from "classnames";

class TextInput extends Component {
    render() {
        const { value, maxLength, disabled, styles, wrapperClassName, inputClassName, placeholderClassName, placeholder, width,
            onChange, onBlur, onFocus, onKeyDown} = this.props;
        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const inputClassNames = classnames(styles.input, inputClassName);
        const placeholderClassNames = classnames(styles.placeholder, placeholderClassName, {
            [styles["as-hidden"]]: value !== ""
        });

        return (
            <span className={wrapperClassNames}>
                <span classNmae={placeholderClassNames}>{placeholder}</span>
                <input
                    style={{"width": width}}
                    className={inputClassNames}
                    type="text"
                    value={value}
                    maxLength={maxLength}
                    disabled={disabled}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown} />

            </span>
        );
    }
}

TextInput.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
    isValid: PropTypes.bool,
    maxLength: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    width: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    placeholder: PropTypes.string,
    mask: PropTypes.string,
    value: PropTypes.string,
    wrapperClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    placeholderClassName: PropTypes.string,
    styles: PropTypes.object
};

TextInput.defaultProps = {
    styles: textInputStyles
};

export default TextInput;
