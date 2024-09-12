"use client";
import React from "react";
import HeadComponent from "./headComponent";
import Image from "next/image";
import ProfilePng from "../../public/PnG.png";
import { MdPermContactCalendar } from "react-icons/md";
import { IoExtensionPuzzle } from "react-icons/io5";
import { BsLadder } from "react-icons/bs";
import { FaDownload, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";
import { FaTools } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { motion } from "framer-motion";
import { Playpen, ubuntu } from "@/app/fonts/fonts";

const Links = [
  {
    icon: <FaGithub />,
    link: "https://github.com/07kundan",
  },
  {
    icon: <FaXTwitter />,
    link: "https://x.com/__Auric",
  },
  {
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/07kundan/",
  },
];

const keyPoints = [
  {
    icon: <BsLadder className="inline-flex text-amber-900" />,
    description: "I’m currently learning Fullstack Development",
  },
  {
    icon: <span className=" pr-3">👀</span>,
    description: "I’m looking to collaborate with Fullstack Developers.",
  },
  {
    icon: <IoExtensionPuzzle className="inline-flex text-red-600" />,
    description: ".js, .cpp, .jsx, .ts, .tsx",
  },
  {
    icon: <MdPermContactCalendar className="inline-flex text-blue-600" />,
    description: "Contact if you're looking for Fullstack Developer",
  },
];

function ProfileComponent() {
  return (
    <>
      <HeadComponent>
        <CgProfile className="text-2xl" />
        <span className="text-3xl text-[#DD5746]">|</span>
        <span className={`font-bold`}>About me</span>
        <span className=" text-3xl text-[#DD5746]">|</span>
        <FaTools className=" text-xl" />
      </HeadComponent>
      <div className="w-full flex h-full">
        <div className="w-2/3 h-full flex flex-col items-center justify-center pb-24 pl-4">
          <div className="text-xl space-y-8">
            <div>
              <p className="font-semibold text-2xl">Hii I&#39;m Kundan</p>
              <p className="text-2xl ml-8 mt-2 font-bold">
                <span className="text-[#DD5746]">A</span>
                <span className={`text-[#DD5746] ${Playpen.className}`}>
                  {" "}
                  Fullstack Developer
                </span>
              </p>
            </div>
            <div className=" flex items-center gap-16 ">
              <motion.a
                variants={{
                  initial: { x: -25, opacity: 0 },
                  end: { x: 0, opacity: 1 },
                }}
                initial="initial"
                animate="end"
                transition={{
                  duration: 0.5,
                  ease: "backOut",
                }}
                className="pointer-events-auto px-3 py-1 rounded-sm bg-[#4793AF] text-[#0c4357] inline-flex items-center gap-2 font-bold"
                href={
                  "https://drive.google.com/file/d/1BGs0rQPCPn_gYJrF9Qd30okMGrOpi05r/view?usp=sharing"
                }
                download={"download"}
              >
                Resume
                <FaDownload className="text-lg animate-bounce" />
              </motion.a>
              <div className="flex items-center justify-center gap-4 ">
                <IconContext.Provider
                  value={{ className: "text-2xl text-[#4793AF]" }}
                >
                  {" "}
                  <motion.p
                    variants={{
                      initial: { x: -25, opacity: 0 },
                      end: { x: 0, opacity: 1 },
                    }}
                    initial="initial"
                    animate="end"
                    transition={{
                      duration: 0.5,
                      ease: "backInOut",
                    }}
                    className="text-5xl text-red-700"
                  >
                    {"<"}
                  </motion.p>
                  {Links.map((item, index) => (
                    <motion.p
                      key={index}
                      variants={{
                        initial: { y: 10, opacity: 0 },
                        end: { y: 0, opacity: 1 },
                      }}
                      initial="initial"
                      animate="end"
                      transition={{
                        duration: 0.4,
                        ease: "anticipate",
                      }}
                    >
                      <Link
                        href={`${item.link}`}
                        className="pointer-events-auto hover:scale-125 hover:animate-pulse hover:transition-all"
                      >
                        {item.icon}
                      </Link>
                    </motion.p>
                  ))}
                  <motion.p
                    variants={{
                      initial: { x: 25, opacity: 0 },
                      end: { x: 0, opacity: 1 },
                    }}
                    initial="initial"
                    animate="end"
                    transition={{
                      duration: 0.5,
                      ease: "backInOut",
                    }}
                    className="text-5xl text-red-700"
                  >
                    {"/>"}
                  </motion.p>
                </IconContext.Provider>
              </div>
            </div>
          </div>

          <div className="mt-20 space-y-1">
            <IconContext.Provider value={{ className: "text-2xl mr-2" }}>
              {keyPoints.map((item, index) => (
                <motion.p
                  key={index}
                  variants={{
                    initial: { y: 15, opacity: 0 },
                    end: { y: 0, opacity: 1 },
                  }}
                  initial="initial"
                  animate="end"
                  transition={{
                    delay: 0.2,
                    duration: 0.5,
                    ease: "linear",
                  }}
                  className=""
                >
                  <span className="">{item.icon}</span>
                  <span className={`font-semibold tracking-tight text-lg `}>
                    {" "}
                    {item.description}
                  </span>
                </motion.p>
              ))}
            </IconContext.Provider>
          </div>
        </div>
        <div className="w-1/2 h-full flex justify-center items-center">
          <Image src={ProfilePng} alt="Image" height={400} />
        </div>
      </div>
    </>
  );
}

export default ProfileComponent;
