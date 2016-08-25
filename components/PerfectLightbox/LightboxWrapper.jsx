import { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Portal from "react-portal";
import cx from "classnames";

import Lightbox from "./Lightbox";
import positionTypes from "./LightboxPositionType";
import styles from "./LightboxWrapper.scss";
import lightboxStyles from "./Lightbox.scss";

const CSS_ANIMATION_TIME = 450;

class LightboxWrapper extends Component {
    _beforeClose = (portalDOMNode, removePortalFromDOM) => {
        portalDOMNode.className = `${portalDOMNode.className} ${styles.closing}`;
        this._lightbox.className = `${this._lightbox.className} ${lightboxStyles.closing}`;

        setTimeout(removePortalFromDOM, CSS_ANIMATION_TIME);
    };

    render() {
        const { children, overlayClassName, lightboxClassName, positionType } = this.props;

        const portalClassNames = cx(
            styles.overlay,
            overlayClassName
        );

        const portalProps = {
            ...this.props,
            beforeClose: this._beforeClose
        };

        delete portalProps.children;
        delete portalProps.overlayClassName;
        delete portalProps.lightboxClassName;
        delete portalProps.positionType;

        return (
            <Portal { ...portalProps } className={ portalClassNames }>
                <Lightbox
                    className={lightboxClassName}
                    positionType={positionType}
                    ref={(elm) => { this._lightbox = ReactDOM.findDOMNode(elm) }}>
                    {children}
                </Lightbox>
            </Portal>
        );
    }
}

LightboxWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    openByClickOn: PropTypes.node,
    isOpened: PropTypes.bool,
    closeOnEsc: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    onOpen: PropTypes.func,
    beforeClose: PropTypes.func,
    onClose: PropTypes.func,

    overlayClassName: PropTypes.string,
    lightboxClassName: PropTypes.string,
    positionType: PropTypes.oneOf(Object.keys(positionTypes))
};

LightboxWrapper.defaultProps = {
    positionType: positionTypes.top
};

export default LightboxWrapper
