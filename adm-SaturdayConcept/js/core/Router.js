export class Router {
    constructor(contentEl) {
        this.routes = {};
        this.contentEl = contentEl;
        this.currentPage = null;
        window.addEventListener('hashchange', () => this.resolve());
    }

    add(hash, pageClass) { this.routes[hash] = pageClass; return this; }

    navigate(hash) { window.location.hash = hash; }

    resolve() {
        const hash = window.location.hash.slice(1) || '/dashboard';
        const PageClass = this.routes[hash];
        if (!PageClass) return;
        if (this.currentPage && this.currentPage.destroy) this.currentPage.destroy();
        this.currentPage = new PageClass();
        this.contentEl.innerHTML = '';
        this.currentPage.mount(this.contentEl);
        document.dispatchEvent(new CustomEvent('route-changed', { detail: hash }));
    }
}
