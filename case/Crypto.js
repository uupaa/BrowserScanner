addEventListener("load", function() {
    Test().spec("Crypto", "");

    var map = {
            "window.crypto": false,
            "window.crypto.getRandomValues": false
        };

    if (window.crypto) {
        mix(map, {
                "window.crypto": true,
                "window.crypto.getRandomValues": !!window.crypto.getRandomValues
            });
    }


    for (var id in map) {
        Test().add({ Category: "Crypto", Class: "Crypto", id: id, state: map[id] });
    }
    View().update();

    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }
});

