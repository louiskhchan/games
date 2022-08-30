async function main() {
    //test browser
    if (!test_browser()) return;

    //load image
    load_resource();


    var countdiv = document.body.add('div');
    countdiv.className = 'countdiv';
    countdiv.innerHTML = "000";
    let count = 0;

    //show intro
    while (true) {
        let key = await wait_event(document, "keydown");
        if (key.key == ' ') {
            count++;
            let pos = getpos();
            rs.chickenimg.style.left = pos.x + pos.chickenx + 'px';
            rs.chickenimg.style.top = pos.y + chickenjumpheight + 'px';
            document.body.appendChild(rs.chickenimg);
            setTimeout(((pos) => {
                rs.chickenimg.style.top = pos.y + 'px';
            }).bind(null, pos), 300);
            let newegg;
            newegg = new Image();
            newegg.src = rs.eggimg.src;
            newegg.style.left = pos.x + pos.eggx + 'px';
            newegg.style.top = pos.y + chickenjumpheight + rs.chickenimg.height + 'px';
            document.body.appendChild(newegg);
            play_audio(rs.boopsrc);
            countdiv.innerHTML = padzero(count.toString(), 3);
        }

    }



}

main();

