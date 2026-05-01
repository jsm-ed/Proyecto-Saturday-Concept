export class Toast {
    static success(msg) { Toast._show(msg, 'toast-success'); }
    static error(msg) { Toast._show(msg, 'toast-error'); }

    static _show(msg, cls) {
        const container = document.getElementById('toast-container');
        const el = document.createElement('div');
        el.className = `toast ${cls}`;
        el.textContent = msg;
        container.appendChild(el);
        setTimeout(() => {
            el.classList.add('removing');
            el.addEventListener('animationend', () => el.remove());
        }, 3000);
    }
}
