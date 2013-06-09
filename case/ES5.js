result.push({ Class: "ES5",     id: "Object.keys()",      state: !!Object.keys,   spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Object.freeze()",    state: !!Object.freeze, spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Object.defineProperty()", state: !!Object.defineProperty,      spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Object.defineProperties()", state: !!Object.defineProperties,      spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Array.isArray()",    state: !!Array.isArray, spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Array#indexOf()",    state: !![].indexOf,    spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Array#lastIndexOf()",state: !![].lastIndexOf,spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Array#forEach()",    state: !![].forEach,    spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Array#map()",        state: !![].map,        spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Array#some()",       state: !![].some,       spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Array#every()",      state: !![].every,      spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Array#filter()",     state: !![].filter,     spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Array#reduce()",     state: !![].reduce,     spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Array#reduceRight()",state: !![].reduceRight,spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "String#trim()",      state: !!"".trim,       spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Function#bind()",    state: !!Function.prototype.bind, spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Date.now()",         state: !!Date.now,      spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Date#toJSON()",      state: !!Date.prototype.toJSON, spec: "https://gist.github.com/uupaa/4445734" });
result.push({ Class: "ES5",     id: "Date#toJSON() has Milliseconds",
                                                        state: Date.prototype.toJSON ? /\d{3}Z$/.test((new Date()).toJSON()) : false,
                                                        spec: "https://gist.github.com/uupaa/4445734" });
