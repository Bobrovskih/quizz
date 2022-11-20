import { Component } from '../helpers/component';
import { router } from '../helpers/router';
import './index.scss';
import template from './template.html';


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

    this.updateComponent(router.getCurrentPage());

    router.onChange((page) => {
      this.updateComponent(page);
      this.updateActiveNav();
    });

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
