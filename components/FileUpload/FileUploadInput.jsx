import { Component, PropTypes } from "react";
import styles from "./FileUpload.scss";

class FileUploadInput extends Component {
    static uid = 0;
    _uid = FileUploadInput.uid++;

    render() {
        const { accept } = this.props;

        return (
            <input
                type="file"
                title=" "
                accept={accept}
                name={`fileUploadInput_${this._uid}`}
                className={styles.fileInput} />
        );
    }
}

FileUploadInput.propTypes = {
    accept: PropTypes.string
};

FileUploadInput.defaultProps = {
    accept: ""
};


export default FileUploadInput;
