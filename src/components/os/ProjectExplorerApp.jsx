import React, { useMemo, useState } from "react";
import { useOS } from "@/lib/os-store";

export default function ProjectExplorerApp() {
  const { state } = useOS();
  const projects = useMemo(() => (state.files.folders.Projects || []).filter((item) => item.kind === "project"), [state.files.folders]);
  const [activeId, setActiveId] = useState(projects[0]?.id ?? null);
  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  return (
    <div className="grid grid-cols-[260px_1fr] h-full rounded-xl overflow-hidden border border-slate-200 bg-white">
      <aside className="border-r border-slate-200 p-4 space-y-2 overflow-auto">
        <h3 className="font-semibold text-slate-900 mb-3">Projects</h3>
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setActiveId(project.id)}
            className={`w-full text-left rounded-xl px-3 py-3 ${active?.id === project.id ? "bg-slate-900 text-white" : "hover:bg-slate-100 text-slate-700"}`}
          >
            {project.name}
          </button>
        ))}
      </aside>
      <div className="p-6 overflow-auto">
        {active ? (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900">{active.name}</h2>
            <div className="mt-6 grid gap-5">
              <section><h4 className="font-semibold text-slate-900">Overview</h4><p className="text-slate-600 mt-2">{active.content.overview}</p></section>
              <section><h4 className="font-semibold text-slate-900">Stack</h4><div className="mt-2 flex flex-wrap gap-2">{active.content.stack.map((s) => <span key={s} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm">{s}</span>)}</div></section>
              <section><h4 className="font-semibold text-slate-900">Architecture</h4><p className="text-slate-600 mt-2">{active.content.architecture}</p></section>
              <section><h4 className="font-semibold text-slate-900">Challenges</h4><ul className="list-disc pl-6 text-slate-600 mt-2">{active.content.challenges.map((c) => <li key={c}>{c}</li>)}</ul></section>
              <section><h4 className="font-semibold text-slate-900">Links</h4><div className="mt-2 flex gap-3"><a href={active.content.links.github || "#"} className="text-cyan-600">GitHub</a><a href={active.content.links.demo || "#"} className="text-cyan-600">Demo</a></div></section>
            </div>
          </div>
        ) : (
          <div className="text-slate-500">No projects available.</div>
        )}
      </div>
    </div>
  );
}