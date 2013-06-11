function userAgent(toString) { // @arg Boolean(= false):
    var userAgent = navigator.userAgent;
    var os = ["", ""];
    var ua = ["", ""];

    // --- OS detection ---
    if (/iPhone|iPod|iPad/.test(userAgent)) {
        os = ["iOS", parseFloat(userAgent.split("OS ")[1].replace(/_/g, "."))];
    } else if (/Android/.test(userAgent)) {
        os = ["Android", parseFloat(userAgent.split("Android ")[1])];
    } else if (/Mac OS X/.test(userAgent)) {
        os = ["Mac OS X", parseFloat(userAgent.split("Mac OS X ")[1].replace(/_/g, "."))];
    } else if (/Windows NT/.test(userAgent)) {
        os = ["Windows", parseFloat(userAgent.split("Windows NT ")[1])];
    } else if (/Windows Phone OS/.test(userAgent)) {
        os = ["Windows Phone", parseFloat(userAgent.split("Windows Phone OS ")[1])];
    }

    // --- User Agent detection ---
    if (/OPR/.test(userAgent)) {
        ua = ["Opera", parseFloat(userAgent.split("OPR/")[1])];
    } else if (/Chrome/.test(userAgent)) {
        ua = ["Chrome", parseFloat(userAgent.split("Chrome/")[1])];

        // Mozilla/5.0 (Linux; Android 4.2.2; ja-jp; SC-04E Build/JDQ39)
        //  AppleWebKit/535.19 (KHTML, like Gecko) Version/1.0 Chrome/18.0.1025.308 Mobile Safari/535.19
        if (!window.chrome && /Build/.test(userAgent)) {
            ua = ["Browser", parseFloat(userAgent.split("Version/")[1])]; // SC-04E
        }

    } else if (/MSIE/.test(userAgent)) {
        ua = ["IE", parseFloat(userAgent.split("MSIE ")[1])];
        if (/IEMobile/.test(userAgent)) {
            ua = ["IE", parseFloat(userAgent.split("IEMobile/")[1])];
        }
    } else if (/Firefox/.test(userAgent)) {
        ua = ["Firefox", parseFloat(userAgent.split("Firefox/")[1])];
    } else if (/Safari/.test(userAgent)) {
        if (os[0] === "Android") {
            ua = ["Browser", parseFloat(userAgent.split("Version/")[1])];
        } else {
            ua = ["Safari", parseFloat(userAgent.split("Version/")[1])];
        }
    }

    if (toString) {
        return [os[0], os[1], ua[0], ua[1]].join(" ");
    }
    return {
        os: os[0],
        os_version: os[1],
        ua: ua[0],
        ua_version: ua[1]
    };
}

/*
String.prototype.at = function(var_args) { // @var_args Mix: replace values
                                           // @ret String: "@@:@@".at(1,2) -> "1:2"
                                           // @help: String#at
                                           // @desc: search for "@@", replace the argument
    var i = 0, args = arguments;

    return this.replace(/@@/g, function() {
        return args[i++];
    });
};
 */
