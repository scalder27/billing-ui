import { Component, PropTypes } from "react";

import ReactDOM from "react-dom";
import popup from "exports?Popup!ContentBase/scripts/Popup/Popup";
import styles from "./Popup.scss";
import classnames from "classnames";

class Popup extends Component {
    _popupItemHtml = null;

    componentDidMount() {
        const { shouldUpdate } = this.props;
        if (!this.popupControl && shouldUpdate) {
            this.initPopup();
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.shouldUpdate && this.removePopup();
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.shouldUpdate || nextProps.updateWithoutClosing);
    }

    componentDidUpdate() {
        const { shouldUpdate, updateWithoutClosing } = this.props;
        if (!this.popupControl && shouldUpdate) {
            this.initPopup();
        } else if (updateWithoutClosing) {
            this.updatePopup();
        }
    }

    componentWillUnmount() {
        this.removePopup();
    }

    getCloseLink(popupItemHtml) {
        return popupItemHtml.getElementsByClassName("js-closePopup");
    }

    generateMarkUp() {
        const { getCloseLink } = this.props;
        const closeClassNames = classnames("js-closePopup", styles["close-link"]);

        return (
            <div>
                {!getCloseLink && <span className={closeClassNames}></span>}
                {this.props.children}
            </div>
        );
    }

    createPopupItemHtml(className) {
        const { width } = this.props;
        const popupItemHtml = document.createElement("div");
        popupItemHtml.className = className;
        if (width) {
            popupItemHtml.style.width = `${width}px`;
        }

        return popupItemHtml;
    }

    insertPopupToDOM(popupItemHtml) {
        let popupContainer = document.getElementById("LightboxPopupContainer");
        popupContainer.appendChild(popupItemHtml);
    }

    createAndInsertPopupToDOM(className) {
        let popup = this.createPopupItemHtml(className);
        this.insertPopupToDOM(popup);
        return popup;
    }

    initPopup() {
        const { getBindItem, position, getCloseLink, getOpenLink, className, onClose, onOpen } = this.props;

        const classNames = classnames(styles.popup, className);
        this._popupItemHtml = this.createAndInsertPopupToDOM(classNames);
        ReactDOM.render(this.generateMarkUp(), this._popupItemHtml);

        const closeLink = getCloseLink ? getCloseLink() : this.getCloseLink(this._popupItemHtml);
        const openLink = getOpenLink ? getOpenLink() : null;

        this.popupControl = new popup({
            popupItem: this._popupItemHtml,
            bindItem: getBindItem(),
            closeLink: closeLink,
            openLink: openLink,
            position: position
        });

        if (onClose) {
            this.popupControl.onHide(() => onClose());
        }

        if(onOpen) {
            this.popupControl.onShow(() => onOpen());
        }
    }

    updatePopup() {
        const { width } = this.props;
        if (width) {
            this._popupItemHtml.style.width = `${width}px`;
        }
    }

    removePopup() {
        if (this.popupControl) {
            this.popupControl.remove();
            this.popupControl = null;
        }
    }

    render() {
        return null;
    }
}

Popup.propTypes = {
    onClose: PropTypes.func,
    onOpen: PropTypes.func,

    position: PropTypes.object,
    shouldUpdate: PropTypes.bool,
    // todo: попробовать сделать ресайз покрасивее при рефакторинге (выбор контейнера?)
    updateWithoutClosing: PropTypes.bool,
    getCloseLink: PropTypes.func,
    getOpenLink: PropTypes.func,
    getBindItem: PropTypes.func.isRequired,
    className: PropTypes.string,
    width: PropTypes.number
};

Popup.defaultProps = {
    shouldUpdate: true,
    updateWithoutClosing: false
};

export default Popup;
