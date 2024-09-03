// import "server-only";

import { createClient, type QueryParams } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-09-02",
  useCdn: false,
});

const builder = ImageUrlBuilder(client);

export const ImageurlFor = (source: SanityImageSource) => builder.image(source);
