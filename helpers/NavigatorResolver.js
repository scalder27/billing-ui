const NavigatorResolver = {
    isIE7: function() {
        return document.all !== undefined && document.querySelector === undefined;
    },
    isIE8: function() {
        return document.all !== undefined && document.addEventListener === undefined;
    },
    isWinXP: navigator.userAgent.toLowerCase().indexOf("windows nt 5.1") > 0,
    isWin10: navigator.userAgent.toLowerCase().indexOf("windows nt 10.0") > 0,
    isEdge: navigator.appVersion.indexOf("Edge") > 0,
    isIE11: navigator.appVersion.indexOf("rv:11.0") > 0,
    isIE10: navigator.appVersion.indexOf("MSIE 10.") !== -1,
    isIE: $("html").hasClass("ie"),
    isIELt9: $("html").hasClass("ie-lt9"),
    isIELt8: $("html").hasClass("ie-lt8")
};

export default NavigatorResolver;
