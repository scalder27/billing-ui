import { Component, PropTypes } from "react";
import Clipboard from "clipboard";
import { throttle } from "underscore";
import events from "add-event-listener";

class ClipboardWrapper extends Component {
    _clipboardTarget = null;

    constructor(props) {
        super(props);
        this.state = {copyToClipboardAvailable: false};
    }

    componentWillMount() {
        const copyToClipboardAvailableCheck = throttle(() => {
            events.removeEventListener(window, "mousemove", copyToClipboardAvailableCheck);
            this.setState({copyToClipboardAvailable: document.queryCommandSupported("copy")});
        }, 100);
        events.addEventListener(window, "mousemove", copyToClipboardAvailableCheck);
    }

    _initClipboard() {
        const { value } = this.props;
        const { copyToClipboardAvailable } = this.state;

        if (copyToClipboardAvailable) {
            this._clipboard && this._clipboard.destroy();
            this._clipboard = new Clipboard(this._clipboardTarget, {
                text: () => value
            });
        }
    }

    componentDidMount() {
        this._initClipboard();
    }

    componentDidUpdate() {
        this._initClipboard();
    }

    render() {
        const { children, className } = this.props;
        const { copyToClipboardAvailable } = this.state;

        if (copyToClipboardAvailable) {
            return (
                <div ref={node => this._clipboardTarget = node} className={className}>
                    {children}
                </div>
            );
        }

        return null;
    }
}

ClipboardWrapper.propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default ClipboardWrapper;
