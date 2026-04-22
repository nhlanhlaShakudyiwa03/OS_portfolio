import React, { useMemo, useState } from "react";
import { useOS } from "@/lib/os-store";

export default function PhotoViewerApp() {
  const { state } = useOS();
  const images = useMemo(() => {
    return Object.values(state.files.folders)
      .flat()
      .filter((item) => item.kind === "image");
  }, [state.files.folders]);

  const [activeId, setActiveId] = useState(images[0]?.id ?? null);
  const active = images.find((img) => img.id === activeId) ?? images[0];

  return (
    <div className="grid grid-cols-[240px_1fr] h-full rounded-xl overflow-hidden border border-slate-200 bg-white">
      <aside className="border-r border-slate-200 p-3 space-y-2 overflow-auto">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setActiveId(img.id)}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm ${active?.id === img.id ? "bg-slate-900 text-white" : "hover:bg-slate-100 text-slate-700"}`}
          >
            {img.name}
          </button>
        ))}
      </aside>
      <div className="p-4 flex items-center justify-center bg-slate-100">
        {active ? (
          <img src={active.src} alt={active.name} className="max-w-full max-h-full rounded-xl shadow-2xl object-contain" />
        ) : (
          <div className="text-slate-500">No images found.</div>
        )}
      </div>
    </div>
  );
}