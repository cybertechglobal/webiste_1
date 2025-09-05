"use server";

import { post } from "@/lib/server-utils";
import z from "zod";

const schema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function login() {
  const data = schema.safeParse({
    email: process.env.AUTH_EMAIL,
    password: process.env.AUTH_PASSWORD,
  });

  if (!data.success) {
    return {
      errors: z.flattenError(data.error).fieldErrors,
    };
  }

  const reqBody = new URLSearchParams(data.data).toString();

  const response = await post(`v1/login`, reqBody, {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  });

  if (!response.ok) {
    return { success: false };
  }

  const payload: { token: string; user: { autoHouses: { id: string }[] } } =
    await response.json();

  return { token: payload.token, id: payload.user.autoHouses[0].id };
}
