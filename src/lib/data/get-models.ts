"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { FilterOptions } from "../definitions";
import { login } from "../login";
import { fetchServerSide } from "../server-utils";

const schema = z.object({
  models: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

export type Models = z.infer<typeof schema>;

export async function getModels(make: string): Promise<FilterOptions[] | null> {
  const { token: bearer, id: autoHouseId } = await login();

  if (!bearer || !autoHouseId) {
    return null;
  }

  const response = await fetchServerSide<Models>(
    `v1/models?make=${make}`,
    schema,
    {
      next: {
        tags: ["models"],
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

  const models = response.models.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  return models;
}
