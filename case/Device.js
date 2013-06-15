addEventListener("load", function() {
    Test().spec("DeviceOrientation",
                "http://dev.w3.org/geo/api/spec-source-orientation.html");
    Test().spec("Geolocation",
                "http://www.w3.org/TR/geolocation-API/");
 
    var mapOrientation = {
            "window.addEventListener('devicemotion')": false
        },
        mapGeolocation = {
            "navigator.geolocation": false,
            "navigator.geolocation.getCurrentPosition": false,
            "navigator.geolocation.watchPosition": false,
            "navigator.geolocation.clearWatch": false
        };

    mix(mapOrientation, {
            "window.addEventListener('devicemotion')": !!window.DeviceOrientationEvent
        });
    if (navigator.geolocation) {
        var geolocation = navigator.geolocation;
        mix(mapGeolocation, {
                "navigator.geolocation": true,
                "navigator.geolocation.getCurrentPosition": !!geolocation.getCurrentPosition,
                "navigator.geolocation.watchPosition": !!geolocation.watchPosition,
                "navigator.geolocation.clearWatch": !!geolocation.clearWatch
            });
    }

    for (var id in mapOrientation) {
        Test().add({ Category: "Device", Class: "DeviceOrientation", id: id, state: mapOrientation[id] });
    }
    for (var id in mapGeolocation) {
        Test().add({ Category: "Device", Class: "Geolocation", id: id, state: mapGeolocation[id] });
    }
    View().update();

    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }
});
