import React from "react";

const matrix = [
  { name: "Backend", value: 88 },
  { name: "Frontend", value: 78 },
  { name: "Embedded", value: 82 },
  { name: "DevOps", value: 68 },
  { name: "Integration", value: 90 },
  { name: "Databases", value: 76 },
];

export default function SkillsMatrixApp() {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-6 overflow-auto">
      <h3 className="text-xl font-semibold text-slate-900">Skills Matrix</h3>
      <div className="mt-8 grid gap-4">
        {matrix.map((item) => (
          <div key={item.name} className="border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-slate-900">{item.name}</span>
              <span className="text-sm text-slate-500">{item.value}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}