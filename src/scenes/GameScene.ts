import { isInDev } from 'isInDev';
import { Airplane } from 'objects/Airplane';
import { DiodeObstacle } from 'objects/DiodeObstacle';
import { FallingController } from 'objects/FallingController';
import { Player } from 'objects/Player';
import { ProximityController } from 'objects/ProximityController';
import { ScrewObstacle } from 'objects/ScrewObstacle';
import { SCREEN_HEIGHT, SCREEN_WIDTH, Vector2, ZOOM } from '../constants';
import { Slider } from 'objects/Slider';
import { SliderIndicator } from 'objects/SliderIndicator';

export class GameScene extends Phaser.Scene {
  player!: Player;

  proximityController!: ProximityController;

  fallingController!: FallingController;

  public constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create(): void {
    const planeOrigin = new Vector2(0, SCREEN_HEIGHT / 2);

    const airplane = new Airplane(this, planeOrigin.x, planeOrigin.y);
    const keys = this.input.keyboard.createCursorKeys();

    const diode = new DiodeObstacle(
      this,
      planeOrigin.x + 182,
      planeOrigin.y + 23,
      keys
    );

    const screw = new ScrewObstacle(
      this,
      planeOrigin.x + 30,
      planeOrigin.y + 12,
      keys
    )

    const slider = new Slider(
      this,
      planeOrigin.x + 135,
      planeOrigin.y + 17,
      keys
    )

    slider.setVisible(false);
    
  

    

    this.player = new Player(this, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / 2, keys);

    this.cameras.main
      .setZoom(ZOOM)
      .centerOn(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
      .startFollow(this.player.sprite)
      .setLerp(0.1, 0.1)
      .setBackgroundColor('#619CE1');

    this.proximityController = new ProximityController(this.player);
    this.proximityController.addObstacle(diode);
    this.proximityController.addObstacle(screw);
    this.proximityController.addObstacle(slider);
    

    this.fallingController = new FallingController(airplane, this.player);
    this.fallingController.on('player-off-airplane', () => {
      this.player.fallOffAirplane();
    });
    this.player.on('on-falling-end', () => this.scene.restart());

    this.cameras.main.shake(100 * 60 * 10, isInDev() ? 0 : 0.00005);

    const hullBounds = this.add.group(
      airplane.hullBounds
    )

    this.physics.add.collider(this.player.sprite, hullBounds)
  }

  public update(): void {
    this.player.update();
  this.proximityController.update();
    this.fallingController.update();
  }
}
