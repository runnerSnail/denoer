'use strict'

/**
 * Expose compositor.
 */

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

/**
 * app.use(async (ctx, next) => {
 *      await next();
 *      const rt = ctx.response.get('X-Response-Time');
 *      console.log(`${ctx.method} ${ctx.url} - ${rt}`);
 * });
 * @param middleware 
 */
export function compose(middleware) {
    if (!Array.isArray(middleware)) throw  Error("Middleware stack must be an array!");
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw Error('Middleware must be composed of functions!')
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */

    return (req, next?) => {
        // last called middleware #
        let index = -1
        return dispatch(0)
        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = i
            let fn = middleware[i]
            if (i === middleware.length) fn = next
            if (!fn) return Promise.resolve()
            try {
                return Promise.resolve(fn(req, ()=>{dispatch(i + 1)}));
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}
