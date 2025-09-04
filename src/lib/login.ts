"use server";

import { isProduction, post } from "@/lib/server-utils";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import z from "zod";
import {
  AUTHENTICATION_COOKIE_NAME,
  AUTOHOUSE_ID_COOKIE_NAME,
} from "./definitions";

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

  const cookieStore = await cookies();

  const commonCookieOptions: Partial<ResponseCookie> = {
    httpOnly: true,
    maxAge: 3 * 60 * 60,
    sameSite: "lax",
    secure: isProduction(),
  };

  cookieStore.set({
    name: AUTHENTICATION_COOKIE_NAME,
    value: payload.token,
    ...commonCookieOptions,
  });

  cookieStore.set({
    name: AUTOHOUSE_ID_COOKIE_NAME,
    value: payload.user.autoHouses[0].id,
    ...commonCookieOptions,
  });

  return { id: payload.user.autoHouses[0] };
}
