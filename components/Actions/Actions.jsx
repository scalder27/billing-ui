import { Component, PropTypes } from "react";
import SpecialCharacters from "../SpecialCharacters";
import Popup from "../PopupWrapper";

import styles from "./Actions.scss";
import classnames from "classnames";

class Actions extends Component {
    _closeLink = null;

    render() {
        const { className, children, getBindItem, position, onOpen, onClose, isActive, ellipsisClassName } = this.props;
        const classNamesPopup = classnames(styles.popup, className);
        const ellipsisClassNames = classnames(styles["close-link"], ellipsisClassName);

        return (
            <Popup className={classNamesPopup}
                   position={position}
                   getBindItem={getBindItem}
                   getOpenLink={getBindItem}
                   getCloseLink={() => this._closeLink}
                   onOpen={onOpen}
                   onClose={onClose}
                   isActive={isActive}
            >
                <span className={ellipsisClassNames} ref={node => { this._closeLink = node }}>
                    {SpecialCharacters.Ellipsis}
                </span>
                {children}
            </Popup>
        );
    }
}

Actions.propTypes = {
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    isActive: PropTypes.bool,
    position: PropTypes.object,
    getBindItem: PropTypes.func.isRequired,
    className: PropTypes.string,
    ellipsisClassName: PropTypes.string,
    children: PropTypes.node
};

Actions.defaultProps = {
    position: { top: 0, right: 0 },
    className: ""
};

export default Actions;
