import events from "add-event-listener";
import { throttle } from "underscore";

export const checkClipboard = () => {
    return new Promise((resolve, reject) => {
        const copyToClipboardAvailableCheck = throttle(() => {
            events.removeEventListener(window, "mousemove", copyToClipboardAvailableCheck);
            if (document.queryCommandSupported("copy")) {
                resolve();
            } else {
                reject();
            }
        }, 100);
        events.addEventListener(window, "mousemove", copyToClipboardAvailableCheck);
    });
};
