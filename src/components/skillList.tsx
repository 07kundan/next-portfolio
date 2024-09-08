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
import { SiHyperskill } from "react-icons/si";
import { FaTools } from "react-icons/fa";

function SkillList({ data }: { data: skillSchema }) {
  const playgroundIsActive: Boolean = useSelector(
    (state: RootState) => state.playgroud.isActive
  );
  return (
    <>
      <HeadComponent>
        <SiHyperskill className="text-red-700" />
        <span className=" text-3xl">|</span>
        <span className="text-red-700">My skills</span>
        <span className=" text-3xl">|</span>
        <span className="text-red-700">Tools</span>
        <span className="text-3xl">|</span>
        <FaTools className="text-red-700 text-xl" />
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
            <div className="relative group/item pointer-events-auto cursor-pointer">
              <span className=" bg-zinc-400 text-black px-3 py-1 text-xs whitespace-nowrap hidden group-hover/item:inline-flex absolute -top-10 left-1/2 -translate-x-1/2 z-20 rounded-sm">
                {item.name}
              </span>
              <div className="w-[6vh] h-[6vh] flex items-center justify-center">
                <Image
                  src={ImageurlFor(item.logo).url()}
                  alt={item.name}
                  width={100}
                  height={100}
                  // layout="fill"
                  className="pointer-events-auto peer hover:scale-125 hover:animate-pulse"
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
            <div className="relative group/item pointer-events-auto cursor-pointer">
              <span className=" bg-zinc-400 text-black px-3 py-1 text-xs whitespace-nowrap hidden group-hover/item:inline-flex absolute -top-10 left-1/2 -translate-x-1/2 z-20 rounded-sm">
                {item.name}
              </span>
              <div className="w-[6vh] h-[6vh] flex items-center justify-center">
                <Image
                  src={ImageurlFor(item.logo).url()}
                  alt={item.name}
                  width={100}
                  height={100}
                  // layout="fill"
                  className="pointer-events-auto peer hover:scale-125 hover:animate-pulse"
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
