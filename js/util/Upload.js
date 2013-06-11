// Upload.js:

(function(global) {

var fs = require("fs");
var ftp = require("ftp"); // $ npm install ftp
var Flow = require("../lib/Flow.js").Flow;
var Misc = require("./Misc.js").Misc;

// --- header ----------------------------------------------
function Upload() {
    this._manifest = {};
    this._options = {};
}
Upload.prototype.setup = setup;
Upload.prototype.upload = upload;

// --- library scope vars ----------------------------------
var RED    = '\u001b[31m';
var YELLOW = '\u001b[33m';
var CLR    = '\u001b[0m';

// --- implement -------------------------------------------
function setup(manifest,  // @arg Object: { connect, upload }
               options) { // @arg Object(= {}): { verbose }
    this._manifest = manifest;
    this._options = options || {};
}

function upload(fn) { // @arg Function(= null): fn(err)
    var verbose = this._options.verbose || false;
    var manifest = this._manifest;
    var client = new ftp();

    client.on("ready", function(err) {
        var flow = new Flow(Object.keys(manifest.upload).length, function(err, args) {
            fn && fn(err);
        })
        for (var from in manifest.upload) {
            var to = manifest.upload[from];

            if (Misc.fs.isDir(from)) {
                var fromDir = from;
                var toDir = to;
                var fromFiles = Misc.fs.files(fromDir);

                flow.extend(fromFiles.length - 1);
                fromFiles.forEach(function(fromFile) {
                    var to = toDir + Misc.fs.splitFileName(fromFile).fileExt;

                    _upload(client, fromFile, to, function(err, from, to) {
                        if (verbose) {
                            err ? console.log(RED +    "  err    " + CLR + from + " -> " + to)
                                : console.log(YELLOW + "  upload " + CLR + from + " -> " + to);
                        }
                        err ? flow.miss()
                            : flow.pass(from);
                    });
                });
            } else {
                _upload(client, from, to, function(err, from, to) {
                    if (verbose) {
                        err ? console.log(RED +    "  err    " + CLR + from + " -> " + to)
                            : console.log(YELLOW + "  upload " + CLR + from + " -> " + to);
                    }
                    err ? flow.miss()
                        : flow.pass(from);
                });
            }
        }
        client.end();
    });

    client.connect(manifest.connect);

    function _upload(client, from, to, fn) {
        client.put(from, to, function(err) {
            fn(err, from, to);
        });
    }
}

// --- build -----------------------------------------------

// --- export ----------------------------------------------
if (typeof module !== "undefined") {
    module["exports"] = { "Upload": Upload };
} else {
    global["Upload"] = Upload;
}

})(this["self"] || global);

