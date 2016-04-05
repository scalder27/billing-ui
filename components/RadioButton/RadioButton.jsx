import { Component, PropTypes } from "react";
import radioStyles from "./RadioButton.scss";
import classnames from "classnames";

class RadioButton extends Component {
    render() {
        const { checked, value, onChange, radioClassName, labelClassName, wrapperClassName,
                styles, children, disabled } = this.props;
        const labelClassNames = classnames(styles.label, labelClassName);
        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const radioClassNames = classnames(styles.radio, radioClassName, {
            "disabled": disabled
        });

        return (
            <label className={wrapperClassNames}>
                <input checked={checked}
                    disabled={disabled}
                    className={radioClassNames}
                    type="radio"
                    value={value}
                    onChange={onChange}/>
                <span className={labelClassNames}>
                    {children}
                </span>
            </label>
        );
    }
}

RadioButton.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    labelClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    checkboxClassName: PropTypes.string,
    styles: PropTypes.object
};

RadioButton.defaultProps = {
    labelClassName: "",
    wrapperClassName: "",
    checkboxClassName: "",
    checked: false,
    disabled: false,
    styles: radioStyles
};

export default RadioButton;
