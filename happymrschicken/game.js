//tidy later
var chickenjumpheight = 20;

var fs = [];
fs.width = window.innerWidth;
fs.height = window.innerHeight;
//tidy later

//resource holder
var rs = [];

function test_browser() {
    if (document.documentElement.requestFullscreen) return true;
    else {
        let div = document.body.add('div');
        div.innerHTML = "Sorry.<p />This game cannot be run on your browser.<p />Please use an up-to-date Chrome / Firefox / Safari browser instead. Thank you.";
        return false;
    }
}

async function load_resource() {
    rs.chickenimg = load_img("images/chicken.png");
    rs.eggimg = load_img("images/egg.png");
    rs.lilchick1img = load_img("images/lilchick1.png");
    rs.lilchick2img = load_img("images/lilchick2.png");
    rs.eggopenimg = load_img("images/eggopen.png");
    rs.boopsrc = load_audio("images/boop.mp3");
    rs.openingsrc = load_audio("images/opening.mp3");
    rs.clucksrc = load_audio("images/cluck.mp3");
    rs.cracksrc = load_audio("images/crack.mp3");

    for (let key in rs) {
        rs[key] = await rs[key];
    }
}


//tidy up later


function getpos() {
    let totalimgw = Math.max(rs.chickenimg.width, rs.eggimg.width);
    let totalimgh = rs.chickenimg.height + rs.eggimg.height + chickenjumpheight;

    let pos = [];
    pos.x = Math.random() * (fs.width - totalimgw);
    pos.chickenx = (totalimgw - rs.chickenimg.width) / 2;
    pos.eggx = (totalimgw - rs.eggimg.width) / 2;
    pos.y = Math.random() * (fs.height - totalimgh);
    return pos;
}

function padzero(str, len) {
    while (str.length < len) str = "0" + str;
    return str;
}