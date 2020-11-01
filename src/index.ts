import 'phaser';

import './index.css';

import { BootScene } from './scenes/BootScene';
import { LoadingScene } from './scenes/LoadingScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { GameScene } from './scenes/GameScene';
import { UIScene } from 'scenes/UIScene';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  banner: true,
  width: 1920,
  height: 1080,
  scene: [BootScene, LoadingScene, MainMenuScene, GameScene, UIScene],
  scale: {
    parent: 'app',
    mode: Phaser.Scale.FIT,
    width: 1280,
    height: 720,
  },
  zoom: 0.1,
  physics: {
    default: 'arcade',
  },
});

window.addEventListener('load', (): Phaser.Game => game);
