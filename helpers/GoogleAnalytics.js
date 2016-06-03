const GaEventHelper = window.GaEventHelper || null;

class GoogleAnalytics {
    static triggerEventAsync(category, action, label) {
        GaEventHelper && GaEventHelper.publishEventAsync(category, action, label);
    }

    static customVar(name, value) {
        GaEventHelper && GaEventHelper.customVar(name, value);
    }
}

export default GoogleAnalytics;
