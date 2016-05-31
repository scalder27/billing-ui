import { Component, PropTypes } from "react";
import classnames from "classnames";

import styles from "./Link.scss";

const Link = (props) => {
    const {href, children, className} = props;
    const classNames = classnames(className, styles.link);

    if (href) {
        return (
            <a {...props} className={classNames}>
                {children}
            </a>);
    }

    return (
        <span {...props} className={classNames}>
            {children}
        </span>
    )
};

export default Link;
