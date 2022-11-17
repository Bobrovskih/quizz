import { Component } from '../../helpers/component';
import './index.scss';
import template from './template.html';


export class QuestionButtonComponent extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.$root.innerText = this.state.caption;
  }
}
