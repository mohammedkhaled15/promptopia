"use client"

import Profile from "@components/Profile"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


const UserProfilePage = async ({ params }) => {
  const searchParams = useSearchParams()
  const username = searchParams.get("name")

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    if (params.id) getPosts()
  }, [params.id, posts])

  return (
    <Profile
      name={username}
      desc="Welcome to your personalized profile page"
      data={posts}
    />
  )
}

export default UserProfilePage