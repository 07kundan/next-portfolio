import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <div className={cn("flex justify-between items-center", className)}>
      <span
        onClick={() => {
          router.push("/");
        }}
        className="text-2xl font-extrabold tracking-tight text-[#DD5746] cursor-pointer pointer-events-auto"
      >
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
          "flex items-center gap-4 "
        )}
      >
        <span className="text-[#DD5746] text-4xl">{"<"}</span>
        {["profile", "skills", "projects", "feedbacks"].map((item) => (
          <li key={item} className="pointer-events-auto">
            <Link
              className={cn(
                pathname === `/${item}`
                  ? "text-[#207695] underline underline-offset-2 "
                  : "text-[#4793AF] hover:text-[#306c81] ",
                "font-bold"
              )}
              href={`/${item}`}
            >
              {item.toLocaleUpperCase()}
            </Link>
          </li>
        ))}

        <span className="text-[#DD5746] text-4xl">{"/>"}</span>
      </ul>
    </div>
  );
}

export default Navbar;
