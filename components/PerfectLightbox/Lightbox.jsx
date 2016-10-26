import { PureComponent, PropTypes } from "react";
import cx from "classnames";

import positionTypes from "./LightboxPositionType";
import styles from "./Lightbox.scss";

class Lightbox extends PureComponent {
    _handleCloseClick = () => {
        this.props.closeClick && this.props.closeClick();
        this.props.closePortal && this.props.closePortal();
    };

    render() {
        const { children, className, positionType, width } = this.props;

        const lightboxClassNames = cx(
            styles.lightbox,
            styles[positionType],
            className
        );

        const lightboxStyle = {
            width
        };
        return (
            <div className={ lightboxClassNames } style={lightboxStyle}>
                <button className={styles["close-button"]} onClick={this._handleCloseClick} data-ft-id="lightbox-close-button" />
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
    closePortal: PropTypes.func, // передаётся сюда из Portal
    width: PropTypes.number
};
export default Lightbox
