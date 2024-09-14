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
        <SiHyperskill className="" />
        <span className="text-2xl md:text-3xl  text-[#DD5746]">|</span>
        <span className="font-bold">My skills</span>
        <span className=" text-2xl md:text-3xl text-[#DD5746]">|</span>
        <span className="font-bold">Tools</span>
        <span className="text-2xl md:text-3xl text-[#DD5746]">|</span>
        <FaTools className="text-xl" />
      </HeadComponent>
      <div
        className={cn(
          playgroundIsActive
            ? "md:gap-x-[6vw] md:mx-[2vw]"
            : "md:gap-x-[7vw] md:mx-[7vw]",
          "inline-flex flex-wrap justify-center items-center gap-x-10 gap-y-10 md:gap-y-12 pt-[20vh] md:pt-10 "
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
            className="w-[7vh] h-[7vh] md:w-[13vh] md:h-[13vh] flex justify-center items-center "
          >
            <div className="relative group/item pointer-events-auto cursor-pointer">
              <span className=" bg-[#72a9bc] text-[#0c4357] font-bold px-3 py-1 text-sm whitespace-nowrap hidden group-hover/item:inline-flex absolute -top-10 left-1/2 -translate-x-1/2 z-20 rounded-sm">
                {item.name}
              </span>
              <div className="w-[4vh] h-[4vh] md:w-[6.5vh] md:h-[6.5vh] flex items-center justify-center">
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
            className="w-[7vh] h-[7vh] md:w-[13vh] md:h-[13vh] flex justify-center items-center "
          >
            <div className="relative group/item pointer-events-auto cursor-pointer">
              <span className=" bg-[#72a9bc] text-[#0c4357] font-bold px-3 py-1 text-sm whitespace-nowrap hidden group-hover/item:inline-flex absolute -top-10 left-1/2 -translate-x-1/2 z-20 rounded-sm">
                {item.name}
              </span>
              <div className="w-[4vh] h-[4vh] md:w-[6.5vh] md:h-[6.5vh] flex items-center justify-center">
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
