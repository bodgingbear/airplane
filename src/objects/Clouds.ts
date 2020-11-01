import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'constants';

/* eslint-disable new-cap */
export class Clouds {
  constructor(scene: Phaser.Scene) {
    const sprites = [
      scene.add.sprite(0, -1000, 'clouds').setOrigin(0.5, 0),
      scene.add.sprite(0, -1000, 'clouds').setOrigin(0.5, 0),
    ];

    const height = sprites[0].displayHeight;

    scene.tweens.addCounter({
      from: -height,
      to: height,
      duration: 6000,
      loop: -1,
      onUpdate: (tween) => {
        sprites[0].setY(tween.getValue());
      },
      onLoop: () => {
        sprites[0].setX(Phaser.Math.Between(-100, 100));
      },
    });

    scene.tweens.addCounter({
      duration: 3000,
      onComplete: () => {
        scene.tweens.addCounter({
          from: -height,
          to: height,
          duration: 6000,
          loop: -1,
          onUpdate: (tween) => {
            sprites[1].setY(tween.getValue());
          },
          onLoop: () => {
            sprites[1].setX(Phaser.Math.Between(-100, 100));
          },
        });
      },
    });
  }
}
