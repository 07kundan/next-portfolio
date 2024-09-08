import React, { memo } from "react";
import { Card, FocusCards } from "./ui/focus-cards";
import Link from "next/link";
import HeadComponent from "./headComponent";
import { FaProjectDiagram } from "react-icons/fa";
import { BsProjector } from "react-icons/bs";

const CardDetails = [
  {
    name: "Portfolio",
    description: "",
    gif: "dj",
    technologies:
      "Nextjs, Typescript, Redux, Zod, Tailwindcss, Framer-Motino, Sanity",
  },
  {
    name: "Vision-Vista",
    description: "jfldfldjfbdfhdnfjdlkfjjkfdflndnfjkjn",
    gif: "dj",
    technologies:
      "Reactjs, Redux, React-Query, TailwindCss, Nodejs, Expressjs, MongoDB",
  },
  {
    name: "Zed-Kart",
    description: "jfldfldjfbdfhdnfjdlkfjjkfdflndnfjkjn",
    gif: "dj",
    technologies: "Reactjs, TailwindCss, ContextApi, Framer-Motion, Appwrite",
  },
  {
    name: "CleverBook",
    description: "jfldfldjfbdfhdnfjdlkfjjkfdflndnfjkjn",
    gif: "dj",
    technologies: "Reactjs, Tailwindcss, Aceternity, Framer-Motion",
  },
];

const ProjectComponent = memo(() => {
  console.log("component was rendered at", new Date().toLocaleTimeString());

  return (
    <>
      <HeadComponent>
        <FaProjectDiagram className="text-2xl text-red-700" />
        <span className="text-3xl">|</span>
        <span className="text-red-700">Projects</span>
        <span className=" text-3xl">|</span>
        <BsProjector className="text-xl text-red-700" />
      </HeadComponent>
      <div className=" h-full max-h-full flex justify-center">
        {/* <FocusCards cards={cards} /> */}
        <div className="w-[70%] overflow-hidden overflow-y-scroll pointer-events-auto space-y-16 mt-12">
          {CardDetails.map((item) => (
            <div key={item.name} className="h-3/4">
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
    </>
  );
});

export default ProjectComponent;

const ProjectCard = memo(
  ({
    name,
    description,
    gif,
    technologies,
  }: {
    name: string;
    description: string;
    gif: string;
    technologies: string;
  }) => (
    <div className="flex border-2 rounded-2xl p-4 h-full">
      <div className="w-1/2 py-8 h-full flex flex-col gap-5">
        <p>{name}</p>
        <p>
          Description-:
          <br />
          {description}
        </p>
        <p className="">
          Techstack-:
          <br />
          {technologies}
        </p>
      </div>
      <div className="w-1/2 h-full  flex flex-col items-center justify-between py-4">
        <p>{gif}</p>
        <div className="w-full flex justify-between items-center px-8">
          <Link href={"/"}>Live Link</Link>
          <Link href={"/"}>Github Repo</Link>
        </div>
      </div>
    </div>
  )
);
