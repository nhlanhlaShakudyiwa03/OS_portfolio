import React, { useState } from "react";
import { Play } from "lucide-react";

export default function IDEApp({ ideName, projectName, starterCode = "" }) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState("Ready.");

  const runCode = () => {
    setOutput(`[${ideName}] Build succeeded for ${projectName}.`);
  };

  return (
    <div className="h-full grid grid-cols-[220px_1fr] border border-slate-200 rounded-lg overflow-hidden">
      <aside className="bg-slate-900 text-slate-200 p-3">
        <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">Explorer</p>
        <p className="text-sm font-semibold">{projectName}</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-300">
          <li>src/main.jsx</li>
          <li>src/App.jsx</li>
          <li>src/pages/Home.jsx</li>
          <li>package.json</li>
        </ul>
      </aside>

      <section className="grid grid-rows-[auto_1fr_auto]">
        <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-800">{ideName}</p>
          <button
            onClick={runCode}
            className="px-3 py-1.5 rounded-md bg-green-600 text-white text-sm flex items-center gap-1"
          >
            <Play className="w-4 h-4" />
            Run
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full p-3 font-mono text-sm outline-none"
        />
        <div className="bg-black text-green-400 px-3 py-2 text-xs font-mono">{output}</div>
      </section>
    </div>
  );
}
