import './index.scss';
import template from './template.html';


export class StartPageComponent extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = template;
  }
}
