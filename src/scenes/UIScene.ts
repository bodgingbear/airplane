import { AltitudeProvider } from "objects/altitudeProvider";

export class UIScene extends Phaser.Scene {
   alitudeProvider!: AltitudeProvider
    text!: Phaser.GameObjects.Text
    timer!: Phaser.GameObjects.Text

  public constructor() {
    super({
      key: 'UIScene',
    });
  }

  get description(): string { 
      return `ALTITUDE ${this.alitudeProvider.altitude.toString()}M`
  }

  get altitudeBackgroundColor(): string { 
      if (this.alitudeProvider.altitude > 6500) {
          return 'green'
      } else if (this.alitudeProvider.altitude > 3000) {
          return 'orange'
      } else {
          return 'red'
      }
  }

  timeValue: number = 0

  init({altitudeProvider}: {altitudeProvider: AltitudeProvider}) {
      this.alitudeProvider = altitudeProvider
  }

  public create(): void {
  this.text= this.add.text(25, 25, this.description).setFontSize(40)
  .setBackgroundColor(this.altitudeBackgroundColor);
  this.timer = this.add.text(25, 85, `Time: ${this.formatTime(0)}`)
  .setFontSize(40)
  .setBackgroundColor('black');

  this.time.addEvent({
      delay: 100,
      loop: true,
      callback: this.updateTimer
  })

  }

  updateTimer = () => {
    this.timer.setText(this.formatTime(this.timeValue+=100))
    this.text.setBackgroundColor(this.altitudeBackgroundColor);
  }

  formatTime = (time: number): string => {
      console.log(time);
      const seconds = Math.floor(time / 1000);
      if (seconds < 1) {
          return "00:00"
      } else if (seconds >= 1 && seconds < 60) {
        return seconds > 9 ? `00:${seconds}` : `00:0${seconds}`
      } else {
          let minutes = Math.floor(seconds / 60);
          let leftSeconds = seconds % 60 > 9 ? `${Math.floor(seconds % 60)}` : `0${Math.floor(seconds % 60)}`
          return `0${minutes}:${leftSeconds}`
      }
  }

  public update(): void {
    this.text.setText(this.description)
  }
}
