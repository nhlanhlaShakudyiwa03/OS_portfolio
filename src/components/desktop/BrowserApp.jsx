import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

export default function BrowserApp({ browserName, accentColor = "#2563eb", defaultUrl, bookmarks = [] }) {
  const [url, setUrl] = useState(defaultUrl || "");

  const openUrl = (nextUrl) => {
    if (!nextUrl) return;
    const normalized = /^https?:\/\//i.test(nextUrl) ? nextUrl : `https://${nextUrl}`;
    window.open(normalized, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div
          className="px-3 py-2 rounded-md text-white text-xs font-semibold"
          style={{ backgroundColor: accentColor }}
        >
          {browserName}
        </div>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="flex-1 px-3 py-2 rounded-md border border-slate-300 text-sm"
        />
        <button
          onClick={() => openUrl(url)}
          className="px-3 py-2 rounded-md bg-slate-800 text-white text-sm hover:bg-slate-700"
        >
          Go
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm text-slate-700">
          This is a simulated browser window. Use bookmarks below to open real sites in a new tab.
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800 mb-2">Bookmarks</p>
        <div className="grid grid-cols-2 gap-2">
          {bookmarks.map((bookmark) => (
            <button
              key={bookmark.url}
              onClick={() => openUrl(bookmark.url)}
              className="px-3 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-left"
            >
              <span className="text-sm text-slate-900">{bookmark.name}</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                {bookmark.url}
                <ExternalLink className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
