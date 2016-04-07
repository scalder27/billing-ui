import { Component, PropTypes } from "react";
import compactTextInputStyles from "./CompactTextInput.scss";
import classnames from "classnames";

class CompactTextInput extends Component {
    render() {
        const { value, maxLength, readonly, disabled, styles, wrapperClassName, inputClassName, labelClassName, placeholder, width,
            onChange, onBlur, onFocus, onKeyDown} = this.props;
        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const inputClassNames = classnames(styles.input, inputClassName, {
            "readonly": readonly,
            "disabled": disabled
        });
        const labelClassNames = classnames(styles.label, labelClassName, {
            [styles.filled]: value
        });

        return (
            <div className={wrapperClassNames}>
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
                    onKeyDown={onKeyDown} />
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
    value: PropTypes.string,
    wrapperClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    styles: PropTypes.object
};

CompactTextInput.defaultProps = {
    styles: compactTextInputStyles
};

export default CompactTextInput;
