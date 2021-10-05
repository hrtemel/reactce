var messages = { "en": {} };
var currentLocale = "en";
export function l(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var str = undefined;
    if (typeof (strings) === "string") {
        str = messages[currentLocale][strings] || strings;
    }
    else {
        var key = strings.slice(0, -1).reduceRight(function (memo, curr, i) { return curr + "{" + i + "}" + memo; }, strings[strings.length - 1]);
        str = messages[currentLocale][key] || key;
    }
    if (values && values.length)
        return str.replace(/{(\d)}/g, function (_, index) { return values[Number(index)]; });
    else
        return str;
}
;
export function addLocale(lang, mx) {
    messages[lang] = mx;
}
export function getLocale(lang) {
    return messages[lang];
}
export function useLocale(lang, warn) {
    warn && console.warn("using locale", lang);
    if (messages[lang])
        currentLocale = lang;
    else
        console.warn("no locale found " + lang);
}
export function getCurrentLocale() {
    return currentLocale;
}
export default l;
