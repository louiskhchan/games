class Background {
    constructor(c, speed) {
        this.c = c;
        let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context];
        this.star_radius = .5 * cp;
        this.stars = new Array(150);
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i] = { pos: [Math.random() * cw, Math.random() * ch], dist: Math.random() };
        }
        this.velocity = ch * speed / 1000;
    }
    draw() {
        let c = this.c;
        let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context]; //background color
        context.fillStyle = 'dimgray';
        context.fillRect(0, 0, cw, ch);

        //draw stars
        for (let i = 0; i < this.stars.length; i++) {
            //update pos
            context.fillStyle = 'lightgrey';
            context.fill(path_circle(...this.stars[i].pos, this.star_radius * this.stars[i].dist));
            this.stars[i].pos[1] += this.velocity / fpms * this.stars[i].dist;
            if (this.stars[i].pos[1] > ch) {
                this.stars[i].pos[0] = Math.random() * cw;
                this.stars[i].pos[1] -= ch;
            }
        }

    };
}

class Welcome {
    constructor(c) {
        this.c = c;
        this.lm = new ListenerManager();
        this.lm.add(document, 'keydown', this.keydown.bind(this));
        this.start = false;
    }
    removelisteners() {
        this.lm.removeall();
    }

    /** @param {KeyboardEvent} e */
    keydown(e) {
        if ([' '].includes(e.key.toLowerCase())) this.start = true;;
    }
    draw() {
        /** @type {{
         * context:CanvasRenderingContext2D}}
         */
        let c = this.c;
        let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context];
        //
        {
            context.save();
            context.fillStyle = 'rgba(0,0,0,.3)';
            context.fillRect(0, 0, cw, ch);
            context.fillStyle = 'white';
            context.font = 10 * cp + 'px Teko';
            context.textAlign = 'center';
            context.textBaseline = 'alphabetic';
            context.fillText('Happy Typing', cx, cy - 5 * cp);
            context.fillStyle = 'lightgrey';
            context.font = 5 * cp + 'px "Roboto Mono"';
            context.fillText('Press spacebar to start' + (get_time_sine(5) > 0 ? '_' : ' '), cx, cy + 5 * cp);
            context.restore();
        }
    }
}

class StageWelcome {
    constructor(c, stagei) {
        this.c = c;
        this.stagei = stagei;
        this.starttime = performance.now() + 200;
        this.duration = 300;
    }
    draw() {
        /** @type {{
         * context:CanvasRenderingContext2D}}
         */
        let c = this.c;
        let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context];
        //
        {
            let elapsed = (performance.now() - this.starttime);
            let elapsedratio = Math.min(1, Math.max(0, (this.duration - elapsed) / this.duration));

            context.save();
            context.fillStyle = 'rgba(0,0,0,' + .3 * elapsedratio + ')';
            context.fillRect(0, 0, cw, ch);
            context.fillStyle = 'rgba(255,255,255,' + elapsedratio + ')';
            context.font = 8 * cp * (1.2 / (elapsedratio + .2)) + 'px Teko';
            context.textAlign = 'center';
            context.textBaseline = 'alphabetic';
            context.fillText('Stage ' + this.stagei, cx, cy - 0 * cp);
            context.restore();
        }
    }
}


// class StageButton {
//     constructor(c, i, label, stagemenu) {
//         this.c = c;
//         let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context];
//         this.i = i;
//         this.label = label;
//         this.stagemenu = stagemenu;
//         this.circle_radius = 10 * cp;
//         this.pos = [cx, (this.i + 1) * (5 * cp + this.circle_radius * 2)];


//         this.lm = new ListenerManager();
//         this.lm.add(document, 'keydown', this.keydown.bind(this));
//         this.lm.add(c.context.canvas, 'pointerdown', this.pointerdown_bound = this.pointerdown.bind(this));
//         this.lm.add(c.context.canvas, 'pointerup', this.pointerup_bound = this.pointerup.bind(this));
//         this.lm.add(c.context.canvas, 'pointermove', this.pointermove_bound = this.pointermove.bind(this));
//         this.clicking = false;
//         this.over = false;
//     }
//     removelisteners() {
//         this.lm.removeall();
//     }

