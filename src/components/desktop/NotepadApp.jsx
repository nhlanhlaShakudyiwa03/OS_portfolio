import React, { useState } from "react";

export default function NotepadApp() {
  const [text, setText] = useState("Write your notes here...");
  const [savedAt, setSavedAt] = useState("");

  const handleSave = () => {
    const now = new Date();
    setSavedAt(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
  };

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">Simple text editor</p>
        <button onClick={handleSave} className="px-3 py-1.5 rounded-md bg-slate-800 text-white text-sm">
          Save
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 min-h-[420px] border border-slate-300 rounded-md p-3 text-sm font-mono outline-none focus:border-slate-500"
      />
      <p className="text-xs text-slate-500">{savedAt ? `Last saved at ${savedAt}` : "Not saved yet"}</p>
    </div>
  );
}
