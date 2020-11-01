import { Vector2 } from '../constants';

const PLAYER_COUNTER_WIND_JUMP_Y = 2;
const WIND_Y_VELOCITY = process.env.IN_DEV ? 0 : 10;

const PLAYER_VELOCITY = 20;

export class Player {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.Sprite;

  debugRect: Phaser.GameObjects.Rectangle;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private keys: Phaser.Types.Input.Keyboard.CursorKeys
  ) {
    this.sprite = scene.add.sprite(x, y, 'player');
    scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

    if (!process.env.IN_DEV) {
      this.keys.up?.on('down', () => {
        this.sprite.setY(this.sprite.y - PLAYER_COUNTER_WIND_JUMP_Y);
      });

      this.keys.down?.on('down', () => {
        this.sprite.setY(this.sprite.y + PLAYER_COUNTER_WIND_JUMP_Y);
      });
    }

    this.sprite.anims.play('player-walk');

    const bound = this.getBounds();

    this.debugRect = scene.add
      .rectangle(bound.x, bound.y, bound.width, bound.height, 0x00ff00)
      .setOrigin(0)
      .setAlpha(0.5);
  }

  update() {
    const velocity = new Vector2(0, 0);

    velocity.add(new Vector2(0, WIND_Y_VELOCITY));

    if (this.keys.left?.isDown) {
      velocity.subtract(new Vector2(PLAYER_VELOCITY, 0));
    }

    if (this.keys.right?.isDown) {
      velocity.add(new Vector2(PLAYER_VELOCITY, 0));
    }

    if (process.env.IN_DEV) {
      if (this.keys.up?.isDown) {
        velocity.subtract(new Vector2(0, PLAYER_VELOCITY * 1.5));
      }

      if (this.keys.down?.isDown) {
        velocity.add(new Vector2(0, PLAYER_VELOCITY * 1.5));
      }
    }

    if (velocity.x !== 0) {
      this.sprite.setScale(velocity.x > 0 ? -1 : 1, 1);
    }

    this.body.velocity.set(velocity.x, velocity.y);

    const bound = this.getBounds();

    this.debugRect.setPosition(bound.x, bound.y);
  }

  getBounds = (): Phaser.Geom.Rectangle => {
    return new Phaser.Geom.Rectangle(
      this.sprite.getTopLeft().x,
      this.sprite.getTopLeft().y,
      this.sprite.displayWidth,
      this.sprite.displayHeight
    );
  };
}
