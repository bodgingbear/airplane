import { DiodeObstacle } from 'objects/DiodeObstacle';
import { Player } from 'objects/Player';
import { ProximityController } from 'objects/ProximityController';
import { SCREEN_HEIGHT, SCREEN_WIDTH, Vector2, ZOOM } from '../constants';

export class GameScene extends Phaser.Scene {
  player!: Player;

  proximityController!: ProximityController;

  public constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create(): void {
    const planeOrigin = new Vector2(0, SCREEN_HEIGHT / 2);

    this.add.image(planeOrigin.x, planeOrigin.y, 'plane');

    const keys = this.input.keyboard.createCursorKeys();

    const diode = new DiodeObstacle(
      this,
      planeOrigin.x + 180,
      planeOrigin.y + 23,
      keys
    );

    this.player = new Player(this, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / 2, keys);

    this.cameras.main
      .setZoom(ZOOM)
      .centerOn(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
      .startFollow(this.player.sprite)
      .setLerp(0.1, 0.1);

    this.proximityController = new ProximityController(this.player);
    this.proximityController.addObstacle(diode);
  }

  public update(): void {
    this.player.update();
    this.proximityController.update();
  }
}
