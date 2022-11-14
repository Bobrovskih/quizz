export class Component {
  constructor(options) {
    this._state = options.state || {};
    this._template = options.template;
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
    document.querySelector(appendTo).innerHTML = this._template;

    if (typeof this.onMounted === 'function') {
      this.onMounted();
    } 
  }
}