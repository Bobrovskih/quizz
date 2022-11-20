import { Component } from '../../helpers/component';
import './index.scss';
import template from './template.html';

export class AudioPlayerComponent extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.$audio = this.query('audio');

    this.$audio.src = this.state.src;
  }
}