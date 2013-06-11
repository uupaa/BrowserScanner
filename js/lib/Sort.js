// Sort.js:

(function(global) {

// --- header ----------------------------------------------
function Sort() { }
Sort["natsort"] = natsort;

// --- library scope vars ----------------------------------

// --- implement -------------------------------------------
function natsort(ary,          // @arg StringArray: items. ["abc100", "abc1", "abc10"]
                 ignoreCase) { // @arg Boolean(= false): true is case-insensitive
                               // @ret StringArray: sorted items. ["abc1", "abc10", "abc100"]
    function num(s) {
        return isNaN(s) ? s.split("").map(function(v) { return v.charCodeAt(0); })
                        : [+s];
    }
    return ary.sort(function(a, b) {
        var aa = Array.prototype.concat.apply([],
                    (ignoreCase ? a.toLowerCase() : a).split(/(\d+)/).map(num));
        var bb = Array.prototype.concat.apply([],
                    (ignoreCase ? b.toLowerCase() : b).split(/(\d+)/).map(num));
        var x = 0, y = 0, i = 0, iz = aa.length;

        for (; i < iz; ++i) {
            x = aa[i] || 0;
            y = bb[i] || 0;
            if (x !== y) {
                return x - y;
            }
        }
        return a.length - b.length;
    });
}

// --- build -----------------------------------------------

// --- export ----------------------------------------------
if (typeof module !== "undefined") {
    module["exports"] = { "Sort": Sort };
} else {
    global["Sound"] || (global["Sound"] = {});
    global["Sound"]["Sort"] = Sort;
}

})(this["self"] || global);

