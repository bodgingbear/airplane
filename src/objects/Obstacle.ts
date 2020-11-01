export type FunctioningState = 'working' | 'broken' | 'critical';

export interface Obstacle {
  markPlayerInProximity: () => void;
  unmarkPlayerInProximity: () => void;

  getZoneBounds: () => Phaser.Geom.Rectangle;

  getID: () => string;

  break: () => void;

  makeCritical: () => void;

  functioningState: FunctioningState;
}
