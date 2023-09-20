import { createRouter, createWebHistory } from 'vue-router';
import routes from './router';
import DocumentLibrary from '@library-src/utilities/window/document/DocumentLibrary';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import ContextModel from '@store-src/models/context/ContextModel';
import Constant from '@library-src/utilities/constants/Constant';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

/**
 * Xử lý nghiệp vụ trước khi router
 */

router.beforeEach((to, from, next) => {
    if (to && to.meta && from) {
        const context = LocalStorageLibrary.getByKey<ContextModel>(Constant.tokenContext)
        if (to.name == "login") {

            if (context && context.token) {
                next({ path: from.path ?? "/" });
                return;
            }
        }
        const meta = to.meta;
        if (meta['anonymous']) {
            next();
            return;
        }
    }
    const context = LocalStorageLibrary.getByKey<ContextModel>(Constant.tokenContext)
    if (!context || !context.token) {
        next({ name: 'login' });
        return;
    }

    next();
});

router.beforeEach((to, from, next) => {
    if (to && to.meta && from) {
        const meta = to.meta;
        const path = meta['title'] ? meta['title'] : 'MISA eShop Support';
        DocumentLibrary.setTitleDocument("" + path);
    }
    next();
});


export default router;
