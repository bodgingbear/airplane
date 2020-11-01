/* eslint-disable new-cap */
import { EventEmitter } from 'packages/utils';
import { Rectangle } from '../constants';
import { Airplane } from './Airplane';
import { Player } from './Player';

export class FallingController extends EventEmitter<'player-off-airplane'> {
  alreadyEmitted = false;

  constructor(private airplane: Airplane, private player: Player) {
    super();
  }

  update() {
    const isPlayerOnAirplane = this.airplane
      .getBounds()
      .some((bound) =>
        Phaser.Geom.Intersects.RectangleToRectangle(
          bound,
          new Rectangle(
            this.player.getBounds().x,
            this.player.getBounds().bottom - 4,
            this.player.getBounds().width,
            4
          )
        )
      );

    if (!isPlayerOnAirplane && !this.alreadyEmitted) {
      this.alreadyEmitted = true;
      this.emit('player-off-airplane');
    }
  }
}
