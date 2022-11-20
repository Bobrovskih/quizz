import { GamePage } from "../game";
import { ResultsPage } from "../results";
import { StartPage } from "../start";

class Router {
  constructor(config, initialPage) {
    this._config = config;
    this._currentPage = initialPage;
    this._callbacks = [];
  }

  onChange(fn) {
    this._callbacks.push(fn);
  }

  setPage(name) {
    if (name !== this._currentPage.name)  {
      this._currentPage = this._findPage(name);
      this._emitCallbacks();
    }
  }

  getCurrentPage() {
    return this._currentPage;
  }

  _emitCallbacks() {
    this._callbacks.forEach((fn) => fn(this._currentPage));
  }

  _findPage(name) {
    return this._config.find((item) => item.name === name);
  }
}

export const ROUTER_PATHS = {
  START: 'start',
  GAME: 'game',
  RESULTS: 'results',
};

const config = [
  {
    name: ROUTER_PATHS.START,
    component: StartPage,
  },
  {
    name: ROUTER_PATHS.GAME,
    component: GamePage,
  },
  {
    name: ROUTER_PATHS.RESULTS,
    component: ResultsPage,
  },
];

export const router = new Router(config, config[0]);
