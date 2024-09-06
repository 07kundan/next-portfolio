"use client";

import { skillSchema } from "@/app/interfaces/skillsInterface";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ImageurlFor } from "@/sanity/client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import HeadComponent from "./headComponent";

function SkillList({ data }: { data: skillSchema }) {
  const playgroundIsActive: Boolean = useSelector(
    (state: RootState) => state.playgroud.isActive
  );
  return (
    <>
      <HeadComponent>
        <text className="text-yellow-300 ">
          <span className="text-red-700 text-3xl">|</span> My skills{" "}
          <span className="text-red-700 text-3xl">|</span> Tools{" "}
          <span className="text-red-700 text-3xl">|</span>
        </text>
      </HeadComponent>
      <div
        className={cn(
          playgroundIsActive ? "gap-[3vw] mx-[2vw]" : "gap-[4vw] mx-[6vw]",
          "inline-flex flex-wrap justify-center items-center pt-8 "
        )}
      >
        {data?.skills?.map((item, index) => (
          <motion.div
            variants={{
              initial: { y: 40, opacity: 0.1 },
              end: { y: 0, opacity: 1 },
            }}
            initial="initial"
            animate="end"
            transition={{
              delay: 0.2,
              duration: Math.random() * (1 - Number.EPSILON) + Number.EPSILON,
              ease: "backInOut",
            }}
            key={index}
            className="  w-[13vh] h-[13vh] flex justify-center items-center "
          >
            <div className="relative group pointer-events-auto cursor-pointer">
              <span className=" bg-white/80 text-black px-3 py-1 text-xs whitespace-nowrap hidden group-hover:inline-flex absolute -top-10 left-1/2 -translate-x-1/2 z-20 rounded-sm ">
                {item.name}
              </span>
              <div className="w-[6vh] h-[6vh] flex items-center justify-center">
                <Image
                  src={ImageurlFor(item.logo).url()}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="pointer-events-auto transition-all group-hover:scale-125 group-hover:animate-pulse"
                />
              </div>
            </div>
          </motion.div>
        ))}

        {data?.tools?.map((item, index) => (
          <motion.div
            variants={{
              initial: { y: 40, opacity: 0.1 },
              end: { y: 0, opacity: 1 },
            }}
            initial="initial"
            animate="end"
            transition={{
              delay: 0.2,
              duration: Math.random() * (1 - Number.EPSILON) + Number.EPSILON,
              ease: "backInOut",
            }}
            key={index}
            className="  w-[13vh] h-[13vh] flex justify-center items-center "
          >
            <div className="relative group pointer-events-auto cursor-pointer">
              <span className=" bg-zinc-400 text-black px-3 py-1 text-xs whitespace-nowrap hidden group-hover:inline-flex absolute -top-10 left-1/2 -translate-x-1/2 z-20 rounded-sm">
                {item.name}
              </span>
              <div className="w-[6vh] h-[6vh] flex items-center justify-center">
                <Image
                  src={ImageurlFor(item.logo).url()}
                  alt={item.name}
                  width={100}
                  height={100}
                  // layout="fill"
                  className="pointer-events-auto bg--50 group-hover:scale-125 group-hover:animate-pulse"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default SkillList;
