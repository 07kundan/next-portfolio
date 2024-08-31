import "server-only";

import { createClient, type QueryParams } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = ImageUrlBuilder(client);

export const ImageurlFor = (source: SanityImageSource) => builder.image(source);
