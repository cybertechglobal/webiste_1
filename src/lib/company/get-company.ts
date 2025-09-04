import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  AUTHENTICATION_COOKIE_NAME,
  AUTOHOUSE_ID_COOKIE_NAME,
} from "../definitions";
import { fetchServerSide } from "../server-utils";

const schema = z.object({
  city: z.string(),
  address: z.string(),
  postalCode: z.string(),
  phone: z.string(),
  country: z.string(),
  logo: z.string().nullable(),
  fullName: z.string(),
  shortName: z.string(),
});

export type Company = z.infer<typeof schema>;

export async function getCompany(): Promise<Company | null> {
  const cookieStore = await cookies();
  const autoHouseId = cookieStore.get(AUTOHOUSE_ID_COOKIE_NAME)?.value;
  const bearer = cookieStore.get(AUTHENTICATION_COOKIE_NAME)?.value;

  if (!bearer || !autoHouseId) {
    return null;
  }

  const response = await fetchServerSide<Company>(
    `v1/auto-houses/${autoHouseId}`,
    schema,
    {
      next: {
        tags: ["company"],
        revalidate: 60 * 60,
      },
    },
  );

  if (response instanceof Response) {
    redirect("/unauthorized");
  }

  return response;
}
