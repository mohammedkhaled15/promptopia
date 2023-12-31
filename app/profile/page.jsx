"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

const MyProfile = () => {
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])

  const router = useRouter()

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    if (session?.user.id) getPosts()
  }, [session?.user?.id])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you Sure You want to delete this post?")
    if (hasConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        })
        if (res.ok) {
          const filteredPosts = posts.filter(p => p._id !== post._id)
          console.log(filteredPosts)
          setPosts(filteredPosts)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name={"My"}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile