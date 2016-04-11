import { Component, PropTypes } from "react";
import Input from "./TextInput";
import textInputStyles from "./CompactTextInput.scss";
import classnames from "classnames";

class CompactTextInput extends Component {
    render() {
        const { value, readonly, disabled, styles, wrapperClassName, inputClassName, labelClassName,
            placeholder, isValid} = this.props;
        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const inputClassNames = classnames(styles.input, inputClassName, {
            [styles["input-validation-error"]]: !isValid,
            [styles.readonly]: readonly,
            [styles.disabled]: disabled
        });
        const labelClassNames = classnames(styles.label, labelClassName, {
            [styles.filled]: value
        });

        return (
            <div className={wrapperClassNames}>
                <Input {...this.props} inputClassName={inputClassNames} />
                <span className={styles.highlight}></span>
                <span className={labelClassNames}>{placeholder}</span>
            </div>
        );
    }
}

CompactTextInput.propTypes = {
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
    labelClassName: PropTypes.string,
    styles: PropTypes.object
};

CompactTextInput.defaultProps = {
    styles: textInputStyles
};

export default CompactTextInput;
