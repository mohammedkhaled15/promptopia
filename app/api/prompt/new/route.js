import { getAuthSession } from "@app/api/auth/[...nextauth]/route"
import { connectDb } from "@utils/connectDb"
import Prompt from "@models/prompt"

export const POST = async(req)=>{
  const { prompt, tag} = await req.json()

  const session = await getAuthSession()
  try {
    await connectDb()
    const newPrompt =  new Prompt({
      creator:session.user.id,
      prompt,
      tag
    })
    await newPrompt.save()
    return new Response(JSON.stringify(newPrompt), {status:201})
  } catch (error) {
    console.log(error)
    return new Response("Failed to create a new prompt", {status:500 })
  }
}