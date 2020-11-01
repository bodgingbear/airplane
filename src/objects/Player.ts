import { EventEmitter } from 'packages/utils';
import { Vector2 } from '../constants';
import { isInDev } from '../isInDev';

const PLAYER_COUNTER_WIND_JUMP_Y = 2;
const WIND_Y_VELOCITY = isInDev() ? 0 : 10;

const PLAYER_VELOCITY = 20;

export class Player extends EventEmitter<'on-falling-end'> {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.Sprite;

  debugRect: Phaser.GameObjects.Rectangle;

  current_wind_y_velocity: number = 0;

  constructor(
    private scene: Phaser.Scene,
    x: number,
    y: number,
    private keys: Phaser.Types.Input.Keyboard.CursorKeys
  ) {
    super();
    this.sprite = scene.add.sprite(x, y, 'player');
    scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

    if (!isInDev()) {
      this.keys.up?.on('down', () => {
        this.sprite.setY(this.sprite.y - PLAYER_COUNTER_WIND_JUMP_Y);
      });

      this.keys.down?.on('down', () => {
        this.sprite.setY(this.sprite.y + PLAYER_COUNTER_WIND_JUMP_Y);
      });
    }

    this.sprite.anims.play('player-walk');

    const bound = this.getBounds();

    this.debugRect = scene.add
      .rectangle(bound.x, bound.y, bound.width, bound.height, 0x00ff00)
      .setOrigin(0)
      .setAlpha(0.5);
  }

  update() {
    const velocity = new Vector2(0, 0);

    velocity.add(new Vector2(0, this.current_wind_y_velocity));

    if (this.keys.left?.isDown) {
      velocity.subtract(new Vector2(PLAYER_VELOCITY, 0));
    }

    if (this.keys.right?.isDown) {
      velocity.add(new Vector2(PLAYER_VELOCITY, 0));
    }

    if (isInDev() || this.current_wind_y_velocity === 0) {
      if (this.keys.up?.isDown) {
        velocity.subtract(new Vector2(0, PLAYER_VELOCITY * 1.5));
      }

      if (this.keys.down?.isDown) {
        velocity.add(new Vector2(0, PLAYER_VELOCITY * 1.5));
      }
    }

    if (velocity.x !== 0) {
      this.sprite.flipX = velocity.x > 0;
    }

    this.body.velocity.set(velocity.x, velocity.y);

    const bound = this.getBounds();

    this.debugRect.setPosition(bound.x, bound.y);
  }

  getBounds = (): Phaser.Geom.Rectangle =>
    new Phaser.Geom.Rectangle(
      this.sprite.getTopLeft().x,
      this.sprite.getTopLeft().y,
      this.sprite.displayWidth,
      this.sprite.displayHeight
    );

  fallOffAirplane = () => {
    const duration = 2000;
    this.scene.cameras.main.shake(2000, 0.0005);
    this.scene.tweens.add({
      targets: this.sprite,
      angle: { from: 0, to: 360 },
      duration,
    });

    this.scene.tweens.add({
      targets: this.sprite,
      y: { from: this.sprite.y, to: this.sprite.y + 500 },
      duration,
      onComplete: () => {
        this.emit('on-falling-end');
      },
    });
  };

  enterAirplane = () => {
    this.current_wind_y_velocity = Math.max(this.current_wind_y_velocity - WIND_Y_VELOCITY, 0)
  }

  exitAirplane = () => {
    this.current_wind_y_velocity = Math.min(this.current_wind_y_velocity + WIND_Y_VELOCITY, WIND_Y_VELOCITY)
  }
}

// const particlesGroup = this.scene.add.group(
//   this.particles.map((particle) => particle.gameObject)
// );

// this.scene.physics.add.collider(particlesGroup, particlesGroup);
// this.scene.physics.add.collider(this.bar, particlesGroup);
// this.scene.physics.add.collider(this.bar, particlesGroup);

// this.scene.physics.world.on('worldbounds', this.onParticlesBoundCollision);
