import { Component, PropTypes } from "react";
import AppearanceType from "./AppearanceType";
import ButtonSize from "./ButtonSize";
import ButtonType from "./ButtonType";
import Link from "../Link";
import classnames from "classnames";
import buttonStyles from "./Button.scss";
import shouldComponentUpdate from "react-pure-render/function";

class Button extends Component {
    shouldComponentUpdate = shouldComponentUpdate;

    constructor(props) {
        super(props);
        this._resolveOnClick = this._resolveOnClick.bind(this);
    }

    _resolveOnClick() {
        const { disabled, onClick } = this.props;

        if (!disabled) {
            onClick(...arguments);
        }
    }

    render() {
        const { href, target, className, children, appearance, type, size, disabled, active, styles, attributes } = this.props;
        const classNames = classnames(
            styles.button,
            className,
            styles[AppearanceType[appearance]],
            styles["size-" + ButtonSize[size]], {
                [styles.disabled]: disabled,
                [styles["as-active"]]: !disabled && active
            });

        if (href) {
            return <Link onClick={this._resolveOnClick} href={href} className={classNames} target={target} { ...attributes }>{children}</Link>;
        }

        if (type) {
            return <button onClick={this._resolveOnClick} className={classNames} type={type} { ...attributes }>{children}</button>;
        }

        return <span onClick={this._resolveOnClick} className={classNames} { ...attributes }>{children}</span>;
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.string,
    className: PropTypes.string,
    styles: PropTypes.shape({
        button: PropTypes.string
    }).isRequired,
    type: PropTypes.oneOf(Object.keys(ButtonType).map((key) => ButtonType[key])),
    size: PropTypes.oneOf(Object.keys(ButtonSize).map((key) => ButtonSize[key])),
    appearance: PropTypes.oneOf(Object.keys(AppearanceType).map((key) => AppearanceType[key])),
    attributes: PropTypes.object,
    children: PropTypes.node
};

Button.defaultProps = {
    className: "",
    active: false,
    disabled: false,
    styles: buttonStyles,
    appearance: AppearanceType.default,
    size: ButtonSize.default
};

export default Button;
