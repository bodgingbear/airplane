import { AltitudeProvider } from "objects/altitudeProvider";

export class UIScene extends Phaser.Scene {
   alitudeProvider!: AltitudeProvider
    text!: Phaser.GameObjects.Text
  public constructor() {
    super({
      key: 'UIScene',
    });
  }

  get description(): string { 
      return `ALTITUDE ${this.alitudeProvider.altitude.toString()}`
  }

  init({altitudeProvider}: {altitudeProvider: AltitudeProvider}) {
      this.alitudeProvider = altitudeProvider
  }

  public create(): void {
  this.text= this.add.text(25, 25, this.description).setFontSize(40)
  }

  public update(): void {
    this.text.setText(this.description)
  }
}
