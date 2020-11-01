import { Sound } from 'sounds';
import { ZOOM } from '../constants';
import { FunctioningState, Obstacle } from './Obstacle';
import { ObstacleIndicator } from './ObstacleIndicator';

const SCREW_ZONE_SIDE = 20;

export class ScrewObstacle implements Obstacle {
  image: Phaser.GameObjects.Image;

  text: Phaser.GameObjects.Text;

  functioningState: FunctioningState = 'working';
  altitudeDecrease: number = 2;

  isInPlayerProximity = false;

  livesLeft = 10;

  indicator: ObstacleIndicator;

  get needsFix(): boolean {
    return this.functioningState !== 'working';
  }

  constructor(
    scene: Phaser.Scene,
    private x: number,
    private y: number,
    private keys: Phaser.Types.Input.Keyboard.CursorKeys
  ) {
    this.image = scene.add.image(x, y, 'screw5');

    this.text = scene.add
      .text(
        x + 8,
        y - 8,
        `Press SPACE ${this.livesLeft} times to screw the screw.`
      )
      .setVisible(false)
      .setScale(1 / ZOOM)
      .setBackgroundColor('#999999');

    keys.space?.on('down', () => {
      if (this.needsFix && this.isInPlayerProximity && this.livesLeft > 0) {
        this.livesLeft--;
        scene.sound.play(Sound.hammer);
        if (this.livesLeft === 9) {
          this.image.setTexture('screw1');
        }
        if (this.livesLeft === 7) {
          this.image.setTexture('screw2');
        }
        if (this.livesLeft === 5) {
          this.image.setTexture('screw3');
        }
        if (this.livesLeft === 3) {
          this.image.setTexture('screw4');
        }
        if (this.livesLeft === 0) {
          this.fix();
        }
      }
    });

    scene.sound.add(Sound.hammer);

    this.indicator = new ObstacleIndicator(scene, x, y - 5);
  }

  makeCritical() {
    this.functioningState = 'critical';
    this.indicator.indicateCritical();
  }

  break() {
    this.functioningState = 'broken';
    this.image.setTexture('screw1');
    this.indicator.indicateBroken();
  }

  getID = () => {
    return `screw-${this.x}-${this.y}`;
  };

  fix() {
    this.image.setTexture('screw5');
    this.functioningState = 'working';
    this.text.setVisible(false);
    this.livesLeft = 10;
    this.indicator.indicateFixed();
  }

  markPlayerInProximity = () => {
    this.isInPlayerProximity = true;

    if (this.needsFix) {
      this.text.setVisible(true);
    }
  };

  unmarkPlayerInProximity = () => {
    if (this.needsFix) {
      this.text.setVisible(false);
    }
    this.isInPlayerProximity = false;
  };

  getZoneBounds = (): Phaser.Geom.Rectangle => {
    return new Phaser.Geom.Rectangle(
      this.x - SCREW_ZONE_SIDE / 2,
      this.y - SCREW_ZONE_SIDE / 2,
      SCREW_ZONE_SIDE,
      SCREW_ZONE_SIDE
    );
  };

  update() {
    this.indicator.update();
  }
}
