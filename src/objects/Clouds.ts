/* eslint-disable new-cap */
export class Clouds {
  constructor(scene: Phaser.Scene) {
    const duration = 12000;
    const sprites = [
      scene.add.sprite(0, -1000, 'clouds').setOrigin(0.5, 0),
      scene.add.sprite(0, -1000, 'clouds').setOrigin(0.5, 0),
    ];

    const height = sprites[0].displayHeight;

    scene.tweens.addCounter({
      from: -height,
      to: height,
      duration,
      loop: -1,
      onUpdate: (tween) => {
        sprites[0].setY(tween.getValue());
      },
      onLoop: () => {
        sprites[0].setX(Phaser.Math.Between(-100, 100));
      },
    });

    scene.tweens.addCounter({
      duration: duration / 2,
      onComplete: () => {
        scene.tweens.addCounter({
          from: -height,
          to: height,
          duration,
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
