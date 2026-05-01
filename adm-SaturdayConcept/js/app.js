import { Router } from './core/Router.js';
import { Sidebar } from './components/Sidebar.js';
import { Header } from './components/Header.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { ProductsPage } from './pages/ProductsPage.js';
import { SectionsPage } from './pages/SectionsPage.js';
import { OrdersPage } from './pages/OrdersPage.js';
import { CustomersPage } from './pages/CustomersPage.js';

document.addEventListener('DOMContentLoaded', () => {
    // Shell
    new Sidebar(document.getElementById('sidebar'));
    new Header(document.getElementById('header'));

    // Router
    const router = new Router(document.getElementById('content'));
    router
        .add('/dashboard', DashboardPage)
        .add('/products', ProductsPage)
        .add('/sections', SectionsPage)
        .add('/orders', OrdersPage)
        .add('/customers', CustomersPage);

    // Initial route
    if (!window.location.hash) window.location.hash = '#/dashboard';
    else router.resolve();
});
