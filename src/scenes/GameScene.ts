import { isInDev } from 'isInDev';
import { Airplane } from 'objects/Airplane';
import { Clouds } from 'objects/Clouds';
import { DiodeObstacle } from 'objects/DiodeObstacle';
import { FallingController } from 'objects/FallingController';
import { Player } from 'objects/Player';
import { Stweardess } from 'objects/Stweardess';
import { ProximityController } from 'objects/ProximityController';
import { ScrewObstacle } from 'objects/ScrewObstacle';
import { ObstaclesSpawner } from 'objects/ObstaclesSpawner';
import { Obstacle } from 'objects/Obstacle';
import { AltitudeProvider } from 'objects/AltitudeProvider';
import { Slider } from 'objects/Slider';
import { Sound } from 'sounds';
import { SCREEN_HEIGHT, SCREEN_WIDTH, Vector2, ZOOM } from '../constants';

export class GameScene extends Phaser.Scene {
  player!: Player;

  stweardess!: Stweardess;

  proximityController!: ProximityController;

  fallingController!: FallingController;

  obstacles!: Obstacle[];

  altitudeProvider!: AltitudeProvider;

  ending = false;

  get characters(): Phaser.GameObjects.Sprite[] {
    return [this.player.sprite, this.stweardess.sprite];
  }

  public constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create(): void {
    this.ending = false;
    const noise = this.sound.add(Sound.noises, {
      loop: true,
    });

    noise.play();

    const planeOrigin = new Vector2(0, SCREEN_HEIGHT / 2);

    new Clouds(this);

    const airplane = new Airplane(this, planeOrigin.x, planeOrigin.y);
    const keys = this.input.keyboard.createCursorKeys();

    this.obstacles = [
      new DiodeObstacle(
        this,
        planeOrigin.x + 182,
        planeOrigin.y + 23,
        keys,
        'right'
      ),
      new DiodeObstacle(
        this,
        planeOrigin.x - 182,
        planeOrigin.y + 23,
        keys,
        'left'
      ),

      new ScrewObstacle(
        this,
        planeOrigin.x + 30,
        planeOrigin.y + 12,
        keys,
        'right'
      ),
      new ScrewObstacle(
        this,
        planeOrigin.x - 30,
        planeOrigin.y + 12,
        keys,
        'left'
      ),
      new Slider(this, planeOrigin.x + 56, planeOrigin.y - 13, keys),
      new Slider(this, planeOrigin.x - 56, planeOrigin.y - 13, keys),
    ];

    this.player = new Player(
      this,
      SCREEN_WIDTH / 2 - 80,
      SCREEN_HEIGHT / 2,
      keys
    );

    this.stweardess = new Stweardess(
      this,
      SCREEN_WIDTH / 2 - 80,
      SCREEN_HEIGHT / 2 - 50
    );

    this.physics.add.collider(this.player.sprite, this.stweardess.sprite);

    this.cameras.main
      .setZoom(ZOOM)
      .centerOn(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
      .startFollow(this.player.sprite)
      .setLerp(0.1, 0.1)
      .setBackgroundColor('#619CE1');

    this.proximityController = new ProximityController(this.player);

    this.obstacles.forEach((obstacle) => {
      this.proximityController.addObstacle(obstacle);
    });

    this.altitudeProvider = new AltitudeProvider(this, this.obstacles);

    this.altitudeProvider.on('plane-crashed', this.endGame);

    this.fallingController = new FallingController(airplane, this.player, this);
    this.fallingController.on('player-off-airplane', () => {
      this.player.fallOffAirplane();
    });
    this.fallingController.on('player-entered-airplane', () => {
      this.player.enterAirplane();
      this.cameras.main.shakeEffect.effectComplete();
    });
    this.fallingController.on('player-exit-airplane', () => {
      this.player.exitAirplane();
      this.cameras.main.shake(100 * 60 * 10, isInDev() ? 0 : 0.00005);
    });
    this.player.on('on-falling-end', this.endGame);

    const hullBounds = this.add.group(airplane.hullBounds);

    this.characters.forEach((character) => {
      this.physics.add.collider(character, hullBounds);
    });

    this.physics.add.collider(this.player.sprite, hullBounds);

    new ObstaclesSpawner(this, this.obstacles);

    this.scene.run('UIScene', {
      altitudeProvider: this.altitudeProvider,
    });
  }

  endGame = () => {
    if (this.ending) {
      return;
    }

    this.ending = true;
    this.cameras.main.fadeOut(1000, 0, 0, 0);

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.stop();
        this.scene.stop('UIScene');
        this.scene.start('DeadScene');
      }
    );
  };

  public update(): void {
    this.player.update();
    this.stweardess.update();
    this.proximityController.update();
    this.fallingController.update();
    this.obstacles.forEach((obs) => obs.update());
  }
}
