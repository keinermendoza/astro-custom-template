export async function GET({locals, params, request}) {

    const {DB} = locals.runtime.env;
    try {
        const data =  DB.prepare("SELECT * FROM blog_posts");
        const {results} = await data.all();
        
        return new Response(
            JSON.stringify({
                posts: results
            })
        )
    } catch(err) {
        return new Response(
            JSON.stringify({
                error: 'Site not availbale',
            }),
            {
                status: 500,
            }
        );
          
    }
}