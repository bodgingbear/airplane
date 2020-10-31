import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants';
import { Player } from 'objects/Player';

export class GameScene extends Phaser.Scene {
  player!: Player;

  public constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create(): void {
    this.player = new Player(this, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / 2);
  }

  public update(): void {
    this.player.update();
  }
}
