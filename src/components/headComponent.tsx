import { ubuntu } from "@/app/fonts/fonts";
import { cn } from "@/lib/utils";
import React from "react";

function HeadComponent({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "absolute top-1/2 -translate-y-1/2 left-0 md:left-4 -rotate-90 -translate-x-1/2 text-lg md:text-xl text-nowrap"
      )}
    >
      <span
        className={`${ubuntu.className} tracking-wide flex justify-center items-center space-x-1 md:space-x-2`}
      >
        {children}
      </span>
    </span>
  );
}

export default HeadComponent;
