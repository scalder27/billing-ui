import { Component, PropTypes } from "react";
import radioStyles from "./RadioButton.scss";
import classnames from "classnames";

class RadioButton extends Component {
    render() {
        const { checked, value, onChange, radioClassName, labelClassName, wrapperClassName,
                styles, children, disabled, readonly, ...radioProps } = this.props;
        const labelClassNames = classnames(styles.label, labelClassName);
        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const radioClassNames = classnames(styles.radio, radioClassName, {
            "disabled": disabled,
            "readonly": readonly
        });

        return (
            <label className={wrapperClassNames}>
                <input {...radioProps}
                    checked={checked}
                    disabled={disabled}
                    readonly={readonly}
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
    readonly: PropTypes.bool,
    labelClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    checkboxClassName: PropTypes.string,
    styles: PropTypes.object
    //Так же можно передать остальные стандартные атрибуты радиобатона, но визуально они ни как не обрабатываются
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
