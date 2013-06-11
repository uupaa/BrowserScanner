// Misc.js:
(function(global) {

// console color
var RED    = '\u001b[31m';
var YELLOW = '\u001b[33m';
var CLR    = '\u001b[0m';

var fs = require("fs");
var process = require("child_process");
var readline = require("readline");
var Sort = require("../lib/Sort").Sort;

// --- header ----------------------------------------------
function Misc() { }
Misc.name = "Misc";
Misc.align = {
    // --- align/padding ---
    pad:            align_pad,      // align.pad(str:String, cols:Integer, alignRight:Boolean = false):String
    unit:           align_unit,     // align.unit(value:Number, cols:Integer = 7, fixed:Integer = 1):String
    percent:        align_percent   // align.percent(numerator:Number, denominator:Number, nowrap:Boolean = false):String
};
Misc.fs = {
    // --- file system ---
    isDir:          fs_isDir,       // fs.isDir(path):Boolean
    isFile:         fs_isFile,      // fs.isFile(path):Boolean
    dirs:           fs_dirs,        // fs.dirs(baseDir:String, depthLimit:Integer = 1):StringArray
    files:          fs_files,       // fs.files(baseDir:String, depthLimit:Integer = 1):StringArray
    find:           fs_find,        // fs.find(dir:String, filters:Function/FunctionArray = []):StringArray
    find2nd:        fs_find2nd,     // fs.find2nd(dir):StringArray
    findFile:       fs_findFile,    // fs.findFile(dir:String, fileExt:String):String
    findFileAll:    fs_findFileAll, // fs.findFileAll(dir:String, fileExt:String):StringArray
    findExtAll:     fs_findExtAll,  // fs.findExtAll(dir:String, ext:String):StringArray
    dirSlash:       fs_dirSlash,    // fs.dirSlash(dir:String):String
    concatFiles:    fs_concatFiles, // fs.concatFiles(FilePathArray):String
    splitFileName:  fs_splitFileName,// fs.splitFileName(path:String):Object - { file, ext, fileExt }
    filter: {
        dir:        filter_dir,     // fs.filter.dir
        file:       filter_file,    // fs.filter.file
        ignore:     filter_ignore   // fs.filter.ignore
    }
};
Misc.json = {
    // --- JSON ---
    validate:       json_validate   // json.validate(jsonString:JSONString/JavaScriptExpressionString):Object/Error
};
Misc.command = {
    // --- process ---
    exec:           command_exec    // command.exec(cmd:String, fn:Function = null):void
};
Misc.line = {
    // --- command line ---
    prompt:         line_prompt     // line.prompt(msg:String, fn:Function):void
};

// --- library scope vars ----------------------------------

// --- implement -------------------------------------------
function filter_dir(param) {
    return !param.isDir;
}
function filter_file(param) {
    return !param.isFile;
}
function filter_ignore(param) {
    if (param.fileExt[0] === "." ||
        param.fileExt === "Thumbs.db") {
        return false;
    }
    if (fs_isFile(param.path + "/.ignoredir")) {
        //console.log("  ignore dir: " + YELLOW + param.path + "/" + CLR);
        return false;
    }
    return true;
}

function fs_concatFiles(files) { // @arg FilePathArray:
                                 // @ret String:
    return files.map(function(path) {
        if (fs.existsSync(path)) {
            return fs.readFileSync(path, "UTF-8");
        }
        console.log(path + " is not exists");
        return "";
    }).join("");
}

function align_pad(str,          // @arg String:
                   cols,         // @arg Integer: columns
                   alignRight) { // @arg Boolean(= false):
                                 // @ret String:
    if (alignRight) {
        return ("                                                " + str).slice(-cols);
    }
    var rv = (str + "                                                ").slice(0, cols);

    if (rv.length < str.length) {
        return rv.slice(0, rv.length - 3) + "...";
    }
    return rv;
}

function align_unit(value,   // @arg Number:
                    cols,    // @arg Integer(= 7): columns
                    fixed) { // @arg Integer(= 2): toFixed(...)
                             // @ret String:
                             // @desc: Number unit
    cols  = cols  || 7;
    fixed = fixed || 2;
    var negate = value < 0 ? true : false;
    var abs = Math.abs(value);

    if (abs < 1024) {
        return ("     " + (value | 0)).slice(-cols) + " B";
    }
    if (abs < 1024 * 1024) {
        return ("     " + (value / 1024).toFixed(fixed)).slice(-cols) + " K";
    }
    return     ("     " + (value / (1024 * 1024)).toFixed(fixed)).slice(-cols) + " M";
}

function align_percent(numerator,   // @arg Number:
                       denominator, // @arg Number:
                       nowrap) {    // @arg Boolean(= false):
    var rv = ("   " + ((numerator / denominator) * 100).toFixed(1)).slice(-6);

    return nowrap ? rv
                  : " (" + rv + " %)";
}

function fs_isDir(path) { // @arg String
                          // @ret Boolean:
    return fs.existsSync(path) && fs.statSync(path).isDirectory();
}

function fs_isFile(path) { // @arg String
                           // @ret Boolean:
    return fs.existsSync(path) && fs.statSync(path).isFile();
}

function fs_splitFileName(path) { // @arg String
                                  // @ret Object - { file, ext, fileExt }
                                  //     file - String: file name
                                  //     ext - String: file extension. without dot
                                  //     fileExt - String: file.ext
    var fileExt = path.split("/").pop();
    var ary  = fileExt.split(".");
    var file = ary.shift();
    var ext  = ary.pop();

    return { file: file, ext: ext, fileExt: fileExt };
}

function fs_dirs(dir,          // @arg String: dir
                 depthLimit) { // @arg Integer(= 1): depth limit
                               // @ret: StringArray
    function depth(param) {
        return param.depth < depthLimit;
    }
    depthLimit = depthLimit || 1;
    return fs_find(dir, [filter_ignore, filter_file, depth]);
}
function fs_files(dir,          // @arg String: dir
                  depthLimit) { // @arg Integer(= 1): depth limit
                                // @ret: StringArray
    function depth(param) {
        return param.depth < depthLimit;
    }
    depthLimit = depthLimit || 1;
    return fs_find(dir, [filter_ignore, filter_dir, depth]);
}

function fs_find(dir,       // @arg String(= "./"):
                 filters) { // @arg Function/FunctionArray(= []): filter functions. fn(param):Boolean/null. null is break
                            //     param.isDir  - Boolean:
                            //     param.isFile - Boolean:
                            //     paran.depth  - Interger: depth
                            //     param.dir    - String: dir path. with out last slash
                            //     param.fileExt - String: file.ext
                            //     param.file    - String: file
                            //     param.ext     - String: ext
                            // @ret StringArray: file path. [path, ...]
    dir = dir || "./";
    if (!filters) {
        filters = [];
    } else if (typeof filters === "function") {
        filters = [filters];
    }

    var rv = [];
    var finished = false;

    if (!fs_isDir(dir)) { return rv; }
    _find(dir, 0);
    return rv;

    function _find(dir, depth) {
        if (finished) { return; }
        var fileList = fs.readdirSync(dir);

        Sort.natsort(fileList).forEach(function(fileExt) {
            if (finished) { return; }
            var path = dir + fileExt;
            var stat = fs.statSync(path);
            var split = fs_splitFileName(path);
            var param = {
                    isDir:  stat.isDirectory(),
                    isFile: stat.isFile(),
                    path:   path,
                    dir:    dir,
                    fileExt:fileExt,
                    file:   split.file,
                    ext:    split.ext,
                    depth:  depth
                };

            var result = null, i = 0, iz = filters.length;

            for (; i < iz; ++i) {
                result = filters[i](param);
                if (!result) {
                    break;
                }
            }
            switch (result) {
            case true:  param.isDir ? rv.push(path + "/")
                                    : rv.push(path);
            case false: param.isDir && _find(path + "/", ++depth); break;
            case null:  finished = true;
            }
        });
    }
}

// baseDir 以下を走査し baseDir の次のディレクトリのファイルの一覧を生成する
function fs_find2nd(baseDir) { // @ret StringArray: file path. [path, ...]
    var dirs = fs_dirs(baseDir, 999);
    var ary = Array.prototype.concat.apply([], dirs.map(function(dir) {
        return fs_files(dir);
    }));
    var dirLength = baseDir.length;

    return ary.map(function(path) {
        //       "~/dir/asset/image/..." -> "asset/image/..."
        // slice  ^^^^^^
        return path.slice(dirLength);
    });
}

function fs_findFile(dir,       // @arg String:
                     fileExt) { // @arg String: find target
                                // @ret String: path
    var rv = "";
    Misc.fs.find(dir, [Misc.fs.filter.ignore,
                       Misc.fs.filter.dir,
                       function(param) {
                            if (param.fileExt === fileExt) {
                                rv = param.path;
                                return null;
                            }
                            return false;
                       }]);
    return rv;
}

function fs_findFileAll(dir,       // @arg String:
                        fileExt) { // @arg String: find target
                                   // @ret StringArray: [path, ...]
    return Misc.fs.find(dir, [Misc.fs.filter.ignore,
                              Misc.fs.filter.dir,
                               function(param) {
                                    if (param.fileExt === fileExt) {
                                        return true;
                                    }
                                    return false;
                               }]);
}

function fs_findExtAll(dir,   // @arg String:
                       ext) { // @arg String: find ext. "wav"
                              // @ret StringArray: [path, ...]
    return Misc.fs.find(dir, [Misc.fs.filter.ignore,
                              Misc.fs.filter.dir,
                               function(param) {
                                    if (param.ext === ext) {
                                        return true;
                                    }
                                    return false;
                               }]);
}

// 文字列をJSONとして評価する、JSON.parseでエラーになる場合は、jsとしてevalする
function json_validate(jsonString) { // @arg JSONString/JavaScriptExpressionString:
                                     // @ret Object/Error:
    var rv = null;

    try {
        rv = JSON.parse( jsonString );
        return rv;
    } catch (o_o) {
        ;
    }
    // try eval(jsonString)
    try {
        rv = eval("(" + jsonString + ")");
    } catch (o_O) {
        return o_O;
    }
    return rv; // repaired
}

function fs_dirSlash(dir) { // @arg String: "./dir"
                            // @ret String: "./dir/"
                            // @desc: supply directory tail slash (/)
    dir = dir.replace(/\/+$/, "");
    dir += "/";
    return dir;
}

function command_exec(cmd,  // @arg String:
                      fn) { // @arg Function(= null):
    console.log(cmd);
    process.exec(cmd, function(err, stdout, stderr) {
      //console.log('stdout: ' + stdout);
      //console.log('stderr: ' + stderr);
      //err && console.log('exec error: ' + err);
        fn && fn(err);
    });
}

function line_prompt(msg,  // @arg String:
                     fn) { // @arg Function: fn(yes:Boolean)
                           // @desc: yes no prompt
    _prompt(msg + " (y/n) ", "y", function(answer) {
        answer ? fn(true) : fn(false);
    });

    function _prompt(msg, yes, fn) {
         var rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
         rl.question(msg, function(answer) {
            rl.close();
            if (answer.toLowerCase() === yes) {
                fn(true);
            } else {
                fn(false);
            }
        });
    }
}
// --- build -----------------------------------------------

// --- export ----------------------------------------------
if (typeof module !== "undefined") {
    module["exports"] = { "Misc": Misc };
} else {
    global["Misc"] = Misc;
}

})(this.self || global);

