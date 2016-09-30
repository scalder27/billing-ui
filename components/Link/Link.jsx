import { PureComponent, PropTypes } from "react";
import classnames from "classnames";

import styles from "./Link.scss";

class Link extends PureComponent {
    render() {
        const { href, children, className, disabledClassName, disabled } = this.props;
        const tagProps = { ...this.props };
        delete tagProps.disabledClassName;

        if (disabled) {
            const disabledClassNames = classnames(className, disabledClassName, styles.disabled);
            return (
                <span { ...tagProps } className={disabledClassNames}>{children}</span>
            );
        }

        const linkClassNames = classnames(className, styles.link);

        if (href) {
            return (
                <a { ...tagProps } className={linkClassNames}>{children}</a>
            );
        }

        return (
            <span { ...tagProps } className={linkClassNames}>{children}</span>
        );
    }
}

Link.propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    disabledClassName: PropTypes.string,
    disabled: PropTypes.bool
};

export default Link;
