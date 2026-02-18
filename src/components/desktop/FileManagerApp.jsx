import React, { useMemo, useState } from "react";
import { Folder, FileText } from "lucide-react";

const initialFileSystem = {
  Documents: [
    { name: "welcome.txt", content: "Welcome to Portfolio OS.\nUse Settings to customize your desktop." },
    { name: "career-plan.md", content: "1. Build impactful products\n2. Lead engineering teams\n3. Keep learning" },
  ],
  Projects: [
    { name: "portfolio-notes.txt", content: "Desktop-inspired portfolio with interactive apps." },
    { name: "ideas.txt", content: "Add browser app, calculator app, notifications, and widgets." },
  ],
  Downloads: [{ name: "readme.txt", content: "Downloaded files appear here." }],
};

export default function FileManagerApp() {
  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [activeFolder, setActiveFolder] = useState("Documents");
  const [selectedFile, setSelectedFile] = useState("welcome.txt");
  const [newFileName, setNewFileName] = useState("");

  const filesInFolder = fileSystem[activeFolder] || [];
  const activeFile = filesInFolder.find((file) => file.name === selectedFile) || filesInFolder[0];

  const filePreview = useMemo(() => {
    if (!activeFile) return "No file selected";
    return activeFile.content;
  }, [activeFile]);

  const handleCreateFile = () => {
    const trimmed = newFileName.trim();
    if (!trimmed) return;

    const finalName = trimmed.endsWith(".txt") ? trimmed : `${trimmed}.txt`;
    const exists = filesInFolder.some((file) => file.name.toLowerCase() === finalName.toLowerCase());
    if (exists) return;

    setFileSystem((prev) => ({
      ...prev,
      [activeFolder]: [...(prev[activeFolder] || []), { name: finalName, content: `New file: ${finalName}` }],
    }));
    setSelectedFile(finalName);
    setNewFileName("");
  };

  return (
    <div className="grid grid-cols-[200px_1fr] h-full border border-slate-200 rounded-lg overflow-hidden">
      <aside className="bg-slate-50 border-r border-slate-200 p-3">
        <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Folders</p>
        <div className="space-y-1">
          {Object.keys(fileSystem).map((folder) => (
            <button
              key={folder}
              onClick={() => {
                setActiveFolder(folder);
                setSelectedFile((fileSystem[folder] && fileSystem[folder][0]?.name) || "");
              }}
              className={`w-full text-left px-2 py-2 rounded-md text-sm flex items-center gap-2 ${
                activeFolder === folder ? "bg-slate-200 text-slate-900" : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              <Folder className="w-4 h-4" />
              {folder}
            </button>
          ))}
        </div>
      </aside>

      <section className="grid grid-rows-[auto_1fr]">
        <div className="border-b border-slate-200 p-3 flex items-center gap-2">
          <input
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="New file name"
            className="flex-1 px-3 py-2 rounded-md border border-slate-300 text-sm"
          />
          <button
            onClick={handleCreateFile}
            className="px-3 py-2 rounded-md bg-slate-800 text-white text-sm hover:bg-slate-700"
          >
            Create
          </button>
        </div>

        <div className="grid grid-cols-[220px_1fr] h-full">
          <div className="border-r border-slate-200 p-3 space-y-1">
            {filesInFolder.map((file) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file.name)}
                className={`w-full text-left px-2 py-2 rounded-md text-sm flex items-center gap-2 ${
                  selectedFile === file.name ? "bg-blue-100 text-blue-900" : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                <FileText className="w-4 h-4" />
                {file.name}
              </button>
            ))}
          </div>

          <div className="p-4">
            <p className="text-sm font-semibold text-slate-900 mb-2">{activeFile?.name || "Preview"}</p>
            <pre className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 border border-slate-200 rounded-md p-3">
              {filePreview}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
