import { ZOOM } from '../constants';
import { FunctioningState, Obstacle } from './Obstacle';
import { Sound } from '../sounds';
import { ObstacleIndicator } from './ObstacleIndicator';
import { isInDev } from 'isInDev';

const DIODE_ZONE_SIDE = 20;

export class DiodeObstacle implements Obstacle {
  image: Phaser.GameObjects.Image;

  text: Phaser.GameObjects.Text;

  functioningState: FunctioningState = 'working';

  altitudeDecrease: number = 5;

  isInPlayerProximity = false;

  indicator: ObstacleIndicator;

  get needsFix(): boolean {
    return this.functioningState !== 'working';
  }

  constructor(
    private scene: Phaser.Scene,
    private x: number,
    private y: number,
    private keys: Phaser.Types.Input.Keyboard.CursorKeys,
    textSide: 'right' | 'left'
  ) {
    this.image = scene.add.image(x, y, 'diode');

    this.text = scene.add
      .text(
        x + (textSide === 'right' ? 8 : -8),
        y - 8,
        'Press SPACE to fix the diode.'
      )
      .setVisible(false)
      .setBackgroundColor('black')
      .setDepth(5)
      .setScale(1 / ZOOM);

    keys.space?.on('down', () => {
      if (this.needsFix && this.isInPlayerProximity) {
        this.fix();
      }
    });

    scene.sound.add(Sound.diode);

    const bound = this.getZoneBounds()
    scene.add.rectangle(bound.x, bound.y, bound.width, bound.height, 0xff0000, isInDev() ? 0.5 : 0).setOrigin(0)


    this.indicator = new ObstacleIndicator(scene, x, y);
  }

  makeCritical() {
    this.functioningState = 'critical';
    this.indicator.indicateCritical();
  }

  break() {
    this.functioningState = 'broken';
    this.image.setTexture('diode-off');
    this.indicator.indicateBroken();

    if (this.isInPlayerProximity) {
      this.text.setVisible(true);
    }
  }

  getID = () => {
    return `diode-${this.x}-${this.y}`;
  };

  fix() {
    this.image.setTexture('diode');
    this.functioningState = 'working';
    this.text.setVisible(false);
    this.scene.sound.play(Sound.diode);
    this.indicator.indicateFixed();
  }

  markPlayerInProximity = () => {
    if (this.needsFix) {
      this.text.setVisible(true);
      this.isInPlayerProximity = true;
    }
  };

  unmarkPlayerInProximity = () => {
    if (this.needsFix) {
      this.text.setVisible(false);
      this.isInPlayerProximity = false;
    }
  };

  getZoneBounds = (): Phaser.Geom.Rectangle => {
    return new Phaser.Geom.Rectangle(
      this.x - DIODE_ZONE_SIDE / 2,
      this.y - DIODE_ZONE_SIDE / 2,
      DIODE_ZONE_SIDE,
      DIODE_ZONE_SIDE
    );
  };

  update() {
    this.indicator.update();
  }
}
