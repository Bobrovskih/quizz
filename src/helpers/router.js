import { StartPageComponent } from "../start";

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
        const nextPage = this._findPage(name);
        this._emitCallbacks();
        this._currentPage = nextPage;
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

const config = [
    {
        name: 'start',
        component: StartPageComponent,
    },
    // {
    //     name: 'game',
    //     component: GamePageComponent,
    // },
    // {
    //     name: 'results',
    //     component: ResultsPageComponent,
    // },
];

export const router = new Router(config, config[0]);