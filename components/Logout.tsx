"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { deleteCookie } from "cookies-next"

import { Button } from "./ui/button"

function Logout() {
  const router = useRouter()
  const [error, setError] = React.useState("")
  const onLogout = async () => {
    try {
      deleteCookie("pb_auth")
      localStorage.clear()
      router.push("/auth/login")
    } catch (err) {
      setError("Failed to log out")
    }
  }
  return (
    <div className="w-full">
      <Button className="w-full text-start block" variant={"ghost"} onClick={onLogout}>
        Logout
      </Button>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default Logout
