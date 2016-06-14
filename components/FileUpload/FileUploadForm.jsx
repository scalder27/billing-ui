import { Component, PropTypes } from "react";
import reactDOM from "react-dom";
import cx from "classnames";

import FileUploadControl from "./FileUploadControl";
import FileUploadInput from "./FileUploadInput.jsx";
import { createGuid } from "../../helpers/GuidFactory";

import styles from "./FileUpload.scss";

const shortenEventHandlerName = ([ , , f, ...rest]) => [f.toLowerCase(), ...rest].join("");
const startsWithOnFileUpload = key => key.indexOf("onFileUpload") === 0;
const containsInObject = obj => key => obj[key] !== undefined;
const filterPropEvents = (propTypes, props) => {
    const isKeyContainsInPropTypes = containsInObject(propTypes);

    return Object
        .keys(props)
        .filter(key => startsWithOnFileUpload(key) && isKeyContainsInPropTypes(key))
        .map(key => key);
};

class FileUploadForm extends Component {
    _fileId = createGuid();

    componentDidMount() {
        const { fileUploadParams } = this.props;

        const formNode = reactDOM.findDOMNode(this);
        this._fileUploadControl = new FileUploadControl(formNode, fileUploadParams);
        this._attachFileUploadEvents();
    }

    componentWillUnmount() {
        this._detachFileUploadEvents();
        this._fileUploadControl.destroy();
    }

    _attachFileUploadEvents() {
        this._resolveFileUploadEvents()
            .forEach(([propName, eventName]) => {
                this._fileUploadControl.on(eventName, (evt, data) => {
                    this.props[propName](evt, data, this._fileId);
                })
            });
    }

    _detachFileUploadEvents() {
        this._resolveFileUploadEvents(([eventName, callback]) => this._fileUploadControl.removeAllListeners(eventName));
    }

    _resolveFileUploadEvents() {
        return filterPropEvents(FileUploadForm.propTypes, this.props)
            .map(propName => [propName, shortenEventHandlerName(propName)]);
    }

    render() {
        const { url, children, className, onClick, accept } = this.props;
        return (
            <form
                action={url}
                encType="multipart/form-data"
                method="POST"
                className={cx(styles.form, className)}
                onClick={evt => {
                    if (onClick) {
                        onClick();
                    }
                    evt.stopPropagation();
                }}>

                {children}
                <input type="hidden" value={this._fileId} name="fileId" />
                <FileUploadInput accept={accept} />
            </form>
        );
    }
}

FileUploadForm.propTypes = {
    accept: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    url: PropTypes.string.isRequired,
    fileUploadParams: PropTypes.object,
    onClick: PropTypes.func,

    onFileUploadProcessStart: PropTypes.func,
    onFileUploadAdd: PropTypes.func.isRequired,
    onFileUploadSubmit: PropTypes.func,
    onFileUploadDone: PropTypes.func,
    onFileUploadProgressAll: PropTypes.func,
    onFileUploadProgress: PropTypes.func,
    onFileUploadFail: PropTypes.func,
    onFileUploadProcessFail: PropTypes.func,
    onFileUploadAlways: PropTypes.func
};

export default FileUploadForm;
