import { Inter } from "next/font/google";
import {
  Lusitana,
  Playpen_Sans,
  Handjet,
  Jacques_Francois_Shadow,
  Ubuntu_Mono,
  Indie_Flower,
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export const Playpen = Playpen_Sans({ subsets: ["vietnamese"] });
export const handjet = Handjet({ subsets: ["vietnamese"] });
export const jacques = Jacques_Francois_Shadow({
  weight: ["400"],
  subsets: ["latin"],
});
export const ubuntu = Ubuntu_Mono({
  weight: ["400", "700"],
  subsets: ["greek"],
});
export const indiflower = Indie_Flower({
  weight: ["400"],
  subsets: ["latin"],
});
