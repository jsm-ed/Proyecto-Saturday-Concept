import { i18n } from '../core/I18n.js';
import { ApiService } from '../core/ApiService.js';

const CARDS = [
    { key: 'total_products', resource: 'products', color: '#7c5cfc', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>' },
    { key: 'total_sections', resource: 'sections', color: '#00b4d8', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
    { key: 'total_orders', resource: 'orders', color: '#f59e0b', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>' },
    { key: 'total_customers', resource: 'customers', color: '#22c55e', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>' }
];

export class DashboardPage {
    mount(container) {
        this.el = container;
        this.render();
        this.loadCounts();
    }

    render() {
        this.el.innerHTML = `
            <p class="welcome-text">${i18n.t('dashboard.welcome')}</p>
            <div class="dashboard-grid">
                ${CARDS.map(c => `
                    <div class="stat-card" id="card-${c.key}">
                        <div class="card-icon" style="background:${c.color}15">${c.icon.replace('currentColor', c.color)}</div>
                        <span class="card-value"><div class="spinner" style="width:24px;height:24px;margin:0"></div></span>
                        <span class="card-label">${i18n.t('dashboard.' + c.key)}</span>
                    </div>
                `).join('')}
            </div>`;
    }

    async loadCounts() {
        for (const c of CARDS) {
            try {
                const data = await new ApiService(c.resource).getAll();
                const card = this.el.querySelector(`#card-${c.key} .card-value`);
                if (card) card.textContent = Array.isArray(data) ? data.length : 0;
            } catch { /* ignore */ }
        }
    }

    destroy() {}
}
