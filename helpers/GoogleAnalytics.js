const GaEventHelper = window.GaEventHelper || null;

class GoogleAnalytics {
    static triggerEventAsync(category, action, label) {
        GaEventHelper && GaEventHelper.publishEventAsync(category, action, label);
    }
}

export default GoogleAnalytics;
