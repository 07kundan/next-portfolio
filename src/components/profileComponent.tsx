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

function ProfileComponent() {
  return (
    <>
      <HeadComponent>
        <CgProfile className="text-red-700 text-2xl" />
        <span className="text-3xl">|</span>
        <span className="text-red-700">About me</span>
        <span className=" text-3xl">|</span>
        <FaTools className="text-red-700 text-xl" />
      </HeadComponent>
      <div className="w-full flex h-full">
        <div className="w-2/3 h-full flex flex-col items-center justify-center pb-24 pl-4">
          <div className="text-xl space-y-1 ">
            <p>Hii I&#39;m kundan</p>
            <p className="text-2xl">A Fullstack Developer</p>
            <div className=" flex items-center gap-10 ">
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
                className="pointer-events-auto px-3 py-1 rounded-sm bg-red-900 text-yellow-500 inline-flex items-center gap-2"
                href={
                  "https://drive.google.com/file/d/1BGs0rQPCPn_gYJrF9Qd30okMGrOpi05r/view?usp=sharing"
                }
                download={"download"}
              >
                Resume
                <FaDownload className="text-lg animate-bounce" />
              </motion.a>
              <div className="flex items-center justify-center gap-4 border-y-2 border-black">
                <IconContext.Provider
                  value={{ className: "text-2xl text-yellow-500" }}
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
                  <motion.p
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
                      href={"https://x.com/__Auric"}
                      className="pointer-events-auto hover:scale-125 hover:animate-pulse hover:transition-all"
                    >
                      <FaXTwitter />
                    </Link>
                  </motion.p>
                  <motion.p
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
                      href={"https://www.linkedin.com/in/07kundan/"}
                      className="pointer-events-auto hover:scale-125 hover:animate-pulse hover:transition-all"
                    >
                      <FaLinkedin />
                    </Link>
                  </motion.p>
                  <motion.p
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
                      href={"https://github.com/07kundan"}
                      className="pointer-events-auto hover:scale-125 hover:animate-pulse hover:transition-all"
                    >
                      <FaGithub />
                    </Link>
                  </motion.p>
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
              <motion.p
                variants={{
                  initial: { y: 15, opacity: 0 },
                  end: { y: 0, opacity: 1 },
                }}
                initial="initial"
                animate="end"
                transition={{
                  delay: 0.1,
                  duration: 0.5,
                  ease: "linear",
                }}
              >
                <BsLadder className="inline-flex text-amber-900" />
                I’m currently learning Fullstack Development
              </motion.p>
              <motion.p
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
                className="space-x-2"
              >
                <span>👀</span>
                <span>
                  {" "}
                  I’m looking to collaborate with Fullstack Developers.
                </span>
              </motion.p>
              <motion.p
                variants={{
                  initial: { y: 15, opacity: 0 },
                  end: { y: 0, opacity: 1 },
                }}
                initial="initial"
                animate="end"
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                  ease: "linear",
                }}
              >
                {/* <IoMdSettings /> */}
                <IoExtensionPuzzle className="inline-flex text-red-600" />
                .js, .cpp, .jsx, .ts, .tsx
              </motion.p>
              <motion.p
                variants={{
                  initial: { y: 15, opacity: 0 },
                  end: { y: 0, opacity: 1 },
                }}
                initial="initial"
                animate="end"
                transition={{
                  delay: 0.4,
                  duration: 0.5,
                  ease: "linear",
                }}
              >
                <MdPermContactCalendar className="inline-flex text-blue-600" />
                Contact if you&#39;re looking for Fullstack Developer
              </motion.p>
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
