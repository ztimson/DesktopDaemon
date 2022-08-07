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

const sprite = new UnitController(ctx, {
		spritesheetSrc: './assets/shadow_dog.png',
		spriteAnimations: [
			{name: 'idle', y: 0, frames: 7},
			{name: 'right', y: 3, frames: 9},
			{name: 'left', y: 3, frames: 9, reverse: true},
		],
		spriteScale: 0.5,
		spriteWidth: 575,
		spriteHeight: 523,
	});

setInterval(() => {
	requestAnimationFrame(() => {
		clearScreen();
		sprite.tick();
	})
}, 1000 / FRAME_RATE);
