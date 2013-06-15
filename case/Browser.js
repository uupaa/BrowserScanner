addEventListener("load", function() {
    Test().spec("Browser ID", "");

    var map = {
            "Chrome (window.chrome)":       !!window.chrome,
            "Opera (window.opera)":         !!window.opera,
//          "Firefox (window.watch)":       !!window.watch,
            "Firefox (window.netscape)":    !!window.netscape
        };

    for (var id in map) {
        Test().add({ Category: "CrossBrowser", Class: "Browser ID", id: id, state: map[id] });
    }
    View().update();
});

