"use client";
import Input from "@/components/atoms/Form/Input/InputField";
import Label from "@/components/atoms/Form/Label";
import Button from "@/components/atoms/Form/Button/Button";
import Link from "next/link";

export default function ForgotPasswordForm() {

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 text-title-sm font-semibold text-gray-800 dark:text-white/90 sm:text-title-md">
              Forgot Your Password?
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter the email address linked to your account, and we&apos;ll send you
              a link to reset your password.
            </p>
          </div>
          <div>
          <form>
              <div className="space-y-5">
                <Label htmlFor="email">
                Email <span className="text-error-500">*</span>{" "}
                </Label>
                <Input placeholder="info@gmail.com" type="email" name="email" />

                <div>
                  <Button className="w-full" size="sm">
                    Send Reset Link
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p
                className="text-center text-sm font-normal text-gray-700 dark:text-gray-400 sm:text-start"
              >
                Wait, I remember my password...
                <Link
                  href="/signin"
                  className="text-green-800 hover:text-green-600 dark:text-green-700"
                >
                  Go back to sign in
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}