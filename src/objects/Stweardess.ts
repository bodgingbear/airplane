const SPEED = 20;
const TOP = -30;
const BOTTOM = 80;

export class Stweardess {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.Sprite;

  constructor(private scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.add.sprite(x, y, 'stweardess');
    scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

    this.body.setImmovable(true);

    this.sprite.anims.play('stweardess-walk');
    this.body.setVelocityY(SPEED);
  }

  update() {
    if (this.body.y <= TOP) {
      this.body.setVelocityY(SPEED);
    } else if (this.body.y >= BOTTOM) {
      this.body.setVelocityY(-SPEED);
    }
  }
}
