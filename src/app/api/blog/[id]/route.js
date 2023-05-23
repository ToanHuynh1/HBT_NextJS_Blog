import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Blog from "@/app/models/Blog";
import User from "@/app/models/User";

export async function GET(req, ctx){
    await db.connect()

    const id = ctx.params.id
    try {
        const blog = await Blog.findById(id).populate("authorId").select('-password')
    
        return new Response(JSON.stringify(blog), {status: 200})

    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
    }
}

export async function PUT(req, ctx){
    await db.connect()

    const id = ctx.params.id

    const accessToken = req.headers.get("authorization")

    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken)
    {
        return new Response(JSON.stringify({error: 'authorized (wrong or exired token)'}), {status:403})
    }

    try {
         const body = req.json()

         const blog = await Blog.findById(id).populate("authorId")

         if (blog?.authorId?._id.toString() !== decodedToken._id.toString()){
            return new Response(JSON.stringify({msg: 'Only author update his blog'}), {status:403})
         }
         
         const updateBlog = await Blog.findByIdAndUpdate(id, {$set: {...body}}, {new: true})

         return new Response(JSON.stringify(updateBlog), {status: 200})

    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
    }
}

export async function DELETE(req, ctx){
    await db.connect()

    const id = ctx.params.id

    
    const accessToken = req.headers.get("authorization")

    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken)
    {
        return new Response(JSON.stringify({error: 'authorized (wrong or exired token)'}), {status:403})
    }

    try {
        const blog= await findById(id).populate("authorId")

        if (blog?.authorId?._id.toString() !== decodedToken._id.toString()){
            return new Response(JSON.stringify({msg: 'Only author delete his blog'}), {status:403})
        }

        await Blog.findByIdAndDelete(id)

        return new Response(JSON.stringify({msg: 'Delete blog success'}), {status: 200})

    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
    }
}