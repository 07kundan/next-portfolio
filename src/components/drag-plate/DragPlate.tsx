"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { useRouter } from "next/navigation";

function DragPlate({ className }: { className: string }) {
  const dragableArea = useRef<HTMLDivElement>(null);
  const [svgBounds, setSvgBounds] = useState<DOMRect[]>([]);
  const router = useRouter();

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
  }, []);

  const handleDrag = (event: MouseEvent, info: any) => {
    const dragElement = event.target as HTMLDivElement;
    const dragBounds = dragElement.getBoundingClientRect();

    if (
      dragBounds.right <= svgBounds[0].right &&
      dragBounds.bottom <= svgBounds[0].bottom
      // dragBounds.top <= svgBounds[0].top
      // dragBounds.left >= svgBounds[0].left
    ) {
      console.log(svgBounds[0]);
      console.log("profile");
      router.push("/profile");
    } else if (
      // dragBounds.right <= svgBounds[1].right &&
      dragBounds.left >= svgBounds[1].left &&
      dragBounds.bottom <= svgBounds[1].bottom
      // dragBounds.top >= svgBounds[1].top
    ) {
      console.log(svgBounds[1]);
      console.log("Skills");
      router.push("/skills");
    } else if (
      // dragBounds.right <= svgBounds[2].right &&
      dragBounds.top >= svgBounds[2].top &&
      dragBounds.left >= svgBounds[2].left
      // dragBounds.bottom >= svgBounds[2].bottom
    ) {
      console.log(svgBounds[2]);
      console.log("Projects");
      router.push("/projects");
    } else if (
      dragBounds.right <= svgBounds[3].right &&
      dragBounds.top >= svgBounds[3].top
      // dragBounds.left >= svgBounds[3].left &&
      // dragBounds.bottom >= svgBounds[3].bottom
    ) {
      console.log(svgBounds[3]);
      console.log("What people says");
      router.push("/what-people-says");
    } else {
      console.log("none");
    }
    // svgBounds.forEach((bounds, index) => {
    //   if (
    //     dragBounds.left < bounds.right &&
    //     dragBounds.right > bounds.left &&
    //     dragBounds.top < bounds.bottom &&
    //     dragBounds.bottom > bounds.top
    //   ) {
    //     console.log(`Dragging over element ${index + 1}`);
    //     // You can trigger any specific event here, like changing state or calling a function
    //   }
    // });
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
        <text className="text-xs fill-amber-500">
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
        Tap/Drag
      </motion.div>
    </div>
  );
}

export default DragPlate;
