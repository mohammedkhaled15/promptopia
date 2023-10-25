"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "@components/Form"
import { revalidatePath } from "next/cache"

const CratePropmpt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    post: "",
    tag: ""
  })
  const createPrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag.split(" ").map(s => `#${s}`).join(" ")
        })
      })
      if (res.ok) {
        router.push("/")
        revalidatePath("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CratePropmpt