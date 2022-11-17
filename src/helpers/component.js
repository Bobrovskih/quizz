export class Component {
  constructor(options) {
    this._state = options.state || {};
    this._template = options.template;
    this._$parent;

    this._templateDom = document.createElement('div');
    this._templateDom.innerHTML = this._template;
  }

  set state(patch) {
    this._state = {
      ...this._state,
      ...patch,
    };
  }

  get state() {
    return this._state;
  }

  render(appendTo) {
    this._$parent = typeof appendTo === 'string'
      ? document.querySelector(appendTo)
      : appendTo;

    this.$root = this._templateDom.children[0];
    this._$parent.appendChild(this.$root);

    if (typeof this.onMounted === 'function') {
      this.onMounted();
    }
  }

  query(selector) {
    return this.$root.querySelector(selector);
  }

  queryAll(selector) {
   return this.$root.querySelectorAll(selector);
  }
}