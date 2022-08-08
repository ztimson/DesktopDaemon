const {FRAME_RATE} = require('./dist/constants.js');
const {NPC} = require('./dist/npc.js')

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;

canvas.width = screenWidth;
canvas.height = screenHeight;

function clearScreen() { ctx.clearRect(0, 0, screenWidth, screenHeight); }

const dog = new NPC(ctx, './assets/sprites/shadow-dog/spritesheet.png', '../assets/sprites/shadow-dog/spritesheet.json', {
	bubbleOffset: [50, 75],
	scale: 0.25
});

let frame = 0, once = true;
setInterval(() => {
	requestAnimationFrame(() => {
		frame++;
		clearScreen();

		dog.tick();
	})
}, 1000 / FRAME_RATE);
