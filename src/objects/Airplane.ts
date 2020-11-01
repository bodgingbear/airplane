import { Rectangle } from '../constants';
import { isInDev } from '../isInDev';

export class Airplane {
  hullBounds: Phaser.GameObjects.Rectangle[];

  constructor(scene: Phaser.Scene, private x: number, private y: number) {
    scene.add.image(x + 56, y - 14, 'enginge_r_clean');
    scene.add.image(x - 56, y - 14, 'enginge_l_clean');
    scene.add.image(x, y, 'plane');
    scene.add.image(x, y, 'passengers-up');
    scene.add.image(x, y, 'passengers-down').setDepth(5);

    scene.add.image(x, y - 105, 'nose');
    scene.add.image(x, y + 110, 'tail');

    [...this.getWingsBounds(), ...this.getHullBounds()].forEach((bound) =>
      scene.add
        .rectangle(
          bound.x,
          bound.y,
          bound.width,
          bound.height,
          0xff0000,
          isInDev() ? 0.5 : 0
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
            isInDev() ? 0.5 : 0
          )
          .setOrigin(0)
      )
      .map((border) => {
        scene.physics.world.enableBody(border);
        // eslint-disable-next-line no-param-reassign
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

  getHullBounds = () => [new Rectangle(this.x - 17, this.y - 91.5, 34, 183)];

  getHullBorders = () => [
    new Rectangle(this.x - 17, this.y - 91.5, 1, 73),
    // aa
    new Rectangle(this.x - 15, this.y - 96, 8, 65),
    new Rectangle(this.x + 6, this.y - 96, 8, 65),
    new Rectangle(this.x - 15, this.y + 8, 8, 65),
    new Rectangle(this.x + 6, this.y + 8, 8, 65),

    // aa

    new Rectangle(this.x - 17, this.y - 102, 34, 10),
    new Rectangle(this.x - 17, this.y + 93, 34, 10),

    // bb
    new Rectangle(this.x - 17, this.y + 8, 1, 83.5),
    new Rectangle(this.x + 16, this.y - 91.5, 1, 73),
    new Rectangle(this.x + 16, this.y + 8, 1, 83.5),
  ];
}
