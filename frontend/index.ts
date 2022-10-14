import { Router } from '@vaadin/router';
import { routes } from './routes';
import { appStore } from './stores/app-store';

export const router = new Router(document.querySelector('#outlet'));

router.setRoutes(routes);
