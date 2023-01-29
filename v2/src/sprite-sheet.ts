export type SpriteDefinitions = {
	width?: number;
	height?: number;
	animations?: {[key: string]: {y: number, frames: number}};
	sprites?: {[key: string]: {x: number, y: number, width?: number, height?: number}};
}

export class SpriteSheet {
	private readonly definitions!: SpriteDefinitions;
	private readonly spriteSheet!: HTMLImageElement;

	private animation = '';
	private frame = -1;

	constructor(private readonly ctx: CanvasRenderingContext2D,
				public readonly spriteSheetPath: string,
				public readonly spriteDefPath: string,
	) {
		this.spriteSheet = new Image();
		this.spriteSheet.src = spriteSheetPath;
		this.definitions = require(spriteDefPath);

		// Backfill coordinates if shorthand is used
		if(this.definitions.sprites?.length) {
			Object.entries(this.definitions.sprites).forEach(sprite => {
				const [name, def] = sprite;
				if(def.width == null) {
					if(this.definitions.width == null)
						throw new Error(`Sprite is missing it's width: ${name}`);
					this.definitions.sprites[name].x = this.definitions.width * def.x;
					this.definitions.sprites[name].width = this.definitions.width;
				}
				if(def.height == null) {
					if(this.definitions.height == null)
						throw new Error(`Sprite is missing it's height: ${name}`);
					this.definitions.sprites[name].y = this.definitions.height * def.y;
					this.definitions.sprites[name].height = this.definitions.height;
				}
			});
		}
	}

	animate(x: number, y: number, name: string = this.animation, flip = false, scale = 1) {
		const animation = this.definitions.animations[name];
		if(!animation) throw new Error(`Animation doesn't exist: ${name}`);
		if(name == this.animation) {
			this.frame++;
			if(this.frame >= animation.frames) this.frame = 0;
		} else {
			this.animation = name;
			this.frame = 0;
		}
		this.drawFrame(x, y, this.animation, this.frame, flip, scale);
	}

	drawFrame(x: number, y: number, name: string, frame: number, flip = false, scale = 1, centerX = true, centerY = false) {
		const sprite = this.definitions.animations[name];
		if(!sprite) throw new Error(`Animation doesn't exist: ${name}`);
		this.ctx.save();
		this.ctx.translate(centerX ?
				this.definitions.width * scale / 2 * (flip ? 1 : -1) :
				flip ? this.definitions.width : 0,
			centerY ? this.definitions.height / -2 : 0);
		this.ctx.scale(flip ? -1 : 1, 1);
		this.ctx.drawImage(this.spriteSheet,
			frame * this.definitions.width, sprite.y * this.definitions.height, this.definitions.width, this.definitions.height,
			x * (flip ? -1 : 1), this.ctx.canvas.height - (this.definitions.height * scale + y),
			this.definitions.width * scale, this.definitions.height * scale);
		this.ctx.restore();
	}

	drawSprite(x: number, y: number, name: string, flip = false, scale = 1, centerX = true, centerY = false) {
		const sprite = this.definitions.sprites[name];
		if(!sprite) throw new Error(`Sprite doesn't exist: ${name}`);
		this.ctx.save();
		this.ctx.translate(centerX ?
				this.definitions.width * scale / 2 * (flip ? 1 : -1) :
				flip ? this.definitions.width : 0,
			centerY ? this.definitions.height / -2 : 0);
		this.ctx.scale(flip ? -1 : 1, 1);
		this.ctx.drawImage(this.spriteSheet,
			sprite.x, sprite.y, sprite.width, sprite.height,
			x * (flip ? -1 : 1), this.ctx.canvas.height - (sprite.height * scale + y),
			sprite.width * scale, sprite.height * scale);
		this.ctx.restore();
	}
}
