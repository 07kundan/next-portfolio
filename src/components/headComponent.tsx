import { cn } from "@/lib/utils";
import React from "react";

function HeadComponent({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "absolute top-1/2 -translate-y-1/2 left-4 -rotate-90 -translate-x-1/2 text-xl text-nowrap "
      )}
    >
      <span className="text-yellow-300 flex justify-center items-center space-x-2">
        {children}
      </span>
    </span>
  );
}

export default HeadComponent;
