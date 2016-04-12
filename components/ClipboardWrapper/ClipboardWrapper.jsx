import { Component, PropTypes } from "react";
import Clipboard from "clipboard";

import { checkClipboard } from "./ClipboardChecker";

const copyToClipboardAvailableCheck = checkClipboard();

class ClipboardWrapper extends Component {
    _clipboardTarget = null;
    state = {copyToClipboardAvailable: false};

    _reinitClipboard() {
        const { value } = this.props;
        const { copyToClipboardAvailable } = this.state;

        if (copyToClipboardAvailable) {
            this._clipboard && this._clipboard.destroy();
            this._clipboard = new Clipboard(this._clipboardTarget, {
                text: () => value
            });
        }
    }

    _resolveCopyToClipboard() {
        copyToClipboardAvailableCheck
            .then(() => {this.setState({copyToClipboardAvailable: true})})
            .catch(() => {this.setState({copyToClipboardAvailable: false})});
    }

    componentDidMount() {
        this._resolveCopyToClipboard();
        this._reinitClipboard();
    }

    componentDidUpdate() {
        this._reinitClipboard();
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
