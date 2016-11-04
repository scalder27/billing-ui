import { LogLevel } from "./constants";

import { createLog } from "./utils";
import ServerTransport from "./Transports/ServerTransport";

export const createDefaultOptions = () => ({
    transports: [
        new ServerTransport()
    ]
});

export class Logger {
    constructor(options = createDefaultOptions()) {
        this._transports = options.transports || [];
    }

    _process(logLevel, params) {
        const log = createLog(logLevel, params);
        for (const transport of this._transports) {
            transport.push(log);
        }
    }

    log(...params) {
        const [ firstParam, ...restParams ] = params;
        const isFirstParamLogLevel = firstParam && LogLevel[firstParam] !== undefined;
        const logLevel = isFirstParamLogLevel ? firstParam : LogLevel.INFO;
        const paramsToLog = isFirstParamLogLevel ? restParams : params;

        this._process(logLevel, paramsToLog);
    }

    debug(...params) {
        this._process(LogLevel.DEBUG, params);
    }

    info(...params) {
        this._process(LogLevel.INFO, params);
    }

    warn(...params) {
        this._process(LogLevel.WARN, params);
    }

    error(...params) {
        this._process(LogLevel.ERROR, params);
    }

    fatal(...params) {
        this._process(LogLevel.FATAL, params);
    }

    destroy() {
        for (const transport of this._transports) {
            transport.destroy();
        }

        this._transports = [];
    }
}

export default new Logger();
