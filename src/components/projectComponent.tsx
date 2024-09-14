import React, { memo } from "react";
import Link from "next/link";
import HeadComponent from "./headComponent";
import { FaProjectDiagram } from "react-icons/fa";
import { BsProjector } from "react-icons/bs";
import { ubuntu } from "@/app/fonts/fonts";

const CardDetails = [
  {
    name: "Portfolio",
    description: (
      <div className="">
        <ul className="list-disc">
          <li>Integrated AI to genrate Feedback.</li>
          <li>
            Use Sanity(CMS) to manage the creation and modification of content.
          </li>
          <li>Global state management with Redux.</li>
          <li>Sleek Animation with Framer-motion.</li>
        </ul>
      </div>
    ),
    gif: "dj",
    technologies:
      "Nextjs, Typescript, Redux, Zod, Tailwindcss, Framer-Motino, Sanity",
  },
  {
    name: "Vision-Vista",
    description: (
      <div className="">
        <ul className="list-disc">
          <li>Integrated AI to genrate Feedback.</li>
          <li>
            Use Sanity(CMS) to manage the creation and modification of content.
          </li>
          <li>Global state management with Redux.</li>
          <li>Sleek Animation with Framer-motion.</li>
        </ul>
      </div>
    ),
    gif: "dj",
    technologies:
      "Reactjs, Redux, React-Query, TailwindCss, Nodejs, Expressjs, MongoDB",
  },
  {
    name: "Zed-Kart",
    description: (
      <div className="">
        <ul className="list-disc">
          <li>Integrated AI to genrate Feedback.</li>
          <li>
            Use Sanity(CMS) to manage the creation and modification of content.
          </li>
          <li>Global state management with Redux.</li>
          <li>Sleek Animation with Framer-motion.</li>
        </ul>
      </div>
    ),
    gif: "dj",
    technologies: "Reactjs, TailwindCss, ContextApi, Framer-Motion, Appwrite",
  },
  {
    name: "CleverBook",
    description: (
      <div className="">
        <ul className="list-disc">
          <li>Integrated AI to genrate Feedback.</li>
          <li>
            Use Sanity(CMS) to manage the creation and modification of content.
          </li>
          <li>Global state management with Redux.</li>
          <li>Sleek Animation with Framer-motion.</li>
        </ul>
      </div>
    ),
    gif: "dj",
    technologies: "Reactjs, Tailwindcss, Aceternity, Framer-Motion",
  },
];

const ProjectComponent = memo(function ProjectComponent() {
  // console.log("component was rendered at", new Date().toLocaleTimeString());

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
                  name={item.name}
                  description={item.description}
                  gif={item.gif}
                  technologies={item.technologies}
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

const ProjectCard = memo(function ProjectCard({
  name,
  description,
  gif,
  technologies,
}: {
  name: string;
  description: React.ReactNode;
  gif: string;
  technologies: string;
}) {
  return (
    <div className=" border-2 border-[#04222d] rounded-2xl  text-[#6cd8ff] bg-[#0c4357] shadow-2xl py-3 space-y-3 md:px-8 ">
      {/* heading */}
      <h2
        className={`${ubuntu.className} font-semibold underline text-xl underline-offset-2 text-[#DD5746] text-center py-1 `}
      >
        {name}
      </h2>

      {/* content */}
      <div className="flex flex-col-reverse md:flex-row">
        <div className="md:w-[70%] md:h-full flex flex-col space-y-5 p-2">
          <div className="font-semibold space-y-1">
            <h2
              className={`${ubuntu.className} font-semibold md:font-bold text-lg md:text-xl underline underline-offset-2 text-[#DD5746]`}
            >
              Description-:
            </h2>
            <div className="font-medium text-sm md:text-base md:font-bold pl-4">
              {description}
            </div>
          </div>
          <div className="font-semibold space-y-1">
            <h2
              className={`${ubuntu.className} font-semibold md:font-bold text-lg md:text-xl underline underline-offset-2 text-[#DD5746]`}
            >
              Tech-stack-:
            </h2>
            <div className="font-semibold text-xs md:text-base md:font-bold pl-4">
              {technologies}
            </div>
          </div>
        </div>

        <div className="md:w-1/2 md:h-full  flex flex-col items-center justify-between py-4">
          <p>{gif}</p>
        </div>
      </div>

      {/* Links */}
      <div className="w-full flex justify-between items-center px-4 md:px-8">
        <Link
          href={"/"}
          className="bg-[#5cbfe2] text-[#0c4357] font-semibold md:font-bold rounded-md text-sm md:text-base px-3 py-1"
        >
          Live Link
        </Link>
        <Link
          href={"/"}
          className="bg-[#5cbfe2] text-[#0c4357] font-semibold md:font-bold rounded-md text-sm md:text-base px-3 py-1"
        >
          Github Repo
        </Link>
      </div>
    </div>
  );
});
