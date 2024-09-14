import DragPlate from "@/components/drag-plate/DragPlate";

export default function Home() {
  return (
    <div className="absolute w-full h-screen top-0 left-0 flex items-center justify-center">
      <DragPlate className="bg-[#AFD198]/50  dark:bg-blue-800/20 outline outline-4 outline-[#637c52]/60 dark:outline-blue-900/50" />
    </div>
  );
}
