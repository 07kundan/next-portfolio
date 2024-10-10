"use client";
import React, { memo, useEffect, useRef } from "react";
import Link from "next/link";
import HeadComponent from "./headComponent";
import { FaProjectDiagram } from "react-icons/fa";
import { BsProjector } from "react-icons/bs";
import { ubuntu } from "@/app/fonts/fonts";

// project cards detail
const CardDetails = [
  {
    name: "Portfolio",
    description: (
      <div className="">
        <ul className="list-disc">
          <li>Personal Portfolio to showcase skills and works</li>
          <li>Integrated AI to genrate Feedback.</li>
          <li>
            Used Sanity(CMS) to manage the creation and modification of content.
          </li>
          <li>Global state management with Redux.</li>
          <li>Sleek Animation with Framer-motion.</li>
        </ul>
      </div>
    ),
    gif: "/portfolio.mp4",
    technologies: (
      <span>
        &#x2022;NextJs&nbsp; &#x2022;Typescript&nbsp; &#x2022;Tailwindcss&nbsp;
        &#x2022;React-Redux&nbsp; &#x2022;Zod&nbsp; &#x2022;Framer-Motion&nbsp;
        &#x2022;Sanity
      </span>
    ),
    liveLink: "https://auric-one.vercel.app/",
    repoLink: "https://github.com/07kundan/next-portfolio",
  },
  {
    name: "Vision-Vista",
    description: (
      <div className="">
        <ul className="list-disc">
          <li>Online video streaming and community tweet platform,</li>
          <li>React-Query for efficient data fetching,caching.</li>
          <li>React-hook-form for dynamic forms.</li>
          <li>Redux-toolkit for global state management.</li>
          <li>Zod for Schema Validation.</li>
          <li>Developed backend APIs using ExpressJs.</li>
          <li>
            Multer, cloudinary, and sharp for file uploading, image processing,
            and cloud-based media storage.
          </li>
        </ul>
      </div>
    ),
    gif: "/vision-vista.mp4",
    technologies: (
      <span>
        &#x2022;ReactJs&nbsp; &#x2022;TailwindCss&nbsp;
        &#x2022;React-Redux&nbsp; &#x2022;React-Hook-Form&nbsp;
        &#x2022;Zod&nbsp; &#x2022;React-Query&nbsp; &#x2022;ExpressJs&nbsp;
        &#x2022;MongoDB&nbsp; &#x2022;Multer&nbsp; &#x2022;Cloudinary
      </span>
    ),
    liveLink: "https://vision-vista.vercel.app/",
    repoLink: "https://github.com/07kundan/VisionVista",
  },
  {
    name: "Zed-Kart",
    description: (
      <div className="">
        <ul className="list-disc">
          <li>Animation heavy E-Commerce website.</li>
          <li>
            Utilized Appwrite for authentication and storing User&lsquo;s data
          </li>
          <li>Sleek Animation with Framer-motion.</li>
          <li>React-Router-Dom for routing.</li>
          <li>Swiper for Carousel Effect</li>
        </ul>
      </div>
    ),
    gif: "/zedkart.mp4",
    technologies: (
      <span>
        &#x2022;ReactJs&nbsp; &#x2022;TailwindCss&nbsp; &#x2022;Appwrite
      </span>
    ),
    liveLink: "https://zed-kart.netlify.app/",
    repoLink: "https://github.com/07kundan/E-Commerce",
  },
  {
    name: "CleverBook",
    description: (
      <div className="">
        <ul className="list-disc">
          <li>Landing Page for Online-Book store and showcasing creativity.</li>
          <li>Sleek Animation with Framer-motion.</li>
        </ul>
      </div>
    ),
    gif: "/cleverBook.mp4",
    technologies: (
      <span>
        &#x2022;ReactJs&nbsp; &#x2022;TailwindCss&nbsp; &#x2022;Framer-Motion
      </span>
    ),
    liveLink: "https://cleverbook.netlify.app/",
    repoLink: "https://github.com/07kundan/cleverBooks",
  },
];

