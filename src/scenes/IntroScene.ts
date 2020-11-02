import { TextButton } from 'packages/text-button';
import { Sound } from 'sounds';

export class IntroScene extends Phaser.Scene {
  private count = 1;

  public constructor() {
    super({
      key: 'IntroScene',
    });
  }

  public create() {
    const skipIntroButton = new TextButton(
      this,
      1280 - 32,
      720 - 32,
      'Skip intro',
      {
        originX: 1,
        originY: 1,
      }
    );
    skipIntroButton.on('click', () => {
      this.sound.stopAll();
      this.scene.start('MainMenuScene', { skipAnimation: true });
    });

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

    intro1.anims.play('intro-1-anim');
    this.sound.play(Sound.introPlaneCrash);

    intro1.on('animationrepeat', () => {
      if (this.count++ === 8) {
        tween2.play();
        intro2player.anims.play('player-walk');
        intro2sprite.anims.play('intro-2-anim');
        intro2Bg.setVisible(true);
        intro2player.setVisible(true);
        intro2sprite.setVisible(true);
      }
    });

    intro2sprite.on('animationcomplete', () => {
      this.time.addEvent({
        delay: 500,
        callback: () => this.scene.start('MainMenuScene'),
        loop: false,
      });
    });
  }
}
