import { ZOOM } from 'constants';
import { FunctioningState, Obstacle } from './Obstacle';
import { SliderIndicator } from './SliderIndicator';

const SCREW_ZONE_SIDE = 20;

export class Slider implements Obstacle {
    slider: Phaser.GameObjects.Image;

    text: Phaser.GameObjects.Text;
  
    functioningState: FunctioningState = 'broken';
  
    isInPlayerProximity = false;

    private sliderIndicator: SliderIndicator


    get needsFix(): boolean {
      return this.functioningState !== 'working';
    }

    constructor(
        scene: Phaser.Scene,
        private x: number,
        private y: number,
        private keys: Phaser.Types.Input.Keyboard.CursorKeys,
      ) {
        this.slider = scene.add.image(x, y, 'slider').setScale(2 / ZOOM);
        
        this.sliderIndicator = new SliderIndicator(scene,x-5, y),
        this.sliderIndicator.setVisible(false);
        

        this.text = scene.add
          .text(x + 8, y - 8, `Press SPACE on the green zone to repair the flap`)
          .setVisible(false)
          .setScale(1 / ZOOM);
    
        keys.space?.on('down', () => {
          if (this.needsFix && this.isInPlayerProximity) {
            this.fix();
          }
        });
      }
      
  getID = () => {
    return `slider-${this.x}-${this.y}`;
  };

  

  fix = () => {
  
    this.functioningState = 'working';
    this.text.setVisible(false);

    this.sliderIndicator.Stop();
    
    let xd = this.sliderIndicator.GetCoordinates()[0];
    if (xd > this.x -1 && xd < this.x + 1 ){
      this.slider.setVisible(false);
      this.sliderIndicator.setVisible(false);
    }
  }

  markPlayerInProximity = () => {
    if (this.needsFix) {
      this.text.setVisible(true);
      this.isInPlayerProximity = true;
      this.setVisible(true);
      this.sliderIndicator.setVisible(true);
      this.sliderIndicator.Movement();
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
      this.x - SCREW_ZONE_SIDE / 2,
      this.y - SCREW_ZONE_SIDE / 2,
      SCREW_ZONE_SIDE,
      SCREW_ZONE_SIDE
    );  
  };

  setVisible = (visible: boolean) => {
    this.slider.setVisible(visible)
  }

}