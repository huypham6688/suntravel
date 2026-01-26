import Link from "next/link";
import configPromise from "@/payload.config";
import { getPayload } from "payload";

export async function VisaAbroadSection() {
  const payload = await getPayload({
    config: configPromise,
  });

  const { docs: countries } = await payload.find({
    collection: "countries",
    limit: 100,
  });

  // If no countries are found, we can return null or render an empty state,
  // or use fallback data. For now, we'll try to use the fetched data.
  // We need to split them for the marquee.

  const half = Math.ceil(countries.length / 2);
  const row1 = countries.slice(0, half);
  const row2 = countries.slice(half);

  return (
    <section className="py-16 bg-blue-50/50 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-900">
          Visa đi nước ngoài
        </h2>
        <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
      </div>

      <div className="relative w-full overflow-hidden mask-fade-sides space-y-6">
        {/* Row 1 */}
        <div className="flex w-max animate-marquee space-x-6">
          {[...row1, ...row1].map((country, idx) => (
            <Link
              key={`row1-${idx}`}
              href={`/visa/${country.slug}`} // Assuming slug exists in your Country collection
              className="group relative h-32 w-48 shrink-0 cursor-pointer block"
            >
              <div className="absolute inset-0 bg-white rounded-xl border border-blue-100 hover:border-primary flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md transition-all duration-300">
                {/* Flag Icon */}
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                  <span
                    className={`fi fi-${country.code} text-4xl w-full h-full object-cover`}
                  />
                </div>
                <span className="font-bold text-blue-900 group-hover:text-primary transition-colors">
                  {country.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 2 */}
        <div
          className="flex w-max animate-marquee space-x-6"
          style={{ animationDirection: "reverse" }}
        >
          {[...row2, ...row2].map((country, idx) => (
            <Link
              key={`row2-${idx}`}
              href={`/visa/${country.slug}`} // Assuming slug exists
              className="group relative h-32 w-48 shrink-0 cursor-pointer block"
            >
              <div className="absolute inset-0 bg-white rounded-xl border border-blue-100 hover:border-primary flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md transition-all duration-300">
                {/* Flag Icon */}
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                  <span
                    className={`fi fi-${country.code} text-4xl w-full h-full object-cover`}
                  />
                </div>
                <span className="font-bold text-blue-900 group-hover:text-primary transition-colors">
                  {country.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
