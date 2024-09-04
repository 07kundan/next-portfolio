import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";
import { useSelector } from "react-redux";

function HeadComponent({ text }: { text: string }) {
  const playgroundIsActive: Boolean = useSelector(
    (state: RootState) => state.playgroud.isActive
  );
  return (
    <h1
      className={cn(
        // playgroundIsActive ? "ml-[8vw]" : "",
        "text-center text-pretty my-[2vh] p-4"
      )}
    >
      {" "}
      {text}
    </h1>
  );
}

export default HeadComponent;
