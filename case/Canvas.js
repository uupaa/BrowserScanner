result.push({
    Class: "URL", id: "window.URL",
    state: !!(window.URL || window.webkitURL),
    spec: "https://gist.github.com/uupaa/4445734"
});
result.push((function() {
    var url = window.URL || window.webkitURL;

    return {
        Class: "URL", id: "window.URL.createObjectURL",
        state: !!(url.createObjectURL),
        spec: "https://gist.github.com/uupaa/4445734"
    };
})());

