/* eslint-disable new-cap */
import { EventEmitter } from 'packages/utils';
import { Rectangle } from '../constants';
import { Airplane } from './Airplane';
import { Player } from './Player';

export class FallingController extends EventEmitter<'player-off-airplane' | 'player-entered-airplane' | 'player-exit-airplane'> {
  alreadyEmittedFall = false;
  isInAirplane = true

  constructor(private airplane: Airplane, private player: Player) {
    super();
  }

  update() {
    const isPlayerOnWing = this.airplane
      .getWingsBounds()
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

    const isPlayerInAirplane = this.airplane
    .getHullBounds()
    .some((bound) => 
      Phaser.Geom.Intersects.RectangleToRectangle(
       bound,
       this.player.getBounds() 
      )
    );

    const isOutsidePlane = (!isPlayerOnWing && !isPlayerInAirplane)

    if (isOutsidePlane && !this.alreadyEmittedFall) {
      this.alreadyEmittedFall = true;
      this.emit('player-off-airplane');
    } else if (isPlayerInAirplane && !this.isInAirplane) {
      this.emit('player-entered-airplane');
      this.isInAirplane = true
    } else if (this.isInAirplane && !isPlayerInAirplane) {
      this.emit('player-exit-airplane');
      this.isInAirplane = false
    }

  }
}
