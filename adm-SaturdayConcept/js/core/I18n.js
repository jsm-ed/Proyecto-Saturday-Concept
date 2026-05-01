import { DEFAULT_LANG } from '../config.js';
import { es } from '../i18n/es.js';
import { en } from '../i18n/en.js';

const dicts = { es, en };

class I18nManager {
    constructor() {
        this.lang = localStorage.getItem('lang') || DEFAULT_LANG;
    }

    setLang(lang) {
        this.lang = lang;
        localStorage.setItem('lang', lang);
        document.dispatchEvent(new CustomEvent('lang-changed'));
    }

    t(key) {
        const parts = key.split('.');
        let val = dicts[this.lang];
        for (const p of parts) { val = val?.[p]; }
        return val ?? key;
    }

    getLang() { return this.lang; }
}

export const i18n = new I18nManager();
