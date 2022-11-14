import { Component } from '../helpers/component';
import { router } from '../helpers/router';
import './index.scss';
import template from './template.html';


export class RootComponent extends Component {
  constructor() {
    super({ state: {}, template, appendTo: '#app' });
  }

  updateComponent(page) {
    const component = new page.component();
    document.querySelector('#router').innerHTML = '';
    component.render('#router');
  }

  onMounted() {
    console.log('on mounted');
    this.updateComponent(router.getCurrentPage());

    router.onChange((page) => {
      this.updateComponent(page);
    });
  }
}
