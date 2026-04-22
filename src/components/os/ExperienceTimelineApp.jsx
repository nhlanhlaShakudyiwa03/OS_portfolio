import React from "react";

const timeline = [
  {
    year: "2025 — Present",
    role: "Full Stack Developer",
    company: "MfundoPedia",
    details: [
      "Integrated SigningHub workflows with enterprise systems",
      "Built and maintained web applications using PHP and JavaScript",
      "Prepared solution architecture and integration documentation",
    ],
  },
  {
    year: "2025",
    role: "University Projects",
    company: "TUT",
    details: [
      "Automated Solar Tracking System",
      "Biometric dashboard work",
      "Systems integration and embedded development",
    ],
  },
];

export default function ExperienceTimelineApp() {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-6 overflow-auto">
      <h3 className="text-xl font-semibold text-slate-900">Experience Timeline</h3>
      <div className="mt-8 space-y-6">
        {timeline.map((item) => (
          <div key={`${item.year}-${item.role}`} className="grid grid-cols-[180px_1fr] gap-6 border rounded-2xl p-5">
            <div className="text-sm font-medium text-cyan-700">{item.year}</div>
            <div>
              <div className="text-lg font-semibold text-slate-900">{item.role}</div>
              <div className="text-slate-500 text-sm mt-1">{item.company}</div>
              <ul className="mt-3 list-disc pl-5 text-slate-600 text-sm space-y-1">
                {item.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}