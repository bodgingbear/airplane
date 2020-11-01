export class DeadScene extends Phaser.Scene {
  public constructor() {
    super({
      key: 'DeadScene',
    });
  }

  public create() {
    const sprite = this.add.sprite(1280 / 2, 720 / 2, 'sleep1');
    sprite.setScale(7.5);
    sprite.anims.play('sleep-anim');

    const t1 = this.add
      .text(1280 / 2, 720 / 2 - 310, 'This was all just a bad dream', {
        fontFamily: 'Pixel miners',
        fontSize: '48px',
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(0);

    const t2 = this.add
      .text(1280 / 2, 720 / 2 + 310, 'Press any key to restart', {
        fontFamily: 'Pixel miners',
        fontSize: '24px',
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(0);

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.tweens.add({
      targets: t1,
      alpha: { from: 0, to: 1 },
      duration: 1000,
    });

    this.tweens.add({
      targets: t2,
      alpha: { from: 0, to: 1 },
      duration: 1000,
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE,
      () => {
        this.input.keyboard.on('keydown', (): void => {
          this.scene.start('GameScene');
        });
      }
    );
  }
}
