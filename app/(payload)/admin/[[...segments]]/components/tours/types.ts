export interface Tour {
  id: string;
  title: string;
  location: string;
  region: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  category: string;
  maxPeople: number;
  description: string;
  highlights: { item: string }[];
  itinerary: { day: number; title: string; description: string }[];
  includes: { item: string }[];
  excludes: { item: string }[];
  gallery: { url: string }[];
  departureDate: { date: string }[];
}

export type View = "list" | "form";
