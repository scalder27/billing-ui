import { Component, PropTypes } from "react";
import cx from "classnames";

import positionTypes from "./LightboxPositionType";
import styles from "./Lightbox.scss";
import CrossIcon from "../../img/Cross.svg";

const ANIMATION_TIME = 450;

class Lightbox extends Component {

    _handleCloseClick = () => {
        this._lightbox.className = `${this._lightbox.className} ${styles.closing}`;

        if (this.props.beforeClose) {
            this.props.beforeClose();
        }

        if (this.props.closePortal) {
            setTimeout(this.props.closePortal, ANIMATION_TIME);
        }
    };

    render() {
        const { children, className, positionType } = this.props;

        const lightboxClassNames = cx(
            styles.lightbox,
            styles[positionType],
            className
        );
        return (
            <div className={ lightboxClassNames } ref={(elm) => {
                this._lightbox = elm
            }}>
                <button className={styles["close-button"]} onClick={this._handleCloseClick}>
                    <img src={CrossIcon} />
                </button>
                {children}
            </div>
        )
    }
}

Lightbox.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    positionType: PropTypes.oneOf(Object.keys(positionTypes)),
    beforeClose: PropTypes.func,
    closePortal: PropTypes.func
};
export default Lightbox
