import { Vector2 } from '../constants';

const PLAYER_COUNTER_WIND_JUMP_Y = 10;
const WIND_Y_VELOCITY = 40;

const PLAYER_VELOCITY = 100;

export class Player {
  body: Phaser.Physics.Arcade.Body;

  keys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const sprite = scene.add.sprite(x, y, 'player');
    scene.physics.world.enable(sprite);

    this.body = sprite.body as Phaser.Physics.Arcade.Body;

    this.keys = scene.input.keyboard.createCursorKeys();

    this.keys.up?.on('down', () => {
      sprite.setY(sprite.y - PLAYER_COUNTER_WIND_JUMP_Y);
    });

    this.keys.down?.on('down', () => {
      sprite.setY(sprite.y + PLAYER_COUNTER_WIND_JUMP_Y);
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
}
