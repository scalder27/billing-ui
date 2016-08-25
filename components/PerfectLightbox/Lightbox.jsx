import { Component, PropTypes } from "react";
import cx from "classnames";

import positionTypes from "./LightboxPositionType";
import styles from "./Lightbox.scss";
import CrossIcon from "../../img/Cross.svg";

class Lightbox extends Component {
    _handleCloseClick = () => {
        this.props.closeClick && this.props.closeClick();
        this.props.closePortal && this.props.closePortal();
    };

    render() {
        const { children, className, positionType } = this.props;

        const lightboxClassNames = cx(
            styles.lightbox,
            styles[positionType],
            className
        );
        return (
            <div className={ lightboxClassNames }>
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
    closeClick: PropTypes.func,
    closePortal: PropTypes.func
};
export default Lightbox
