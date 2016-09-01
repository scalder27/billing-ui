import { PureComponent, PropTypes } from "react";
import classnames from "classnames";

import styles from "./Link.scss";

class Link extends PureComponent {
    render() {
        const { href, children, className, disabled } = this.props;

        if (disabled) {
            const disabledClassNames = classnames(className, styles.disabled);
            return (
                <span { ...this.props } className={disabledClassNames}>{children}</span>
            );
        }

        const linkClassNames = classnames(className, styles.link);

        if (href) {
            return (
                <a { ...this.props } className={linkClassNames}>{children}</a>
            );
        }

        return (
            <span { ...this.props } className={linkClassNames}>{children}</span>
        );
    }
}

Link.propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool
};

export default Link;
