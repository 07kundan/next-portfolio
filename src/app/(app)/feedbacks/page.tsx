import FeedbackComponent from "@/components/feedbackComponent";
import HeadComponent from "@/components/headComponent";
import React from "react";
import { FaRegMessage } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";

function WhatPeopleSays() {
  return (
    <>
      <HeadComponent>
        <FaRegMessage className="text-2xl text-red-700" />
        <span className="text-3xl">|</span>
        <span className="text-red-700">Feedbacks</span>
        <span className=" text-3xl">|</span>
        <MdFeedback className="text-xl text-red-700" />
      </HeadComponent>
      <div className=" h-full">
        <FeedbackComponent />
      </div>
    </>
  );
}

export default WhatPeopleSays;
