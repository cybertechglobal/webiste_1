import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  AUTHENTICATION_COOKIE_NAME,
  AUTOHOUSE_ID_COOKIE_NAME,
} from "../definitions";
import { fetchServerSide } from "../server-utils";

const schema = z.object({
  count: z.int(),
  results: z.array(
    z.object({
      id: z.string(),
      make: z.string(),
      model: z.string(),
      typeName: z.string(),
      mileage: z.number().nullable(),
      retailPrice: z.number().nullable(),
      prices: z.array(
        z.object({
          type: z.literal(["retail", "export", "purchase"]),
          value: z.number(),
        }),
      ),
      technicalData: z.object({
        fuel: z.string(),
        transmission: z.string(),
        power: z.string().optional(),
      }),
      previewPhoto: z.object({
        url: z.string(),
      }),
    }),
  ),
});

export type Vehicles = z.infer<typeof schema>;
export type Vehicle = z.infer<typeof schema>["results"][number];

export async function getVehicles(
  searchParams?: URLSearchParams,
): Promise<Vehicles | null> {
  const cookieStore = await cookies();
  const autoHouseId = cookieStore.get(AUTOHOUSE_ID_COOKIE_NAME)?.value;
  const bearer = cookieStore.get(AUTHENTICATION_COOKIE_NAME)?.value;

  if (!bearer || !autoHouseId) {
    return null;
  }

  const response = await fetchServerSide<Vehicles>(
    // `v1/auto-houses/${autoHouseId}/vehicles?${searchParams.toString()}`,
    `v1/auto-houses/${autoHouseId}/vehicles`,
    schema,
    {
      next: {
        tags: ["vehicles"],
        revalidate: 60 * 60,
      },
    },
  );

  if (response instanceof Response) {
    redirect("/unauthorized");
  }

  return response;
}
