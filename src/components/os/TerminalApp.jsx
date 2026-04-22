import React, { useMemo, useState } from "react";
import { useOS } from "@/lib/os-store";

const bootLines = [
  "Portfolio OS v2 Terminal",
  "Type 'help' to list commands.",
];

export default function TerminalApp() {
  const { dispatch } = useOS();
  const [history, setHistory] = useState(bootLines.map((line) => ({ type: "output", text: line })));
  const [input, setInput] = useState("");

  const commands = useMemo(
    () => ({
      help: () => [
        "Available commands:",
        "help",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
        "hire",
        "clear",
        "open github",
        "open linkedin",
        "sudo hire-nhlanhla",
      ],about: () => [
        "Nhlanhla Shakudyiwa",
        "Full Stack Developer | Systems Engineer",
        "Focus: enterprise integrations, embedded systems, full-stack applications.",
      ],
      skills: () => [
        "Skills:",
        "Backend: PHP, Symfony, Python",
        "Frontend: React, JavaScript, HTML, CSS",
        "Embedded: ESP32, Arduino, PIC",
        "DevOps/Tools: Docker, Git, Linux, Postman",
      ],
      projects: () => {
        dispatch({ type: "VIEWED_PROJECTS" });
        return [
          "Projects:",
          "- Secure Access Dashboard with Biometric Authentication",
          "- Automated Solar Tracking System",
          "- Banking Application",
          "- K-Means Clustering Visualization in Unity",
        ];
      },
      experience: () => [
        "Experience:",
        "Full Stack Developer at MfundoPedia",
        "Enterprise integrations, middleware, SigningHub, Jira, iTop.",
      ],
      contact: () => [
        "Contact:",
        "Email: luckydeburner@gmail.com",
        "Phone: 078 366 2424",
        "LinkedIn: linkedin.com/in/nhlanhla-shakudyiwa",
        "GitHub: github.com/nhlanhlaShakudyiwa03",
      ],hire: () => {
        dispatch({ type: "OPEN_WINDOW", payload: { id: "hire-me", label: "Hire Me" } });
        return ["Opening Hire Me app..."];
      },
      clear: () => "__CLEAR__",
      "open github": () => {
        window.open("https://github.com/nhlanhlaShakudyiwa03", "_blank", "noopener,noreferrer");
        return ["Opening GitHub..."];
      },
      "open linkedin": () => {
        window.open("https://www.linkedin.com/in/nhlanhla-shakudyiwa", "_blank", "noopener,noreferrer");
        return ["Opening LinkedIn..."];
      },
      "sudo hire-nhlanhla": () => {
        dispatch({ type: "DISCOVER_EASTER_EGG" });
        dispatch({
          type: "PUSH_NOTIFICATION",
          payload: {
            title: "Easter Egg",
            message: "Recruiter mode unlocked.",
            type: "success",
          },
        });
        return ["[sudo] recruiter access granted", "Launching premium candidate profile..."];
      },
    }),
    [dispatch]
  );

  const runCommand = () => {
    const raw = input.trim();
    if (!raw) return;

    const normalized = raw.toLowerCase();
    const nextHistory = [...history, { type: "input", text: raw }];

    if (commands[normalized]) {
      const result = commands[normalized]();
      if (result === "__CLEAR__") {
        setHistory([]);
      } else {
        setHistory([...nextHistory, ...result.map((text) => ({ type: "output", text }))]);
      }
    } else {
      setHistory([...nextHistory, { type: "output", text: `Command not found: ${raw}` }]);
    }

    setInput("");
  };

  return (
    <div className="h-full rounded-xl bg-[#0a0f14] text-green-400 flex flex-col overflow-hidden border border-emerald-500/20">
      <div className="px-4 py-2 border-b border-emerald-500/20 text-xs text-emerald-300">
        nhlanhla@portfolio-os:~
      </div>
      <div className="flex-1 overflow-auto p-4 font-mono text-sm space-y-2">
        {history.map((item, idx) => (
          <div key={idx} className={item.type === "input" ? "text-cyan-300" : "text-green-400"}>
            {item.type === "input" ? `$ ${item.text}` : item.text}
          </div>
        ))}
      </div>
      <div className="border-t border-emerald-500/20 px-4 py-3 flex items-center gap-3 font-mono text-sm">
        <span className="text-cyan-300">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runCommand()}
          className="flex-1 bg-transparent outline-none text-green-300"
          placeholder="type a command"
        />
      </div>
    </div>
  );
}