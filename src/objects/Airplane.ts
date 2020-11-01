import { Rectangle, ZOOM } from '../constants';

export class Airplane {
  constructor(scene: Phaser.Scene, private x: number, private y: number) {
    scene.add.image(x, y, 'plane');

    // MARK: Hull
    scene.add.rectangle(x, y, 34, 183, 0xff0000).setAlpha(0.5);

    this.getBounds().forEach((bound) =>
      scene.add
        .rectangle(bound.x, bound.y, bound.width, bound.height, 0xff0000)
        .setOrigin(0)
        .setAlpha(0.5)
    );
  }

  getBounds = () =>
    [
      new Rectangle(this.x + 15, this.y - 20, 80, 40),
      new Rectangle(this.x + 91, this.y + 11, 87, 15),
      new Rectangle(this.x + 95, this.y - 2, 50, 15),
    ].map((rectangle) => rectangle.setSize(rectangle.width, rectangle.height));
}
