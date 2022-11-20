import { Component } from '../helpers/component';
import { router, ROUTER_PATHS } from '../helpers/router';
import { translate } from '../translate/service';
import './index.scss';
import template from './template.html';

export class StartPage extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.$play = this.query('#play');
    this.$text = this.query('.text');

    this.$play.addEventListener('click', () => {
      router.setPage(ROUTER_PATHS.GAME);
    });

    this.$text.innerText = translate.t('Птицы');
  }
}
