"use client";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

// Drage-Plate Component
function DragPlate({ className }: { className: string }) {
  const dragableArea = useRef<HTMLDivElement>(null);
  const [svgBounds, setSvgBounds] = useState<DOMRect[]>([]);
  const router = useRouter();

  const svgPositionTrigger: boolean = useSelector(
    (state: RootState) => state.svgPosition.triggered
  );
  const pathname = usePathname();

  useEffect(() => {
    if (dragableArea.current) {
      dragableArea.current.style.transform = "rotate(360deg)";
      const svgElements = dragableArea.current.querySelectorAll("text");
      const boundsArray = Array.from(svgElements).map((el) =>
        el.getBoundingClientRect()
      );
      // boundsArray.forEach((arr) => console.log(arr));
      setSvgBounds(boundsArray);
    }
  }, [svgPositionTrigger, pathname]);

  const handleDrag = (event: MouseEvent, info: any) => {
    // console.log(svgBounds);
    const dragElement = event.target as HTMLDivElement;
    const dragBounds = dragElement.getBoundingClientRect();

    if (
      (dragBounds.right <= svgBounds[0].right &&
        dragBounds.top <= svgBounds[0].bottom) ||
      (dragBounds.top <= svgBounds[0].bottom &&
        dragBounds.right <= svgBounds[0].right)
    ) {
      router.push("/profile");
    } else if (
      (dragBounds.left >= svgBounds[1].left &&
        dragBounds.bottom <= svgBounds[1].bottom) ||
      (dragBounds.left >= svgBounds[1].left &&
        dragBounds.top <= svgBounds[0].bottom)
    ) {
      router.push("/skills");
    } else if (
      (dragBounds.bottom >= svgBounds[2].bottom &&
        dragBounds.left >= svgBounds[2].left) ||
      (dragBounds.left >= svgBounds[2].left &&
        dragBounds.bottom >= svgBounds[2].top)
    ) {
      router.push("/projects");
    } else if (
      (dragBounds.right <= svgBounds[3].right &&
        dragBounds.top <= svgBounds[3].bottom) ||
      (dragBounds.bottom >= svgBounds[3].top &&
        dragBounds.right <= svgBounds[3].right)
    ) {
      router.push("/feedbacks");
    }
  };

  return (
    <div
      style={{
        transitionDuration: "600ms",
      }}
      ref={dragableArea}
      className={` relative w-[32vh] h-[32vh] md:w-[30vw] md:h-[30vw] rounded-full overflow-hidden ${className} `}
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

        <text className="text-xs fill-[#DD5746]">
          <textPath href="#circlePath1" startOffset="20%">
            Profile
          </textPath>
        </text>
        <text className="text-xs fill-[#DD5746]">
          <textPath href="#circlePath2" startOffset="20%">
            Skills
          </textPath>
        </text>
        <text className="text-xs fill-[#DD5746]">
          <textPath href="#circlePath3" startOffset="20%">
            Projects
          </textPath>
        </text>
        <text className="text-xs fill-[#DD5746]">
          <textPath href="#circlePath4" startOffset="20%">
            Feedbacks
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
        className="bg-black absolute top-1/2 left-1/2 w-1/6 h-1/6 text-xs rounded-full flex justify-center items-center pointer-events-auto cursor-pointer"
      >
        Drag
      </motion.div>
    </div>
  );
}

export default DragPlate;
