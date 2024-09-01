"use client";
import DragPlate from "@/components/drag-plate/DragPlate";

export default function Home({ className }: { className: string }) {
  return (
    <div className="h-screen">
      <h2 className="px-6 ml-44 font-bold text-2xl h-[10%] inline-flex items-center ">
        <span className=" px-5 py-2 rounded-2xl bg-blue-700/40">
          {" "}
          Kundan-Portfolio
        </span>
      </h2>

      <div className="flex items-center justify-center w-full h-[90%]">
        <DragPlate className="bg-blue-800/20 outline outline-1 outline-blue-600/60 " />
      </div>
    </div>
  );
}
