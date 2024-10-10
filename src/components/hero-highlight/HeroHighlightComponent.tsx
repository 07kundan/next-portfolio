"use client";
import { HeroHighlight } from "../ui/hero-highlight";

// Hero Background component
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
