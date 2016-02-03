export default function promiseMiddleware({ dispatch }) {
    return (next) => (action) => {
        const { promise, types, ...rest } = action;

        if (!promise || !types) {
            return next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = types;

        dispatch({ ...rest, type: REQUEST });

        return promise.then(
            (result) => dispatch({ ...rest, result, type: SUCCESS }),
            (error) => dispatch({ ...rest, error, type: FAILURE })
        );
    };
}
