/* eslint-disable new-cap */
import { Obstacle } from './Obstacle';

export class ObstaclesSpawner {
  constructor(scene: Phaser.Scene, obstacles: Obstacle[]) {
    let easiness = 10;

    const callback = () => {
      scene.time.addEvent({
        delay: Phaser.Math.Between(easiness * 1000, easiness * 1000 + 3000),
        callback,
      });

      const workingObstacles = obstacles.filter(
        (obstacle) => obstacle.functioningState === 'working'
      );

      if (workingObstacles.length === 0) {
        return;
      }

      if (easiness > 6 && Math.random() < 0.6) {
        easiness--;
      }

      const obstacle =
        workingObstacles[Phaser.Math.Between(0, workingObstacles.length - 1)];

      obstacle.break();
    };

    scene.time.addEvent({
      delay: 2000,
      callback,
    });
  }
}
