import { loadAsset } from 'packages/utils';
import { shouldSkipIntro } from 'packages/utils/shouldSkipIntro';
import { Sound } from 'sounds';
import { TEAM } from '../constants';

export class LoadingScene extends Phaser.Scene {
  private introImage!: Phaser.GameObjects.Sprite;

  private timesLooped = 0;

  private animStopped = false;

  public constructor() {
    super({
      key: 'LoadingScene',
    });
  }

  private loadAssets() {
    // Assets go here
    this.load.video(
      'demo',
      loadAsset('videos/demo.mp4'),
      'loadeddata',
      false,
      true
    );

    this.load.spritesheet('player', 'images/player.png', {
      frameWidth: 5,
      frameHeight: 19,
    });

    this.load.spritesheet('stweardess', 'images/stweardess.png', {
      frameWidth: 8,
      frameHeight: 27,
    });

    // MARK: Images

    this.load.image('plane', 'images/plane.png');
    this.load.image('screw0', 'images/screw0.png');
    this.load.image('screw1', 'images/screw1.png');
    this.load.image('screw2', 'images/screw2.png');
    this.load.image('screw3', 'images/screw3.png');
    this.load.image('screw4', 'images/screw4.png');
    this.load.image('screw5', 'images/screw5.png');
    this.load.image('diode', 'images/diode.png');
    this.load.image('diode-off', 'images/diode_off.png');
    this.load.image('slider', 'images/slider.png');
    this.load.image('slider-indicator', 'images/slider_indicator.png');
    this.load.image('clouds', 'images/clouds.png');
    this.load.image('warning', 'images/warning.png');
    this.load.image('warning2', 'images/warning2.png');
    this.load.image('passengers-up', 'images/passengers_top.png');
    this.load.image('passengers-down', 'images/passengers_down.png');
    this.load.image('enginge_r_clean', 'images/enginge_r_clean.png');
    this.load.image('enginge_l_clean', 'images/enginge_l_clean.png');
    this.load.image('nose', 'images/nose.png');
    this.load.image('tail', 'images/tail.png');

    // MARK: Audio

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    Object.values(Sound).forEach((value) => {
      this.load.audio(value, `audio/${value}.mp3`);
    });

    // MARK: Intro
    this.load.image('intro1-1', loadAsset('images/intro1/intro1.png'));
    this.load.image('intro1-2', loadAsset('images/intro1/intro2.png'));

    this.load.image('intro2-bg', loadAsset('images/intro2/intro2_bg.png'));
    this.load.image('intro2-00', loadAsset('images/intro2/intro2-00.png'));
    this.load.image('intro2-02', loadAsset('images/intro2/intro2-02.png'));
    this.load.image('intro2-04', loadAsset('images/intro2/intro2-04.png'));
    this.load.image('intro2-06', loadAsset('images/intro2/intro2-06.png'));
    this.load.image('intro2-08', loadAsset('images/intro2/intro2-08.png'));
    this.load.image('intro2-11', loadAsset('images/intro2/intro2-11.png'));
    this.load.image('intro2-12', loadAsset('images/intro2/intro2-12.png'));

    this.load.image('intro3-0', loadAsset('images/intro3/intro0.png'));
    this.load.image('intro3-1', loadAsset('images/intro3/intro2.png'));
    this.load.image('intro3-2', loadAsset('images/intro3/intro4.png'));
    this.load.image('intro3-3', loadAsset('images/intro3/intro6.png'));
    this.load.image('intro3-4', loadAsset('images/intro3/intro8.png'));
    this.load.image('intro3-5', loadAsset('images/intro3/intro10.png'));

    this.load.image('sleep1', loadAsset('images/intro3/sleep1.png'));
    this.load.image('sleep2', loadAsset('images/intro3/sleep2.png'));
  }

  public preload(): void {
    if (!shouldSkipIntro()) {
      this.showLoadingAnimation();
    }

    this.loadCreditsAssets();
    this.loadAssets();
  }

  public create(): void {
    this.anims.create({
      key: 'player-walk',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: -1,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'stweardess-walk',
      frames: this.anims.generateFrameNumbers('stweardess', {
        start: 0,
        end: -1,
      }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: 'intro-1-anim',
      frames: [
        {
          key: 'intro1-1',
          frame: 0,
        },
        {
          key: 'intro1-2',
          frame: 0,
        },
      ],
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: 'intro-2-anim',
      frames: [
        {
          key: 'intro2-00',
          frame: 0,
        },
        {
          key: 'intro2-02',
          frame: 0,
        },
        {
          key: 'intro2-04',
          frame: 0,
        },
        {
          key: 'intro2-06',
          frame: 0,
        },
        {
          key: 'intro2-08',
          frame: 0,
        },
        {
          key: 'intro2-11',
          frame: 0,
        },
        {
          key: 'intro2-12',
          frame: 0,
        },
      ],
      frameRate: 2,
      repeat: 0,
    });

    this.anims.create({
      key: 'intro-3-anim',
      frames: [
        {
          key: 'intro3-0',
          frame: 0,
        },
        {
          key: 'intro3-1',
          frame: 0,
        },
        {
          key: 'intro3-2',
          frame: 0,
        },
        {
          key: 'intro3-3',
          frame: 0,
        },
        {
          key: 'intro3-4',
          frame: 0,
        },
        {
          key: 'intro3-5',
          frame: 0,
        },
      ],
      frameRate: 2,
      repeat: 0,
    });

    this.anims.create({
      key: 'intro-3-anim-2',
      frames: [
        {
          key: 'intro3-0',
          frame: 0,
        },
        {
          key: 'intro3-1',
          frame: 0,
        },
        {
          key: 'intro3-2',
          frame: 0,
        },
      ],
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: 'sleep-anim',
      frames: [
        {
          key: 'sleep1',
          frame: 0,
        },
        {
          key: 'sleep2',
          frame: 0,
        },
      ],
      frameRate: 2,
      repeat: -1,
    });
  }

  public update(): void {
    if (shouldSkipIntro()) {
      this.changeScene();
      return;
    }

    if (!this.animStopped && this.timesLooped > 2) {
      this.playEndingAnimation();
    }
  }

  private showLoadingAnimation = () => {
    this.introImage = this.add.sprite(0, 0, 'intro', 11);
    this.introImage.setOrigin(0, 0);
    this.introImage.setDisplaySize(
      this.cameras.main.width,
      this.cameras.main.height
    );

    this.introImage.anims.play('intro-start');
    this.introImage.anims.chain('intro-loop');

    this.introImage.on(
      'animationrepeat',
      (animation: Phaser.Animations.Animation): void => {
        if (animation.key === 'intro-loop') {
          this.timesLooped += 1;
        }
      }
    );
  };

  private playEndingAnimation = () => {
    this.animStopped = true;
    this.introImage.anims.stop();
    this.introImage.anims.playReverse('intro-start');
    this.introImage.on('animationcomplete', this.changeScene);
  };

  private loadCreditsAssets = () => {
    this.load.image('credits_logo', loadAsset('images/credits/logo.png'));
    this.load.image(
      'credits_logo_hover',
      loadAsset('images/credits/logo_outline.png')
    );
    this.load.image(
      'credits_background',
      loadAsset('images/credits/gradient.png')
    );
    // eslint-disable-next-line no-restricted-syntax
    for (const { imageKey, imagePath } of TEAM) {
      this.load.image(imageKey, loadAsset(imagePath));
    }
  };

  private changeScene = () => {
    if (process.env.SKIP_INTRO2 === 'true') {
      this.scene.start('GameScene');
    } else {
      this.scene.start('IntroScene');
    }
  };
}
