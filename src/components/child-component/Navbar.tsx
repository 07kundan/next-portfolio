import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaProjectDiagram } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { SiHyperskill } from "react-icons/si";

// Navbar-Component

const NavItems = [
  {
    name: "profile",
    icon: <CgProfile className="text-3xl" />,
  },
  {
    name: "skills",
    icon: <SiHyperskill className="text-2xl" />,
  },
  {
    name: "projects",
    icon: <FaProjectDiagram className="text-2xl" />,
  },
  {
    name: "feedbacks",
    icon: <FaRegMessage className="text-2xl" />,
  },
];

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
        {NavItems.map((item) => (
          <li key={item.name} className="pointer-events-auto">
            <Link
              className={cn(
                pathname === `/${item}`
                  ? "text-[#207695] underline underline-offset-2 "
                  : "text-[#4793AF] hover:text-[#306c81] ",
                "font-bold"
              )}
              href={`/${item.name}`}
            >
              <span className="md:hidden">{item.icon}</span>
              <span className="hidden md:block">
                {item.name.toLocaleUpperCase()}
              </span>
            </Link>
          </li>
        ))}

        <span className="text-[#DD5746] text-4xl">{"/>"}</span>
      </ul>
    </div>
  );
}

export default Navbar;
