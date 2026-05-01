import { i18n } from '../core/I18n.js';

export class Modal {
    /**
     * @param {Object} opts
     * @param {string} opts.title
     * @param {Array}  opts.fields  [{key, label, type, required, options, disabled}]
     * @param {string} opts.mode    'create' | 'edit' | 'view'
     * @param {Object} opts.data    pre-fill data for edit/view
     * @param {Function} opts.onSave  callback(formData)
     */
    constructor(opts) {
        this.opts = opts;
        this.root = document.getElementById('modal-root');
        this.render();
    }

    render() {
        const { title, fields, mode, data } = this.opts;
        const readOnly = mode === 'view';
        this.root.innerHTML = `
        <div class="modal-overlay" id="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="btn-icon" id="modal-close-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
                <div class="modal-body">
                    ${fields.map(f => this._field(f, data, readOnly)).join('')}
                </div>
                ${readOnly ? '' : `
                <div class="modal-footer">
                    <button class="btn btn-ghost" id="modal-cancel">${i18n.t('actions.cancel')}</button>
                    <button class="btn btn-primary" id="modal-save">${i18n.t('actions.save')}</button>
                </div>`}
            </div>
        </div>`;
        this._bind();
    }

    _field(f, data, readOnly) {
        const val = data ? (data[f.key] ?? '') : '';
        const dis = readOnly || f.disabled ? 'disabled' : '';
        const req = f.required ? 'required' : '';
        let input;
        if (f.type === 'textarea') {
            input = `<textarea id="field-${f.key}" ${dis} ${req}>${val}</textarea>`;
        } else if (f.type === 'select') {
            const opts = (f.options || []).map(o =>
                `<option value="${o.value}" ${String(o.value) === String(val) ? 'selected' : ''}>${o.label}</option>`
            ).join('');
            input = `<select id="field-${f.key}" ${dis} ${req}><option value="">--</option>${opts}</select>`;
        } else {
            input = `<input type="${f.type || 'text'}" id="field-${f.key}" value="${val}" ${dis} ${req}>`;
        }
        return `<div class="form-group"><label>${f.label}</label>${input}</div>`;
    }

    _bind() {
        const close = () => this.close();
        this.root.querySelector('#modal-close-btn').addEventListener('click', close);
        this.root.querySelector('#modal-overlay').addEventListener('click', e => { if (e.target.id === 'modal-overlay') close(); });
        const cancelBtn = this.root.querySelector('#modal-cancel');
        if (cancelBtn) cancelBtn.addEventListener('click', close);
        const saveBtn = this.root.querySelector('#modal-save');
        if (saveBtn) saveBtn.addEventListener('click', () => this._save());
    }

    _save() {
        const formData = {};
        this.opts.fields.forEach(f => {
            if (f.disabled) return;
            const el = this.root.querySelector(`#field-${f.key}`);
            if (!el) return;
            let val = el.value;
            if (f.type === 'number') val = val === '' ? null : Number(val);
            formData[f.key] = val;
        });
        if (this.opts.onSave) this.opts.onSave(formData);
    }

    close() {
        const overlay = this.root.querySelector('.modal-overlay');
        if (overlay) { overlay.style.opacity = '0'; setTimeout(() => { this.root.innerHTML = ''; }, 200); }
    }
}
