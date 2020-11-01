const STATIC_OFFSET = 15;

export class ObstacleIndicator {
  image: Phaser.GameObjects.Image;

  constructor(
    private scene: Phaser.Scene,
    private x: number,
    private y: number
  ) {
    this.image = scene.add
      .image(x, y - STATIC_OFFSET, 'warning')
      .setVisible(false)
      .setZ(5);
  }

  indicateBroken() {
    this.image.setTexture('warning').setVisible(true);
  }

  indicateCritical() {
    this.image.setTexture('warning2').setVisible(true);
  }

  indicateFixed() {
    this.image.setVisible(false);
  }

  update() {
    const offset = 3;
    this.image.setPosition(
      Math.min(
        Math.max(
          this.x,
          this.scene.cameras.main.worldView.left +
            this.image.displayWidth / 2 +
            offset
        ),
        this.scene.cameras.main.worldView.right -
          this.image.displayWidth / 2 -
          offset
      ),
      Math.min(
        Math.max(
          this.y - STATIC_OFFSET,
          this.scene.cameras.main.worldView.top +
            this.image.displayHeight / 2 +
            offset
        ),
        this.scene.cameras.main.worldView.bottom -
          this.image.displayHeight / 2 -
          offset
      )
    );
  }
}
