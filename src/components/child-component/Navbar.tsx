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
      <span className="text-2xl font-extrabold tracking-tight text-red-800">
        AURIC
      </span>
      <ul
        style={{
          transitionProperty: "opacity",
          msTransitionTimingFunction: "linear",
          transitionDuration: "0.7s",
        }}
        className={cn(
          dragPlateIsActive || pathname === "/" ? "opacity-0" : "opacity-100",
          "flex items-center gap-4 tracking-tighter"
        )}
      >
        <span className="text-red-700 text-4xl">{"<"}</span>
        {["profile", "skills", "projects", "feedbacks"].map((item) => (
          <li key={item} className="pointer-events-auto">
            <Link
              className={cn(
                pathname === `/${item}`
                  ? "text-red-600 underline underline-offset-2 tracking-wide"
                  : "text-yellow-400 hover:text-yellow-600 tracking-wide"
              )}
              href={`/${item}`}
            >
              {item.toLocaleUpperCase()}
            </Link>
          </li>
        ))}

        <span className="text-red-700 text-4xl">{"/>"}</span>
      </ul>
    </div>
  );
}

export default Navbar;
