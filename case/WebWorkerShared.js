
onconnect = function(event) {
    var port = event.ports[0];

    port.postMessage({
        "self.importScripts": !!self.importScripts,
        "self.self": !!self.self,
        "self.location": !!self.location,
        "self.close": !!self.close,
        "self.onmessage": !!self.onmessage,
        "self.postMessage": !!self.postMessage,
        "self.navigator": !!self.navigator,
        "self.navigator.userAgent": !!(self.navigator || 0).userAgent,
        "self.setTimeout": !!self.setTimeout,
        "self.setInterval": !!self.setInterval,
      //"self.requestAnimationFrame": !!self.requestAnimationFrame,
        "self.atob": !!self.atob,
        "self.btoa": !!self.btoa,
        "self.dump": !!self.dump, // Gecko
        "self.applicationCache": !!self.applicationCache,
        "self.onconnect": !!self.onconnect,
        "self.XMLHttpRequest": !!self.XMLHttpRequest,
        "self.Worker": !!self.Worker,
        "self.URL": !!self.URL,
        "self.FileReaderSync": !!self.FileReaderSync // Gecko
        "self.setContext": !!self.FileReaderSync // Gecko

    });
};
