import { Component, PropTypes } from "react";
import classnames from "classnames";

import styles from "./Link.scss";

const Link = (props) => {
    const {href, children, className} = props;
    if (href) {
        return (
            <a {...props}>
                {children}
            </a>);
    }

    return (
        <span {...props} className={classnames(className, styles.link)}>
            {children}
        </span>
    )
};

export default Link;
