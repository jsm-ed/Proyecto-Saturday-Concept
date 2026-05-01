export class Component {
    constructor() { this.el = null; }

    render() { return ''; }

    mount(container) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.render();
        this.el = wrapper.firstElementChild || wrapper;
        container.appendChild(this.el);
        this.afterMount();
    }

    afterMount() {}
    destroy() {}
}
