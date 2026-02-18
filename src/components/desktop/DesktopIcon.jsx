import React from "react";
import { motion } from "framer-motion";

export default function DesktopIcon({ icon: Icon, label, onClick, color = "bg-cyan-500" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white/10 transition-colors group w-24"
    >
      <div className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <span className="text-white text-xs font-medium text-center drop-shadow-lg">
        {label}
      </span>
    </motion.button>
  );
}