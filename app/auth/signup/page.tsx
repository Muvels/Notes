"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { genConfig } from "react-nice-avatar";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/sonner"
import { Avatar as Icon } from "@/components/ui/avatar";
import Avatar from 'react-nice-avatar'


function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function SignUpPage() {
  const route = useRouter()
  const [email, setEmail] = React.useState<string>("")
  const [username, setUsername] = React.useState<string>("")
  const [avatar, setAvatar] = React.useState<Object>(genConfig())
  const [password, setPassword] = React.useState<string>("")
  const [error, setError] = React.useState("")

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = { email, password, username, avatar }
    console.log(form)
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (!response.ok) {
      setError("Failed to register user")
      console.log("Error")
      toast(
        "Hmmm, dein Account konnte nicht erstellt werden. Entweder ist dein Passwort zu schwach oder deine Email Addresse ist schon vergeben"
      )
      return
    }
    toast("Super, dein Account wurde erstellt. Du kannst dich nun einloggen")
    await timeout(2000)
    return route.push("/auth/login")
  }

  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center max-md:grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/auth/login"
          className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Some other
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg mr-20">
                &ldquo;Bynarian has been a useful tool for enhancing the
                organization and reach of my digital content. For content
                creators looking for a reliable way to manage their online
                presence, Bynarian offers a solid solution.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="grid gap-1 justify-center items-center my-5">
              <Button variant="ghost" className="bg-transparent w-full h-full" onClick={() => setAvatar(genConfig())}>
                <Avatar className="w-20 h-20" { ...avatar }/>
              </Button>
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign up to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to sign up
              </p>
            </div>

            <div className={cn("grid gap-6")}>
              <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="username">
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="Username"
                      autoCapitalize="none"
                      autoComplete="name"
                      autoCorrect="off"
                      value={username}
                      onChange={(e) => setUsername(e.target.value || "")}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value || "")}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="password">
                      Password
                    </Label>
                    <Input
                      id="password"
                      placeholder="Some passowrd here"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value || "")}
                    />
                  </div>
                  <Button type="submit">Sign up with Email</Button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or login to your Account
                  </span>
                </div>
              </div>
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking{" "}
              <Link
                href="/auth/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                login
              </Link>{" "}
              here.
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

SignUpPage.noLayout = true
export default SignUpPage
