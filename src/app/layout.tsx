import type { Metadata } from "next";
import "./globals.css";
import { HeroHighlightComponent } from "@/components/hero-highlight/HeroHighlightComponent";
import PlayGroundComponent from "@/components/playground/PlayGroundComponent";
import App from "@/components/app";
import ChildrenComponent from "@/components/child-component/ChildrenComponent";
import { inter } from "@/app/fonts/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hydrated">
      <body className={`dark  ${inter.className}`}>
        <HeroHighlightComponent classname="h-screen fixed top-0"></HeroHighlightComponent>
        <div className="pointer-events-none">
          <App>
            <div>
              <PlayGroundComponent className="fixed top-0 left-0 border-r-4 border-zinc-800 bg-zinc-950" />
            </div>
            <ChildrenComponent className=" bg-zinc-950/60 ">
              {children}
            </ChildrenComponent>
          </App>
        </div>
      </body>
    </html>
  );
}
