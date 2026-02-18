import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  Code2,
  Globe,
  Flame,
  Cpu,
  Terminal,
  FolderGit2,
  FolderOpen,
  FileText,
  GraduationCap,
  Mail,
  Settings,
  Lock,
  LogOut,
  Power,
} from "lucide-react";
import DesktopIcon from "../components/desktop/DesktopIcon";
import Window from "../components/desktop/Window";
import Taskbar from "../components/desktop/Taskbar";
import SettingsApp from "../components/desktop/SettingsApp";
import FileManagerApp from "../components/desktop/FileManagerApp";
import NotepadApp from "../components/desktop/NotepadApp";
import BrowserApp from "../components/desktop/BrowserApp";
import IDEApp from "../components/desktop/IDEApp";
import ChatBot from "../components/portfolio/ChatBot";
import AboutSection from "../components/portfolio/AboutSection";
import ExperienceSection from "../components/portfolio/ExperienceSection";
import SkillsSection from "../components/portfolio/SkillsSection";
import ProjectsSection from "../components/portfolio/ProjectsSection";
import EducationSection from "../components/portfolio/EducationSection";
import ContactSection from "../components/portfolio/ContactSection";

/**
 * @typedef {object} DesktopApp
 * @property {string} id
 * @property {React.ComponentType<any>} icon
 * @property {string} label
 * @property {string} color
 * @property {React.ComponentType<any>} component
 * @property {Record<string, any>=} props
 */

/**
 * @typedef {DesktopApp & { zIndex: number, position: { x: number, y: number } }} AppWindow
 */

const WALLPAPER_STYLES = {
  nebula: "bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900",
  sunset: "bg-gradient-to-br from-orange-900 via-amber-700 to-rose-500",
  emerald: "bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700",
};

/** @type {DesktopApp[]} */
const apps = [
  { id: "settings", icon: Settings, label: "Settings", color: "bg-slate-600", component: SettingsApp },
  { id: "file-manager", icon: FolderOpen, label: "File Manager", color: "bg-yellow-500", component: FileManagerApp },
  { id: "notepad", icon: FileText, label: "Notepad", color: "bg-slate-500", component: NotepadApp },
  {
    id: "chrome",
    icon: Globe,
    label: "Chrome",
    color: "bg-blue-600",
    component: BrowserApp,
    props: {
      browserName: "Google Chrome",
      accentColor: "#2563eb",
      defaultUrl: "google.com",
      bookmarks: [
        { name: "Google", url: "https://google.com" },
        { name: "GitHub", url: "https://github.com" },
        { name: "Stack Overflow", url: "https://stackoverflow.com" },
        { name: "MDN Docs", url: "https://developer.mozilla.org" },
      ],
    },
  },
  {
    id: "firefox",
    icon: Flame,
    label: "Firefox",
    color: "bg-orange-600",
    component: BrowserApp,
    props: {
      browserName: "Firefox",
      accentColor: "#ea580c",
      defaultUrl: "mozilla.org",
      bookmarks: [
        { name: "Mozilla", url: "https://mozilla.org" },
        { name: "Wikipedia", url: "https://wikipedia.org" },
        { name: "YouTube", url: "https://youtube.com" },
        { name: "Dev.to", url: "https://dev.to" },
      ],
    },
  },
  {
    id: "vscode",
    icon: Terminal,
    label: "VS Code",
    color: "bg-indigo-600",
    component: IDEApp,
    props: {
      ideName: "Visual Studio Code",
      projectName: "portfolio-os",
      starterCode: "function welcome() {\n  console.log('Welcome to VS Code');\n}\n\nwelcome();",
    },
  },
  {
    id: "visual-studio",
    icon: Cpu,
    label: "Visual Studio",
    color: "bg-purple-700",
    component: IDEApp,
    props: {
      ideName: "Visual Studio",
      projectName: "PortfolioDesktop.sln",
      starterCode:
        "using System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Hello from Visual Studio\");\n  }\n}",
    },
  },
  {
    id: "phpstorm",
    icon: Code2,
    label: "PhpStorm",
    color: "bg-emerald-600",
    component: IDEApp,
    props: {
      ideName: "PhpStorm",
      projectName: "portfolio-api",
      starterCode: "<?php\n\nfunction hello(): string {\n  return 'Hello from PhpStorm';\n}\n\necho hello();",
    },
  },
  { id: "about", icon: User, label: "About Me", color: "bg-blue-500", component: AboutSection },
  { id: "experience", icon: Briefcase, label: "Experience", color: "bg-purple-500", component: ExperienceSection },
  { id: "skills", icon: Code2, label: "Skills", color: "bg-green-500", component: SkillsSection },
  { id: "projects", icon: FolderGit2, label: "Projects", color: "bg-orange-500", component: ProjectsSection },
  { id: "education", icon: GraduationCap, label: "Education", color: "bg-pink-500", component: EducationSection },
  { id: "contact", icon: Mail, label: "Contact", color: "bg-cyan-500", component: ContactSection },
];

