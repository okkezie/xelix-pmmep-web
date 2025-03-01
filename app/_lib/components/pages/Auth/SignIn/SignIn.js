'use client'
import Checkbox from "@/components/atoms/Form/Input/Checkbox"
import Input from "@/components/atoms/Form/Input/InputField"
import Label from "@/components/atoms/Form/Label"
import Button from "@/components/atoms/Form/Button/Button"
import Image from "next/image"
import Link from "next/link"
import { useActionState, useState } from "react"
import { authenticate } from "@/actions/authenticate"
import Alert from "@/components/molecules/Alert/Alert"

const initialState = {
  error: null,
  errors: {},
  email: null,
  password: null,
  rememberMe: null
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction, pending] = useActionState(authenticate, initialState)

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          {(state?.error || (state?.errors && Object.keys(state?.errors)?.length > 0)) && (
            <Alert
              variant="error"
              title={state?.error}
              message={state?.errors && Object.entries(state?.errors)?.map(([key, value]) => `${key}: ${value}`).join(" | ")}
            />
          )}
          <div className="mt-8">
            <form action={formAction}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-red-500">*</span>{" "}
                  </Label>
                  <Input 
                    placeholder="info@gmail.com" 
                    type="email" 
                    name="email" 
                    error={state?.errors?.email || state?.error} 
                    hint={state?.errors?.email} 
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-red-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      error={state?.errors?.password || state?.error}
                      hint={state?.errors?.password}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setShowPassword(!showPassword)
                      }}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <Image src='/svgs/eye.svg' alt="Eye" className="fill-gray-500 dark:fill-gray-400" width={20} height={20} />
                      ) : (
                        <Image src='/svgs/eye-close.svg' alt="Eye" className="fill-gray-500 dark:fill-gray-400" width={20} height={20} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox name="rememberMe" />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-green-800 hover:text-green-600 dark:text-green-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" isLoading={pending}>
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}