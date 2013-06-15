addEventListener("load", function() {
    Test().spec("SVG", "");

    var map = {
            "document.createElement('svg')": false
        };

    var div = document.createElement("div");
    div.innerHTML = "<svg></svg>";

    if (div.firstChild && "namespaceURI" in div.firstChild &&
        div.firstChild.namespaceURI === "http://www.w3.org/2000/svg") {

        mix(map, {
            "document.createElement('svg')": true
        });
    }

    for (var id in map) {
        Test().add({ Category: "SVG", Class: "SVG", id: id, state: map[id] });
    }
    View().update();

    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }
});

