import { Component, PropTypes } from "react";
import SpecialCharacters from "../../Shared/SpecialCharacters";
import Popup from "../../Shared/Popup/Popup";

import styles from "./Actions.scss";
import classnames from "classnames";

const position = { top: 0, right: 0 };

class Actions extends Component {
    getCloseLink() {
        return this._closeLink;
    }

    render() {
        const { className, children, getBindItem } = this.props;
        const classNamesPopup = classnames(styles.popup, className);

        return (
            <Popup className={classNamesPopup}
                   getBindItem={getBindItem}
                   position={position}
                   getCloseLink={this.getCloseLink.bind(this)}
                   getOpenLink={getBindItem}>
                <span className={styles["close-link"]} ref={ref => this._closeLink = ref}>{SpecialCharacters.Ellipsis}</span>
                {children}
            </Popup>
        );
    }
}

Actions.propRypes = {
    getBindItem: PropTypes.func.isRequired,
    className: PropTypes.string
};

Actions.defaultProps = {
    className: ""
};

export default Actions;
