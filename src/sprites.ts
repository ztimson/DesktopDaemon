export class AnimatedSprite {
	private animation = '';
	private animationIndex = -1;
	private frame = -1;
	private spriteSheet!: HTMLImageElement;

	constructor(private ctx: CanvasRenderingContext2D,
				public spritesheetSrc: string,
				public spriteAnimations: string[],
				public spriteScale = 1,
				public spriteWidth = 100,
				public spriteHeight = 100,
				public spriteFrames = 10,
	) {
		this.spriteSheet = new Image();
		this.spriteSheet.src = this.spritesheetSrc;
	}

	render(x: number, y: number, animation: string = this.animation) {
		if(this.animation != animation) {
			this.frame = 0;
			this.animation = animation;
			this.animationIndex = this.spriteAnimations.findIndex((a) => a == animation);
		} else {
			this.frame++;
			if(this.frame >= this.spriteFrames) this.frame = 0;
		}

		this.ctx.drawImage(this.spriteSheet,
			this.frame * this.spriteWidth, this.animationIndex * this.spriteHeight,
			this.spriteWidth, this.spriteHeight,
			x, this.ctx.canvas.height - (this.spriteHeight * this.spriteScale + y),
			this.spriteWidth * this.spriteScale, this.spriteHeight * this.spriteScale);
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
