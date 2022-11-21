import { Component } from '../../helpers/component';
import './index.scss';
import template from './template.html';
import playIcon from '../../assets/play-icon.svg';
import pauseIcon from '../../assets/pause-icon.svg';
import volumeIcon from '../../assets/volume-icon.png';
import volumeMuteIcon from '../../assets/volume-mute-icon.png';

export class AudioPlayerComponent extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.$playButton = this.query('#play-button');
    this.$playIcon = this.query('.play-icon');
    this.$volumeButton = this.query('#volume-button');
    this.$volumeIcon = this.query('.volume-icon');
    this.$time = this.query('#time');
    this.$currenTime = this.query('.current-time');
    this.$totalTime = this.query('.total-time');
    this.$volume = this.query('#volume');
    this.$currentVolume = this.query('.current-volume');

    this.$playIcon.src = playIcon;
    this.$volumeIcon.src = volumeIcon;

    this.audio = new Audio(this.state.src);
    this.isPlayed = false;

    this.$time.min = 0;

    this.$volume.value = this.audio.volume * 100;

    this.$playButton.addEventListener('click', () => {
      this.togglePlay();
    });

    this.$volumeButton.addEventListener('click', () => {
      this.audio.volume = this.audio.volume ? 0 : 0.5;
    });

    this.audio.addEventListener('timeupdate', () => {
      this.$time.value = this.audio.currentTime;
      this.$currenTime.innerText = this.formatTime(this.audio.currentTime);
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.$time.max = this.audio.duration;
      this.$totalTime.innerText = this.formatTime(this.audio.duration);
      this.updateVolumeText();
    });

    this.$time.addEventListener('change', () => {
      this.audio.currentTime = parseInt(this.$time.value);
    });

    this.$volume.addEventListener('change', () => {
      const value = parseInt(this.$volume.value) / 100;
      this.audio.volume = value;
    });

    this.audio.addEventListener('volumechange', () => {
      this.$volume.value = parseInt(this.audio.volume * 100);
      this.updateVolumeText();

      this.$volumeIcon.src = this.audio.volume === 0 
        ? volumeMuteIcon
        : volumeIcon;
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

  updateVolumeText() {
    this.$currentVolume.innerText = Math.floor(this.audio.volume * 100) + '%';
  }
}
