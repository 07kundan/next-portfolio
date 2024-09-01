"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

function DragPlate({ className }: { className: string }) {
  const dragableArea = useRef<HTMLDivElement>(null);
  const [svgBounds, setSvgBounds] = useState<DOMRect[]>([]);
  const router = useRouter();

  const svgPositionTrigger: Boolean = useSelector(
    (state: RootState) => state.svgPosition.triggered
  );
  const pathname = usePathname();

  useEffect(() => {
    if (dragableArea.current) {
      const svgElements = dragableArea.current.querySelectorAll("text");
      // console.log(svgElements);
      const boundsArray = Array.from(svgElements).map((el) =>
        el.getBoundingClientRect()
      );
      // boundsArray.forEach((arr) => console.log(arr));
      setSvgBounds(boundsArray);
    }
  }, [svgPositionTrigger, pathname]);

  const handleDrag = (event: MouseEvent, info: any) => {
    console.log(svgBounds);
    const dragElement = event.target as HTMLDivElement;
    const dragBounds = dragElement.getBoundingClientRect();

    if (
      (dragBounds.right <= svgBounds[0].right &&
        dragBounds.top <= svgBounds[0].bottom) ||
      (dragBounds.top <= svgBounds[0].bottom &&
        dragBounds.right <= svgBounds[0].right)
    ) {
      console.log(svgBounds[0]);
      console.log("profile");
      router.push("/profile");
    } else if (
      (dragBounds.left >= svgBounds[1].left &&
        dragBounds.bottom <= svgBounds[1].bottom) ||
      (dragBounds.left >= svgBounds[1].left &&
        dragBounds.top <= svgBounds[0].bottom)
    ) {
      console.log(svgBounds[1]);
      console.log("Skills");
      router.push("/skills");
    } else if (
      (dragBounds.bottom >= svgBounds[2].bottom &&
        dragBounds.left >= svgBounds[2].left) ||
      (dragBounds.left >= svgBounds[2].left &&
        dragBounds.bottom >= svgBounds[2].top)
    ) {
      console.log(svgBounds[2]);
      console.log("Projects");
      router.push("/projects");
    } else if (
      (dragBounds.right <= svgBounds[3].right &&
        dragBounds.top <= svgBounds[3].bottom) ||
      (dragBounds.bottom >= svgBounds[3].top &&
        dragBounds.right <= svgBounds[3].right)
    ) {
      console.log("svg bounds -: ", svgBounds[3]);
      console.log("drag bounds -: ", dragBounds);
      console.log("What people says");
      router.push("/what-people-says");
    } else {
      console.log(svgBounds);
      console.log("dragbounds - :", dragBounds);
      console.log("none");
    }
  };

  const handleDragOver = (event: React.DragEvent<SVGTextElement>) => {
    event.preventDefault();
    console.log("draggedOver");
  };

  return (
    <div
      ref={dragableArea}
      className={` relative w-[30vw] h-[30vw] rounded-full overflow-hidden ${className}`}
    >
      <svg viewBox="0 0 200 200" className="circle-svg bg">
        <path
          id="circlePath1"
          d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0"
          fill="none"
          // stroke="blue"
          //   strokeWidth={4}
        ></path>
        <path
          id="circlePath2"
          d="M 100, 100 m 0, -75 a 75,75 0 1,1 0, 150"
          fill="none"
          // stroke="red"
          //   strokeWidth={4}
        ></path>
        <path
          id="circlePath3"
          d="M 100, 100 m 75, 0 a 75,75 0 1,1 -150,0"
          fill="none"
          // stroke="orange"
          //   strokeWidth={4}
        ></path>
        <path
          id="circlePath4"
          d="M 100, 100 m 0, 75 a 75,75 0 1,1 0, -150"
          fill="none"
          // stroke="purple"
          //   strokeWidth={4}
        ></path>

        <text className="text-xs fill-amber-500">
          <textPath href="#circlePath1" startOffset="20%">
            Profile
          </textPath>
        </text>
        <text onDragOver={handleDragOver} className="text-xs fill-amber-500">
          <textPath href="#circlePath2" startOffset="20%">
            Skills
          </textPath>
        </text>
        <text className="text-xs fill-amber-500">
          <textPath href="#circlePath3" startOffset="20%">
            Projects
          </textPath>
        </text>
        <text className="text-xs fill-amber-500">
          <textPath href="#circlePath4" startOffset="20%">
            People Says!!
          </textPath>
        </text>
      </svg>
      <motion.div
        initial={{ translateX: "-50%", translateY: "-50%" }}
        drag
        dragConstraints={dragableArea}
        dragSnapToOrigin={true}
        dragListener={true}
        onDragEnd={handleDrag}
        className="bg-black absolute top-1/2 left-1/2  w-1/5 h-1/5 rounded-full text-white flex justify-center items-center pointer-events-auto"
      >
        Drag
      </motion.div>
    </div>
  );
}

export default DragPlate;
