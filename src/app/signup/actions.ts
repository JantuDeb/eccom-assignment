"use server"

import { postRequest } from "lib/network"
import { ILogin, ISignUp } from "lib/utils/auth"

export async function login(formValues: ILogin) {
  const { data, message, status, status_code } = await postRequest(
    "http://localhost:3000/api/login",
    formValues
  )
  return { message, data, status, status_code }
}

export async function signup(formValues: ISignUp) {
  const { data, message, status } = await postRequest(
    "http://localhost:3000/api/signup",
    formValues
  )
  return { message, data, status }
}