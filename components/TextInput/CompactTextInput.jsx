import { Component, PropTypes } from "react";
import Input from "./TextInput";
import Clear from "./Clear";

import textInputStyles from "./CompactTextInput.scss";
import classnames from "classnames";

class CompactTextInput extends Component {
    change(value, evt) {
        const { onChange } = this.props;

        if (onChange) {
            onChange(value || "", evt);
        }
    }

    clear(evt) {
        this.input.focus();
        this.change("", evt);
    }

    render() {
        const { styles, wrapperClassName, labelClassName, placeholder, value, clearable, width, ...inputProps } = this.props;

        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const labelClassNames = classnames(styles.label, labelClassName, {
            [styles.filled]: value
        });

        return (
            <div className={wrapperClassNames} style={{"width": width}}>
                <Input {...inputProps} value={value} styles={styles} width={width}
                    onChange={(evt) => this.change(evt.target.value, evt)}
                    ref={(el) => {
                        this.input = ReactDOM.findDOMNode(el);
                    }} />
                <span className={styles.highlight}></span>
                <span className={labelClassNames}>{placeholder}</span>
                {(clearable && value) && <Clear className={styles.clear} onClick={this.clear.bind(this)} />}
            </div>
        );
    }
}

CompactTextInput.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    clearable: PropTypes.bool,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    isValid: PropTypes.bool,
    maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
