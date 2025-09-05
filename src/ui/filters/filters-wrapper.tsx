import { getMakes } from "@/lib/data/get-makes";
import Filters from "./filters";

export default async function FiltersWrapper() {
  const makes = await getMakes();
  return <Filters makes={makes} />;
}
