import { ZOOM } from '../constants';
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
        this.slider = scene.add.image(x, y, 'slider').setScale(2 / ZOOM).setVisible(false)
        
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

  makeCritical() {
    this.functioningState = 'critical';
  }

  break() {
    this.functioningState = 'broken';
    this.slider.setTexture('slider');
  }

  fix = () => {
    let xd = this.sliderIndicator.GetCoordinates()[0];
    if (xd > this.x -1 && xd < this.x + 1 ){
      this.slider.setVisible(false);
      this.sliderIndicator.setVisible(false);
       
    this.functioningState = 'working';
    this.text.setVisible(false);
    }
    else{
      this.sliderIndicator.Movement();
    }
  }

  markPlayerInProximity = () => {
    this.isInPlayerProximity = true;
    if (this.needsFix) {
      this.text.setVisible(true);
    this.slider.setVisible(true)
      this.sliderIndicator.setVisible(true);
      this.sliderIndicator.Movement();
    }
  };

  unmarkPlayerInProximity = () => {
    if (this.needsFix) {
      this.text.setVisible(false);
    this.slider.setVisible(false)
    this.sliderIndicator.setVisible(false);


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

}

}