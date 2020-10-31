import { Vector2 } from '../constants';

const VELOCITY = 200;

const WIND_Y_VELOCITY = 50;

export class Player {
  body: Phaser.Physics.Arcade.Body;

  keys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const sprite = scene.add.sprite(x, y, 'player');
    scene.physics.world.enable(sprite);

    this.body = sprite.body as Phaser.Physics.Arcade.Body;

    this.keys = scene.input.keyboard.createCursorKeys();
  }

  update() {
    const velocity = new Vector2(0, 0);

    velocity.add(new Vector2(0, WIND_Y_VELOCITY));

    this.body.velocity.set(velocity.x, velocity.y);
  }
}

/*

--------------->
|0 1 2 3 4
|1
|2
|3
|4
V

*/
