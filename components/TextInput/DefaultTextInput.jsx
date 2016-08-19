import { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Input from "./TextInput";
import Clear from "./Clear";

import textInputStyles from "./DefaultTextInput.scss";
import classnames from "classnames";

class DefaultTextInput extends Component {
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
        const { styles, wrapperClassName, placeholderClassName, placeholder, value, clearable, ...inputProps } = this.props;

        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const placeholderClassNames = classnames(styles.placeholder, placeholderClassName);
        const placeholderWrapperClassNames = classnames(styles["placeholder-wrapper"], {
            [styles["as-hidden"]]: value
        });

        return (
            <span className={wrapperClassNames}>
                <span className={placeholderWrapperClassNames} onClick={() => { this.input.focus() }}>
                    <span className={placeholderClassNames}>{placeholder}</span>
                </span>
                <Input {...inputProps}
                    value={value}
                    clearable={clearable}
                    styles={styles}
                    onChange={this.handleChange}
                    ref={(el) => {
                        var inputNode = ReactDOM.findDOMNode(el);
                        this.input = inputNode && (inputNode.getElementsByTagName("input")[0] || inputNode.getElementsByTagName("textarea")[0]);
                    }}
                />
                {(clearable && value) && <Clear className={styles.clear} onClick={this.handleClearClick} />}
            </span>
        );
    }
}

DefaultTextInput.propTypes = {
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
    placeholderClassName: PropTypes.string,
    styles: PropTypes.object
};

DefaultTextInput.defaultProps = {
    styles: textInputStyles
};

export default DefaultTextInput;
