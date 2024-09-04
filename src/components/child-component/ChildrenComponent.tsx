"use client";
import { CgMail } from "react-icons/cg";
import { SiLinkedin } from "react-icons/si";
import { VscGithub } from "react-icons/vsc";
import { FaXTwitter } from "react-icons/fa6";
import { setIsActive } from "@/lib/features/playground.slice";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ArrowDown, MoonIcon, SunDimIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DragPlate from "../drag-plate/DragPlate";
import { toggleTriggered } from "@/lib/features/svgPosition.slice";
import Link from "next/link";
import Navbar from "./Navbar";
import { toggleTheme } from "@/lib/features/theme.slice";
import { IconContext } from "react-icons/lib";

const IconsLinks = [
  {
    Icon: <CgMail />,
    link: "",
  },
  {
    Icon: <VscGithub />,
    link: "",
  },
  {
    Icon: <FaXTwitter />,
    link: "",
  },
  {
    Icon: <SiLinkedin />,
    link: "",
  },
];

function ChildrenComponent({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const [dragPlateIsActive, setDragPlateIsActive] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const playgroundIsActive: boolean = useSelector(
    (state: RootState) => state.playgroud.isActive
  );
  const theme: string = useSelector(
    (state: RootState) => state.themeStatus.theme
  );
  const dispatch = useDispatch();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setDragPlateIsActive(false);
    dispatch(setIsActive(pathname));
  }, [pathname]);

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleToggle = () => {
    setDragPlateIsActive((prev) => !prev);
  };

  const handleTransitionEnd = () => {
    // console.log("Transition ended");
    dispatch(toggleTriggered());
  };
  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        transitionProperty: "all",
        transitionTimingFunction: "cubicBezier(0.4, 0, 0.2, 1)",
        transitionDuration: "400ms",
      }}
      className={cn(
        playgroundIsActive ? "w-[62vw] " : "w-[93vw] ",
        "absolute right-0 min-h-screen pt-10 ",
        className
      )}
    >
      <span className="w-1 h-[34vh] bg-zinc-800 absolute top-0 left-4 rounded-full"></span>
      <text className="absolute top-[49vh] left-4 -translate-x-1/2 -rotate-90 text-sm opacity-30">
        kundankumarratur@gmail.com
      </text>

      <div className="absolute right-6 bottom-6 space-y-1 group pointer-events-auto">
        <IconContext.Provider value={{ className: "text-lg" }}>
          {IconsLinks.map((item, index) => (
            <Link
              href={item.link}
              id={`${index}`}
              className="h-10 w-10  items-center justify-center border rounded-full bg-zinc-900  hidden group-hover:flex group-hover:animate-accordion-down"
            >
              {item.Icon}
            </Link>
          ))}
          <button
            onClick={handleTheme}
            className=" w-10 h-10 flex items-center justify-center border rounded-full bg-zinc-900"
          >
            {theme === "dark" ? <SunDimIcon /> : <MoonIcon />}
          </button>
        </IconContext.Provider>
      </div>

      {/*  bottom dragPlate */}
      <div className={cn(isVisible ? "block" : "hidden")}>
        <div
          onAnimationEnd={handleTransitionEnd}
          style={{
            transitionProperty: "all",
            transitionTimingFunction: dragPlateIsActive ? "linear" : "linear",
            transitionDuration: "300ms",
            transitionDelay: dragPlateIsActive ? "0s" : "100ms",
            backdropFilter: "blur(10px)", // Adding blur effect
          }}
          className={cn(
            dragPlateIsActive
              ? "h-[50vh] border-2 border-b-0 rounded-md border-zinc-600 bg-zinc-900/40 pointer-events-auto"
              : "h-[5vh]",
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-[25vw] flex items-end z-10"
          )}
        >
          {/* top button */}
          <button
            onClick={handleToggle}
            style={{
              transitionProperty: "all",
              transitionTimingFunction: "cubicBezier(0.4, 0, 0.2, 1)",
              transitionDuration: "300ms",
            }}
            className={cn(
              dragPlateIsActive ? "border-none" : "border-t-2",
              "w-2/5 h-[5vh] flex justify-center items-center absolute top-0 left-1/2 -translate-x-1/2  border-zinc-800 rounded-lg  bg-zinc-950 pointer-events-auto"
            )}
          >
            <div
              style={{
                transitionProperty: "all",
                transitionTimingFunction: "cubicBezier(0.4, 0, 0.2, 1)",
                transitionDuration: "400ms",
              }}
              className={cn(
                dragPlateIsActive ? "rotate-0" : "-rotate-180",
                " pointer-events-auto"
              )}
            >
              <ArrowDown />
            </div>
          </button>

          <div
            style={{
              transitionProperty: "all",
              transitionTimingFunction: dragPlateIsActive
                ? "step-end"
                : "linear",
              transitionDuration: "300ms",
            }}
            className={cn(
              dragPlateIsActive ? "opacity-100" : "opacity-0",
              "h-[44vh] w-full flex items-center justify-center "
            )}
          >
            <div
              style={{
                transform: dragPlateIsActive ? "rotate(0deg)" : "rotate(90deg)",
                transitionDelay: dragPlateIsActive ? "280ms" : "0s",
                transitionDuration: "300ms",
              }}
            >
              <DragPlate className="w-[38vh] h-[38vh] bg-blue-800/20 outline outline-1 outline-blue-600/60 text-xs" />
            </div>
          </div>
        </div>
      </div>

      <Navbar
        className={cn(
          playgroundIsActive ? "w-[62vw] px-[2vw]" : "w-[93vw] px-[5vw]",
          "fixed top-4"
        )}
        dragPlateIsActive={dragPlateIsActive}
        pathname={pathname}
      />

      {/* page.tsx */}
      <div
        className={cn(
          playgroundIsActive ? "px-[7vw]" : "px-[12vw]",
          "bg-red-7"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default ChildrenComponent;
