async function validateSession(context) {
    const AUTH_COOKIE_NAME = context.locals.runtime.env.AUTH_COOKIE_NAME;
    const {cookies} = context;
    const {DB} =  context.locals.runtime.env;

    const authCookieValue = cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!authCookieValue) {
        return false
    }
        
    const cookieRegister = await DB.prepare("SELECT * FROM sessions WHERE cookie = ?").bind(authCookieValue).first();
    if (!cookieRegister) {
        return false
    }

    const expirationDate = new Date(cookieRegister.expire_date);
    if (expirationDate < Date.now()) {
        await DB.prepare("DELETE * FROM sessions WHERE cookie = ?").bind(cookie).run()
        return false
    }
    return true;
}

function createExpiredDateTime({ addMonths = 0, addDays = 0, addHours = 0, addMinutes = 0 } = {}) {
    const now = new Date();

    // Aplicar incrementos
    now.setMonth(now.getMonth() + addMonths);
    now.setDate(now.getDate() + addDays);
    now.setHours(now.getHours() + addHours);
    now.setMinutes(now.getMinutes() + addMinutes);

    // Formatear en formato SQLite DATETIME
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export { validateSession, createExpiredDateTime };
