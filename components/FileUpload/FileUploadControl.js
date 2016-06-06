import EventEmitter from "eventemitter3";
import $ from "jquery";

const defaultFileUploadSettings = {
    pasteZone: null,
    dropZone: null,
    messages: {
        acceptFileTypes: "Загружаемый файл недопустимого типа",
        maxFileSize: "Файл слишком большой",
        maxNumberOfFiles: "Недопустимое количество файлов",
        minFileSize: "Файл слишком маленький",
        uploadedBytes: "Количество загруженных байтов превышает размер файла"
    }
};

class FileUploadControl extends EventEmitter {
    constructor(formNode, params = { }) {
        super();

        this._$form = $(formNode).fileupload({ ...defaultFileUploadSettings, ...params });
        this._attachEvents();
    }

    _attachEvents() {
        this._$form.on({
            fileuploadprocesstart: (evt, data) => this.emit("fileUploadProcessStart", evt, data),
            fileuploadadd: (evt, data) => this.emit("fileUploadAdd", evt, data),
            fileuploadsubmit: (evt, data) => this.emit("fileUploadSubmit", evt, data),
            fileuploaddone: (evt, data) => this.emit("fileUploadDone", evt, data),
            fileuploadprogressall: (evt, data) => this.emit("fileUploadProgressAll", evt, data),
            fileuploadprogress: (evt, data) => this.emit("fileUploadProgress", evt, data),
            fileuploadfail: (evt, data) => this.emit("fileUploadFail", evt, data),
            fileuploadprocessfail: (evt, data) => this.emit("fileUploadProcessFail", evt, data),
            fileuploadalways: (evt, data) => this.emit("fileUploadAlways", evt, data)
        });
    }

    destroy() {
        this._$form.fileupload("destroy");
    }
}

export default FileUploadControl;
