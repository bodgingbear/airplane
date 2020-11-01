/* eslint-disable new-cap */
import { BogdanVoice } from 'sounds';
import { Obstacle } from './Obstacle';

export class ObstaclesSpawner {

  constructor(scene: Phaser.Scene, obstacles: Obstacle[]) {
    let easiness = 10;

    for (const voice in BogdanVoice) { 
      scene.sound.add(voice);
    }

    const callback = () => {
      const minNextSpawnTime = easiness * 2000;

      scene.time.addEvent({
        delay: Phaser.Math.Between(minNextSpawnTime, minNextSpawnTime + 3000),
        callback,
      });

      const workingObstacles = obstacles.filter(
        (obstacle) => obstacle.functioningState === 'working'
      );

      if (workingObstacles.length === 0) {
        return;
      }

      if (easiness > 6 && Math.random() * easiness < 50) {
        console.log(`Drop easiness: ${easiness}`);
        easiness--;
      }

      const obstacle =
        workingObstacles[Phaser.Math.Between(0, workingObstacles.length - 1)];

      scene.sound.play(`bogdan${Phaser.Math.Between(0, 4)}`);
      obstacle.break();
    };

    scene.time.addEvent({
      delay: 2000,
      callback,
    });
  }
}
