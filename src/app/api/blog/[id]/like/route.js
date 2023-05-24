import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Blog from "@/app/models/Blog";


export async function PUT(req, ctx){
    const id = ctx.params.id

    const accessToken = req.headers.get("authorization")

    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    
    if (!accessToken || !decodedToken)
    {
        return new Response(JSON.stringify({error: 'authorized (wrong or exired token)'}), {status:403})
    }

    try {
        const blog = await Blog.findById(id)

        if (blog.likes.includes(decodedToken._id)){
            blog.likes = blog.likes.filter((id) => id.toString() !== decodedToken._id.toString())
        }
        else
        {
            blog.likes.push(decodedToken._id)
        }

        await blog.save()

        return new Response(JSON.stringify({msg: 'Success interacted with the blog'}), {status: 200})

    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
    }
}