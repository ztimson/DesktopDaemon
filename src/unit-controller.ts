// const {FRAME_RATE} = require('./dist/constants.js');
const {AnimatedSprite} = require('./sprites.js');

// TODO - Move to import
const FRAME_RATE = 10;

export type SpriteOptions = {
	spritesheetSrc: string,
	spriteAnimations: string[],
	spriteWidth?: number,
	spriteHeight?: number,
	spriteFrames?: number,
	scale?: number,
}

export class UnitController {
	private sprite!: typeof AnimatedSprite;

	public pos = [0, 0];
	public vel = [0, 0];

	constructor(private ctx: CanvasRenderingContext2D,
				private spriteOptions: SpriteOptions,
	) {
		this.sprite = new AnimatedSprite(ctx, ...Object.values(spriteOptions));
	}

	tick() {
		this.pos = [this.pos[0] + (this.vel[0] / FRAME_RATE), this.pos[1] + (this.vel[1] / FRAME_RATE)];
		let animation = 'idle';
		// if(this.vel[0] < 0) animation = 'left';
		// if(this.vel[0] > 0) animation = 'right';
		this.sprite.render(this.pos[0], this.pos[1], animation);
	}
}
