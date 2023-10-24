"use client"
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const [posts, setPosts] = useState([])

  const filterPosts = (searchText) => {
    const reg = new RegExp(searchText, "i")
    return posts.filter(post => (
      reg.test(post.creator.username) ||
      reg.test(post.prompt) ||
      reg.test(post.tag)
    ))
  }

  const handleSearchChange = e => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        setSearchResults(filterPosts(e.target.value))
      }, 500)
    )
  }
  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    setSearchResults(filterPosts(tagName))
  }

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json()
      setPosts(data)
      setSearchResults(data)
    }
    getPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchResults}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed