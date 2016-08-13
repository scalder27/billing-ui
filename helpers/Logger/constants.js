export const Severity = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
    CRITICAL: 3
};

export const LogLevel = {
    DEBUG: "DEBUG",
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR",
    FATAL: "FATAL"
};

export const LogSeverity = {
    [LogLevel.DEBUG]: Severity.LOW,
    [LogLevel.INFO]: Severity.MEDIUM,
    [LogLevel.WARN]: Severity.HIGH,
    [LogLevel.ERROR]: Severity.CRITICAL,
    [LogLevel.FATAL]: Severity.CRITICAL
};
