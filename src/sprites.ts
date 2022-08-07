export type SpriteAnimation = {
	name: string;
	y: number;
	frames: number;
	reverse?: boolean;
}

export class AnimatedSprite {
	private animation: any = null;
	private animationName = '';
	private frame = -1;
	private spriteSheet!: HTMLImageElement;

	constructor(private ctx: CanvasRenderingContext2D,
				public spritesheetSrc: string,
				public spriteAnimations: SpriteAnimation[],
				public spriteScale = 1,
				public spriteWidth = 100,
				public spriteHeight = 100,
	) {
		this.spriteSheet = new Image();
		this.spriteSheet.src = this.spritesheetSrc;
	}

	render(x: number, y: number, animation: string = this.animationName) {
		if(this.animationName != animation) {
			this.frame = 0;
			this.animation = this.spriteAnimations.find((a) => a.name == animation);
			this.animationName = this.animation.name;
		} else {
			this.frame++;
			if(this.frame >= this.animation.frames) this.frame = 0;
		}

		this.ctx.save();
		this.ctx.translate(this.spriteWidth * this.spriteScale / 2 * (this.animation.reverse ? 1 : -1), 0);
		this.ctx.scale(this.animation.reverse ? -1 : 1, 1);
		this.ctx.drawImage(this.spriteSheet,
			this.frame * this.spriteWidth, this.animation.y * this.spriteHeight, this.spriteWidth, this.spriteHeight,
			x * (this.animation.reverse ? -1 : 1), this.ctx.canvas.height - (this.spriteHeight * this.spriteScale + y),
			this.spriteWidth * this.spriteScale, this.spriteHeight * this.spriteScale);
		this.ctx.restore();
	}
}

export class StaticSprite {
	private spriteSheet!: HTMLImageElement;

	constructor(private ctx: CanvasRenderingContext2D,
				public spritesheetSrc: string,
				public sprite: [number, number],
				public spriteScale = 1,
				public spriteWidth = 100,
				public spriteHeight = 100,
	) {
		this.spriteSheet = new Image();
		this.spriteSheet.src = this.spritesheetSrc;
	}

	render(x: number, y: number) {
		this.ctx.drawImage(this.spriteSheet,
			this.sprite[0] * this.spriteWidth, this.sprite[1] * this.spriteHeight,
			this.spriteWidth, this.spriteHeight,
			x, this.ctx.canvas.height - (this.spriteHeight * this.spriteScale + y),
			this.spriteWidth * this.spriteScale, this.spriteHeight * this.spriteScale);
	}
}
