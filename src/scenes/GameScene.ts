import { Airplane } from 'objects/Airplane';
import { Clouds } from 'objects/Clouds';
import { DiodeObstacle } from 'objects/DiodeObstacle';
import { FallingController } from 'objects/FallingController';
import { Player } from 'objects/Player';
import { ProximityController } from 'objects/ProximityController';
import { SCREEN_HEIGHT, SCREEN_WIDTH, Vector2, ZOOM } from '../constants';

export class GameScene extends Phaser.Scene {
  player!: Player;

  proximityController!: ProximityController;

  fallingController!: FallingController;

  planeBorders!: Phaser.Physics.Arcade.StaticGroup;

  public constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create(): void {
    const planeOrigin = new Vector2(0, SCREEN_HEIGHT / 2);

    const clouds = new Clouds(this, planeOrigin.x, planeOrigin.y);

    const airplane = new Airplane(this, planeOrigin.x, planeOrigin.y);
    const keys = this.input.keyboard.createCursorKeys();

    const diode = new DiodeObstacle(
      this,
      planeOrigin.x + 182,
      planeOrigin.y + 23,
      keys
    );

    this.player = new Player(this, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / 2, keys);

    this.cameras.main
      .setZoom(ZOOM)
      .centerOn(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
      .startFollow(this.player.sprite)
      .setLerp(0.1, 0.1)
      .setBackgroundColor('#619CE1');

    this.proximityController = new ProximityController(this.player);
    this.proximityController.addObstacle(diode);

    this.fallingController = new FallingController(airplane, this.player);
    this.fallingController.on('player-off-airplane', () => {
      this.player.fallOffAirplane();
    });
    this.player.on('on-falling-end', () => this.scene.restart());

    this.cameras.main.shake(10000, 0.00005);
  }

  public update(): void {
    this.player.update();
    this.proximityController.update();
    this.fallingController.update();
  }
}
