import { i18n } from '../core/I18n.js';

const ICONS = {
    dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    products: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>',
    sections: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    orders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>',
    customers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>'
};

const ROUTES = [
    { hash: '#/dashboard', key: 'dashboard' },
    { hash: '#/products', key: 'products' },
    { hash: '#/sections', key: 'sections' },
    { hash: '#/orders', key: 'orders' },
    { hash: '#/customers', key: 'customers' }
];

export class Sidebar {
    constructor(container) {
        this.container = container;
        this.render();
        document.addEventListener('route-changed', () => this.updateActive());
        document.addEventListener('lang-changed', () => this.render());
    }

    render() {
        const current = window.location.hash.slice(1) || '/dashboard';
        this.container.innerHTML = `
            <div class="sidebar-brand">
                <h1>Saturday Concept</h1>
                <span>Admin Panel</span>
            </div>
            <nav class="sidebar-nav">
                ${ROUTES.map(r => `
                    <a href="${r.hash}" class="${current === r.hash.slice(1) ? 'active' : ''}">
                        ${ICONS[r.key]}
                        <span>${i18n.t('nav.' + r.key)}</span>
                    </a>
                `).join('')}
            </nav>`;
    }

    updateActive() {
        const current = window.location.hash.slice(1) || '/dashboard';
        this.container.querySelectorAll('.sidebar-nav a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href').slice(1) === current);
        });
    }
}
