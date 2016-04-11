import { Component, PropTypes } from "react";
import Input from "./TextInput";
import textInputStyles from "./DefaultTextInput.scss";
import classnames from "classnames";

class DefaultTextInput extends Component {
    resolveFocus(evt) {
        this.input.focus();
    }

    render() {
        const { value, styles, wrapperClassName, placeholderClassName, placeholder, inputClassName,
            isValid, readonly, disabled} = this.props;
        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const placeholderClassNames = classnames(styles.placeholder, placeholderClassName);
        const placeholderWrapperClassNames = classnames(styles["placeholder-wrapper"], {
            [styles["as-hidden"]]: value
        });
        const inputClassNames = classnames(styles.input, inputClassName, {
            [styles["input-validation-error"]]: !isValid,
            [styles.readonly]: readonly,
            [styles.disabled]: disabled
        });

        return (
            <span className={wrapperClassNames}>
                <span className={placeholderWrapperClassNames} onClick={this.resolveFocus.bind(this)}>
                    <span className={placeholderClassNames}>{placeholder}</span>
                </span>
                <Input {...this.props} inputClassName={inputClassNames} ref={(el) => {
                    this.input = ReactDOM.findDOMNode(el);
                }} />
            </span>
        );
    }
}

DefaultTextInput.propTypes = {
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
    maskChar: PropTypes.string,
    alwaysShowMask: PropTypes.bool,
    value: PropTypes.string,
    wrapperClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    placeholderClassName: PropTypes.string,
    styles: PropTypes.object
};

DefaultTextInput.defaultProps = {
    styles: textInputStyles
};

export default DefaultTextInput;
