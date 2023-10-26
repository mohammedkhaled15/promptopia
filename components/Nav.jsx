"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [providers, setProviders] = useState(null)

  const [toggleDropdown, setToggleDropDown] = useState(false)

  useEffect(() => {
    const setMyProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setMyProviders()
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* {Desktop Navigation} */}
      <div className="sm:flex hidden">
        {
          session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={() => { signOut(); router.push("/") }} className="outline_btn">
                Sign Out
              </button>

              <Link href="/profile">
                <Image
                  src={session.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map(provider => {
                  return (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="black_btn mx-1"
                    >
                      Sign In {provider.name}
                    </button>
                  )
                })}
            </>
          )
        }
      </div>

      {/* {Mobile Navigation} */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex ">
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
                alt="profile"
                onClick={() => setToggleDropDown(prev => !prev)}
              />
              {
                toggleDropdown && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropDown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setToggleDropDown(false)
                        signOut()
                        router.push("/")
                      }}
                      className="mt-5 w-full black_btn"
                    >
                      Sign Out
                    </button>
                  </div>
                )
              }
            </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map(provider => {
                  return (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="black_btn mx-1"
                    >
                      Sign In {provider.name}
                    </button>
                  )
                })}
            </>
          )
        }
      </div>

    </nav>
  )
}

export default Nav