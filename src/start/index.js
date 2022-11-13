import './index.scss';
import template from './template.html';


export class StartPageComponent extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = template;
  }


  connectedCallback() {
    console.log('connectedCallback', this);
    this.querySelectorAll('.category').forEach((element) => {
      element.addEventListener('click', this.onCategoryClick);
    });
  }

  disconnectedCallback() {
    // remove all listeners
  }

  onCategoryClick(event) {
    const category = event.target.dataset.category;
    console.log('click', category);
  }
}
