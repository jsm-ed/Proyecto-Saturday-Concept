import { i18n } from '../core/I18n.js';
import { ApiService, OrderItemService } from '../core/ApiService.js';
import { DataTable } from '../components/DataTable.js';
import { Modal } from '../components/Modal.js';
import { Toast } from '../components/Toast.js';

const ICONS = {
    view: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    del: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    items: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>'
};

export class OrdersPage {
    constructor() {
        this.api = new ApiService('orders');
        this.itemsApi = new OrderItemService();
        this.customerApi = new ApiService('customers');
        this.addressApi = new ApiService('addresses');
        this.productApi = new ApiService('products');
        this.customers = [];
        this.addresses = [];
        this.products = [];
        this.orders = [];
    }

    mount(container) {
        this.el = container;
        this.table = new DataTable({
            columns: [
                { key: 'id', label: i18n.t('fields.id'), sortable: true },
                { key: 'customer_id', label: i18n.t('fields.customer_id'), sortable: true,
                  render: (v, row) => {
                      const c = row.customer;
                      return c ? `${c.name} ${c.surnames}` : v;
                  }
                },
                { key: 'discount', label: i18n.t('fields.discount'), sortable: true, render: v => `${v}%` },
                { key: 'order_total', label: i18n.t('fields.order_total'), sortable: true, render: v => v != null ? `${Number(v).toFixed(2)} €` : '' }
            ],
            actions: [
                { name: 'items', icon: ICONS.items, cls: 'items' },
                { name: 'view', icon: ICONS.view, cls: 'view' },
                { name: 'edit', icon: ICONS.edit, cls: 'edit' },
                { name: 'delete', icon: ICONS.del, cls: 'delete' }
            ],
            onAction: (action, row) => this.handleAction(action, row)
        });

        this.el.innerHTML = `
            <div class="page-header">
                <h2>${i18n.t('orders.title')}</h2>
                <button class="btn btn-primary" id="btn-create">${ICONS.plus} ${i18n.t('actions.create')}</button>
            </div>
            <div id="table-root"></div>
            <div id="items-panel"></div>`;

        this.table.mount(this.el.querySelector('#table-root'));
        this.el.querySelector('#btn-create').addEventListener('click', () => this.openModal('create'));
        this.load();
    }

    async load() {
        try {
            const [orders, customers, addresses, products] = await Promise.all([
                this.api.getAll(), this.customerApi.getAll(),
                this.addressApi.getAll(), this.productApi.getAll()
            ]);
            this.orders = orders;
            this.customers = customers;
            this.addresses = addresses;
            this.products = products;
            this.table.setData(orders);
        } catch (e) { Toast.error(i18n.t('messages.error') + ': ' + e.message); }
    }

    _fields() {
        return [
            { key: 'customer_id', label: i18n.t('fields.customer_id'), type: 'select', required: true,
              options: this.customers.map(c => ({ value: c.id, label: `${c.name} ${c.surnames}` })) },
            { key: 'address_id', label: i18n.t('fields.address_id'), type: 'select', required: true,
              options: this.addresses.map(a => ({ value: a.id, label: `${a.name}${a.door ? ' ' + a.door : ''}, ${a.pc}` })) },
            { key: 'discount', label: i18n.t('fields.discount'), type: 'number', step: '0.01' },
            { key: 'order_total', label: i18n.t('fields.order_total'), type: 'number', step: '0.01' }
        ];
    }

    openModal(mode, data = null) {
        const titles = { create: i18n.t('orders.create'), edit: i18n.t('orders.edit'), view: i18n.t('orders.view') };
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
        else if (action === 'items') this.showItems(row);
        else if (action === 'delete') {
            if (!confirm(i18n.t('messages.confirm_delete'))) return;
            try { await this.api.delete(row.id); Toast.success(i18n.t('messages.deleted')); this.load(); this._hideItems(); }
            catch (e) { Toast.error(i18n.t('messages.error') + ': ' + e.message); }
        }
    }

    /* -------- Order Items Sub-panel -------- */

