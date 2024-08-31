"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

export function HeroHighlightComponent({
  children,
  classname,
}: {
  children?: React.ReactNode;
  classname: string;
}) {
  return (
    <HeroHighlight containerClassName={classname}>{children}</HeroHighlight>
  );
}
