import { Component } from '../../helpers/component';
import './index.scss';
import template from './template.html';
import playIcon from '../../assets/play-icon.svg';
import pauseIcon from '../../assets/pause-icon.svg';

export class AudioPlayerComponent extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.$playIcon = this.query('.play-icon');
    this.$time = this.query('#time');
    this.$currenTime = this.query('.current-time');
    this.$totalTime = this.query('.total-time');

    this.$playIcon.src = playIcon;

    this.audio = new Audio(this.state.src);
    this.isPlayed = false;

    this.$time.min = 0;

    this.$playIcon.addEventListener('click', () => {
      this.togglePlay();
    });

    this.audio.addEventListener('timeupdate', () => {
      console.log('timeupdate');
      this.$time.value = this.audio.currentTime;
      this.$currenTime.innerText = this.formatTime(this.audio.currentTime);
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.$time.max = this.audio.duration;
      this.$totalTime.innerText = this.formatTime(this.audio.duration);
    });

    this.$time.addEventListener('change', () => {
      this.audio.currentTime = parseInt(this.$time.value);
    });
  }

  togglePlay() {
    this.isPlayed ? this.audio.pause() : this.audio.play();
    this.$playIcon.src = this.isPlayed ? playIcon : pauseIcon;
    this.isPlayed = !this.isPlayed;
  }

  getCurrentTimePercent() {
    return this.audio.currentTime / this.audio.duration * 100;
  }

  formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);

    const minutes = String(m).padStart(2, '0');
    const seconds = String(s).padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
}
