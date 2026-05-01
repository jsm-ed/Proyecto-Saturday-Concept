import { API_BASE } from '../config.js';

export class ApiService {
    constructor(resource) {
        this.url = `${API_BASE}/${resource}`;
    }

    _headers() {
        return { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    }

    async _request(url, options = {}) {
        const res = await fetch(url, { ...options, headers: this._headers() });
        if (res.status === 204) return null;
        const body = await res.json().catch(() => null);
        if (!res.ok) throw new Error(body?.message || `Error ${res.status}`);
        return body;
    }

    async getAll() { return this._request(this.url); }
    async getOne(id) { return this._request(`${this.url}/${id}`); }
    async create(data) { return this._request(this.url, { method: 'POST', body: JSON.stringify(data) }); }
    async update(id, data) { return this._request(`${this.url}/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
    async delete(id) { return this._request(`${this.url}/${id}`, { method: 'DELETE' }); }
}

export class OrderItemService extends ApiService {
    constructor() { super('order-items'); }
    async getOne(orderId, productId) { return this._request(`${this.url}/${orderId}/${productId}`); }
    async update(orderId, productId, data) { return this._request(`${this.url}/${orderId}/${productId}`, { method: 'PUT', body: JSON.stringify(data) }); }
    async delete(orderId, productId) { return this._request(`${this.url}/${orderId}/${productId}`, { method: 'DELETE' }); }
}
