const {FRAME_RATE} = require('./dist/constants.js');
const {UnitController} = require('./dist/unit-controller.js');
const {StaticSprite} = require('./dist/sprites.js');
const {sleep} = require('./dist/utils.js');

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;

canvas.width = screenWidth;
canvas.height = screenHeight;

function clearScreen() { ctx.clearRect(0, 0, screenWidth, screenHeight); }

const file = new StaticSprite(ctx, './assets/files.png', [1, 0], 0.5);
const sprite = new UnitController(ctx, {
		spritesheetSrc: './assets/shadow_dog.png',
		spriteAnimations: ['idle'],
		spriteScale: 0.5,
		spriteWidth: 575,
		spriteHeight: 523,
		spriteFrames: 7,
	});

(async () => {
	sprite.vel = [20, 0];
	while(true) {
		clearScreen();
		file.render(25, 25);
		sprite.tick();
		await sleep(1000 / FRAME_RATE);
	}
})();
