export const dynamic = "force-dynamic";
import { connectDb } from "@utils/connectDb";
import Prompt from "@models/prompt";

//GET

export const GET = async (req, { params }) => {
  try {
    await connectDb();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

//PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectDb();

    const existPrompt = await Prompt.findById(params.id);
    if (!existPrompt) return new Response("Prompt not found", { status: 404 });

    existPrompt.prompt = prompt;
    existPrompt.tag = tag;

    await existPrompt.save();
    return new Response(JSON.stringify(existPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update Prompt", { status: 500 });
  }
};
//Delete
export const DELETE = async (req, { params }) => {
  try {
    await connectDb();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt Deleted!", { status: 200 });
  } catch (error) {
    return new Response("Failed to Delete Prompt", { status: 500 });
  }
};
