import { Vector2 } from '../constants';

const PLAYER_COUNTER_WIND_JUMP_Y = 2; // prod: 2
const WIND_Y_VELOCITY = 0; // prod: 10

const PLAYER_VELOCITY = 20; // prod: 20

export class Player {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.Sprite;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private keys: Phaser.Types.Input.Keyboard.CursorKeys
  ) {
    this.sprite = scene.add.sprite(x, y, 'player');
    scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

    this.keys.up?.on('down', () => {
      this.sprite.setY(this.sprite.y - PLAYER_COUNTER_WIND_JUMP_Y);
    });

    this.keys.down?.on('down', () => {
      this.sprite.setY(this.sprite.y + PLAYER_COUNTER_WIND_JUMP_Y);
    });
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

    this.body.velocity.set(velocity.x, velocity.y);
  }

  getBounds = (): Phaser.Geom.Rectangle => {
    return new Phaser.Geom.Rectangle(
      this.sprite.x,
      this.sprite.y,
      this.sprite.displayWidth,
      this.sprite.displayHeight
    );
  };
}
