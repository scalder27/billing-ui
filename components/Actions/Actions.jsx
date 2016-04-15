import { Component, PropTypes } from "react";
import SpecialCharacters from "../SpecialCharacters";
import Popup from "../PopupWrapper";

import styles from "./Actions.scss";
import classnames from "classnames";

class Actions extends Component {
    _closeLink = null;

    render () {
        const { className, children, getBindItem, position, onOpen, onClose, ellipsisClassName } = this.props;
        const classNamesPopup = classnames(styles.popup, className);
        const ellipsisClassNames = classnames(styles["close-link"], ellipsisClassName);

        return (
            <Popup className={classNamesPopup}
                   getBindItem={getBindItem}
                   position={position}
                   getCloseLink={() => this._closeLink}
                   getOpenLink={getBindItem}
                   onOpen={onOpen}
                   onClose={onClose}>
                <span className={ellipsisClassNames} ref={node => this._closeLink = node}>
                    {SpecialCharacters.Ellipsis}
                </span>
                {children}
            </Popup>
        );
    }
}

Actions.propRypes = {
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    position: PropTypes.object,
    getBindItem: PropTypes.func.isRequired,
    className: PropTypes.string,
    ellipsisClassName: PropTypes.string
};

Actions.defaultProps = {
    position: { top: 0, right: 0 },
    className: ""
};

export default Actions;
