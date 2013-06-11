Test().add([
    { Class: "XHR Lv2", id: "XMLHttpRequest responseType=arraybuffer",  state: XHRLv2("arraybuffer"),   spec: "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" },
    { Class: "XHR Lv2", id: "XMLHttpRequest responseType=blob",         state: XHRLv2("blob"),          spec: "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" },
    { Class: "XHR Lv2", id: "XMLHttpRequest responseType=document",     state: XHRLv2("document"),      spec: "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" },
    { Class: "XHR Lv2", id: "XMLHttpRequest responseType=text",         state: XHRLv2("text"),          spec: "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" },
    { Class: "XHR Lv2", id: "XMLHttpRequest responseType=json",         state: XHRLv2("json"),          spec: "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" }
]);


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

