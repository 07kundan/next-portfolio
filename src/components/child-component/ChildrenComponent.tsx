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
    dispatch(setIsActive(pathname));
  }, [pathname]);

  const handleToggle = () => {
    setDragPlateIsActive((prev) => !prev);
  };

  const handleAnimationEnd = () => {
    dispatch(toggleTriggered());
  };
  return (
    <div
      onAnimationEnd={handleAnimationEnd}
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
          onAnimationEnd={handleAnimationEnd}
          style={{
            transitionProperty: "all",
            transitionTimingFunction: dragPlateIsActive ? "linear" : "linear",
            transitionDuration: "300ms",
          }}
          className={cn(
            dragPlateIsActive
              ? "h-[50vh] border-2 border-b-0 rounded-md border-zinc-800"
              : "h-[6vh] border-none",
            "absolute bottom-1 left-1/2 -translate-x-1/2 w-[25vw] flex items-end "
          )}
        >
          {/* top button */}
          <div
            style={{
              transitionProperty: "all",
              transitionTimingFunction: "cubicBezier(0.4, 0, 0.2, 1)",
              transitionDuration: "300ms",
            }}
            className={cn(
              dragPlateIsActive ? "border-none" : "border-t-2",
              "w-2/5 h-[5vh] flex justify-center items-center absolute top-0 left-1/2 -translate-x-1/2  border-zinc-800 rounded-lg  bg-zinc-950 "
            )}
          >
            <button
              style={{
                transitionProperty: "all",
                transitionTimingFunction: "cubicBezier(0.4, 0, 0.2, 1)",
                transitionDuration: "400ms",
              }}
              className={cn(
                dragPlateIsActive ? "rotate-0" : "-rotate-180",
                " pointer-events-auto"
              )}
              onClick={handleToggle}
            >
              <ArrowDown />
            </button>
          </div>

          <div
            style={{
              transitionProperty: "opacity",
              transitionTimingFunction: dragPlateIsActive
                ? "step-end"
                : "linear",
              transitionDuration: "250ms",
            }}
            className={cn(
              dragPlateIsActive ? "opacity-100" : "opacity-0",
              "h-[44vh] w-full flex items-center justify-center "
            )}
          >
            <DragPlate className="w-[38vh] h-[38vh] bg-blue-800/20 outline outline-1 outline-blue-600/60 text-xs" />
          </div>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}

export default ChildrenComponent;
