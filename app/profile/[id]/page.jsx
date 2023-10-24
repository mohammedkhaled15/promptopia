"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


const UserProfilePage = async ({ params }) => {
  const searchParams = useSearchParams()
  const username = searchParams.get("name")

  const { data: session } = useSession()
  console.log(session)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    if (params?.id) getPosts()
  }, [params.id])

  return (
    <Profile
      name={username === session?.user?.name.toLocaleLowerCase().replaceAll(" ", "") ? "My" : username}
      desc="Welcome to your personalized profile page"
      data={posts}
    />
  )
}

export default UserProfilePage