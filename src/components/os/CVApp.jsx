import React from "react";
import { Download, ExternalLink, FileText, Printer } from "lucide-react";

const CV_FILE_URL = "/cv/Nhlanhla_Shakudyiwa_CV.pdf";
const CV_DOWNLOAD_NAME = "Nhlanhla_Shakudyiwa_CV.pdf";

export default function CVApp() {
  const openInNewTab = () => {
    window.open(CV_FILE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">CV Viewer</h3>
          <p className="text-sm text-slate-500">View and download my latest resume</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={CV_FILE_URL}
            download={CV_DOWNLOAD_NAME}
            className="px-3 py-2 rounded-md bg-slate-900 text-white text-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-md bg-slate-200 text-slate-800 text-sm flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <button
            onClick={openInNewTab}
            className="px-3 py-2 rounded-md bg-slate-100 text-slate-800 text-sm flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" /> Open
          </button>
        </div>
      </div>

      <div className="p-3 h-[calc(100%-82px)]">
        <div className="h-full rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 bg-white text-slate-600 text-xs">
            <FileText className="w-4 h-4" />
            <span>{CV_DOWNLOAD_NAME}</span>
          </div>
          <iframe
            title="Nhlanhla CV"
            src={CV_FILE_URL}
            className="w-full h-[calc(100%-37px)]"
          />
        </div>
      </div>
    </div>
  );
}
