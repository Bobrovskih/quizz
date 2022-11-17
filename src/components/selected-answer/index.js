import { Component } from '../../helpers/component';
import { AudioPlayerComponent } from '../audio-player';
import './index.scss';
import template from './template.html';

export class SelectedAnswerComponent extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.$row = this.query('.row');
    this.$image = this.query('.image');
    this.$name = this.query('.name');
    this.$species = this.query('.species');
    this.$player = this.query('.player');
    this.$description = this.query('.description');

    this.createPlayer();
    this.onUpdated();
  }

  onUpdated() {
    const { answer } = this.state;

    this.$image.src = answer.image;
    this.$name.innerText = answer.name;
    this.$species.innerText = answer.species;
    this.$description.innerText = answer.description;
  }

  createPlayer() {
    this.player = new AudioPlayerComponent();
    this.player.state = {
      src: this.state.answer.audio,
    };
    this.player.render(this.$player);
  }
}
