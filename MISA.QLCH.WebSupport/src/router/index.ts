import { createRouter, createWebHistory } from 'vue-router';
import routes from './router';
import { useStore } from 'vuex';
import DocumentLibrary from '@library-src/utilities/window/document/DocumentLibrary';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

/**
 * Xử lý nghiệp vụ trước khi router
 */
router.beforeEach((to, from, next) => {
    if (to && to.meta && from) {

        if (to.name == "login") {
            const store = useStore();
            const token = store.state.context.token;
            if (token) {
                next({ name: from.name ?? "/" });
                return;
            }
        }
        const meta = to.meta;
        if (meta['anonymous']) {
            next();
            return;
        }
    }

    const store = useStore();
    const token = store.state.context.token;
    if (!token) {
        next({ name: 'login' });
        return;
    }

    next();
});

router.beforeEach((to, from, next) => {
    if (to && to.meta && from) {
        const meta = to.meta;
        const path = meta['title'] ? meta['title'] : 'MISA eShop Support';
        DocumentLibrary.setTitleDocument(path);
    }
    next();
});


export default router;
