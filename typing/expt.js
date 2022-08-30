/**
 * @param {{
 * context:CanvasRenderingContext2D
 * }} c 
 */
async function stage_welcome(c, stagei, bg) {
	let [cp, cx, cy, cw, ch, context] = [c.cp, c.cx, c.cy, c.cw, c.ch, c.context];

	//background 
	let allobjs = [];
	let welcome = new StageWelcome(c, stagei);
	allobjs.push(welcome);
	let starttime = performance.now();
	//game loop
	while ((starttime + 1000) > performance.now()) {
		clear_context(context);
		bg.draw();
		welcome.draw();
		await wait_frame_out();
	}
}

async function stage1(c, asset) {
	//welcome screen
	let bg = new Background(c, 1 / 8);
	await stage_welcome(c, 1, bg);

	//preload music
	asset.tetris_music.ele.volume = .3;
	asset.tetris_music.ele.loop = true;
	asset.tetris_music.ele.play();

	let [cp, cx, cy, cw, ch, context] = [c.cp, c.cx, c.cy, c.cw, c.ch, c.context];

	let allobjs = [];
	let game = {
		c: c,
		starttime: performance.now(),
		end: false,
		allobjs: allobjs,
		asset: asset,
		score: 0
	};
	//enemy
	let possible_strings = ['jj', 'jf', 'fj', 'ff'];
	game.enemies = [];
	for (let i = 0; i < 10; i++) {
		game.enemies.push(new Enemy(game, sample(possible_strings), (.1 + Math.random() * .8) * cw, game.starttime + 10000 * Math.random(), 1 / 7 + 1 / 70 * Math.random(), 1));
	}
	game.enemies.sort((a, b) => { if (a.onsettime < b.onsettime) return -1; if (b.onsettime < a.onsettime) return 1; return 0; });


	allobjs.push(...game.enemies);

	//plane
	let plane = new Plane(game);
	allobjs.push(plane);

	//background
	let sl = new ScoreLabel(game);

	//game loop
	while (game.end === false) {
		clear_context(context);
		bg.draw();
		sl.draw();
		//draw all objects
		for (let i = allobjs.length; i > 0; i--) {
			let obj = allobjs[i - 1];
			if ('draw' in obj) obj.draw();
			if ('done' in obj && obj.done) allobjs.splice(i - 1, 1);
		}
		//check if all enemy are done
		if (game.enemies.every((enemy) => enemy.done)) game.end = true;

		await wait_frame_out();
	}
	asset.tetris_music.ele.pause();

	for (let obj of allobjs) {
		if ('removelisteners' in allobjs) allobjs.removelisteners();
	}

}

