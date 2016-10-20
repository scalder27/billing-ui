import { Component, PropTypes } from "react";
import { copyCommandSupportChecker } from "../../helpers/QueryCommandSupportChecker";

let Clipboard = null;

const copyToClipboardAvailableCheck = copyCommandSupportChecker();
const clipboardUploaded = new Promise((resolve, reject) => {
    require.ensure([], require => {
        try {
            Clipboard = require("clipboard");
            resolve();
        } catch (e) {
            reject();
        }
    });
});

class ClipboardWrapper extends Component {
    _clipboardTarget = null;
    state = { copyToClipboardAvailable: false };

    _reInitClipboard() {
        const { value, onSuccess, onError } = this.props;
        const { copyToClipboardAvailable } = this.state;

        if (Clipboard !== null && copyToClipboardAvailable) {
            this._removeClipboard();
            this._clipboard = new Clipboard(this._clipboardTarget, {
                text: () => value
            });

            if (onSuccess) {
                this._clipboard.on("success", e => {
                    onSuccess(e);
                });
            }

            if (onError) {
                this._clipboard.on("error", e => {
                    onError(e);
                });
            }
        }
    }

    _removeClipboard() {
        if (this._clipboard && this._clipboard.destroy) {
            this._clipboard.destroy();
            this._clipboard = null;
        }
    }

    _resolveCopyToClipboard() {
        Promise.all([clipboardUploaded, copyToClipboardAvailableCheck])
            .then(() => {
                this.setState({ copyToClipboardAvailable: true });
            })
            .catch(() => {
                this.setState({ copyToClipboardAvailable: false });
            });
    }

    componentDidMount() {
        this._resolveCopyToClipboard();
    }

    componentDidUpdate() {
        this._reInitClipboard();
    }

    componentWillUnmount() {
        this._removeClipboard();
    }

    render() {
        const { children, className } = this.props;
        const { copyToClipboardAvailable } = this.state;

        if (copyToClipboardAvailable) {
            return (
                <div ref={node => {
                    this._clipboardTarget = node
                }} className={className}>
                    {children}
                </div>
            );
        }

        return null;
    }
}

ClipboardWrapper.propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    children: PropTypes.node
};

export default ClipboardWrapper;
