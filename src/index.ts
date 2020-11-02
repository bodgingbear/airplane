import 'phaser';

import './index.css';

import { UIScene } from 'scenes/UIScene';
import { IntroScene } from 'scenes/IntroScene';
import { MainMenuScene } from 'scenes/MainMenuScene';
import { BootScene } from './scenes/BootScene';
import { LoadingScene } from './scenes/LoadingScene';
import { GameScene } from './scenes/GameScene';
import { DeadScene } from './scenes/DeadScene';
import { CreditsScene } from './scenes/CreditsScene';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  banner: true,
  width: 1920,
  height: 1080,
  scene: [
    BootScene,
    LoadingScene,
    GameScene,
    UIScene,
    IntroScene,
    DeadScene,
    CreditsScene,
    MainMenuScene,
  ],
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
