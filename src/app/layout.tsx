import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeroHighlightComponent } from "@/components/hero-highlight/HeroHighlightComponent";
import PlayGroundComponent from "@/components/playground/PlayGroundComponent";
import App from "@/components/app";
import ChildrenComponent from "@/components/child-component/ChildrenComponent";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hydrated">
      <body className={`dark text-blue-500 ${inter.className}`}>
        <HeroHighlightComponent classname="h-screen fixed top-0 pointer-events-auto"></HeroHighlightComponent>
        <div className="relative top-0 pointer-events-none">
          <App>
            <div className="">
              <PlayGroundComponent className="fixed top-0 left-0  bg-zinc-950/60 border-r-[1.2vw] border-zinc-950" />
            </div>
            <ChildrenComponent>{children}</ChildrenComponent>
          </App>
        </div>

        {/* <DragPlate className="" /> */}
      </body>
    </html>
  );
}