async function stage1(c, asset) {
	//welcome screen
	let bg = new Background(c, 1 / 8);
	await stage_welcome(c, 1, bg);

	//preload music
	asset.tetris_music.ele.volume = .3;
	asset.tetris_music.ele.loop = true;
	asset.tetris_music.ele.play();

	let [cp, cx, cy, cw, ch, context] = [c.cp, c.cx, c.cy, c.cw, c.ch, c.context];

	let allobjs = [];
	let game = {
		c: c,
		starttime: performance.now(),
		end: false,
		allobjs: allobjs,
		asset: asset,
		score: 0
	};
	//enemy
	let possible_strings = ['jj', 'jf', 'fj', 'ff'];
	game.enemies = [];
	for (let i = 0; i < 10; i++) {
		game.enemies.push(new Enemy(game, sample(possible_strings), (.1 + Math.random() * .8) * cw, game.starttime + 10000 * Math.random(), 1 / 7 + 1 / 70 * Math.random(), 1));
	}
	game.enemies.sort((a, b) => { if (a.onsettime < b.onsettime) return -1; if (b.onsettime < a.onsettime) return 1; return 0; });


	allobjs.push(...game.enemies);

	//plane
	let plane = new Plane(game);
	allobjs.push(plane);

	//background
	let sl = new ScoreLabel(game);

	//game loop
	while (game.end === false) {
		clear_context(context);
		bg.draw();
		sl.draw();
		//draw all objects
		for (let i = allobjs.length; i > 0; i--) {
			let obj = allobjs[i - 1];
			if ('draw' in obj) obj.draw();
			if ('done' in obj && obj.done) allobjs.splice(i - 1, 1);
		}
		//check if all enemy are done
		if (game.enemies.every((enemy) => enemy.done)) game.end = true;

		await wait_frame_out();
	}
	asset.tetris_music.ele.pause();

	for (let obj of allobjs) {
		if ('removelisteners' in allobjs) allobjs.removelisteners();
	}

}
async function stage2(c, asset) {
	//welcome screen
	let bg = new Background(c, 1 / 8);
	await stage_welcome(c, 2, bg);

	//preload music
	asset.tetris_music.ele.volume = .3;
	asset.tetris_music.ele.loop = true;
	asset.tetris_music.ele.play();

	let [cp, cx, cy, cw, ch, context] = [c.cp, c.cx, c.cy, c.cw, c.ch, c.context];

	let allobjs = [];
	let game = {
		c: c,
		starttime: performance.now(),
		end: false,
		allobjs: allobjs,
		asset: asset,
		score: 0
	};
	//enemy
	let possible_strings = ['jam', 'jit', 'job', 'jet', 'fit', 'fat', 'fed', 'fob',];
	game.enemies = [];
	for (let i = 0; i < 10; i++) {
		game.enemies.push(new Enemy(game, sample(possible_strings), (.1 + Math.random() * .8) * cw, game.starttime + 10000 * Math.random(), 1 / 7 + 1 / 70 * Math.random(), 1));
	}
	game.enemies.sort((a, b) => { if (a.onsettime < b.onsettime) return -1; if (b.onsettime < a.onsettime) return 1; return 0; });


	allobjs.push(...game.enemies);

	//plane
	let plane = new Plane(game);
	allobjs.push(plane);

	//background
	let sl = new ScoreLabel(game);

	//game loop
	while (game.end === false) {
		clear_context(context);
		bg.draw();
		sl.draw();
		//draw all objects
		for (let i = allobjs.length; i > 0; i--) {
			let obj = allobjs[i - 1];
			if ('draw' in obj) obj.draw();
			if ('done' in obj && obj.done) allobjs.splice(i - 1, 1);
		}
		//check if all enemy are done
		if (game.enemies.every((enemy) => enemy.done)) game.end = true;

		await wait_frame_out();
	}
	asset.tetris_music.ele.pause();

	for (let obj of allobjs) {
		if ('removelisteners' in allobjs) allobjs.removelisteners();
	}

}


/**
 * @param {{
 * context:CanvasRenderingContext2D
 * }} c 
 */
async function welcome_scr(c) {
	let [cp, cx, cy, cw, ch, context] = [c.cp, c.cx, c.cy, c.cw, c.ch, c.context];

	//background 
	let bg = new Background(c, 1 / 4);
	let allobjs = [];
	let welcome = new Welcome(c);
	allobjs.push(welcome);

	//game loop
	while (!welcome.start) {
		clear_context(context);
		bg.draw();
		welcome.draw();
		await wait_frame_out();
	}
	for (let obj of allobjs) {
		obj.removelisteners();
	}
}

//entry point
async function start_expt() {
	let d1 = add({ tag: 'div', class: 'full-center' });
	//load asset
	let asset = {};
	asset.tetris_music = await load_audio('images/tetris.ogg', 'audio/ogg');
	asset.jiu = await load_audio('images/jiu.mp3', 'audio/mp3');

	//set up canvas
	let canvas = add({ ele: d1, tag: 'canvas' });

	//set up canvas and get context
	fpms = .001 * await estimate_fps();
	let c = expt_setup_canvas(canvas, 'none'); {
		c.fpms = fpms;
		let [cp, cx, cy, cw, ch, context] = [c.cp, c.cx, c.cy, c.cw, c.ch, c.context];
		context.font = 5 * cp + 'px Arial';
		context.lineWidth = 1 * cp;
		context.strokeStyle = 'black';
	}


	while (true) {
		let run_stages = [];
		run_stages.push(stage1);
		run_stages.push(stage2);

		{
			await welcome_scr(c);
			for (let stage of run_stages) await stage(c, asset);
		}
	}


	d1.remove();


}