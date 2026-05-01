import { i18n } from '../core/I18n.js';
import { ApiService } from '../core/ApiService.js';
import { DataTable } from '../components/DataTable.js';
import { Modal } from '../components/Modal.js';
import { Toast } from '../components/Toast.js';

const ICONS = {
    view: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    del: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
};

export class CustomersPage {
    constructor() {
        this.api = new ApiService('customers');
        this.addressApi = new ApiService('addresses');
        this.addresses = [];
    }

    mount(container) {
        this.el = container;
        this.table = new DataTable({
            columns: [
                { key: 'id', label: i18n.t('fields.id'), sortable: true },
                { key: 'name', label: i18n.t('fields.name'), sortable: true },
                { key: 'surnames', label: i18n.t('fields.surnames'), sortable: true },
                { key: 'contact', label: i18n.t('fields.contact'), sortable: true },
                { key: 'address_id', label: i18n.t('fields.address_id'), sortable: false,
                  render: (v, row) => {
                      const a = row.address;
                      if (!a) return v;
                      const city = a.city ? a.city.name : '';
                      return `${a.name}${a.door ? ' ' + a.door : ''}, ${a.pc} ${city}`;
                  }
                }
            ],
            actions: [
                { name: 'view', icon: ICONS.view, cls: 'view' },
                { name: 'edit', icon: ICONS.edit, cls: 'edit' },
                { name: 'delete', icon: ICONS.del, cls: 'delete' }
            ],
            onAction: (action, row) => this.handleAction(action, row)
        });

        this.el.innerHTML = `
            <div class="page-header">
                <h2>${i18n.t('customers.title')}</h2>
                <button class="btn btn-primary" id="btn-create">${ICONS.plus} ${i18n.t('actions.create')}</button>
            </div>
            <div id="table-root"></div>`;

        this.table.mount(this.el.querySelector('#table-root'));
        this.el.querySelector('#btn-create').addEventListener('click', () => this.openModal('create'));
        this.load();
    }

    async load() {
        try {
            const [customers, addresses] = await Promise.all([
                this.api.getAll(), this.addressApi.getAll()
            ]);
            this.addresses = addresses;
            this.table.setData(customers);
        } catch (e) { Toast.error(i18n.t('messages.error') + ': ' + e.message); }
    }

    _fields() {
        return [
            { key: 'name', label: i18n.t('fields.name'), type: 'text', required: true },
            { key: 'surnames', label: i18n.t('fields.surnames'), type: 'text', required: true },
            { key: 'contact', label: i18n.t('fields.contact'), type: 'text', required: true },
            { key: 'address_id', label: i18n.t('fields.address_id'), type: 'select', required: true,
              options: this.addresses.map(a => ({ value: a.id, label: `${a.name}${a.door ? ' ' + a.door : ''}, ${a.pc}` }))
            }
        ];
    }

    openModal(mode, data = null) {
        const titles = { create: i18n.t('customers.create'), edit: i18n.t('customers.edit'), view: i18n.t('customers.view') };
        new Modal({
            title: titles[mode], fields: this._fields(), mode, data,
            onSave: async (formData) => {
                try {
                    if (mode === 'create') { await this.api.create(formData); Toast.success(i18n.t('messages.created')); }
                    else { await this.api.update(data.id, formData); Toast.success(i18n.t('messages.updated')); }
                    this.load();
                } catch (e) { Toast.error(i18n.t('messages.error') + ': ' + e.message); }
            }
        });
    }

    async handleAction(action, row) {
        if (action === 'view') this.openModal('view', row);
        else if (action === 'edit') this.openModal('edit', row);
        else if (action === 'delete') {
            if (!confirm(i18n.t('messages.confirm_delete'))) return;
            try { await this.api.delete(row.id); Toast.success(i18n.t('messages.deleted')); this.load(); }
            catch (e) { Toast.error(i18n.t('messages.error') + ': ' + e.message); }
        }
    }

    destroy() {}
}
