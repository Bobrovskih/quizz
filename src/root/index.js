import { Component } from '../helpers/component';
import { router } from '../helpers/router';
import './index.scss';
import template from './template.html';
import { translate } from '../translate/service';


export class RootComponent extends Component {
  constructor() {
    super({ state: {}, template });
  }

  updateComponent(page) {
    const prevComponent = this.component;

    this.component = new page.component();
    if (prevComponent) {
      prevComponent.destroy();
    }
    this.component.render(this.$router);
  }

  onMounted() {
    this.$navItems = this.queryAll('.nav-item');
    this.$router = this.query('#router');
    this.$lang = this.query('.lang');
    this.$navStart = this.query('[data-route="start"]');
    this.$navGame = this.query('[data-route="game"]');

    this.updateComponent(router.getCurrentPage());

    router.onChange((page) => {
      this.updateComponent(page);
      this.updateActiveNav();
    });

    this.$lang.addEventListener('click', () => {
      translate.lang = translate.getAvailable();
      window.location.reload();
    });

    this.$lang.innerText = translate.getAvailable();

    this.$navStart.innerText = translate.t('Главная');
    this.$navGame.innerText = translate.t('Игра');

    this.registerEvents();
  }

  registerEvents() {
    this.$navItems.forEach((navItem) => {
      navItem.addEventListener('click', (event) => this.onNavItemClick(event));
    });
  }

  updateActiveNav() {
    this.$navItems.forEach((navItem) => {
      const name = navItem.dataset.route;
      if (name === router.getCurrentPage().name) {
        navItem.classList.add('active');
      } else {
        navItem.classList.remove('active');
      }
    });
  }

  onNavItemClick(event) {
    const name = event.target.dataset.route;
    router.setPage(name);
  }
}
