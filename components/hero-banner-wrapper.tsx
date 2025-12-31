import { getPayload } from "payload";
import configPromise from "../payload.config";
import { HeroBanner, BannerItem } from "./hero-banner";

export async function HeroBannerWrapper() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "hero-banners",
    sort: "order",
    limit: 100,
    depth: 2,
  });

  const banners = result.docs as unknown as BannerItem[];

  return <HeroBanner items={banners} />;
}
