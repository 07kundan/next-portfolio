import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

function Navbar({
  pathname,
  dragPlateIsActive,
  className,
}: {
  pathname: string;
  dragPlateIsActive: boolean;
  className: string;
}) {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <text className="text-2xl font-bold tracking-tight">AURIC</text>
      <ul
        style={{
          transitionProperty: "opacity",
          msTransitionTimingFunction: "linear",
          transitionDuration: "0.7s",
        }}
        className={cn(
          dragPlateIsActive || pathname === "/" ? "opacity-0" : "",
          "flex items-center gap-4 tracking-tighter"
        )}
      >
        <text className="text-4xl">{"<"}</text>
        {["profile", "skills", "projects", "feedbacks"].map((item) => (
          <li key={item} className="pointer-events-auto">
            <Link
              className={cn(
                pathname === `/${item}`
                  ? "text-cyan-600 underline underline-offset-2"
                  : "text-white"
              )}
              href={`/${item}`}
            >
              {item.toLocaleUpperCase()}
            </Link>
          </li>
        ))}

        <text className="text-4xl">{"/>"}</text>
      </ul>
    </div>
  );
}

export default Navbar;
