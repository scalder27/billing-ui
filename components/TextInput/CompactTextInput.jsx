import { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Input from "./TextInput";
import Clear from "./Clear";

import textInputStyles from "./CompactTextInput.scss";
import classnames from "classnames";

class CompactTextInput extends Component {
    handleChange = (evt) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(evt.target.value || "", evt);
        }
    };

    clear(evt) {
        this.input.focus();
        const clearEvt = {...evt};
        clearEvt.target.value = "";
        this.handleChange(clearEvt);
    }

    render() {
        const { styles, wrapperClassName, labelClassName, placeholder, value, clearable, width, ...inputProps } = this.props;

        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const labelClassNames = classnames(styles.label, labelClassName, {
            [styles.filled]: value
        });

        return (
            <div className={wrapperClassNames} style={{"width": width}}>
                <Input {...inputProps} value={value}
                    styles={styles}
                    width={width}
                    onChange={this.handleChange}
                    ref={(el) => {
                        var inputNode = ReactDOM.findDOMNode(el);
                        this.input = inputNode && inputNode.getElementsByTagName("input")[0];
                    }}
                />
                <span className={styles.highlight}/>
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
