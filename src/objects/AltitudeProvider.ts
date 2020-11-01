import { EventEmitter } from 'packages/utils';
import { SCREEN_HEIGHT, SCREEN_WIDTH, ZOOM } from '../constants';

import { Obstacle } from './Obstacle';

export class AltitudeProvider extends EventEmitter<'plane-crashed'> {
  altitude: number;

  constructor(
    private scene: Phaser.Scene,
    private obstacles: Obstacle[],
    private initialAltitude: number = 12000
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
