addEventListener("load", function() {
    var mapLv0 = {
            // --- Level 0 ---
            "window.btoa": false,
            "window.atob": false,
            "Function.name": false,
            "window.__defineGetter__": false,
            "window.__defineSetter__": false,
            "Object.__defineGetter__": false,
            "Object.__defineSetter__": false
        },
        mapES5 = {
            // --- ES5 ---
            "Object.keys()": false,
            "Object.freeze()": false,
            "Object.defineProperty()": false,
            "Object.defineProperties()": false,
            "Array.isArray()": false,
            "Array#indexOf()": false,
            "Array#lastIndexOf()": false,
            "Array#forEach()": false,
            "Array#map()": false,
            "Array#some()": false,
            "Array#every()": false,
            "Array#filter()": false,
            "Array#reduce()": false,
            "Array#reduceRight()": false,
            "String#trim()": false,
            "Function#bind()": false,
            "Date.now()": false,
            "Date#toJSON()": false,
            "Date#toJSON() has Milliseconds": false,
            "parseInt('010') is 10": false,
            "parseInt('010', 8) is 8": false
        },
        mapES6 = {
            // --- ES6 ---
            "Array.of()": false,
            "Array.from()": false,
            "String#repeat()": false,
            "String#reverse()": false,
            "Number.isNaN()": false,
            "Number.isFinite()": false,
            "Number.isInteger()": false,
            "Number.toInteger()": false
        };

    mix(mapLv0, {
            // --- Level 0 ---
            "window.btoa": !!window.btoa,
            "window.atob": !!window.atob,
            "Function.name": (new (function hoge(){})).constructor.name === "hoge",
            "window.__defineGetter__": !!window.__defineGetter__,
            "window.__defineSetter__": !!window.__defineSetter__,
            "Object.__defineGetter__": !!Object.__defineGetter__,
            "Object.__defineSetter__": !!Object.__defineSetter__
        });
    mix(mapES5, {
            // --- ES5 ---
            "Object.keys()":            !!Object.keys,
            "Object.freeze()":          !!Object.freeze,
            "Object.defineProperty()":  !!Object.defineProperty,
            "Object.defineProperties()":!!Object.defineProperties,
            "Array.isArray()":          !!Array.isArray,
            "Array#indexOf()":          !![].indexOf,
            "Array#lastIndexOf()":      !![].lastIndexOf,
            "Array#forEach()":          !![].forEach,
            "Array#map()":              !![].map,
            "Array#some()":             !![].some,
            "Array#every()":            !![].every,
            "Array#filter()":           !![].filter,
            "Array#reduce()":           !![].reduce,
            "Array#reduceRight()":      !![].reduceRight,
            "String#trim()":            !!"".trim,
            "Function#bind()":          !!Function.prototype.bind,
            "Date.now()":               !!Date.now,
            "Date#toJSON()":            !!Date.prototype.toJSON,
            "Date#toJSON() has Milliseconds":
                                        Date.prototype.toJSON ? /\d{3}Z$/.test((new Date()).toJSON()) : false,
            "parseInt('010') is 10":    parseInt('010') === 10,
            "parseInt('010', 8) is 8":  parseInt('010', 8) === 8
        });
    mix(mapES6, {
            "Array.of()":               !!Array.of,
            "Array.from()":             !!Array.from,
            "String#repeat()":          !!"".repeat,
            "String#reverse()":         !!"".reverse,
            "Number.isNaN()":           !!Number.isNaN,
            "Number.isFinite()":        !!Number.isFinite,
            "Number.isInteger()":       !!Number.isInteger,
            "Number.toInteger()":       !!Number.toInteger
        });

    for (var id in mapLv0) {
        Test().add({ Category: "JavaScript", Class: "Lv0", id: id, state: mapLv0[id] });
    }
    for (var id in mapES5) {
        Test().add({ Category: "JavaScript", Class: "ES5", id: id, state: mapES5[id] });
    }
    for (var id in mapES6) {
        Test().add({ Category: "JavaScript", Class: "ES6", id: id, state: mapES6[id] });
    }
    View().update();

    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }
});


