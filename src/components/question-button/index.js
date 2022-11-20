import { Component } from '../../helpers/component';
import './index.scss';
import template from './template.html';

export class QuestionButtonComponent extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.onUpdated();
  }

  onUpdated() {
    this.$root.innerText = this.state.caption;
    this.$root.classList.toggle('active', this.state.isActive);
  }
}
