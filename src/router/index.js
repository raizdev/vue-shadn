import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
    extendRoutes: (routes) => {
        //routes.push();
        //return routes
    },
    extendRoutes() {
        return setupLayouts(routes);
    },
    history: createWebHistory('/')
});

function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    return (...parameters) => {
        context.next(...parameters);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach(async (to, from, next) => {
    if (to.meta.middleware) {
        const meta = await import(`@/router/middlewares/${to.meta.middleware}.js`);
        const middleware = Array.isArray(meta.default) ? meta.default : [meta.default];

        if (!middleware || !middleware.length) return next();

        const context = { from, next, router, to };

        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({ ...context, next: nextMiddleware });
    }

    return next();
});

router.afterEach((to) => {
    //const redirectPage = import.meta.env.FAWEB_REDIRECT_NOT_LOGGED_IN;
    // if (to.path !== redirectPage) localStorage.setItem('lastVisitedPage', to.path);

    return null;
});

export { router };
