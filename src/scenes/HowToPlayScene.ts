import { TextButton } from 'packages/text-button';
import { centerElement } from 'packages/utils';

export class HowToPlayScene extends Phaser.Scene {
  public constructor() {
    super({
      key: 'HowToPlayScene',
    });
  }

  public create(): void {
    const { width: DISPLAY_WIDTH, height: DISPLAY_HEIGHT } = this.cameras.main;

    const background = this.add.sprite(
      DISPLAY_WIDTH / 2,
      DISPLAY_HEIGHT / 2,
      'credits_background'
    );
    background.setDisplaySize(DISPLAY_WIDTH, DISPLAY_HEIGHT);

    const howToPlayButton = new TextButton(this, 32, 720 - 32, 'Back', {
      originX: 0,
      originY: 1,
    });

    howToPlayButton.on('click', () =>
      this.scene.start('MainMenuScene', { skipAnimation: true })
    );

    const text = this.add.text(
      1280 / 2,
      720 / 2,
      [
        'Use ARROWS to move',
        'Press SPACE to fix things',
        'Mash UP ARROW to not fall from the wings',
      ],
      {
        color: 'white',
        fontSize: 32,
        fontFamily: 'Pixel miners',
        align: 'center',
        lineSpacing: 16,
      }
    );
    centerElement(text);
  }
}
