import {Component, PropTypes} from "react";
import MessageType from "./MessageType";
import cx from "classnames";

import styles from "./WarningMessage.scss";

class WarningMessage extends Component {
    componentWillMount() {

    }

    render() {
        const { children, type, className, hidden, animated } = this.props;

        const messageClassNames = cx(styles.message, styles[type], className, {
            [styles.hidden]: hidden,
            [styles.animated]: animated
        });
        return (
            <div className={messageClassNames}>{children}</div>
        );
    }
}

WarningMessage.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(Object.keys(MessageType).map((key) => MessageType[key])),
    className: PropTypes.string,
    hidden: PropTypes.bool,
    animated: PropTypes.bool
};

WarningMessage.defaultProps = {
    type: MessageType.base,
    className: "",
    animated: true,
    hidden: false
};

export default WarningMessage
