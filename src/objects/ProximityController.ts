/* eslint-disable new-cap */
import { Obstacle } from './Obstacle';
import { Player } from './Player';

export class ProximityController {
  obstacles: Obstacle[] = [];

  obstaclesWithPlayer: Set<string> = new Set();

  constructor(private player: Player) {}

  addObstacle(obstacle: Obstacle) {
    this.obstacles.push(obstacle);
  }

  update() {
    const obstaclesInProximity = this.obstacles.filter((obstacle) =>
      Phaser.Geom.Intersects.RectangleToRectangle(
        obstacle.getZoneBounds(),
        this.player.getBounds()
      )
    );

    const obstaclesNotInProximity = this.obstacles.filter(
      (obstacle) =>
        !Phaser.Geom.Intersects.RectangleToRectangle(
          obstacle.getZoneBounds(),
          this.player.getBounds()
        )
    );

    obstaclesInProximity.forEach((obstacle) => {
      if (!this.obstaclesWithPlayer.has(obstacle.getID())) {
        obstacle.markPlayerInProximity();
      }
    });

    obstaclesNotInProximity.forEach((obstacle) => {
      if (this.obstaclesWithPlayer.has(obstacle.getID())) {
        obstacle.unmarkPlayerInProximity();
      }
    });

    this.obstaclesWithPlayer = new Set(
      obstaclesInProximity.map((obstacle) => obstacle.getID())
    );
  }
}
