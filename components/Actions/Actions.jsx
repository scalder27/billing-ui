import { Component, PropTypes } from "react";
import SpecialCharacters from "../SpecialCharacters";
import Popup from "../PopupWrapper";

import styles from "./Actions.scss";
import classnames from "classnames";

class Actions extends Component {
    _closeLink = null;

    render() {
        const { className, children, getBindItem, position } = this.props;
        const classNamesPopup = classnames(styles.popup, className);

        return (
            <Popup className={classNamesPopup}
                   getBindItem={getBindItem}
                   position={position}
                   getCloseLink={() => this._closeLink}
                   getOpenLink={getBindItem}>
                <span className={styles["close-link"]} ref={node => this._closeLink = node}>{SpecialCharacters.Ellipsis}</span>
                {children}
            </Popup>
        );
    }
}

Actions.propRypes = {
    position: PropTypes.object,
    getBindItem: PropTypes.func.isRequired,
    className: PropTypes.string
};

Actions.defaultProps = {
    position: { top: 0, right: 0 },
    className: ""
};

export default Actions;
