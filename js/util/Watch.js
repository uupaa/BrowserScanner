// Watch.js:
(function(global) {

var fs     = require("fs");
var Sort   = require("../lib/Sort").Sort;

// --- header ----------------------------------------------
function Watch() { }
Watch.scan = scan;              // scan(dir:String):Object
Watch.dir  = dir;               // dir(dir:String, fn:Function):void

// --- library scope vars ----------------------------------
// console color
var _RED    = "\u001b[31m",
    _YELLOW = "\u001b[33m",
    _CLR    = "\u001b[0m",
    _IGNORE_DIR = ".ignoredir";

// --- implement -------------------------------------------
function isDir(path) { // @arg String
                       // @ret Boolean:
    return fs.existsSync(path) && fs.statSync(path).isDirectory();
}

function isFile(path) { // @arg String
                        // @ret Boolean:
    return fs.existsSync(path) && fs.statSync(path).isFile();
}

function scan(root) { // @arg String: scan root dir
                      // @ret Object: { dirs: {}, files: {} }
                      //     dirs - Object: { dir:Boolean, size:Intger, mtime:Integre }
                      //     files - Object: { dir:Boolean, size:Intger, mtime:Integre }
    var rv = { dirs: {}, files: {} };
    var stat = fs.statSync(root);

    if ( stat.isDirectory() ) {
        if (isFile(root + _IGNORE_DIR)) {
            ; // ignore dir
        } else {
            rv.dirs[root] = { dir: true, size: stat.size, mtime: +stat.mtime };
            _readDir(root);
        }
    }
    return rv;

    function _readDir(dir) {
        var fileList = fs.readdirSync(dir);

        Sort.natsort(fileList).forEach(function(fname) {
            var path = dir + fname;
            var stat = fs.statSync(path);

            if ( stat.isFile() ) {
                rv.files[path] = { dir: false, size: stat.size, mtime: +stat.mtime };
            } else if ( stat.isDirectory() ) {
                path += "/";
                if (isFile(path + _IGNORE_DIR)) {
                    ; // ignore dir
                } else {
                    rv.dirs[path] = { dir: true, size: stat.size, mtime: +stat.mtime };
                    _readDir(path);
                }
            }
        });
    }
}

function dir(root, // @arg String: watch root dir
             fn) { // @arg Function: fn(changed:Object)
                   //      changed - Object: { path: { dir, size, mtime }, ... }

    var timer = 0;
    var old = scan(root); // { dirs, files }

    for (var path in old.dirs) {
        console.log("    dir     " + path);
        fs.watch(path, _watchdog);
    }

    function _watchdog() {
        if (timer) {
            clearTimeout(timer);
            timer = 0;
        }
        timer = setTimeout(function() {
            var current = scan(root);     // { dirs, files }
            var obj = diff(current, old); // { path: { dir, size, mtime }, ... }

            old = current;

            clearTimeout(timer);
            timer = 0;

            fn(obj);
        }, 1000);
    }
}

function diff(current, // @arg Object: { dirs, files }
              old) {   // @arg Object: { dirs, files }
                       // @ret Object: { path: { dir, size, mtime }, ... }
    var rv = {};

    for (var path in current.files) {
        if ( !_eq( path, current.files[path], old.files[path] ) ) {
            rv[path] = current.files[path];
        }
    }
    return rv;

    function _eq(path, a, b) {
        if (a && b) {
            if (a.dir === b.dir) {
                if (a.size === b.size) {
                    if (a.mtime === b.mtime) {
                        return true;
                    }
                }
            }
            console.log("    " + _YELLOW + "changed " + _CLR + path);
        }
        return false;
    }
}

// --- build -----------------------------------------------

// --- export ----------------------------------------------
if (typeof module !== "undefined") {
    module["exports"] = { "Watch": Watch };
} else {
    global["Watch"] = Watch;
}

})(this.self || global);

