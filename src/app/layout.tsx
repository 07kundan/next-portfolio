import type { Metadata } from "next";
import "./globals.css";
import { HeroHighlightComponent } from "@/components/hero-highlight/HeroHighlightComponent";
import PlayGroundComponent from "@/components/playground/PlayGroundComponent";
import App from "@/components/app";
import ChildrenComponent from "@/components/child-component/ChildrenComponent";
import { inter } from "@/app/fonts/fonts";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hydrated">
      <body className={`${inter.className} text-[#4793AF] `}>
        <Toaster
          position="bottom-right"
          reverseOrder={true}
          toastOptions={{
            error: {
              style: {
                borderRadius: "10px",
                color: "red",
                background: "black",
              },
            },
            success: {
              style: {
                borderRadius: "10px",
                color: "green",
                background: "black",
              },
            },
            duration: 2000,
          }}
        />
        <HeroHighlightComponent classname="min-h-screen md:fixed top-0 left-0">
          <div className="pointer-events-none h-full w-full">
            <App>
              <div>
                <PlayGroundComponent className="absolute top-0 left-0 border-r-8 border-[#637c52] bg-[#AFD198] dark:bg-[#181b22] dark:border-[#1e1818] hidden md:block" />
              </div>
              <ChildrenComponent className="absolute top-0 right-0 bg-[#DBA979]/50 dark:bg-transparent">
                {children}
              </ChildrenComponent>
            </App>
          </div>
        </HeroHighlightComponent>
      </body>
    </html>
  );
}
