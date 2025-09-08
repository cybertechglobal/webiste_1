import { redirect } from "next/navigation";
import { z } from "zod";
import { VEHICLES_PER_PAGE } from "../definitions";
import { login } from "../login";
import { fetchServerSide } from "../server-utils";

const schema = z.object({
  count: z.int(),
  results: z.array(
    z.object({
      id: z.string(),
      make: z.string(),
      model: z.string(),
      typeName: z.string().nullable(),
      mileage: z.number().nullable(),
      retailPrice: z.number().nullable(),
      prices: z.array(
        z.object({
          type: z.literal(["retail", "export", "purchase"]),
          value: z.number(),
        }),
      ),
      technicalData: z
        .object({
          fuel: z.string(),
          transmission: z.string(),
          power: z.string(),
          powerUnit: z.literal(["hp", "kw"]),
        })
        .nullable(),
      previewPhoto: z.object({
        url: z.string(),
      }),
    }),
  ),
});

export type Vehicles = z.infer<typeof schema>;
export type Vehicle = Vehicles["results"][number];

function filterSearchParams(params: URLSearchParams): URLSearchParams {
  const allowedKeys = [
    "make",
    "model",
    "priceFrom",
    "priceTo",
    "transmission",
    "fuel",
    "mileageFrom",
    "mileageTo",
  ];
  const result = new URLSearchParams(params);

  const keys = Array.from(result.keys());

  for (const key of keys) {
    if (!allowedKeys.includes(key)) {
      result.delete(key);
    }
  }

  return result;
}

export async function getVehicles(
  searchParams: URLSearchParams,
): Promise<Vehicles | null> {
  const { token: bearer, id: autoHouseId } = await login();

  if (!bearer || !autoHouseId) {
    return null;
  }

  const page = searchParams?.get("page");
  const limit = VEHICLES_PER_PAGE;

  searchParams = filterSearchParams(searchParams);

  const response = await fetchServerSide<Vehicles>(
    `/v1/auto-houses/${autoHouseId}/vehicles${searchParams ? "?" + searchParams.toString() : ""}`,
    schema,
    {
      next: {
        tags: ["vehicles"],
        revalidate: 60 * 60,
      },
      headers: {
        Authorization: `Bearer ${bearer}`,
        page: page || String(1),
        limit: String(limit),
      },
    },
  );

  if (response instanceof Response) {
    const result = await response.json();
    if (result.status === 401) redirect("/unauthorized");
    return null;
  }

  return response;
}
