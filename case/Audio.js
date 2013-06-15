addEventListener("load", function() {
    Test().spec("Audio",
                "http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#the-audio-element");
    Test().spec("WebAudio",
                "https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html");

    var map = {
            "window.Audio":             false,
            "window.HTMLAudioElement":  false,
            "PCM":                      false, // audio/wav
            "AAC":                      false, // audio/mp4
            "MP3":                      false, // audio/mpeg
            "OGG Vorbis":               false, // audio/ogg; codecs="vorbis"
            "OGG Opus":                 false, // audio/ogg; codecs="opus"
            "WebM":                     false  // audio/webm
        },
        mapWebAudio = {
            "window.AudioContext": false,
            "AudioContext#createMediaStreamSource": false
        };

    var audio = document.createElement("audio");

    if (audio) {
        mix(map, {
            "window.Audio":             !!window.Audio,
            "window.HTMLAudioElement":  !!window.HTMLAudioElement,
        });
        if (audio.canPlayType) {
            mix(map, {
                "PCM":                  !!audio.canPlayType('audio/wav'),
                "AAC":                  !!audio.canPlayType('audio/mp4'),
                "MP3":                  !!audio.canPlayType('audio/mpeg'),
                "OGG Vorbis":           !!audio.canPlayType('audio/ogg; codecs="vorbis"'),
                "OGG Opus":             !!audio.canPlayType('audio/ogg; codecs="opus"'),
                "WebM":                 !!audio.canPlayType('audio/webm')
            });
        }
    }
    var audio = window.AudioContext || window.webkitAudioContext || null;

    if (audio) {
        mapWebAudio = {
            "window.AudioContext": true,
            "AudioContext#createMediaStreamSource": !!audio.createMediaStreamSource
        };
    }

    for (var id in map) {
        Test().add({ Category: "Audio", Class: "Audio", id: id, state: map[id] });
    }
    for (var id in mapWebAudio) {
        Test().add({ Category: "Audio", Class: "WebAudio", id: id, state: mapWebAudio[id] });
    }
    View().update();

    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }
});
