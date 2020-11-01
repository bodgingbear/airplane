import { EventEmitter } from 'packages/utils';

import { Obstacle } from './Obstacle';

export class AltitudeProvider extends EventEmitter<'plane-crashed'> {
  altitude: number;

  constructor(
    scene: Phaser.Scene,
    private obstacles: Obstacle[],
    initialAltitude: number = 8000
  ) {
    super();
    this.altitude = initialAltitude;

    scene.time.addEvent({
      delay: 120,
      loop: true,
      callback: this.checkObstacles,
    });
  }

  checkObstacles = () => {
    if (this.altitude <= 0) {
      this.emit('plane-crashed');
      return;
    }

    this.altitude -= Math.floor(
      this.obstacles
        .filter(
          (obstacle) =>
            obstacle.functioningState === 'broken' ||
            obstacle.functioningState === 'critical'
        )
        .map((obstacle) => {
          return obstacle.functioningState === 'critical'
            ? obstacle.altitudeDecrease * 2.5
            : obstacle.altitudeDecrease;
        })
        .reduce((sum, current) => {
          return sum + current;
        }, 0)
    );

    this.altitude -= this.obstacles
      .filter((obstacle) => obstacle.functioningState === 'broken')
      .map((obstacle) => {
        return obstacle.altitudeDecrease;
      })
      .reduce((sum, current) => {
        return sum + current;
      }, 0);
  };
}
