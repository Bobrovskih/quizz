import { Component } from '../../helpers/component';
import { AudioPlayerComponent } from '../audio-player';
import './index.scss';
import template from './template.html';

export class WishComponent extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.$image = this.query('.image');
    this.$name = this.query('.name');
    this.$player = this.query('.player');

    this.$image.src = this.state.image;
    this.$name.innerText = this.state.name;

    this.createAudioPlayer();
  }

  onUpdated() {
    console.log('wish on updated');
  }

  createAudioPlayer() {
    this.audioPlayer = new AudioPlayerComponent();
    this.audioPlayer.state = {
      src: this.state.audio,
    };
    this.audioPlayer.render(this.$player);
  }
}
