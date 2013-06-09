result.push({ Class: "PageVisibility", id: "PageVisibility",  state: PageVisibility(), spec: "http://www.w3.org/TR/page-visibility/" });

function PageVisibility() {
    if ("hidden" in document) {
        return true;
    }
    if ("webkitHidden" in document) {
        return "webkitHidden";
    }
    return false;
}

