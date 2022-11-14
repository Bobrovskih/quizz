export class Component {
  constructor(options) {
    this._state = options.state || {};
    this._template = options.template;
    this._$root;
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
    this._$root = document.querySelector(appendTo);
    this._$root.innerHTML = this._template;

    if (typeof this.onMounted === 'function') {
      this.onMounted();
    }
  }
  
  query(selector) {
    return this._$root.querySelector(selector);
  }

  queryAll(selector) {
    return this._$root.querySelectorAll(selector);
  }
}