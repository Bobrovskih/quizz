import { Component } from '../helpers/component';
import { router, ROUTER_PATHS } from '../helpers/router';
import './index.scss';
import template from './template.html';

export class StartPage extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.query('#play').addEventListener('click', () => {
      router.setPage(ROUTER_PATHS.GAME);
    });
  }
}
