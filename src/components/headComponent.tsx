import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";
import { useSelector } from "react-redux";

function HeadComponent({ children }: { children: React.ReactNode }) {
  const playgroundIsActive: Boolean = useSelector(
    (state: RootState) => state.playgroud.isActive
  );
  return (
    <span
      className={cn(
        "absolute top-1/2 -translate-y-1/2 left-4 -rotate-90 -translate-x-1/2 text-xl text-nowrap"
      )}
    >
      {children}
    </span>
  );
}

export default HeadComponent;
