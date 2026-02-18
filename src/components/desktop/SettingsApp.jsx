import React from "react";

const wallpapers = [
  {
    id: "nebula",
    name: "Nebula",
    preview: "linear-gradient(135deg,#1e3a8a,#6b21a8,#db2777)",
  },
  {
    id: "sunset",
    name: "Sunset",
    preview: "linear-gradient(135deg,#7c2d12,#ea580c,#f59e0b)",
  },
  {
    id: "emerald",
    name: "Emerald",
    preview: "linear-gradient(135deg,#052e16,#166534,#0f766e)",
  },
];

const accents = ["#06b6d4", "#2563eb", "#7c3aed", "#f97316", "#16a34a", "#e11d48"];

export default function SettingsApp({ settings, onSettingsChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">System Settings</h3>
        <p className="text-sm text-slate-600">Configure your desktop experience.</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800 mb-2">Wallpaper</p>
        <div className="grid grid-cols-3 gap-3">
          {wallpapers.map((wallpaper) => (
            <button
              key={wallpaper.id}
              onClick={() => onSettingsChange({ wallpaper: wallpaper.id })}
              className={`p-1 rounded-xl border-2 ${
                settings.wallpaper === wallpaper.id ? "border-slate-900" : "border-slate-300"
              }`}
            >
              <div className="h-14 rounded-lg" style={{ background: wallpaper.preview }} />
              <p className="text-xs mt-1 text-slate-700">{wallpaper.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800 mb-2">Accent Color</p>
        <div className="flex gap-2">
          {accents.map((accent) => (
            <button
              key={accent}
              onClick={() => onSettingsChange({ accentColor: accent })}
              className={`w-8 h-8 rounded-full border-2 ${
                settings.accentColor === accent ? "border-slate-900" : "border-slate-300"
              }`}
              style={{ backgroundColor: accent }}
              aria-label={`Select accent ${accent}`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center justify-between border border-slate-200 rounded-lg p-3">
          <span className="text-sm text-slate-800">Enable desktop animations</span>
          <input
            type="checkbox"
            checked={settings.animationsEnabled}
            onChange={(e) => onSettingsChange({ animationsEnabled: e.target.checked })}
          />
        </label>

        <label className="flex items-center justify-between border border-slate-200 rounded-lg p-3">
          <span className="text-sm text-slate-800">Use 24-hour clock</span>
          <input
            type="checkbox"
            checked={settings.use24HourClock}
            onChange={(e) => onSettingsChange({ use24HourClock: e.target.checked })}
          />
        </label>
      </div>
    </div>
  );
}
