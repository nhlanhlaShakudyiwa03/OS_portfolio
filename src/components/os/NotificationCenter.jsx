import React from "react";
import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useOS } from "@/lib/os-store";

function iconFor(type) {
  switch (type) {
    case "success":
      return CheckCircle2;
    case "warning":
      return AlertCircle;
    default:
      return Info;
  }
}

export default function NotificationCenter() {
  const { state, dispatch } = useOS();

  return (
    <div className="h-full rounded-xl bg-slate-950 text-white border border-slate-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2">
        <Bell className="w-4 h-4 text-cyan-400" />
        <h3 className="font-semibold">Notifications</h3>
      </div>
      <div className="p-3 space-y-3 overflow-auto h-[calc(100%-56px)]">
        {state.notifications.map((n) => {
          const Icon = iconFor(n.type);
          return (
            <button
              key={n.id}
              onClick={() => dispatch({ type: "MARK_NOTIFICATION_READ", id: n.id })}
              className={`w-full text-left rounded-xl border p-3 ${n.read ? "border-slate-800 bg-slate-900/60" : "border-cyan-500/20 bg-slate-900"}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-4 h-4 mt-0.5 text-cyan-400" />
                <div>
                  <div className="font-medium text-sm">{n.title}</div>
                  <div className="text-slate-400 text-sm mt-1">{n.message}</div>
                  <div className="text-slate-500 text-xs mt-2">{new Date(n.createdAt).toLocaleTimeString()}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}