addEventListener("load", function() {
    Test().spec("File", "");

    var mapURL = {
            "window.URL": false,
            "URL.createObjectURL": false
        };

    if (window.URL || window.webkitURL) {
        var url = window.URL || window.webkitURL;
        mix(mapURL, {
            "window.URL": true,
            "URL.createObjectURL": !!url.createObjectURL
        });
    }

    for (var id in mapURL) {
        Test().add({ Category: "File", Class: "URL", id: id, state: mapURL[id] });
    }
    View().update();

    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }
});
