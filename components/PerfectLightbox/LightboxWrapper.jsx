import React, { Component, PropTypes } from "react";
import Portal from "react-portal";
import cx from "classnames";

import Lightbox from "./Lightbox";
import positionTypes from "./LightboxPositionType";
import styles from "./LightboxWrapper.scss";

class LightboxWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: props.isOpened
        }
    }

    render() {
        const { children, overlayClassName, lightboxClassName, positionType } = this.props;

        const portalClassNames = cx(
            styles.overlay,
            overlayClassName
        );

        const portalProps = { ...this.props };
        delete portalProps.children;
        delete portalProps.overlayClassName;
        delete portalProps.lightboxClassName;
        delete portalProps.positionType;

        const lightBoxElement = React.cloneElement(
            <Lightbox className={lightboxClassName} positionType={positionType} beforeClose={this._beforeCloseLightbox}>
                {children}
            </Lightbox>,
            { closePortal: this.props.closePortal }
        );

        return (
            <Portal { ...portalProps } className={ portalClassNames }>
                {lightBoxElement}
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
    closePortal: PropTypes.func,

    overlayClassName: PropTypes.string,
    lightboxClassName: PropTypes.string,
    positionType: PropTypes.oneOf(Object.keys(positionTypes))
};

LightboxWrapper.defaultProps = {
    positionType: positionTypes.top,
    isOpened: false
};

export default LightboxWrapper
