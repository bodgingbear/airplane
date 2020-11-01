/* eslint-disable new-cap */
import { Sound } from '../sounds';
import { Obstacle } from './Obstacle';

export class ObstaclesSpawner {
  constructor(scene: Phaser.Scene, obstacles: Obstacle[]) {
    let easiness = 4;

    const callback = () => {
      const minNextSpawnTime = easiness * 2000;

      scene.time.addEvent({
        delay: Phaser.Math.Between(minNextSpawnTime, minNextSpawnTime + 3000),
        callback,
      });

      const workingObstacles = obstacles.filter(
        (obstacle) => obstacle.functioningState === 'working'
      );

      const brokenObstacles = obstacles.filter(
        (obstacle) => obstacle.functioningState === 'broken'
      );
      if (brokenObstacles.length > 0) {
        scene.sound.play(Sound.criticalWarning)
        brokenObstacles[0].makeCritical();
      }

      if (workingObstacles.length === 0) {
        return;
      }

      if (easiness > 2 && Math.random() * easiness < 50) {
        console.log(`Drop easiness: ${easiness}`);
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
