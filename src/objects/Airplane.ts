import { Rectangle, ZOOM } from '../constants';
import { isInDev } from '../isInDev';

export class Airplane {
  hullBounds: Phaser.GameObjects.Rectangle[];

  constructor(scene: Phaser.Scene, private x: number, private y: number) {
    scene.add.image(x, y, 'plane');

    this.getWingsBounds().forEach((bound) =>
      scene.add
        .rectangle(
          bound.x,
          bound.y,
          bound.width,
          bound.height,
          0xff0000,
          0.5
        )
        .setOrigin(0)
    );

    this.hullBounds = this.getHullBorders()
      .map((border) =>
        scene.add
          .rectangle(
            border.x,
            border.y,
            border.width,
            border.height,
            0x00ff00,
            0.5
          )
          .setOrigin(0)
      )
      .map((border) => {
        scene.physics.world.enableBody(border);
        (border.body as Phaser.Physics.Arcade.Body).onCollide = true;
        (border.body as Phaser.Physics.Arcade.Body).setImmovable(true);
        return border;
      });
  }

  getWingsBounds = () => [
    new Rectangle(this.x + 15, this.y - 20, 80, 40),
    new Rectangle(this.x + 91, this.y + 11, 87, 15),
    new Rectangle(this.x + 95, this.y - 2, 50, 15),
    new Rectangle(this.x - 15 - 80, this.y - 20, 80, 40),
    new Rectangle(this.x - 91 - 87, this.y + 11, 87, 15),
    new Rectangle(this.x - 95 - 50, this.y - 2, 50, 15),
  ];

  getHullBounds = () => [
    new Rectangle(this.x - 17, this.y - 91.5, 34, 183),
  ]

  getHullBorders = () => [
    new Rectangle(this.x - 17, this.y - 91.5, 1, 73),
    new Rectangle(this.x - 17, this.y + 8, 1, 83.5),
    new Rectangle(this.x + 16, this.y - 91.5, 1, 73),
    new Rectangle(this.x + 16, this.y + 8, 1, 83.5),
  ];
}
