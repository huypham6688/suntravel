import { getPayload } from "payload";
import configPromise from "../../payload.config";
import { TravelGuides } from "./travel-guides";

export async function TravelGuidesWrapper() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "service_tourism",
    sort: "-createdAt",
    limit: 3,
    depth: 1,
  });

  // Type assertion since we know the structure but might not have exact types generated yet
  return <TravelGuides initialGuides={result.docs as any} />;
}
