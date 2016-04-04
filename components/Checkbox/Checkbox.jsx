import { Component, PropTypes } from "react";
import checkboxStyles from "./Checkbox.scss";
import classnames from "classnames";

class Checkbox extends Component {
    render() {
        const {checked, onChange, checkboxClassName, labelClassName, wrapperClassName, styles, children, disabled} = this.props;
        const labelClassNames = classnames(styles.label, labelClassName);
        const wrapperClassNames = classnames(styles.wrapper, wrapperClassName);
        const checkboxClassNames = classnames(styles.checkbox, checkboxClassName, {
            "disabled": disabled
        });

        return (
            <label className={wrapperClassNames}>
                <input checked={checked} className={checkboxClassNames} type="checkbox" onChange={onChange}/>
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
    labelClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    checkboxClassName: PropTypes.string,
    styles: PropTypes.object
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
