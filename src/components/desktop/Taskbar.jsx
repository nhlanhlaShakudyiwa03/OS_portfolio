import React from "react";
import { motion } from "framer-motion";
import { Menu, MessageCircle, Power } from "lucide-react";

export default function Taskbar({
  openWindows,
  onWindowClick,
  onChatClick,
  onStartClick,
  onPowerClick,
  currentTime,
  accentColor = "#06b6d4"
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 flex items-center justify-between px-4 z-50">
      {/* Start Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStartClick}
        className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        style={{ backgroundColor: accentColor }}
      >
        <Menu className="w-5 h-5 text-white" />
      </motion.button>

      {/* Open Windows */}
      <div className="flex items-center gap-2 flex-1 mx-4">
        {openWindows.map((appWindow) => {
          const WindowIcon = appWindow.icon;

          return (
            <motion.button
              key={appWindow.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onWindowClick(appWindow.id)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <WindowIcon className="w-4 h-4 text-cyan-400" />
              <span className="text-white text-xs font-medium">{appWindow.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPowerClick}
          className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors"
        >
          <Power className="w-4 h-4 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onChatClick}
          className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ backgroundColor: accentColor }}
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </motion.button>
        <div className="text-white text-xs font-medium">
          {currentTime}
        </div>
      </div>
    </div>
  );
}
