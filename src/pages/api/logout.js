  export async function GET({ cookies, redirect, locals }) {
    const AUTH_COOKIE_NAME = locals.runtime.env.AUTH_COOKIE_NAME;
    const DATA_COOKIE_NAME = locals.runtime.env.DATA_COOKIE_NAME;

    
    const {DB} = locals.runtime.env;

    if (cookies.has(AUTH_COOKIE_NAME)) {
      const authCookieValue = cookies.get(AUTH_COOKIE_NAME).value;
      await DB.prepare("DELETE FROM sessions WHERE cookie = ?").bind(authCookieValue).run()
    }

    cookies.delete(AUTH_COOKIE_NAME, {
      path: '/', 
    });
    cookies.delete(DATA_COOKIE_NAME, {
      path: '/', 
    });

    return redirect('/');
  }