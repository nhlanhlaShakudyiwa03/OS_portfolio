import React from "react";
import { Trash2, RotateCcw, XCircle } from "lucide-react";
import { useOS } from "@/lib/os-store";

export default function RecycleBinApp() {
  const { state, dispatch } = useOS();
  const items = state.files.recycleBin;

  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-slate-700" />
          <h3 className="font-semibold text-slate-900">Recycle Bin</h3>
        </div>
        <button
          onClick={() => dispatch({ type: "EMPTY_RECYCLE_BIN" })}
          className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm"
        >
          Empty Bin
        </button>
      </div>

      <div className="p-4 space-y-3 overflow-auto h-[calc(100%-58px)]">
        {items.length === 0 ? (
          <div className="text-slate-500 text-sm">Recycle Bin is empty.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="border rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <div className="font-medium text-slate-900">{item.name}</div>
                <div className="text-xs text-slate-500 mt-1">From: {item.originalFolder}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch({ type: "RESTORE_FILE_FROM_RECYCLE", id: item.id })}
                  className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restore
                </button>
                <button className="px-3 py-1.5 rounded-md bg-slate-200 text-slate-700 text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}