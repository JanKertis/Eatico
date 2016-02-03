export default function actionInterceptorMiddlewareInitializer(handlers = {}) {
    return function actionInterceptorMiddleware() {
        return (next) => (action) => {
            if (action.type && handlers[action.type]) {
                return handlers[action.type](action, next);
            }

            return next(action);
        };
    };
}
