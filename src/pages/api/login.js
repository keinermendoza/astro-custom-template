import {createExpiredDateTime} from '../../lib/utils';


export async function POST({ locals, request, cookies }) {
    const AUTH_COOKIE_NAME = locals.runtime.env.AUTH_COOKIE_NAME;
    const DATA_COOKIE_NAME = locals.runtime.env.DATA_COOKIE_NAME;

    const AUTH_ENDPOINT = locals.runtime.env.AUTH_ENDPOINT;
    const SECRET_KEY = locals.runtime.env.SECRET_KEY;
    const {DB} = locals.runtime.env;
    const cookieValideTimeInDays = 7;
    const cookieValideTimeInSeconds = 60 * 60 * 24 * cookieValideTimeInDays;    
        
    const {username, password, next } = await request.json();
    if (!username || !password) {
        return new Response(
            JSON.stringify({
                error: "You must provide 'username' and 'password' fields"
            }), { status: 400 }
        );
    }
    try {
        const authResponse = await fetch(AUTH_ENDPOINT, {
            method:"POST",
            headers:{
                'Content-type': 'application/json',
                'Authorization':`Api-Key ${SECRET_KEY}`
            },
            body:JSON.stringify({
                username:username,
                password:password
            })
        })

        if (!authResponse.ok) {
            throw new Error("Por favor revisa si has escrito correctamente el usuario y contraseña") 
        }

        const {user, token} = await authResponse.json();

        // there are some inconsistencies between D1 time and worker time
        const expire_time = createExpiredDateTime({addDays:cookieValideTimeInDays, addHours:12})

        // saving session in D1
        await DB.prepare("INSERT INTO sessions (username, cookie, expire_date) VALUES (?1, ?2, ?3)").bind(user.username, token, expire_time).run();

        const redirectTo = next ? next : '/';
        
        // creating cookie using Astro.cookies
        cookies.set(AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            path: '/',
            maxAge: cookieValideTimeInSeconds, // 1 hora
        });
        cookies.set(DATA_COOKIE_NAME, user, {
            path: '/',
            maxAge: cookieValideTimeInSeconds, // 1 hora
        });
        
        return new Response(JSON.stringify({redirect:redirectTo}),{status:200});

    } catch(err) {
        console.error(err)
        return new Response(
            JSON.stringify({
                error: err.message
            }), { status: 400 }
        );
    }

}
