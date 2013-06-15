addEventListener("load", function() {
    Test().spec("WebWorker",
                "http://www.w3.org/TR/workers/");
    Test().spec("SharedWorker",
                "http://www.w3.org/TR/workers/");

    var mapWebWorker = {
            "window.Worker": false,
            "WebWorkers#postMessage": false,
            "WebWorkers#terminate": false,
            "onerror": false,
            "ononline": false,
            "onoffline": false
        };
    var mapWebWorkerObject = {
            "self.importScripts": false,
            "self.self": false,
            "self.location": false,
            "self.close": false,
            "self.onmessage": false,
            "self.postMessage": false,
            "self.navigator": false,
            "self.navigator.userAgent": false,
            "self.setTimeout": false,
            "self.setInterval": false,
          //"self.requestAnimationFrame": false,
            "self.atob": false,
            "self.btoa": false,
            "self.dump": false, // Gecko
            "self.XMLHttpRequest": false,
            "self.Worker": false,
            "self.URL": false,
            "self.FileReaderSync": false // Gecko
        };
    var mapSharedWorker = {
            "window.SharedWorker": false,
            "SharedWorker#start": false,
            "SharedWorker#close": false,
            "onerror": false,
            "ononline": false,
            "onoffline": false
        };
    var mapSharedWorkerObject = {
            "self.importScripts": false,
            "self.self": false,
            "self.location": false,
            "self.close": false,
            "self.onmessage": false,
            "self.postMessage": false,
            "self.navigator": false,
            "self.navigator.userAgent": false,
            "self.setTimeout": false,
            "self.setInterval": false,
          //"self.requestAnimationFrame": false,
            "self.atob": false,
            "self.btoa": false,
            "self.dump": false, // Gecko
            "self.applicationCache": false,
            "self.onconnect": false,
            "self.XMLHttpRequest": false,
            "self.Worker": false,
            "self.URL": false,
            "self.FileReaderSync": false // Gecko
        };

    if (window.Worker) {
        var worker = new Worker("case/WebWorkerWorker.js");
        var shared = new SharedWorker("case/WebWorkerShared.js");

        mix(mapWebWorker,{
            "window.Worker": !!window.Worker,
            "WebWorkers#postMessage": !!worker.postMessage,
            "WebWorkers#terminate": !!worker.terminate,
            "onerror": !!worker.onerror,
            "ononline": !!worker.ononline,
            "onoffline": !!worker.onoffline
        });
        mix(mapSharedWorker, {
            "window.SharedWorker": !!window.SharedWorker,
            "SharedWorker#start": !!shared.port.start,
            "SharedWorker#close": !!shared.port.close,
            "onerror": !!shared.port.onerror,
            "ononline": !!shared.port.ononline,
            "onoffline": !!shared.port.onoffline
        });

        // --------
        worker.onmessage = function(event) {
            for (var id in mapWebWorker) {
                Test().add({ Category: "WebWorkers", Class: "WebWorker", id: id, state: mapWebWorker[id] });
            }
            mix(mapWebWorkerObject, event.data);
            for (var id in mapWebWorkerObject) {
                Test().add({ Category: "WebWorkers", Class: "WebWorker", id: id, state: mapWebWorkerObject[id] });
            }
            View().update();
        };
        worker.postMessage();

        // ---------
        shared.port.onerror = function(event) {
            consloe.log("ERROR: Line ", event.lineno, " in ", event.filename, ": ", event.message);
        };
        shared.port.addEventListener("message", function(event) {
            for (var id in mapSharedWorker) {
                Test().add({ Category: "WebWorkers", Class: "SharedWorker", id: id, state: mapSharedWorker[id] });
            }
            mix(mapSharedWorkerObject, event.data);
            for (var id in mapSharedWorkerObject) {
                Test().add({ Category: "WebWorkers", Class: "SharedWorker", id: id, state: mapSharedWorkerObject[id] });
            }
            View().update();
        });
        shared.port.start();
        shared.port.postMessage();
    }

    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }
});