    showItems(order) {
        this.currentOrder = order;
        const items = order.items || [];
        const panel = this.el.querySelector('#items-panel');
        const rows = items.length ? items.map(it => {
            const pName = it.product ? it.product.name : it.product_id;
            return `<tr>
                <td>${pName}</td>
                <td>${it.quantity}</td>
                <td><div class="td-actions">
                    <button class="btn-icon edit" data-oid="${it.order_id}" data-pid="${it.product_id}" data-action="edit-item">${ICONS.edit}</button>
                    <button class="btn-icon delete" data-oid="${it.order_id}" data-pid="${it.product_id}" data-action="delete-item">${ICONS.del}</button>
                </div></td>
            </tr>`;
        }).join('') : `<tr><td colspan="3" class="no-data">${i18n.t('messages.no_data')}</td></tr>`;

        panel.innerHTML = `
        <div class="order-items-panel">
            <div class="panel-header">
                <h4>${i18n.t('orders.items_title')} — #${order.id}</h4>
                <button class="btn btn-primary btn-sm" id="btn-add-item">${ICONS.plus} ${i18n.t('actions.add_item')}</button>
            </div>
            <div class="table-wrapper">
                <table>
                    <thead><tr>
                        <th>${i18n.t('fields.product_id')}</th>
                        <th>${i18n.t('fields.quantity')}</th>
                        <th></th>
                    </tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        </div>`;

        panel.querySelector('#btn-add-item').addEventListener('click', () => this._addItemModal());
        panel.querySelectorAll('[data-action="edit-item"]').forEach(btn => {
            btn.addEventListener('click', () => this._editItemModal(Number(btn.dataset.oid), Number(btn.dataset.pid), items));
        });
        panel.querySelectorAll('[data-action="delete-item"]').forEach(btn => {
            btn.addEventListener('click', () => this._deleteItem(Number(btn.dataset.oid), Number(btn.dataset.pid)));
        });
    }

    _hideItems() {
        const panel = this.el.querySelector('#items-panel');
        if (panel) panel.innerHTML = '';
    }

    _addItemModal() {
        new Modal({
            title: i18n.t('actions.add_item'),
            fields: [
                { key: 'product_id', label: i18n.t('fields.product_id'), type: 'select', required: true,
                  options: this.products.map(p => ({ value: p.id, label: p.name })) },
                { key: 'quantity', label: i18n.t('fields.quantity'), type: 'number', required: true }
            ],
            mode: 'create', data: null,
            onSave: async (formData) => {
                try {
                    formData.order_id = this.currentOrder.id;
                    await this.itemsApi.create(formData);
                    Toast.success(i18n.t('messages.created'));
                    await this._refreshOrder();
                } catch (e) { Toast.error(i18n.t('messages.error') + ': ' + e.message); }
            }
        });
    }

    _editItemModal(orderId, productId, items) {
        const item = items.find(i => i.order_id === orderId && i.product_id === productId);
        new Modal({
            title: i18n.t('actions.edit'),
            fields: [
                { key: 'quantity', label: i18n.t('fields.quantity'), type: 'number', required: true }
            ],
            mode: 'edit', data: item,
            onSave: async (formData) => {
                try {
                    await this.itemsApi.update(orderId, productId, formData);
                    Toast.success(i18n.t('messages.updated'));
                    await this._refreshOrder();
                } catch (e) { Toast.error(i18n.t('messages.error') + ': ' + e.message); }
            }
        });
    }

    async _deleteItem(orderId, productId) {
        if (!confirm(i18n.t('messages.confirm_delete_item'))) return;
        try {
            await this.itemsApi.delete(orderId, productId);
            Toast.success(i18n.t('messages.deleted'));
            await this._refreshOrder();
        } catch (e) { Toast.error(i18n.t('messages.error') + ': ' + e.message); }
    }

    async _refreshOrder() {
        try {
            const fresh = await this.api.getOne(this.currentOrder.id);
            // update the order in main list
            const idx = this.orders.findIndex(o => o.id === this.currentOrder.id);
            if (idx !== -1) { this.orders[idx] = fresh; this.table.setData(this.orders); }
            this.showItems(fresh);
        } catch (e) { Toast.error(i18n.t('messages.error')); }
    }

    destroy() {}
}
