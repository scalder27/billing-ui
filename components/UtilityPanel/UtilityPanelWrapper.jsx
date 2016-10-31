import { PureComponent, PropTypes } from "react";
import Portal from "react-portal";
import ReactDOM from "react-dom";
import cx from "classnames";
import UtilityPanel from "./UtilityPanel";

import styles from "./UtilityPanelWrapper.scss";
import utilityPanelStyles from "./UtilityPanel.scss";

const CSS_ANIMATION_TIME = 300;

class UtilityPanelWrapper extends PureComponent {
    _beforeClose = (portalDOMNode, removePortalFromDOM) => {
        const { beforeClose } = this.props;
        portalDOMNode.className += " " + styles.closing;
        this._utilityPanel.className += " " + utilityPanelStyles.closing;
        beforeClose && beforeClose();

        setTimeout(removePortalFromDOM, CSS_ANIMATION_TIME);
    };

    render() {
        const { title, panelClassName, children, overlayClassName } = this.props;

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
        delete portalProps.panelClassName;
        delete portalProps.title;

        return (
            <Portal { ...portalProps } className={portalClassNames}>
                <UtilityPanel
                    title={title}
                    className={panelClassName}
                    ref={(elm) => {
                        this._utilityPanel = ReactDOM.findDOMNode(elm)
                    }}>
                    {children}
                </UtilityPanel>
            </Portal>
        );
    }
}

UtilityPanelWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    openByClickOn: PropTypes.node,
    isOpened: PropTypes.bool,
    closeOnEsc: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    onOpen: PropTypes.func,
    beforeClose: PropTypes.func,
    onClose: PropTypes.func,

    overlayClassName: PropTypes.string,
    panelClassName: PropTypes.string,
    title: PropTypes.string
};

export default UtilityPanelWrapper;
