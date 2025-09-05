import { redirect } from "next/navigation";
import { z } from "zod";
import { login } from "../login";
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
  const { token: bearer, id: autoHouseId } = await login();

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
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    },
  );

  if (response instanceof Response) {
    redirect("/unauthorized");
  }

  return response;
}
