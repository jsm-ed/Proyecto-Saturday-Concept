import { i18n } from '../core/I18n.js';
import { ITEMS_PER_PAGE } from '../config.js';

export class DataTable {
    /**
     * @param {Object} opts
     * @param {Array}  opts.columns   [{key, label, sortable, render}]
     * @param {Array}  opts.actions   [{name, icon, cls}]
     * @param {Function} opts.onAction callback(actionName, row)
     * @param {string} opts.idKey     the primary key field (default 'id')
     */
    constructor(opts) {
        this.columns = opts.columns;
        this.actions = opts.actions || [];
        this.onAction = opts.onAction || (() => {});
        this.idKey = opts.idKey || 'id';
        this.data = [];
        this.filtered = [];
        this.sortCol = null;
        this.sortDir = 'asc';
        this.page = 1;
        this.filterText = '';
        this.filterColumn = '';
        this.container = null;
    }

    setData(data) {
        this.data = data;
        this.page = 1;
        this._apply();
    }

    mount(container) {
        this.container = container;
        this._apply();
    }

    _apply() {
        let d = [...this.data];
        // filter
        if (this.filterText) {
            const txt = this.filterText.toLowerCase();
            if (this.filterColumn) {
                d = d.filter(r => String(this._resolve(r, this.filterColumn)).toLowerCase().includes(txt));
            } else {
                d = d.filter(r => this.columns.some(c => String(this._resolve(r, c.key)).toLowerCase().includes(txt)));
            }
        }
        // sort
        if (this.sortCol) {
            d.sort((a, b) => {
                let va = this._resolve(a, this.sortCol), vb = this._resolve(b, this.sortCol);
                if (typeof va === 'string') va = va.toLowerCase();
                if (typeof vb === 'string') vb = vb.toLowerCase();
                if (va < vb) return this.sortDir === 'asc' ? -1 : 1;
                if (va > vb) return this.sortDir === 'asc' ? 1 : -1;
                return 0;
            });
        }
        this.filtered = d;
        this._render();
    }

    _resolve(obj, key) {
        return key.split('.').reduce((o, k) => o?.[k], obj);
    }

    _render() {
        if (!this.container) return;
        const total = this.filtered.length;
        const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
        if (this.page > totalPages) this.page = totalPages;
        const start = (this.page - 1) * ITEMS_PER_PAGE;
        const pageData = this.filtered.slice(start, start + ITEMS_PER_PAGE);

        // Toolbar
        const toolbar = `
        <div class="toolbar">
            <input type="text" class="search-input" id="dt-search" placeholder="${i18n.t('actions.search')}" value="${this.filterText}">
            <select class="filter-select" id="dt-filter-col">
                <option value="">${i18n.t('filter.all')}</option>
                ${this.columns.map(c => `<option value="${c.key}" ${this.filterColumn === c.key ? 'selected' : ''}>${c.label}</option>`).join('')}
            </select>
        </div>`;

        // Table
        const ths = this.columns.map(c => {
            let cls = c.sortable ? 'sortable' : '';
            let icon = '';
            if (c.sortable && this.sortCol === c.key) {
                cls += this.sortDir === 'asc' ? ' sorted-asc' : ' sorted-desc';
                icon = `<span class="sort-icon">${this.sortDir === 'asc' ? '▲' : '▼'}</span>`;
            } else if (c.sortable) {
                icon = '<span class="sort-icon">▲</span>';
            }
            return `<th class="${cls}" data-col="${c.key}">${c.label}${icon}</th>`;
        }).join('') + (this.actions.length ? '<th></th>' : '');

        const rows = pageData.length ? pageData.map(row => {
            const tds = this.columns.map(c => {
                const val = c.render ? c.render(this._resolve(row, c.key), row) : this._resolve(row, c.key) ?? '';
                return `<td>${val}</td>`;
            }).join('');
            const acts = this.actions.length ? `<td><div class="td-actions">${this.actions.map(a =>
                `<button class="btn-icon ${a.cls || ''}" data-action="${a.name}" data-id="${row[this.idKey]}" title="${a.label || a.name}">${a.icon}</button>`
            ).join('')}</div></td>` : '';
            return `<tr>${tds}${acts}</tr>`;
        }).join('') : `<tr><td colspan="${this.columns.length + (this.actions.length ? 1 : 0)}" class="no-data">${i18n.t('messages.no_data')}</td></tr>`;

        // Pagination
        const from = total ? start + 1 : 0;
        const to = Math.min(start + ITEMS_PER_PAGE, total);
        const info = i18n.t('pagination.showing').replace('{from}', from).replace('{to}', to).replace('{total}', total);
        let pages = '';
        for (let p = 1; p <= totalPages; p++) {
            pages += `<button class="page-btn ${p === this.page ? 'active' : ''}" data-page="${p}">${p}</button>`;
        }
        const pagination = `
        <div class="pagination-bar">
            <span class="pagination-info">${info}</span>
            <div class="pagination-controls">
                <button class="page-btn" data-page="prev" ${this.page <= 1 ? 'disabled' : ''}>&lsaquo;</button>
                ${pages}
                <button class="page-btn" data-page="next" ${this.page >= totalPages ? 'disabled' : ''}>&rsaquo;</button>
            </div>
        </div>`;

        this.container.innerHTML = `${toolbar}<div class="table-container"><div class="table-wrapper"><table><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table></div>${pagination}</div>`;
        this._bindEvents();
    }

    _bindEvents() {
        // search
        const search = this.container.querySelector('#dt-search');
        if (search) search.addEventListener('input', e => { this.filterText = e.target.value; this.page = 1; this._apply(); });
        // filter column
        const filterCol = this.container.querySelector('#dt-filter-col');
        if (filterCol) filterCol.addEventListener('change', e => { this.filterColumn = e.target.value; this._apply(); });
        // sort
        this.container.querySelectorAll('th.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const col = th.dataset.col;
                if (this.sortCol === col) { this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'; }
                else { this.sortCol = col; this.sortDir = 'asc'; }
                this._apply();
            });
        });
        // pagination
        this.container.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const p = btn.dataset.page;
                if (p === 'prev') this.page--;
                else if (p === 'next') this.page++;
                else this.page = Number(p);
                this._apply();
            });
        });
        // actions
        this.container.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const id = btn.dataset.id;
                const row = this.data.find(r => String(r[this.idKey]) === String(id));
                this.onAction(action, row);
            });
        });
    }
}
