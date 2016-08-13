import axios from "./../../../libs/axios";
import events from "add-event-listener";
import throttle from "lodash/throttle";

const defaultConfig = {
    url: "/jsError/log",
    batchSize: 50,
    logInterval: 60 * 1000
};

class ServerTransport {
    constructor(options = {}) {
        this._config = { ...defaultConfig, ...options };

        this._logsInQueue = [];
        this._isSending = false;
        this._wasDisabled = false;

        this._debouncedSendLogs = throttle(this._sendLogs, this._config.logInterval, { leading: false });
        this._attachEvents();
    }

    _attachEvents() {
        events.addEventListener(window, "beforeunload", this._sendLogs);
    }

    _detachEvents() {
        events.removeEventListener(window, "beforeunload", this._sendLogs);
    }

    _sendLogs = () => {
        if (this._wasDisabled || this._isSending || this._logsInQueue.length === 0) {
            return;
        }

        const logs = this._logsInQueue.splice(0, this._config.batchSize);
        this._isSending = true;

        axios
            .post(this._config.url, { logs })
            .then(() => {
                this._isSending = false;
                this._debouncedSendLogs();
            })
            .catch(() => {
                this._isSending = false;
                this._wasDisabled = true;
            });
    };

    push(log) {
        if (!this._wasDisabled) {
            this._logsInQueue.push(log);
            this._debouncedSendLogs();
        }
    }

    destroy() {
        this._detachEvents();
        this._logsInQueue = [];
        this._wasDisabled = true;
    }
}

export default ServerTransport;
