"use client";
import { CgMail } from "react-icons/cg";
import { SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { setIsActive } from "@/lib/features/playground.slice";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DragPlate from "../drag-plate/DragPlate";
import { toggleTriggered } from "@/lib/features/svgPosition.slice";
import Link from "next/link";
import Navbar from "./Navbar";
import { toggleTheme } from "@/lib/features/theme.slice";
import { IconContext } from "react-icons/lib";
import { handjet, ubuntu } from "@/app/fonts/fonts";
import { IoIosArrowUp } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
import { ImGithub } from "react-icons/im";

const IconsLinks = [
  {
    Icon: <CgMail className="text-red-600 text-3xl" />,
    link: "mailto:kundankumarratu@gmail.com",
  },
  {
    Icon: <ImGithub className="text-black text-2xl" />,
    link: "https://github.com/07kundan",
  },
  {
    Icon: <FaXTwitter className="text-black text-xl" />,
    link: "https://twitter.com/__auric",
  },
  {
    Icon: <SiLinkedin className="text-blue-700 text-xl" />,
    link: "https://linkedin.com/in/07kundan",
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
    // dispatch(setIsActive(pathname));
  }, [pathname]);

  const handleTheme = () => {
    if (theme === "dark") dispatch(toggleTheme("light"));
    else dispatch(toggleTheme("dark"));
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
      className={cn(playgroundIsActive ? "w-[62vw] " : "w-[93vw]", className)}
    >
      <span className="w-1 h-[28vh] absolute top-0 left-4 rounded-full bg-[#5d704f]/60"></span>
      <span
        className={`absolute top-[42vh] left-4 -translate-x-1/2 -rotate-90 text-sm opacity-70 font-semibold`}
      >
        kundankumarratu@gmail.com
      </span>

      {/* social media links */}

      <div className="fixed right-5 bottom-8 space-y-3 group/links pointer-events-auto">
        <span className="w-1 h-[70vh] bg-[#5d704f]/60 group-hover/links:bg-[#4ebe03] absolute bottom-full right-1/2 translate-x-1/2 opacity-15 rounded-full group-hover/links:transition-all group-hover/links:opacity-100"></span>
        <span className="w-1 h-8 bg-[#4ebe03] absolute -bottom-8 right-1/2 translate-x-1/2 "></span>
        <IconContext.Provider value={{ className: "" }}>
          {IconsLinks.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="h-10 w-10  items-center justify-center  rounded-full bg-[#AFD198] flex opacity-15  group-hover/links:opacity-100  group-hover/links:transition-all group-hover/links:-translate-y-6 relative outline outline-2 outline-[#6d885b]"
            >
              <span className="w-[4vw] h-1 absolute top-1/2 left-full bg-[#5d704f]/60 group-hover/links:bg-[#4ebe03]"></span>
              {item.Icon}
            </Link>
          ))}
          <button
            onClick={handleTheme}
            className=" w-10 h-10 flex items-center justify-center rounded-full bg-[#AFD198] outline outline-2 outline-[#6d885b]"
          >
            {theme === "dark" ? (
              <BsSunFill className="text-orange-500 text-xl" />
            ) : (
              <BsFillMoonStarsFill className="text-sky-500 text-xl" />
            )}
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
            // backdropFilter: "blur(10px)", // Adding blur effect
          }}
          className={cn(
            dragPlateIsActive
              ? "h-[50vh] rounded-md bg-[#AFD198]/20 pointer-events-auto outline outline-[#6d885b]/50 backdrop-blur-sm"
              : "h-[5vh] backdrop-blur-0",
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
              dragPlateIsActive
                ? "rounded-none rounded-es-lg rounded-ee-lg"
                : "rounded-none rounded-ss-lg rounded-se-lg ",
              "w-2/5 h-[5vh] flex justify-center items-center absolute top-0 left-1/2 -translate-x-1/2 bg-[#AFD198] pointer-events-auto outline outline-[#6d885b]"
            )}
          >
            <div
              style={{
                transitionProperty: "all",
                transitionTimingFunction: "cubicBezier(0.4, 0, 0.2, 1)",
                transitionDuration: "400ms",
              }}
              className={cn(dragPlateIsActive ? "rotate-180" : "-rotate-0")}
            >
              <IoIosArrowUp className="text-2xl" />
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
          playgroundIsActive ? "w-[62vw] px-[4vw]" : "w-[93vw] px-[6vw]",
          "fixed top-4"
        )}
        dragPlateIsActive={dragPlateIsActive}
        pathname={pathname}
      />

      {/* page.tsx */}
      <div
        className={cn(
          playgroundIsActive ? "px-[2vw] mx-8 ml-16" : "px-[4vw] mx-8 ml-32",
          "relative h-screen pt-14 pb-8 "
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default ChildrenComponent;