//     /** @param {KeyboardEvent} e */
//     keydown(e) {
//         if (e.key == this.label) this.stagemenu.selected = this.i;
//     }
//     hit(e) {
//         return hittest_radius(...this.c.v2c([e.offsetX, e.offsetY]), ...this.pos, this.circle_radius);
//     }
//     pointermove(e) {
//         if (this.hit(e)) this.over = true;
//         else this.over = false;
//     }
//     pointerdown(e) {
//         if (this.hit(e)) this.clicking = true;
//     }
//     pointerup(e) {
//         if (this.clicking && this.hit(e)) this.stagemenu.selected = this.i;
//         this.clicking = false;
//     }
//     draw() {
//         let c = this.c;
//         let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context];
//         context.strokeStyle = 'lightgrey';
//         context.lineWidth = .5 * cp;
//         let pc1 = path_circle(...this.pos, this.circle_radius);
//         context.stroke(pc1);
//         if (this.over || this.clicking) {
//             context.fillStyle = 'rgba(255,255,255,' + (this.clicking ? .8 : .2) + ')';
//             context.fill(pc1);
//         }
//         context.textBaseline = 'middle';
//         context.font = '300 ' + this.circle_radius + 'px "Segoe UI",Roboto';
//         context.fillStyle = 'white';
//         context.fillText(this.label, ...this.pos);
//     }
// }

class ScoreLabel {
    constructor(game) {
        this.game = game;
    }
    draw() {
        /** @type {{
         * context:CanvasRenderingContext2D
         * }} */
        let c = this.game.c;
        let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context];
        context.save();
        context.font = 7 * cp + 'px Teko';
        context.fillStyle = 'lightgrey';
        context.textAlign = 'right';
        context.fillText('score: ' + this.game.score, cw - 5 * cp, 8 * cp);
        context.restore();
    }
}

class Beam {
    constructor(game, sx, sy, tx, ty, starttime) {
        let c = game.c;
        this.c = c;
        this.sx = sx;
        this.sy = sy;
        this.tx = tx;
        this.ty = ty;
        this.speed = 8 * c.ch / 1000;
        this.beamlength = c.ch / 4;
        this.distance = Math.sqrt((tx - sx) ** 2 + (ty - sy) ** 2);

        this.st1 = starttime;
        this.st2 = starttime + this.beamlength / this.speed;
        this.et1 = starttime + this.distance / this.speed;
        this.et2 = starttime + (this.beamlength + this.distance) / this.speed;
        play_audio(game.asset.jiu.source);
    }
    draw() {
        let now = performance.now();
        if (now < this.st1 || now > this.et2) {
            this.done = true;
            return;
        }
        let pc1 = Math.min(1, (now - this.st1) / (this.et1 - this.st1));
        let pc2 = Math.max(0, (now - this.st2) / (this.et2 - this.st2));
        /** @type {{
         * context:CanvasRenderingContext2D
         * }} */
        let c = this.c;
        let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context];
        context.save();
        let beam = new Path2D();
        beam.moveTo(this.sx + pc1 * (this.tx - this.sx), this.sy + pc1 * (this.ty - this.sy));
        beam.lineTo(this.sx + pc2 * (this.tx - this.sx), this.sy + pc2 * (this.ty - this.sy));
        context.lineWidth = 1.2 * cp;
        context.strokeStyle = 'rgba(255,128,0,.3)';
        context.stroke(beam);
        context.lineWidth = .4 * cp;
        context.strokeStyle = 'white';
        context.stroke(beam);
        context.restore();
    }
}

