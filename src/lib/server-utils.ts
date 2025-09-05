import { z } from "zod";
import { SearchParams } from "./definitions";

export function isProduction(): boolean {
  return process.env.APP_ENVIRONMENT === "production";
}

export async function post(
  endpoint: string,
  body?: Record<string, unknown> | string,
  headers?: RequestInit["headers"],
): Promise<Response> {
  headers = headers ?? {};
  const url = new URL(endpoint, process.env.BE_APP_URL);

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form/urlencdoed",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
    cache: "force-cache",
  });
}

export async function fetchServerSide<T>(
  endpoint: string,
  schema: z.ZodType<T>,
  options?: RequestInit,
): Promise<T | Response> {
  const url = new URL(endpoint, process.env.BE_APP_URL);

  const baseHeaders = {
    Accept: "application/json",
  } as HeadersInit;

  const baseOptions = options;

  const response = await fetch(url, {
    ...baseOptions,
    method: "GET",
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
  });

  if (response.ok) {
    const data = await response.json();
    const result = schema.safeParse(data);

    // This error should be catched during development.
    if (!result.success) {
      console.log(data);
      console.log(result.error);
      console.log("Endpoint:", endpoint);
      if (!isProduction()) {
        throw new Error("An error occurred while fetching the data.");
      }

      return response;
    }

    return result.data;
  } else {
    return response;
  }
}

/**
 * Convert SearchParams from NEXT Page prop to URLSearchParams object.
 */
export function toURLSearchParams(params: SearchParams): URLSearchParams {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      searchParams.append(key, value);
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    }
  }

  return searchParams;
}