export default function Home() {
  const [openWindows, setOpenWindows] = useState(/** @type {AppWindow[]} */ ([]));
  const [highestZIndex, setHighestZIndex] = useState(10);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [sessionState, setSessionState] = useState("booting");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [systemSettings, setSystemSettings] = useState({
    wallpaper: "nebula",
    accentColor: "#06b6d4",
    animationsEnabled: true,
    use24HourClock: false,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: !systemSettings.use24HourClock,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [systemSettings.use24HourClock]);

  useEffect(() => {
    if (sessionState === "booting") {
      const timer = setTimeout(() => setSessionState("on"), 1400);
      return () => clearTimeout(timer);
    }

    if (sessionState === "shutting_down") {
      const timer = setTimeout(() => setSessionState("off"), 1600);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [sessionState]);

  const openApp = (/** @type {string} */ appId) => {
    if (!isAuthenticated || sessionState !== "on") return;
    setShowStartMenu(false);

    const app = apps.find((a) => a.id === appId);
    if (!app) return;

    setOpenWindows((prevWindows) => {
      if (prevWindows.find((w) => w.id === appId)) {
        return prevWindows.map((w) => (w.id === appId ? { ...w, zIndex: highestZIndex + 1 } : w));
      }

      return [
        ...prevWindows,
        {
          ...app,
          zIndex: highestZIndex + 1,
          position: {
            x: 50 + prevWindows.length * 30,
            y: 50 + prevWindows.length * 30,
          },
        },
      ];
    });

    setHighestZIndex((prev) => prev + 1);
  };

  const closeWindow = (/** @type {string} */ appId) => {
    setOpenWindows((prevWindows) => prevWindows.filter((w) => w.id !== appId));
  };

  const focusWindow = (/** @type {string} */ appId) => {
    setOpenWindows((prevWindows) =>
      prevWindows.map((w) => (w.id === appId ? { ...w, zIndex: highestZIndex + 1 } : w))
    );
    setHighestZIndex((prev) => prev + 1);
  };

  const handlePowerOn = () => {
    setSessionState("booting");
  };

  const handleShutdown = () => {
    setShowStartMenu(false);
    setChatOpen(false);
    setOpenWindows([]);
    setSessionState("shutting_down");
    setIsAuthenticated(false);
  };

  const handleLock = () => {
    setShowStartMenu(false);
    setChatOpen(false);
    setSessionState("on");
    setIsAuthenticated(false);
  };

  const handleSignOut = () => {
    setShowStartMenu(false);
    setChatOpen(false);
    setOpenWindows([]);
    setSessionState("on");
    setIsAuthenticated(false);
  };

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSettingsChange = (/** @type {Partial<typeof systemSettings>} */ nextSettings) => {
    setSystemSettings((prev) => ({ ...prev, ...nextSettings }));
  };

  const desktopDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  if (sessionState === "booting") {
    return (
      <div className="fixed inset-0 bg-[#071737] flex flex-col items-center justify-center text-white">
        <div className="w-14 h-14 border-4 border-white/25 border-t-white rounded-full animate-spin mb-6" />
        <h1 className="text-2xl font-semibold tracking-wide">Starting Windows Portfolio</h1>
      </div>
    );
  }

  if (sessionState === "shutting_down") {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
        <p className="text-lg">Shutting down...</p>
      </div>
    );
  }

  if (sessionState === "off") {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <button
          onClick={handlePowerOn}
          className="px-6 py-3 rounded-xl bg-slate-800 text-white border border-slate-600 hover:bg-slate-700 transition-colors"
        >
          Turn On
        </button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className={`fixed inset-0 ${WALLPAPER_STYLES[systemSettings.wallpaper]}`} />
        <div className="fixed inset-0 bg-black/35" />

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center text-white mb-8">
            <p className="text-5xl font-bold mb-2">{currentTime}</p>
            <p className="text-white/85">{desktopDate}</p>
          </div>

          <div className="w-full max-w-sm bg-slate-900/75 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl">
            <h2 className="text-xl text-white font-semibold mb-4">Sign in</h2>
            <button
              type="button"
              onClick={handleSignIn}
              className="w-full mt-4 px-4 py-2 rounded-lg text-white transition-colors"
              style={{ backgroundColor: systemSettings.accentColor }}
            >
              Sign In
            </button>
          </div>

          <button
            onClick={handleShutdown}
            className="absolute top-6 right-6 p-2 rounded-lg bg-slate-900/70 text-white hover:bg-slate-800/90"
            aria-label="Power off"
          >
            <Power className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className={`fixed inset-0 ${WALLPAPER_STYLES[systemSettings.wallpaper]}`}>
        <motion.div
          animate={
            systemSettings.animationsEnabled
              ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }
              : { scale: 1, opacity: 0.3 }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={
            systemSettings.animationsEnabled
              ? { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }
              : { scale: 1, opacity: 0.3 }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={systemSettings.animationsEnabled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="fixed top-8 left-1/2 -translate-x-1/2 text-center z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl mb-2">Nhlanhla Shakudyiwa</h1>
        <p className="text-lg text-white/90 drop-shadow-lg">Full Stack Developer | Systems Engineer</p>
        <p className="text-sm text-white/70 drop-shadow-lg mt-1">Double-click apps to explore</p>
      </motion.div>

      <div className="fixed top-32 left-6 md:left-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-10 max-w-[90vw]">
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={systemSettings.animationsEnabled ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: systemSettings.animationsEnabled ? index * 0.1 : 0, duration: 0.5 }}
          >
            <DesktopIcon icon={app.icon} label={app.label} color={app.color} onClick={() => openApp(app.id)} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {openWindows.map((appWindow) => {
          const AppComponent = appWindow.component;
          const appProps = {
            ...(appWindow.props || {}),
            ...(appWindow.id === "settings"
              ? {
                  settings: systemSettings,
                  onSettingsChange: handleSettingsChange,
                }
              : {}),
          };

          return (
            <Window
              key={appWindow.id}
              title={appWindow.label}
              icon={appWindow.icon}
              onClose={() => closeWindow(appWindow.id)}
              initialPosition={appWindow.position}
              zIndex={appWindow.zIndex}
              onFocus={() => focusWindow(appWindow.id)}
            >
              <div className="p-8">
                <AppComponent {...appProps} />
              </div>
            </Window>
          );
        })}
      </AnimatePresence>

      <AnimatePresence>{chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}</AnimatePresence>

      <AnimatePresence>
        {showStartMenu && (
          <>
            <button
              onClick={() => setShowStartMenu(false)}
              className="fixed inset-0 z-40 cursor-default"
              aria-label="Close start menu"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="fixed left-4 bottom-14 z-[60] w-64 rounded-xl bg-slate-900/95 border border-slate-700 p-3 shadow-2xl"
            >
              <button
                onClick={() => openApp("settings")}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                onClick={() => openApp("file-manager")}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <FolderOpen className="w-4 h-4" />
                File Manager
              </button>
              <button
                onClick={() => openApp("notepad")}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Notepad
              </button>
              <button
                onClick={() => openApp("chrome")}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                Chrome
              </button>
              <button
                onClick={() => openApp("firefox")}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Flame className="w-4 h-4" />
                Firefox
              </button>
              <button
                onClick={() => openApp("vscode")}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                VS Code
              </button>
              <button
                onClick={() => openApp("visual-studio")}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Cpu className="w-4 h-4" />
                Visual Studio
              </button>
              <button
                onClick={() => openApp("phpstorm")}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Code2 className="w-4 h-4" />
                PhpStorm
              </button>
              <div className="h-px bg-slate-700 my-2" />
              <button
                onClick={handleLock}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Lock
              </button>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
              <button
                onClick={handleShutdown}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Power className="w-4 h-4" />
                Shut Down
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Taskbar
        openWindows={openWindows}
        onWindowClick={focusWindow}
        onChatClick={() => setChatOpen((prev) => !prev)}
        onStartClick={() => setShowStartMenu((prev) => !prev)}
        onPowerClick={handleShutdown}
        currentTime={currentTime}
        accentColor={systemSettings.accentColor}
      />
    </div>
  );
}
