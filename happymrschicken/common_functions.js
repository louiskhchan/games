//general common functions

function play_audio(source) {
    let audioele = document.createElement('audio');
    audioele.style.display = 'none';
    audioele.autoplay = true;
    audioele.appendChild(source);
    document.body.appendChild(audioele);
    audioele.onended = () => { audioele.remove(); };
}

//load audio
function load_audio(audiopath) {
    return new Promise(
        function (resolve) {
            let audioele = document.createElement('audio');
            audioele.preload = 'auto';
            audioele.style.display = 'none';
            let source = document.createElement('source');
            source.src = audiopath;
            source.type = 'audio/mp3';
            audioele.appendChild(source);
            audioele.oncanplaythrough = () => {
                audioele.remove();
                resolve(source);
            };
            document.body.appendChild(audioele);
        }
    );
}

//load image
function load_img(imgpath) {
    return new Promise(
        function (resolve) {
            let img;
            img = new Image();
            img.src = imgpath;
            img.onload = () => {
                resolve(img);
            };
        }
    );
}

//get current time
function now() {
    return new Date().getTime();
}

//get date string
function get_datetime_str() {
    let date = new Date();
    return (date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
}

//urlsearchparams to string
function url_stringify(obj) {
    return (new URLSearchParams(obj)).toString();
}

//array shuffle
Array.prototype.shuffle = function () {
    var currentIndex = this.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue;
    }
};

//random in range
Math.random_between = function (lb, ub) {
    return lb + Math.random() * (ub - lb);
}

//quick add tag
Element.prototype.add = function (tag, text) {
    let p = document.createElement(tag);
    if (text) p.textContent = text;
    this.appendChild(p);
    return p;
};

//quick add html
Element.prototype.addhtml = function (html) {
    this.insertAdjacentHTML('beforeend', html);
};

//wait for events such as button click
function wait_event(ele, eventstr) {
    return new Promise((resolve) => {
        ele.addEventListener(eventstr, (e) => { resolve(e); }, { once: true });
    });
}

//wait timeout
function wait_timeout(ms) {
    return new Promise((resolve) => { setTimeout(resolve, ms); });
}

//fullscreen manager
class FullScreen {
    constructor(reference_width = 1536) {
        this.reference_width = reference_width;
        document.onresize = this.onresize;
    }
    get fullscreen() { return !!(document.fullscreenElement); }
    get scale() { if (!this.fullscreen) return 1; else return this.reference_width / window.innerWidth; }
    get width() { return Math.floor(window.innerWidth * this.scale); }
    get height() { return Math.floor(window.innerHeight * this.scale); }

    get_mouse_pos(e) {
        return {
            x: e.clientX * this.scale,
            y: e.clientY * this.scale
        };
    }
    onresize() {
        document.documentElement.style.transformOrigin = '0px 0px';
        document.documentElement.style.transform = 'scale(' + 1 / this.scale + ')';
        document.documentElement.style.height = '0px';
        document.documentElement.style.width = '0px';
        document.body.style.height = 'calc(' + (this.scale * 100).toFixed(0) + 'vh - 16px)';
        document.body.style.width = 'calc(' + (this.scale * 100).toFixed(0) + 'vw - 16px)';
    }
    enter_fullscreen() {
        return document.documentElement.requestFullscreen();
    }
    exit_fullscreen() {
        return document.exitFullscreen();
    }
}
fs = new FullScreen();

