const GaEventHelper = window.GaEventHelper || null;

class GoogleAnalytics {
    triggerEventAsync(category, action, label) {
        GaEventHelper && GaEventHelper.publishEventAsync(category, action, label);
    }
}
