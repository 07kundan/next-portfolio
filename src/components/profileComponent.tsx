"use client";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";
import { useSelector } from "react-redux";
import HeadComponent from "./headComponent";
import Image from "next/image";
import ProfilePng from "../../public/6tXM.gif";
import Link from "next/link";

function ProfileComponent() {
  const playgroundIsActive: Boolean = useSelector(
    (state: RootState) => state.playgroud.isActive
  );
  return (
    <>
      <HeadComponent>
        <span className="text-yellow-300 text-3xl">|</span>
        <span className="text-red-700">About</span>
        <span className="text-yellow-300 text-3xl">|</span>
      </HeadComponent>
      <div className="w-full flex h-full">
        <div className="w-1/2 h-full bg-lime-950 flex justify-center items-center">
          <div className="">
            <p>Hii I'm kundan</p>
            <p>A Fullstack Developer</p>
            <div className="space-x-3">
              <a
                className="pointer-events-auto"
                href={
                  "https://drive.google.com/file/d/1BGs0rQPCPn_gYJrF9Qd30okMGrOpi05r/view?usp=sharing"
                }
                download={"download"}
              >
                Download
              </a>
              <span>
                <span>x</span>
                <span>L</span>
                <span>G</span>
              </span>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full flex justify-center bg-red-900/20 items-center">
          <Image src={ProfilePng} alt="Image" height={400} />
        </div>
      </div>
    </>
  );
}

export default ProfileComponent;
