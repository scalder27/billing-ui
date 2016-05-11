import { Component, PropTypes } from "react";
import classnames from "classnames";

import styles from "./Link.scss";

class Link extends Component {
    render() {
        const {href, children, className} = this.props;

        if (href !== undefined) {
            return (<a {...this.props}>{children}</a>);
        }
        else {
            return (
                <span {...this.props} className={classnames(className, styles.link)} >
                    {children}
                </span>
            );
        }
    }
}

Link.propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    className: PropTypes.string
}

export default Link;