// Memoized Component for project section
const ProjectComponent = memo(function ProjectComponent() {
  // console.log("component was rendered at", new Date().toLocaleTimeString());
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // Set the playback speed when the component mounts
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.5; // 1.5x speed
    }
  }, []);

  return (
    <>
      <HeadComponent>
        <FaProjectDiagram className="text-2xl" />
        <span className="text-3xl text-[#DD5746]">|</span>
        <span className="font-bold">Projects</span>
        <span className=" text-3xl text-[#DD5746]">|</span>
        <BsProjector className="text-2xl " />
      </HeadComponent>
      <div className="h-full flex items-center justify-center  md:pt-8 md:pb-16">
        <div className="h-[80vh]  md:h-full max-h-full flex justify-center py-6 w-[85%] m-auto rounded-xl bg-[#1c6d8b]/20 shadow-2xl  outline outline-1 md:outline-2 outline-[#0c4357] md:my-2">
          {/* <FocusCards cards={cards} /> */}
          <div className="w-[95%] md:w-[85%] overflow-hidden overflow-y-scroll pointer-events-auto space-y-12 pt-4 md:pt-8">
            {CardDetails.map((item) => (
              <div key={item.name} className="min-h-3/4">
                <ProjectCard
                  videoRef={videoRef}
                  name={item.name}
                  description={item.description}
                  gif={item.gif}
                  technologies={item.technologies}
                  liveLink={item.liveLink}
                  repoLink={item.repoLink}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

export default ProjectComponent;

// Project Card Sub-Component
const ProjectCard = memo(function ProjectCard({
  name,
  description,
  gif,
  technologies,
  liveLink,
  repoLink,
  videoRef,
}: {
  name: string;
  description: React.ReactNode;
  gif: string;
  technologies: React.ReactNode;
  liveLink: string;
  repoLink: string;
  videoRef: React.RefObject<HTMLVideoElement>;
}) {
  console.log(liveLink, repoLink);
  return (
    <div className="border-2 border-[#04222d] rounded-2xl text-[#6cd8ff] bg-[#0c4357] shadow-2xl py-3 space-y-3 md:px-8 ">
      {/* heading */}
      <h2
        className={`${ubuntu.className} font-semibold underline text-xl underline-offset-2 text-[#DD5746] text-center py-1 `}
      >
        {name}
      </h2>

      {/* content */}
      <div className="flex flex-col-reverse md:flex-row ">
        <div className="md:w-[70%] md:h-full flex flex-col space-y-5 p-2">
          <div className="font-semibold space-y-1">
            <h2
              className={`${ubuntu.className} font-semibold md:font-bold text-lg md:text-xl underline underline-offset-2 text-[#DD5746]`}
            >
              Description-:
            </h2>
            <div className="font-medium text-sm md:text-base  pl-4">
              {description}
            </div>
          </div>
          <div className="font-semibold space-y-1">
            <h2
              className={`${ubuntu.className} font-semibold md:font-bold text-lg md:text-xl underline underline-offset-2 text-[#DD5746]`}
            >
              Tech-stack-:
            </h2>
            <div className="font-medium text-xs md:text-base pl-2 md:pl-4">
              {technologies}
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex  items-center justify-between py-4 ">
          <video
            className="shadow-2xl rounded-lg"
            ref={videoRef}
            width="600"
            controls
            autoPlay
            muted
            loop
            src={gif}
          >
            <source src={`${gif}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Links */}
      <div className="w-full flex justify-between items-center px-4 md:px-8 py-2">
        <Link
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#5cbfe2] text-[#0c4357] font-semibold md:font-bold rounded-md text-sm md:text-base px-3 py-1"
        >
          Live Link
        </Link>
        <Link
          href={`${repoLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#5cbfe2] text-[#0c4357] font-semibold md:font-bold rounded-md text-sm md:text-base px-3 py-1"
        >
          Github Repo
        </Link>
      </div>
    </div>
  );
});
