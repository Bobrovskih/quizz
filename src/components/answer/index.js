import { AnswerStatus } from '../../game/constants';
import { Component } from '../../helpers/component';
import './index.scss';
import template from './template.html';

export class AnswerComponent extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.$status = this.query('.status');
    this.$name = this.query('.name');

    this.onUpdated();

    this.$root.addEventListener('click', () => this.onClick());
  }

  onUpdated() {
    this.$status.classList.add(this.state.status);
    this.$name.innerText = this.state.name;
  }

  onClick() {
    if (this.state.status === AnswerStatus.NOT_USED) {
      this.emit('click', this.state);
    }
  }
}
