// const {FRAME_RATE} = require('./dist/constants.js');
const {AnimatedSprite} = require('./sprites.js');

export type SpriteOptions = {
	spritesheetSrc: string,
	spriteAnimations: any[],
	spriteScale?: number,
	spriteWidth?: number,
	spriteHeight?: number,
}

export class UnitController {
	private sprite!: typeof AnimatedSprite;
	private random = 0;

	public pos = [0, 0];
	public vel = [0, 0];

	constructor(private ctx: CanvasRenderingContext2D,
				private spriteOptions: SpriteOptions,
	) {
		this.sprite = new AnimatedSprite(ctx, spriteOptions.spritesheetSrc, spriteOptions.spriteAnimations, spriteOptions.spriteScale, spriteOptions.spriteWidth, spriteOptions.spriteHeight);
	}

	tick() {
		// Randomly move the unit
		if(this.random <= 0) {
			const move = Math.random();
			if(move < 0.333) this.vel = [0, 0];
			else if(move < 0.666) this.vel = [-10, 0];
			else this.vel = [10, 0];
			this.random = Math.random() * 50;
		}
		this.random--;

		// Calculate new position
		this.pos = [this.pos[0] + this.vel[0], this.pos[1] + (this.vel[1] - 9.8)];
		if(this.pos[0] < 0) {
			this.pos[0] = 0;
			this.vel[0] = 0;
		} else if(this.pos[0] > this.ctx.canvas.width) {
			this.pos[0] = this.ctx.canvas.width;
			this.vel[0] = 0;
		}
		if(this.pos[1] < 0) this.pos[1] = 0;

		// Decide on animation
		let animation = 'idle';
		if(this.vel[0] < 0) animation = 'left';
		if(this.vel[0] > 0) animation = 'right';

		// Draw
		this.sprite.render(this.pos[0], this.pos[1], animation);
	}
}
