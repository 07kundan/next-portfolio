"use client";
import { CgMail } from "react-icons/cg";
import { SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";
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
import { IoIosArrowUp } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
import { ImGithub } from "react-icons/im";

// Wrapper Component for Children

// Social Media links
const IconsLinks = [
  {
    Icon: <CgMail className="text-red-600 text-2xl md:text-3xl" />,
    link: "mailto:kundankumarratu@gmail.com",
  },
  {
    Icon: <ImGithub className="text-black text-xl md:text-2xl" />,
    link: "https://github.com/07kundan",
  },
  {
    Icon: <FaXTwitter className="text-black text-lg md:text-xl" />,
    link: "https://twitter.com/__auric",
  },
  {
    Icon: <SiLinkedin className="text-blue-700 text-lg md:text-xl" />,
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
  const controls = useAnimation(); // Hook to control the animation

  useEffect(() => {
    if (pathname === "/") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setDragPlateIsActive(false);
    // dispatch(setIsActive(pathname));
  }, [pathname]);

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        rotate: 360,
        transition: {
          duration: 0.5,
          ease: "backInOut",
        },
      });

      // Reset rotation to 0 after animation completes
      controls.set({ rotate: 0 });
    };
    animate();
  });

  // funtion for toggle theme
  const handleTheme = async () => {
    if (theme === "dark") {
      dispatch(toggleTheme("light"));
    } else {
      dispatch(toggleTheme("dark"));
    }

    await controls.start({
      rotate: 360,
      transition: {
        duration: 0.5,
        ease: "backInOut",
      },
    });

    // Reset rotation to 0 after animation completes
    controls.set({ rotate: 0 });
  };

  // toggle Bottom Drage-Plate
  const handleToggle = () => {
    setDragPlateIsActive((prev) => !prev);
  };

  //Setting updatedd SVG position
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
        playgroundIsActive ? " md:w-[62vw] " : "md:w-[93vw]",
        "w-full",
        className
      )}
    >
      <span className="hidden md:block md:w-1 h-[28vh] absolute top-0 left-4 rounded-full bg-[#5d704f]/60 dark:bg-[#1d2026]"></span>
      <span
        className={`hidden md:block absolute top-[42vh] left-2 md:left-4 -translate-x-1/2 -rotate-90 text-sm opacity-70 font-semibold`}
      >
        kundankumarratu@gmail.com
      </span>

      {/* social media links */}
      <div className="fixed right-2 md:right-5 bottom-8 space-y-3 group/links pointer-events-auto">
        <span className="w-0.5 md:w-1 h-[75vh]  bg-[#4ebe03] md:bg-[#5d704f]/60 group-hover/links:bg-[#4ebe03] absolute bottom-full right-1/2 translate-x-1/2 md:opacity-15 rounded-full group-hover/links:transition-all group-hover/links:opacity-100 dark:bg-[#313640] md:dark:bg-[#7792c9] dark:group-hover/links:bg-[#313640]"></span>
        <span className="w-0.5 md:w-1 h-8 bg-[#4ebe03] dark:bg-[#313640] absolute -bottom-8 right-1/2 translate-x-1/2 "></span>
        <IconContext.Provider value={{ className: "" }}>
          {IconsLinks.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#AFD198] dark:bg-[#454850] flex md:opacity-15  group-hover/links:opacity-100  group-hover/links:transition-all -translate-y-6 md:-translate-y-0 md:group-hover/links:-translate-y-6 relative outline outline-2 outline-[#6d885b] dark:outline-[#252a35] "
            >
              <span className="w-[5vw] h-0.5 md:h-1 absolute top-1/2 left-full bg-[#5d704f]/60 dark:group-hover/links:bg-[#252a35] group-hover/links:bg-[#4ebe03] dark:bg-[#252a35] md:dark:bg-[#7792c9] "></span>
              {item.Icon}
            </Link>
          ))}
          <motion.button
            animate={controls} // Attach the animation controls
            onClick={handleTheme}
            className=" w-8 h-8 md:h-10 md:w-10 flex items-center justify-center rounded-full bg-[#AFD198] dark:bg-[#454850] outline outline-2 outline-[#6d885b] dark:outline-[#252a35] "
          >
            {theme === "dark" ? (
              <BsSunFill className="text-orange-500 text-xl" />
            ) : (
              <BsFillMoonStarsFill className="text-sky-500 text-xl" />
            )}
          </motion.button>
        </IconContext.Provider>
      </div>
      {/* ---------------------- */}

      {/*  bottom dragPlate */}
      {window.innerWidth > 768 && (
        <div className={cn(isVisible ? "md:block" : "md:hidden")}>
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
                ? "h-[48vh] md:h-[50vh] rounded-md bg-[#AFD198]/20 dark:bg-[#181b22]/30 pointer-events-auto outline outline-[#6d885b]/50 dark:outline-[#252a35]/50 backdrop-blur-sm"
                : "h-[5vh] backdrop-blur-0",
              "absolute bottom-0 left-1/2 -translate-x-1/2 w-full md:w-[25vw] flex items-end z-10"
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
                "w-1/2 md:w-2/5 h-[5vh] flex justify-center items-center absolute top-0 left-1/2 -translate-x-1/2 bg-[#AFD198] dark:bg-[#181b22] pointer-events-auto outline outline-[#6d885b] dark:outline-[#252a35]"
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
                  transform: dragPlateIsActive
                    ? "rotate(0deg)"
                    : "rotate(90deg)",
                  transitionDelay: dragPlateIsActive ? "280ms" : "0s",
                  transitionDuration: "300ms",
                }}
              >
                <DragPlate
                  className={cn(
                    "w-[38vh] h-[38vh] md:w-[38vh] md:h-[38vh] bg-[#AFD198]/50 dark:bg-[#073140]/50 outline outline-2 outline-[#637c52]/60 font-semibold dark:outline-[#045674]/80 "
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NaveBar-Components */}
      <Navbar
        className={cn(
          playgroundIsActive
            ? " md:w-[62vw] md:px-[4vw]"
            : "md:w-[93vw] md:px-[6vw]",
          "fixed top-4  w-full px-8"
        )}
        dragPlateIsActive={dragPlateIsActive}
        pathname={pathname}
      />

      {/* Page-Components */}
      <div
        className={cn(
          playgroundIsActive ? "md:mx-[3vw]" : "md:mx-[6vw]",
          "h-screen mx-[7vw] md:pt-14 relative "
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default ChildrenComponent;
