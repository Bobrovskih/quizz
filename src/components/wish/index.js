import { Component } from '../../helpers/component';
import './index.scss';
import template from './template.html';

export class WishComponent extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.$image = this.query('.image');
    this.$name = this.query('.name');

    this.$image.src = this.state.image;
    this.$name.innerText = this.state.name;
  }

  onUpdated() {
    console.log('wish on updated');
  }
}
