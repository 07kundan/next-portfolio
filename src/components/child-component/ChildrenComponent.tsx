"use client";
import { setIsActive } from "@/lib/features/playground.slice";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUpToLine } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DragPlate from "../drag-plate/DragPlate";
import { toggleTriggered } from "@/lib/features/svgPosition.slice";

function ChildrenComponent({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const [dragPlateIsActive, setDragPlateIsActive] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const playgroundIsActive: Boolean = useSelector(
    (state: RootState) => state.playgroud.isActive
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
        playgroundIsActive ? "w-[62vw]" : "w-[93vw]",
        "absolute right-0 h-screen",
        className
      )}
    >
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

      <div className="">{children}</div>
    </div>
  );
}

export default ChildrenComponent;
