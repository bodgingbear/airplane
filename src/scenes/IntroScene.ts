export class IntroScene extends Phaser.Scene {
  private count = 1;

  public constructor() {
    super({
      key: 'IntroScene',
    });
  }

  public create() {
    const intro1 = this.add.sprite(1280 / 2, 720 / 2, 'intro1-1');
    intro1.setScale(7.5);

    const intro2Bg = this.add.sprite(1280 / 2, 720 / 2, 'intro2-bg');
    intro2Bg.setScale(14);
    intro2Bg.setVisible(false);

    const tween2 = this.tweens.add({
      targets: intro2Bg,
      x: {
        from: 0,
        to: -intro2Bg.displayWidth,
      },
      repeat: -1,
      duration: 200000,
      paused: true,
    });

    const intro2player = this.add.sprite(
      1280 / 2 - 200,
      720 / 2 + 105,
      'player'
    );
    intro2player.setScale(14);
    intro2player.setFlipX(true);
    intro2player.setVisible(false);

    const intro2sprite = this.add.sprite(1280 / 2 - 150, 720 / 2, 'intro2-00');
    intro2sprite.setScale(14);
    intro2sprite.setVisible(false);

    const intro3Bg = this.add.sprite(1280 / 2, 720 / 2, 'intro3-0');
    intro3Bg.setScale(7.5);
    intro3Bg.setVisible(false);

    const t1 = this.add
      .text(1280 / 2, 720 / 2 - 310, "It shouldn't be doing that...", {
        fontFamily: 'Pixel miners',
        fontSize: '48px',
      })
      .setOrigin(0.5, 0.5)
      .setVisible(false);

    const t2 = this.add
      .text(1280 / 2, 720 / 2 + 310, 'Press any key to start', {
        fontFamily: 'Pixel miners',
        fontSize: '24px',
      })
      .setOrigin(0.5, 0.5)
      .setVisible(false);

    intro1.anims.play('intro-1-anim');

    intro1.on('animationrepeat', () => {
      if (this.count++ === 4) {
        tween2.play();
        intro2player.anims.play('player-walk');
        intro2sprite.anims.play('intro-2-anim');
        intro2Bg.setVisible(true);
        intro2player.setVisible(true);
        intro2sprite.setVisible(true);
      }
    });

    intro2sprite.on('animationcomplete', () => {
      setTimeout(() => {
        intro3Bg.setVisible(true);
        intro3Bg.anims.play('intro-3-anim');
      }, 500);
    });

    intro3Bg.on('animationcomplete', () => {
      intro3Bg.anims.play('intro-3-anim-2');
      t1.setVisible(true);
      t2.setVisible(true);

      this.input.keyboard.on('keydown', (): void => {
        this.scene.start('GameScene');
      });
    });
  }
}
