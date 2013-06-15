addEventListener("load", function() {
    Test().spec("XMLHttpRequest",
                "http://www.w3.org/TR/XMLHttpRequest2/");

    var map = {
            "XMLHttpRequest":                           false,
            "XMLHttpRequest#overrideMimeType":          false,
            "XMLHttpRequest#onreadystatechange":        false,
            "XMLHttpRequest#abort":                     false,
            "XMLHttpRequest#readyState":                false,
            "XMLHttpRequest#responseType=arraybuffer":  false,
            "XMLHttpRequest#responseType=blob":         false,
            "XMLHttpRequest#responseType=document":     false,
            "XMLHttpRequest#responseType=text":         false,
            "XMLHttpRequest#responseType=json":         false,
            "XMLHttpRequest#response":                  false,
            "XMLHttpRequest#timeout":                   false,
            "XMLHttpRequest#onloadstart":               false,
            "XMLHttpRequest#onprogress":                false,
            "XMLHttpRequest#onloadend":                 false,
            "XMLHttpRequest#ontimeout":                 false,
            "XMLHttpRequest#onerror":                   false,
            "XMLHttpRequest#onload":                    false,
            "XMLHttpRequest#upload":                    false,
            "XMLHttpRequest#withCredentials":           false
        };

    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();

        mix(map, {
            "XMLHttpRequest":                           true,
            "XMLHttpRequest#overrideMimeType":          !!xhr.overrideMimeType,
            "XMLHttpRequest#onreadystatechange":        "onreadystatechange" in xhr,
            "XMLHttpRequest#abort":                     !!xhr.abort,
            "XMLHttpRequest#readyState":                "readyState" in xhr,
            "XMLHttpRequest#responseType=arraybuffer":  XHRLv2("arraybuffer"),
            "XMLHttpRequest#responseType=blob":         XHRLv2("blob"),
            "XMLHttpRequest#responseType=document":     XHRLv2("document"),
            "XMLHttpRequest#responseType=text":         XHRLv2("text"),
            "XMLHttpRequest#responseType=json":         XHRLv2("json"),
            "XMLHttpRequest#response":                  "response" in xhr,
            "XMLHttpRequest#timeout":                   "timeout" in xhr,
            "XMLHttpRequest#onloadstart":               "onloadstart" in xhr,
            "XMLHttpRequest#onprogress":                "onprogress" in xhr,
            "XMLHttpRequest#onloadend":                 "loadend" in xhr,
            "XMLHttpRequest#ontimeout":                 "ontimeout" in xhr,
            "XMLHttpRequest#onerror":                   "onerror" in xhr,
            "XMLHttpRequest#onload":                    "onload" in xhr,
            "XMLHttpRequest#upload":                    "upload" in xhr,
            "XMLHttpRequest#withCredentials":           "withCredentials" in xhr
        });
    }
    for (var id in map) {
        Test().add({ Category: "Network", Class: "XMLHttpRequest", id: id, state: map[id] });
    }
    View().update();

    function XHRLv2(responseType) {
        var url = location.href;
        var async = true;
        try {
            var xhr = new XMLHttpRequest();
            try {
                xhr.responseType = responseType;
            } catch(o_O) {
                return false;
            }
            xhr.open("GET", url, async);
            xhr.send();
        } catch(o_o) {
            alert(err+"");
            return false;
        }
        return true;
    }
    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }
});

