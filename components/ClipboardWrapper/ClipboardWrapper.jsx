import { Component, PropTypes, cloneElement } from "react";
import { copyCommandSupportChecker } from "../../helpers/QueryCommandSupportChecker";

let Clipboard = (props) => cloneElement(props.children);
const copyToClipboardAvailableCheck = copyCommandSupportChecker();

require.ensure([], require => {
    try {
        Clipboard = require("clipboard");
    } catch(e) {}
});

class ClipboardWrapper extends Component {
    _clipboardTarget = null;
    state = {copyToClipboardAvailable: false};

    _reinitClipboard() {
        const { value, onSuccess, onError } = this.props;
        const { copyToClipboardAvailable } = this.state;

        if (copyToClipboardAvailable) {
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
        this._clipboard && this._clipboard.destroy();
    }

    _resolveCopyToClipboard() {
        copyToClipboardAvailableCheck
            .then(() => { this.setState({copyToClipboardAvailable: true}) })
            .catch(() => { this.setState({copyToClipboardAvailable: false}) });
    }

    componentDidMount() {
        this._resolveCopyToClipboard();
    }

    componentDidUpdate() {
        this._reinitClipboard();
    }

    componentWillUnmount() {
        this._removeClipboard();
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
    className: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
};

export default ClipboardWrapper;
