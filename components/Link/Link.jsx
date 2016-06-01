import { Component, PropTypes } from "react";
import classnames from "classnames";

import styles from "./Link.scss";

const Link = props => {
    const { href, children, className, disabled } = props;

    if (disabled) {
        const disabledClassNames = classnames(className, styles.disabled);
        return (
            <span className={disabledClassNames}>
                {children}
            </span>
        );
    }

    const linkClassNames = classnames(className, styles.link);

    if (href) {
        return (
            <a { ...props } className={linkClassNames}>
                {children}
            </a>
        );
    }

    return (
        <span { ...props } className={linkClassNames}>
            {children}
        </span>
    );
};

Link.propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool
};

export default Link;
