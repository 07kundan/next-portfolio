"use client";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";
import { useSelector } from "react-redux";
import HeadComponent from "./headComponent";

function ProfileComponent() {
  const playgroundIsActive: Boolean = useSelector(
    (state: RootState) => state.playgroud.isActive
  );
  return (
    <div className="relative bg-re-900">
      <HeadComponent text={"| About |"} />
    </div>
  );
}

export default ProfileComponent;
