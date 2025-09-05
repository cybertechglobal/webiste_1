import { redirect } from "next/navigation";
import { z } from "zod";
import { FilterOptions } from "../definitions";
import { login } from "../login";
import { fetchServerSide } from "../server-utils";

const schema = z.array(
  z.object({
    name: z.string(),
  }),
);

export type Makes = z.infer<typeof schema>;

export async function getMakes(): Promise<FilterOptions[] | null> {
  const { token: bearer, id: autoHouseId } = await login();

  if (!bearer || !autoHouseId) {
    return null;
  }

  const response = await fetchServerSide<Makes>(`v1/makes`, schema, {
    next: {
      tags: ["makes"],
      revalidate: 60 * 60,
    },
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });

  if (response instanceof Response) {
    redirect("/unauthorized");
  }

  const makes = response.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  return makes;
}