class Plane {
    constructor(game) {
        this.game = game;
        /** @type {{
         * context:CanvasRenderingContext2D
         * }} */
        let c = this.game.c;
        let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context];
        this.pos = [cx, ch - 18 * game.c.cp];
        this.size = 9 * game.c.cp;
        //add handler
        this.lm = new ListenerManager();
        this.lm.add(document, 'keydown', this.keydown.bind(this));
        //keyboard buffer
        this.buffer = '';
        //laser beam
        this.beams = [];
    }
    removelisteners() {
        this.lm.removeall();
    }

    /** @param {KeyboardEvent} e */
    keydown(e) {
        if (e.keyCode == 8) this.buffer = this.buffer.substr(0, this.buffer.length - 1);
        if (e.key.match(/^\w$/)) this.buffer += e.key.toLowerCase();
        if (e.key == ' ') {
            for (let i = 0; i < this.game.enemies.length; i++) {
                let enemy = this.game.enemies[i];
                if (enemy.label == this.buffer && enemy.active()) {
                    //kill enemy
                    let beam = new Beam(this.game, this.pos[0], this.pos[1] - this.size / 2, enemy.pos[0], enemy.pos[1], performance.now());
                    this.game.allobjs.push(beam);
                    enemy.kill(beam.et1);
                    this.game.score += 100;
                    break;
                }
            }
            //clear buffer
            this.buffer = '';
        }
    }
    draw() {
        /** @type {{
         * context:CanvasRenderingContext2D
         * }} */
        let c = this.game.c;
        let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context];
        context.save();
        //draw fire
        let draw_fire = function(cx, cy, size) {
            let outer = new Path2D();
            outer.moveTo(cx - size / 6, cy);
            outer.quadraticCurveTo(
                cx - size / 6, cy + size / 6,
                cx, cy + size / 3);
            outer.quadraticCurveTo(
                cx + size / 6, cy + size / 6,
                cx + size / 6, cy);
            context.fillStyle = 'rgba(255,192,0,' + (.45 + .1 * get_time_sine(9)) + ')';
            context.fill(outer);
            let inner = new Path2D();
            inner.moveTo(cx - size / 12, cy);
            inner.quadraticCurveTo(
                cx - size / 12, cy + size / 8,
                cx, cy + size / 4);
            inner.quadraticCurveTo(
                cx + size / 12, cy + size / 8,
                cx + size / 12, cy);
            context.fillStyle = 'rgba(255,255,0,.9)';
            context.fill(inner);
        };
        draw_fire(this.pos[0] - this.size / 5, this.pos[1] + this.size / 2, this.size);
        draw_fire(this.pos[0] + this.size / 5, this.pos[1] + this.size / 2, this.size);
        //draw triangle
        let tri = path_triangle(...this.pos, this.size, this.size);
        context.fillStyle = 'rgba(192,192,255,' + (.45 + .1 * get_time_sine(2)) + ')';
        context.fill(tri);
        context.lineWidth = .7 * cp;
        context.strokeStyle = 'rgba(192,192,255,' + (.8 + .2 * get_time_sine(2)) + ')';
        context.stroke(tri);
        context.lineWidth = .3 * cp;
        context.strokeStyle = 'white';
        context.stroke(tri);
        //draw typing panel
        context.font = 6 * cp + 'px "Roboto Mono"';
        let displaystr = this.buffer + (get_time_sine(4) > 0 ? ' ' : '_');
        let buffer_w = context.measureText(displaystr).width + 3 * cp;
        let buffer_h = 8 * cp;
        let buffer_t = this.pos[1] + 12.5 * cp;

        context.fillStyle = 'rgba(0,0,0,.2)';
        context.fillRect(this.pos[0] - buffer_w / 2, buffer_t - buffer_h / 2, buffer_w, buffer_h);
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'lightgrey';
        context.fillText(displaystr, this.pos[0], buffer_t + .5 * cp);
        context.restore();
    }
}

class Enemy {
    constructor(game, label, xpos, onsettime, speed, lives = 1) {
        this.game = game;
        /** @type {{
         * context:CanvasRenderingContext2D
         * }} */
        let c = this.game.c;
        let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context];
        this.label = label;
        this.onsettime = onsettime;
        this.speed = speed;
        this.lives = lives;
        this.font = 6 * cp + 'px "Roboto Mono"';
        context.save();
        context.font = this.font;
        let labeldim = context.measureText(label);
        this.size = [5 * cp + labeldim.width, 3 * cp + 6 * cp];
        this.radius = 2 * cp;
        this.pos = [xpos, -this.size[1] / 2];
        context.restore();
        this.done = false;
    }
    kill(killtime) {
        this.lives -= 1;
        if (this.lives <= 0) this.killtime = killtime;
    }
    active(log) {
        return (
            performance.now() > this.onsettime && this.done == false);
    }
    draw() {
        if (!this.active()) return;
        /** @type {{
         * context:CanvasRenderingContext2D
         * }} */
        let c = this.game.c;
        let [fpms, cp, cx, cy, cw, ch, context] = [c.fpms, c.cp, c.cx, c.cy, c.cw, c.ch, c.context];

        this.pos[1] += this.speed * ch / 1000 / fpms;
        if ((this.pos[1] - this.size[1] / 2) > this.game.c.ch) this.done = true;
        context.save();
        if ('killtime' in this) {
            let pc = Math.max(0, Math.min(1, (performance.now() - this.killtime) / 200));
            let pcs = Math.max(0, 1 - pc * 2);
            context.globalAlpha = pcs;
            context.translate(...this.pos);
            context.scale(1 - pc, 1 - pc);
            context.translate(-this.pos[0], -this.pos[1]);
            if (pc == 1) this.done = true;
        }
        //draw enemy body
        let body = path_round_rectangle(...this.pos, ...this.size, this.radius);
        context.fillStyle = 'rgba(192,0,0,' + (.45 + .1 * get_time_sine(1)) + ')';
        context.fill(body);
        context.lineWidth = .7 * cp;
        context.strokeStyle = 'rgba(192,128,128,' + (.8 + .2 * get_time_sine(1)) + ')';
        context.stroke(body);
        context.lineWidth = .3 * cp;
        context.strokeStyle = 'white';
        context.stroke(body);
        //draw text
        context.font = this.font;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'white';
        context.fillText(this.label, this.pos[0], this.pos[1]);
        context.restore();
    }
}