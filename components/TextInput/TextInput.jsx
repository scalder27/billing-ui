import { Component, PropTypes } from "react";
import textInputStyles from "./TextInput.scss";
import classnames from "classnames";

class TextInput extends Component {
    resolveFocus(evt) {
        this.input.focus();
    }

    render() {
        const { value, maxLength, readonly, disabled, styles, wrapperClassName, inputClassName, placeholderClassName,
                placeholder, width, isValid, onChange, onBlur, onFocus, onKeyDown} = this.props;
        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const inputClassNames = classnames(styles.input, inputClassName, {
            [styles["input-validation-error"]]: !isValid,
            [styles.readonly]: readonly,
            [styles.disabled]: disabled
        });
        const placeholderClassNames = classnames(styles.placeholder, placeholderClassName);
        const placeholderWrapperClassNames = classnames(styles["placeholder-wrapper"], {
            [styles["as-hidden"]]: value
        });

        return (
            <span className={wrapperClassNames}>
                <span className={placeholderWrapperClassNames} onClick={this.resolveFocus.bind(this)}>
                    <span className={placeholderClassNames}>{placeholder}</span>
                </span>
                <input
                    style={{"width": width}}
                    className={inputClassNames}
                    type="text"
                    value={value}
                    maxLength={maxLength}
                    disabled={disabled}
                    readOnly={readonly}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown} ref={(el) => {this.input = el}}/>
            </span>
        );
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
