import { Component, PropTypes } from "react";
import checkboxStyles from "./Checkbox.scss";
import classnames from "classnames";

class Checkbox extends Component {
    render() {
        const {checked, onChange, checkboxClassName, labelClassName, wrapperClassName, styles,
               children, disabled, readonly, ...checkboxProps} = this.props;
        const labelClassNames = classnames(styles.label, labelClassName);
        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const checkboxClassNames = classnames(styles.checkbox, checkboxClassName, {
            "disabled": disabled,
            "readonly": readonly
        });

        return (
            <label className={wrapperClassNames}>
                <input {...checkboxProps}
                    checked={checked}
                    disabled={disabled}
                    readonly={readonly}
                    className={checkboxClassNames}
                    type="checkbox"
                    onChange={onChange}/>
                <span className={labelClassNames}>
                    {children}
                </span>
            </label>
        );
    }
}

Checkbox.propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    readonly: PropTypes.bool,
    labelClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    checkboxClassName: PropTypes.string,
    styles: PropTypes.object
    //Так же можно передать остальные стандартные атрибуты чекбокса, но визуально они ни как не обрабатываются
};

Checkbox.defaultProps = {
    labelClassName: "",
    wrapperClassName: "",
    checkboxClassName: "",
    checked: false,
    disabled: false,
    styles: checkboxStyles
};

export default Checkbox;