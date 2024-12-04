import {validateSession} from './lib/utils';

const protectedRoutes = ["/dashboard"]
export async function onRequest (context, next) {
    if(protectedRoutes.includes(context.url.pathname)) {
        const validated = await validateSession(context);

        if (!validated) {
            const AUTH_COOKIE_NAME = context.locals.runtime.env.AUTH_COOKIE_NAME;
            const DATA_COOKIE_NAME = context.locals.runtime.env.DATA_COOKIE_NAME;
            
            // redirects to login and make sure to remove any data from cookies
            return new Response(null, {
                status: 302,
                headers: {
                    "Location": new URL("/login?next=" + context.url.pathname, context.url).toString(),
                    "Set-Cookie": `${AUTH_COOKIE_NAME}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly`,
                    "Set-Cookie": `${DATA_COOKIE_NAME}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`,
                },
            });
        }
    }
    return next();
};