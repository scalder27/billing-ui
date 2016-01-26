import { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import popup from "exports?Popup!ContentBase/scripts/Popup/Popup";
import styles from "./Popup.scss";
import classnames from "classnames";

class Popup extends Component {
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
        return nextProps.shouldUpdate;
    }

    componentDidUpdate() {
        const { shouldUpdate } = this.props;
        if (!this.popupControl && shouldUpdate) {
            this.initPopup();
        }
    }

    componentWillUnmount() {
        this.removePopup();
    }

    getCloseLink(popupItemHtml) {
        return popupItemHtml.getElementsByClassName("js-closePopup");
    }

    generateMarkUp() {
        const {getCloseLink} = this.props;
        const closeClassNames = classnames("js-closePopup", styles["close-link"]);

        return (
            <div>
                {!getCloseLink && <span className={closeClassNames}></span>}
                {this.props.children}
            </div>
        );
    }

    createPopupItemHtml(className) {
        const popupItemHtml = document.createElement("div");
        popupItemHtml.className = className;

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
        const {getBindItem, position, getCloseLink, getOpenLink, className, onClose} = this.props;

        const popupItemHtml = this.createAndInsertPopupToDOM(className);
        ReactDOM.render(this.generateMarkUp(), popupItemHtml);

        const closeLink = getCloseLink ? getCloseLink() : this.getCloseLink(popupItemHtml);
        const openLink = getOpenLink ? getOpenLink() : null;

        this.popupControl = new popup({
            popupItem: popupItemHtml,
            bindItem: getBindItem(),
            closeLink: closeLink,
            openLink: openLink,
            position: position
        });

        if (onClose) {
            this.popupControl.onHide(() => onClose())
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
    position: PropTypes.object,
    shouldUpdate: PropTypes.bool,
    getCloseLink: PropTypes.func,
    getOpenLink: PropTypes.func,
    getBindItem: PropTypes.func.isRequired,
    className: PropTypes.string
};

Popup.defaultProps = {
    className: styles.popup,
    shouldUpdate: true
};

export default Popup;
