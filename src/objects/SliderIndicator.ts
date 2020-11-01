import { ZOOM } from 'constants';
import { FunctioningState, Obstacle } from './Obstacle';

const SCREW_ZONE_SIDE = 20;

export class SliderIndicator {
  sliderIndicator: Phaser.GameObjects.Image;

  scene: Phaser.Scene;

  tween?: Phaser.Tweens.Tween;

  constructor(
    scene: Phaser.Scene,
    private x: number,

    private y: number
  ) {
    this.sliderIndicator = scene.add
      .image(x, y, 'slider-indicator')
      .setScale(2 / ZOOM)
      .setTintFill(0x0000ff); // 5 pixels
    this.scene = scene;
  }

  getID = () => {
    return `slider-indicator-${this.x}-${this.y}`;
  };

  Movement = () => {
    if (this.tween) {
      this.tween.stop();
    }

    const duration = 750;

    this.tween = this.scene.tweens.add({
      targets: this.sliderIndicator,
      x: { from: this.x, to: this.x + 10 },
      repeat: -1,
      duration,
      yoyo: true,
    });
  };

  Stop() {
    this.tween?.stop();
  }

  GetCoordinates = () => {
    return [this.sliderIndicator.x, this.sliderIndicator.y];
  };

  setVisible = (visible: boolean) => {
    this.sliderIndicator.setVisible(visible);
  };
}
