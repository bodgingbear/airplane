import { loadAsset } from 'packages/utils';
import { shouldSkipIntro } from 'packages/utils/shouldSkipIntro';
import { Sound } from 'sounds';

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
      frameWidth: 7,
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
    this.load.image('clouds', 'images/clouds.png');
    this.load.image('warning', 'images/warning.png');
    this.load.image('warning2', 'images/warning2.png');

    // MARK: Audio

    for (const soundName in Sound) {
      this.load.audio(soundName, `audio/${soundName}.mp3`);
    }
  }

  public preload(): void {
    if (!shouldSkipIntro()) {
      this.showLoadingAnimation();
    }

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

  private changeScene = () => {
    this.scene.start('GameScene');
  };
}
