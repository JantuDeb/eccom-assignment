"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "components/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/form"
import { Input } from "components/input"
import { ISignUp, signUpSchema } from "lib/utils/auth"
import Link from "next/link"
import { ApiResponse } from "lib/types/response"
import Loader from "components/loader"

export default function SignUpForm({
  primaryActionText,
  handleSubmit,
}: {
  primaryActionText: string
  handleSubmit: (values: ISignUp) => Promise<ApiResponse<any>>
}) {
  const form = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: ISignUp) {
    const data = await handleSubmit(values)
    const { message: error_message } = data || {}
    if (error_message) form.setError("root", { message: error_message })
  }
  const { isLoading, isSubmitting, errors } = form.formState

  return (
    <div>
      <div className="flex flex-col space-y-2 text-center my-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Password"
                    type="password"
                    showPasswordToggle
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors.root?.message && (
            <p className=" text-destructive">
              {errors.root?.message}
            </p>
          )}

          <Button type="submit" className="uppercase w-full mt-4" size="lg" disabled={isLoading || isSubmitting}>
            {primaryActionText} {(isLoading || isSubmitting) && <Loader />}
          </Button>

          <div className="border-b h-1"></div>
          <div className="text-center">
            Have an Account?{" "}
            <Link href="/login" className="font-medium uppercase">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
