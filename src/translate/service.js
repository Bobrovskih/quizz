import ruJson from './ru.json';
import enJson from './en.json';

import { birdsData as ruData } from '../constants/birds-data';
import { birdsData as enData } from '../constants/birds-data-en';

const Lang = {
  RU: 'ru',
  EN: 'en',
};

const DEFAULT_LANG = Lang.RU;
const localStorageKey = 'language';

class TranslateService {
  constructor() {
    this._lang = localStorage.getItem(localStorageKey) || DEFAULT_LANG;
    this._json = this._getJsonByLang();
  }

  set lang(lang) {
    this._lang = lang;
    localStorage.setItem(localStorageKey, lang);
    this._json = this._getJsonByLang();
  }

  get lang() {
    return this._lang;
  }

  _getJsonByLang() {
    return this._lang === Lang.RU ? ruJson : enJson;
  }

  t(key) {
    return this._json[key];
  }

  getBirdsData() {
    return this._lang === Lang.RU ? ruData : enData;
  }

  getAvailable() {
    return this._lang === Lang.RU ? Lang.EN : Lang.RU;
  }
}


export const translate = new TranslateService();