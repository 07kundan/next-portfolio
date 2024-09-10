import DragPlate from "@/components/drag-plate/DragPlate";

export default function Home() {
  return (
    <div className="absolute w-full h-screen top-0 left-0 flex items-center justify-center">
      <DragPlate className="bg-blue-800/20 outline outline-1 outline-blue-600/60" />
    </div>
  );
}
