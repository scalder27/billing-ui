import { Component, PropTypes } from "react";
import AppearanceType from "./AppearanceType";
import ButtonSize from "./ButtonSize";
import ButtonType from "./ButtonType";
import Link from "../Link";
import classnames from "classnames";
import styles from "./Button.scss";

class Button extends Component {
    render() {
        const { href, target, className, onClick, additionalClass, children, appearance, type, size, disabled, active } = this.props;
        const classNames = classnames(
            className,
            additionalClass,
            styles[AppearanceType[appearance]],
            styles[ButtonSize[size]], {
                "disabled": disabled,
                "as-active": active
            });

        if (href) {
            return <Link href={href} className={classNames} target={target}>{children}</Link>;
        }

        if (type) {
            return <button onClick={onClick} className={classNames} type={type}>{children}</button>;
        }

        return <span onClick={onClick} className={classNames}>{children}</span>;
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.string,
    className: PropTypes.string,
    additionalClass: PropTypes.string,
    type: PropTypes.oneOf(Object.keys(ButtonType).map((key) => ButtonType[key])),
    size: PropTypes.oneOf(Object.keys(ButtonSize).map((key) => ButtonSize[key])),
    appearance: PropTypes.oneOf(Object.keys(AppearanceType).map((key) => AppearanceType[key]))
};

Button.defaultProps = {
    active: false,
    disabled: false,
    className: styles.button,
    size: ButtonSize.default,
    appearance: AppearanceType.default
};

export default Button;
