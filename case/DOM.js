addEventListener("load", function() {
    Test().spec("History",
                "http://www.w3.org/TR/html5/browsers.html#the-history-interface");

    var map = {
            "document.head": false,
            "document.body.classList": false,
        },
        mapLocation = {
            "window.onhashchange": false
        },
        mapHistory = {
            "window.history": false,
            "window.history.pushState": false
        },
        mapPageVisibility = {
            "PageVisibility": false
        },
        mapSelector = {
            "document.getElementById": false,
            "document.getElementsByName": false,
            "document.getElementsByClassName": false,
            "document.querySelector": false,
            "document.querySelectorAll": false
        };

    mix(map, {
        "document.head":            !!document.head,
        "document.body.classList":  !!document.body.classList
    });
    mix(mapLocation, {
        "window.onhashchange":      "onhashchange" in window
    });
    if (window.history) {
        mix(mapHistory, {
            "window.history": true,
            "window.history.pushState": !!window.history.pushState
        });
    }
    if ("hidden" in document || "webkitHidden" in document) {
        mix(mapPageVisibility, {
            "PageVisibility": "hidden" in document ? true :
                              "webkitHidden" in document ? "webkitHidden" : false
        });
    }
    mix(mapSelector, {
        "document.getElementById":          !!document.getElementById,
        "document.getElementsByName":       !!document.getElementsByName,
        "document.getElementsByClassName":  !!document.getElementsByClassName,
        "document.querySelector":           !!document.querySelector,
        "document.querySelectorAll":        !!document.querySelectorAll
    });

    for (var id in map) {
        Test().add({ Category: "DOM", Class: "DOM", id: id, state: map[id] });
    }
    for (var id in mapLocation) {
        Test().add({ Category: "DOM", Class: "Location", id: id, state: mapLocation[id] });
    }
    for (var id in mapHistory) {
        Test().add({ Category: "DOM", Class: "History", id: id, state: mapHistory[id] });
    }
    for (var id in mapPageVisibility) {
        Test().add({ Category: "DOM", Class: "PageVisibility", id: id, state: mapPageVisibility[id] });
    }
    for (var id in mapSelector) {
        Test().add({ Category: "DOM", Class: "Selector", id: id, state: mapSelector[id] });
    }

    View().update();

    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }
});

