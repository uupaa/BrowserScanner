addEventListener("load", function() {
    Test().spec("WebRTC", "");

    var mapRTC = {
            "navigator.getUserMedia": false,
        };
    var mapP2P = {
            "RTCPeerConnection": false,
            "RTCDataChannel": false
        };

    if (window.navigator.getUserMedia || window.navigator.webkitGetUserMedia) {
        mix(mapRTC, {
                "navigator.getUserMedia": window.navigator.getUserMedia ? true : "webkitGetUserMedia"
            });
    }
    if (window.RTCPeerConnection || window.webkitRTCPeerConnection) {
        mix(mapP2P, {
                "RTCPeerConnection": window.RTCPeerConnection ? true : "webkitRTCPeerConnection"
            });
    }
    if (window.RTCDataChannel || window.webkitRTCDataChannel) {
        mix(mapP2P, {
                "RTCDataChannel": window.RTCDataChannel ? true : "webkitRTCDataChannel"
            });
    }

    for (var id in mapRTC) {
        Test().add({ Category: "WebRTC", Class: "WebRTC", id: id, state: mapRTC[id] });
    }
    for (var id in mapP2P) {
        Test().add({ Category: "WebRTC", Class: "P2P", id: id, state: mapP2P[id] });
    }
    View().update();

    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }
});

