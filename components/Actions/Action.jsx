import { Component, PropTypes } from "react";
import Icon from "../Icon";
import Link from "../Link";
import styles from "./Actions.scss";
import classnames from "classnames";

class Action extends Component {
    getAction() {
        const { className, iconType, description, onClick } = this.props;
        const actionClassNames = classnames(styles.action, className);

        return (
            <div className={actionClassNames} onClick={() => onClick()}>
                <Icon className={styles.icon} type={iconType} />
                <span className={styles.description}>{description}</span>
            </div>
        );
    }

    getActionAsLink() {
        const { className, iconType, description, href, target, onClick } = this.props;
        const actionClassNames = classnames(styles.action, className);

        return (
            <Link className={actionClassNames} href={href} target={target} onClick={() => onClick()}>
                <Icon className={styles.icon} type={iconType} />
                <span className={styles.description}>{description}</span>
            </Link>
        );
    }

    render() {
        const { asLink } = this.props;
        return (asLink ? this.getActionAsLink() : this.getAction());
    }
}

Action.propTypes = {
    onClick: PropTypes.func,
    asLink: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.string,
    iconType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    className: PropTypes.string
};

Action.defaultProps = {
    className: "",
    onClick: () => {},
    asLink: false
};

export default Action;
