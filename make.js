// make.js:

var help = "                                                    \n\
---------------------------                                     \n\
Usage:                                                          \n\
    node make.js [options]                                      \n\
                                                                \n\
Options:                                                        \n\
    directory           | output directory.                     \n\
    -w,   --watch       | watch JavaScript source directories.  \n\
    -v,   --verbose     | verbose mode.                         \n\
          --upload      |                                       \n\
          --help        | show help.                            \n\
                                                                \n\
---------------------------";

// console color
var RED    = '\u001b[31m';
var YELLOW = '\u001b[33m';
var CLR    = '\u001b[0m';

var LIB_DIR  = "./js/lib/";
var UTIL_DIR = "./js/util/";

var fs = require("fs");
var Misc = require(UTIL_DIR + "Misc.js").Misc;
var Watch = require(UTIL_DIR + "Watch.js").Watch;
var Upload = require(UTIL_DIR + "Upload.js").Upload;

var options = _parseCommandLineOptions({
        verbose: false,
        upload: false,
        watch: false,
        help: false
    });

// =========================================================
if (options.help) {
    console.log(help);
    return;
}

_upload(options.watch ? _watch : null);

// =========================================================
function _upload(fn) {
    if (!options.upload) {
        fn && fn();
        return;
    }
    if (options.verbose) {
        console.log("  --- upload ---");
    }
    var manifest = JSON.parse(fs.readFileSync(".upload", "UTF-8"));
    var upload = new Upload();

    upload.setup( manifest, { verbose: options.verbose } );
    upload.upload(fn);
}

function _watch() {
    if (options.verbose) { console.log("  --- watch ---"); }

    Watch.dir("./case/", function() {
        _upload(function() {
            ;
        })
    });
}

function _parseCommandLineOptions(opt) {
    var argv = process.argv.slice(2); // [arg1, arg2, ...]

    for (var i = 0, iz = argv.length; i < iz; ++i) {
        switch (argv[i]) {
        case "-w":   case "--watch":      opt.watch   = true; break;
        case "-v":   case "--verbose":    opt.verbose = true; break;
                     case "--upload":     opt.upload  = true; break;
                     case "--help":       opt.help    = true; break;
        default:
            if (/^-/.test(argv[i])) {
                console.log("ERROR: " + argv[i] + " is unknown option");
                return { help: true };
            }
        }
    }
    return opt;
}

