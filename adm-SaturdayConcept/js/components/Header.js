import { i18n } from '../core/I18n.js';

const PAGE_TITLES = {
    '/dashboard': 'dashboard.title',
    '/products': 'products.title',
    '/sections': 'sections.title',
    '/orders': 'orders.title',
    '/customers': 'customers.title'
};

export class Header {
    constructor(container) {
        this.container = container;
        this.render();
        document.addEventListener('route-changed', () => this.updateTitle());
        document.addEventListener('lang-changed', () => this.render());
    }

    render() {
        const hash = window.location.hash.slice(1) || '/dashboard';
        const titleKey = PAGE_TITLES[hash] || 'dashboard.title';
        const lang = i18n.getLang();
        this.container.innerHTML = `
            <h2 class="header-title">${i18n.t(titleKey)}</h2>
            <div class="header-actions">
                <button class="lang-btn ${lang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
                <button class="lang-btn ${lang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            </div>`;
        this.container.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                i18n.setLang(btn.dataset.lang);
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            });
        });
    }

    updateTitle() {
        const hash = window.location.hash.slice(1) || '/dashboard';
        const titleKey = PAGE_TITLES[hash] || 'dashboard.title';
        const h2 = this.container.querySelector('.header-title');
        if (h2) h2.textContent = i18n.t(titleKey);
    }
}
