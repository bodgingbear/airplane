import { DiodeObstacle } from 'objects/DiodeObstacle';
import { Player } from 'objects/Player';
import { ProximityController } from 'objects/ProximityController';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';

export class GameScene extends Phaser.Scene {
  player!: Player;

  proximityController!: ProximityController;

  public constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create(): void {
    const keys = this.input.keyboard.createCursorKeys();

    const diode = new DiodeObstacle(
      this,
      SCREEN_WIDTH / 2 + 20,
      SCREEN_HEIGHT / 2 + 30,
      keys
    );

    this.player = new Player(this, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / 2, keys);

    this.proximityController = new ProximityController(this.player);
    this.proximityController.addObstacle(diode);
  }

  public update(): void {
    this.player.update();
    this.proximityController.update();
  }
}
