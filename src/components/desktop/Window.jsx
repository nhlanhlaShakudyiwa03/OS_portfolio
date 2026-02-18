import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Minus, Square, Maximize2 } from "lucide-react";

export default function Window({ 
  title, 
  icon: Icon, 
  children, 
  onClose, 
  initialPosition = { x: 100, y: 100 },
  zIndex = 1,
  onFocus
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  if (isMinimized) return null;

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      initial={initialPosition}
      animate={isMaximized ? { 
        x: 0, 
        y: 0, 
        width: "100vw", 
        height: "calc(100vh - 48px)",
        transition: { type: "spring", stiffness: 300, damping: 30 }
      } : {}}
      className={`fixed ${isMaximized ? '' : 'w-[800px] max-w-[90vw]'} bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-300`}
      style={{ zIndex }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-300 px-4 py-2 flex items-center justify-between cursor-move select-none">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-cyan-600" />}
          <span className="text-sm font-semibold text-slate-800">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="w-8 h-8 rounded hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <Minus className="w-4 h-4 text-slate-600" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-8 h-8 rounded hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            {isMaximized ? <Square className="w-3 h-3 text-slate-600" /> : <Maximize2 className="w-3 h-3 text-slate-600" />}
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors group"
          >
            <X className="w-4 h-4 text-slate-600 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`${isMaximized ? 'h-[calc(100vh-96px)]' : 'h-[600px]'} overflow-y-auto bg-white`}>
        {children}
      </div>
    </motion.div>
  );
}
