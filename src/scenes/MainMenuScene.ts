import { TextButton } from 'packages/text-button';

export class MainMenuScene extends Phaser.Scene {
  private skipAnimation: boolean = false;

  public constructor() {
    super({
      key: 'MainMenuScene',
    });
  }

  public init({ skipAnimation }: { skipAnimation: boolean }) {
    this.skipAnimation = skipAnimation;
  }

  public create(): void {
    const intro3Bg = this.add.sprite(1280 / 2, 720 / 2, 'intro3-0');
    intro3Bg.setScale(7.5);

    const t1 = this.add
      .text(1280 / 2, 720 / 2 - 310, "It shouldn't be doing that...", {
        fontFamily: 'Pixel miners',
        fontSize: '48px',
      })
      .setOrigin(0.5, 0.5);

    const t2 = this.add
      .text(1280 / 2, 720 / 2 + 310, 'Press SPACE to start', {
        fontFamily: 'Pixel miners',
        fontSize: '24px',
      })
      .setOrigin(0.5, 0.5);

    const creditsButton = new TextButton(this, 1280 - 32, 720 - 32, 'Credits', {
      originX: 1,
      originY: 1,
    });
    creditsButton.on('click', () => this.scene.start('CreditsScene'));

    const howToPlayButton = new TextButton(this, 32, 720 - 32, 'How to play', {
      originX: 0,
      originY: 1,
    });
    howToPlayButton.on('click', () => this.scene.start('HowToPlayScene'));

    let finished = false;

    this.input.keyboard.addKey('SPACE').on('down', (): void => {
      if (finished) {
        this.scene.start('GameScene');
      }
    });

    if (!this.skipAnimation) {
      intro3Bg.anims.play('intro-3-anim');
      t1.setVisible(false);
      t2.setVisible(false);
      creditsButton.setVisible(false);
      howToPlayButton.setVisible(false);
      finished = true;
    } else {
      intro3Bg.anims.play('intro-3-anim-2');
    }

    intro3Bg.on('animationcomplete', () => {
      intro3Bg.anims.play('intro-3-anim-2');
      t1.setVisible(true);
      t2.setVisible(true);
      creditsButton.setVisible(true);
      howToPlayButton.setVisible(true);
      finished = true;
    });
  }
}
