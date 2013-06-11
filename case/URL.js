Test().add((function() {
    var state = false;
    if (window.URL) {
        state = true;
    } else if (window.webkitURL) {
        state = "webkitURL";
    }
    return {
        Class: "URL", id: "URL",
        state: state,
        spec: "https://gist.github.com/uupaa/4445734"
    };
})());

Test().add((function() {
    var url = window.URL || window.webkitURL || 0;

    return {
        Class: "URL", id: "URL.createObjectURL",
        state: !!(url.createObjectURL),
        spec: "https://gist.github.com/uupaa/4445734"
    };
})());

