import { ZOOM } from 'constants';
import { FunctioningState, Obstacle } from './Obstacle';

const DIODE_ZONE_SIDE = 100;

export class DiodeObstacle implements Obstacle {
  image: Phaser.GameObjects.Image;

  text: Phaser.GameObjects.Text;

  functioningState: FunctioningState = 'broken';

  isInPlayerProximity = false;

  get needsFix(): boolean {
    return this.functioningState !== 'working';
  }

  constructor(
    scene: Phaser.Scene,
    private x: number,
    private y: number,
    private keys: Phaser.Types.Input.Keyboard.CursorKeys
  ) {
    this.image = scene.add.image(x, y, 'diode-red');

    this.text = scene.add
      .text(x + 5, y - 5, 'Press SPACE to fix the diode.')
      .setVisible(false)
      .setScale(1 / ZOOM);

    keys.space?.on('down', () => {
      if (this.needsFix && this.isInPlayerProximity) {
        this.fix();
      }
    });
  }

  getID = () => {
    return `diode-${this.x}-${this.y}`;
  };

  fix() {
    this.image.setTexture('diode-green');
    this.functioningState = 'working';
    this.text.setVisible(false);
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
      this.x,
      this.y,
      DIODE_ZONE_SIDE,
      DIODE_ZONE_SIDE
    );
  };
}
