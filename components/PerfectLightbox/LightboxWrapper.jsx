import { PureComponent, PropTypes } from "react";
import ReactDOM from "react-dom";
import Portal from "react-portal";
import cx from "classnames";

import Lightbox from "./Lightbox";
import positionTypes from "./LightboxPositionType";
import styles from "./LightboxWrapper.scss";
import lightboxStyles from "./Lightbox.scss";

const CSS_ANIMATION_TIME = 400;

class LightboxWrapper extends PureComponent {
    _beforeClose = (portalDOMNode, removePortalFromDOM) => {
        portalDOMNode.className += " " + styles.closing;
        this._lightbox.className += " " + lightboxStyles.closing;

        setTimeout(removePortalFromDOM, CSS_ANIMATION_TIME);
    };

    render() {
        const { children, overlayClassName, lightboxClassName, positionType, width } = this.props;

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
        delete portalProps.width;

        return (
            <Portal { ...portalProps } className={ portalClassNames }>
                <Lightbox
                    className={lightboxClassName}
                    positionType={positionType}
                    width={width}
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
    positionType: PropTypes.oneOf(Object.keys(positionTypes)),
    width: PropTypes.number
};

LightboxWrapper.defaultProps = {
    positionType: positionTypes.top
};

export default LightboxWrapper
