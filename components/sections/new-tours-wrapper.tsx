import { getPayload } from "payload";
import configPromise from "../../payload.config";
import { NewTours } from "./new-tours";

export async function NewToursWrapper() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "tours",
    sort: "-createdAt",
    limit: 6,
  });

  return <NewTours initialTours={result.docs as any} />;
}
