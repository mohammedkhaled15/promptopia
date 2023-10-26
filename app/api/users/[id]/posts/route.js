export const dynamic = "force-dynamic";
import { connectDb } from "@utils/connectDb";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectDb();
    const posts = await Prompt.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
