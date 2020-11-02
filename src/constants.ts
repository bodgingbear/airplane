import { TeamMemberData } from 'packages/credits';

export const ZOOM = 8;
export const SCREEN_WIDTH = 1280 / ZOOM;
export const SCREEN_HEIGHT = 720 / ZOOM;
export const { Vector2 } = Phaser.Math;
export const { Rectangle } = Phaser.Geom;

export const TEAM: TeamMemberData[] = [
  {
    name: 'Kacper Pietrzak',
    role: 'Programming',
    imageKey: 'kacper_credits',
    imagePath: 'images/credits/kacper.png',
  },
  {
    name: 'Bartek Legiec',
    role: 'Programming & Art',
    imageKey: 'bartek_credits',
    imagePath: 'images/credits/bartek.png',
  },
  {
    name: 'Piotrek Szadkowski',
    role: 'Programming',
    imageKey: 'piotrek_credits',
    imagePath: 'images/credits/piotrek.png',
  },
  {
    name: 'Bogdan Bankowski',
    role: 'Programming',
    imageKey: 'kacper_credits',
    imagePath: 'images/credits/kacper.png',
  },
  {
    name: 'Kuba Pietrzak',
    role: 'Sounds & QA',
    imageKey: 'kuba_credits',
    imagePath: 'images/credits/kuba.png',
  },
  {
    name: 'Maciek Wójcik',
    role: 'Ideation',
    imageKey: 'maciek_credits',
    imagePath: 'images/credits/maciek.png',
  },
];
