import { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import LightboxTop from "exports?LightboxTop!ContentBase/scripts/Lightbox/LightboxTop";

class Lightbox extends Component {
    componentDidMount() {
        const { shouldUpdate, isOpen} = this.props;
        if (!this._lightboxControl && shouldUpdate) {
            this.initLightbox();
        }

        this.open(isOpen);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shouldUpdate) {
            this.removeLightbox();
        } else {
            this.open(nextProps.isOpen);
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.shouldUpdate;
    }

    componentDidUpdate() {
        const { shouldUpdate, isOpen } = this.props;
        if (!this._lightboxControl && shouldUpdate) {
            this.initLightbox();
        }

        this.open(isOpen);
    }

    componentWillUnmount() {
        this.removeLightbox();
    }

    generateLightboxHtml() {
        const {title, width, children} = this.props;
        const lbStyle = {width: `${width}px`};

        return (
            <div className="lb-lightbox inlineBlock" style={lbStyle}>
                <div className="lb-lightboxWrapper">
                    <div className="lb-closeButton"></div>
                    <div>
                        <h2 className="lb-title">{title}</h2>
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    initLightbox() {
        const {getOpenLink, onClose} = this.props;

        const lightboxItemHtml = document.createElement("div");
        const lightboxHtml = ReactDOM.render(this.generateLightboxHtml(), lightboxItemHtml);
        const openLink = getOpenLink && getOpenLink();

        this._lightboxControl = LightboxTop.create(lightboxHtml, {
            openLink: openLink
        });

        onClose && this._lightboxControl.onCloseComplete(() => onClose());
    }

    open(isOpen) {
        isOpen && this._lightboxControl.open();
    }

    removeLightbox() {
        if (this._lightboxControl) {
            this._lightboxControl.remove();
            this._lightboxControl = null;
        }
    }

    render() {
        return null;
    }
}

Lightbox.propTypes = {
    isOpen: PropTypes.bool,
    shouldUpdate: PropTypes.bool,
    getOpenLink: PropTypes.func,
    onClose: PropTypes.func,
    identifier: PropTypes.string.isRequired,
    title: PropTypes.string,
    width: PropTypes.number,
    children: PropTypes.node
};

Lightbox.defaultProps = {
    width: 452,
    shouldUpdate: true
};

export default Lightbox;
