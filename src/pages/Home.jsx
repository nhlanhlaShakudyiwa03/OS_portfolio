import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  Code2,
  Globe,
  Flame,
  Cpu,
  FolderGit2,
  FolderOpen,
  FileText,
  GraduationCap,
  Mail,
  Settings,
  Lock,
  LogOut,
  Power,
  Gamepad2,
} from "lucide-react";
import DesktopIcon from "../components/desktop/DesktopIcon";
import Window from "../components/desktop/Window";
import Taskbar from "../components/desktop/Taskbar";
import SettingsApp from "../components/desktop/SettingsApp";
import FileManagerApp from "../components/desktop/FileManagerApp";
import NotepadApp from "../components/desktop/NotepadApp";
import BrowserApp from "../components/desktop/BrowserApp";
import IDEApp from "../components/desktop/IDEApp";
import MiniGameApp from "../components/desktop/MiniGameApp";
import ChatBot from "../components/portfolio/ChatBot";
import AboutSection from "../components/portfolio/AboutSection";
import ExperienceSection from "../components/portfolio/ExperienceSection";
import SkillsSection from "../components/portfolio/SkillsSection";
import ProjectsSection from "../components/portfolio/ProjectsSection";
import EducationSection from "../components/portfolio/EducationSection";
import ContactSection from "../components/portfolio/ContactSection";
import { advancedApps } from "@/lib/os-apps";

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
const baseApps = [
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
  { id: "mini-game", icon: Gamepad2, label: "Mini Game", color: "bg-fuchsia-600", component: MiniGameApp },
  { id: "about", icon: User, label: "About Me", color: "bg-blue-500", component: AboutSection },
  { id: "experience", icon: Briefcase, label: "Experience", color: "bg-purple-500", component: ExperienceSection },
  { id: "skills", icon: Code2, label: "Skills", color: "bg-green-500", component: SkillsSection },
  { id: "projects", icon: FolderGit2, label: "Projects", color: "bg-orange-500", component: ProjectsSection },
  { id: "education", icon: GraduationCap, label: "Education", color: "bg-pink-500", component: EducationSection },
  { id: "contact", icon: Mail, label: "Contact", color: "bg-cyan-500", component: ContactSection },
];

/** @type {DesktopApp[]} */
const apps = [...baseApps, ...advancedApps];

const ABOUT_LINES = [
  "Full Stack Developer building secure, scalable applications.",
  "I integrate web platforms, APIs, and embedded systems.",
  "I turn complex problems into practical, reliable solutions.",
  "Open to impactful software engineering opportunities.",
];

const TOP_APP_ORDER = ["about", "hire-me", "skills", "contact", "projects", "experience", "education", "cv-app"];

const DESKTOP_ICON_WIDTH = 96;
const DESKTOP_ICON_HEIGHT = 120;
const DESKTOP_ICON_GAP = 16;
const DESKTOP_ICON_START_X = 24;
const DESKTOP_ICON_START_Y = 128;
const TASKBAR_HEIGHT = 48;

function getDesktopIconColumns(width) {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
}

function getDefaultDesktopIconPosition(index, columns) {
  const col = index % columns;
  const row = Math.floor(index / columns);
  return {
    x: DESKTOP_ICON_START_X + col * (DESKTOP_ICON_WIDTH + DESKTOP_ICON_GAP),
    y: DESKTOP_ICON_START_Y + row * (DESKTOP_ICON_HEIGHT + DESKTOP_ICON_GAP),
  };
}

function buildDefaultDesktopIconPositions(iconItems, columns) {
  return iconItems.reduce((acc, item, index) => {
    acc[item.key] = getDefaultDesktopIconPosition(index, columns);
    return acc;
  }, {});
}

export default function Home() {
  const [openWindows, setOpenWindows] = useState(/** @type {AppWindow[]} */ ([]));
  const [highestZIndex, setHighestZIndex] = useState(10);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [sessionState, setSessionState] = useState("booting");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [desktopFiles, setDesktopFiles] = useState(/** @type {{ id: string, label: string }[]} */ ([]));
  const [desktopMenu, setDesktopMenu] = useState({ visible: false, x: 0, y: 0 });
  const [aboutLineIndex, setAboutLineIndex] = useState(0);
  const [typedAboutLine, setTypedAboutLine] = useState("");
  const [isDeletingAboutLine, setIsDeletingAboutLine] = useState(false);
  const [iconColumns, setIconColumns] = useState(() => getDesktopIconColumns(window.innerWidth));
  const [iconPositions, setIconPositions] = useState({});
  const [hasManualIconLayout, setHasManualIconLayout] = useState(false);
  const dragClickSuppressUntilRef = useRef(0);
  const [systemSettings, setSystemSettings] = useState({
    wallpaper: "nebula",
    accentColor: "#06b6d4",
    animationsEnabled: true,
    use24HourClock: false,
  });

  const desktopAppItems = useMemo(() => {
    const rankFor = (id) => {
      const index = TOP_APP_ORDER.indexOf(id);
      return index === -1 ? Number.MAX_SAFE_INTEGER : index;
    };

    return apps
      .map((app, index) => ({
        key: `app:${app.id}`,
        type: "app",
        id: app.id,
        icon: app.icon,
        label: app.label,
        color: app.color,
        _index: index,
      }))
      .sort((a, b) => {
        const rankDiff = rankFor(a.id) - rankFor(b.id);
        if (rankDiff !== 0) return rankDiff;
        return a._index - b._index;
      })
      .map(({ _index, ...item }) => item);
  }, []);

  const desktopIconItems = useMemo(
    () => [
      ...desktopAppItems,
      ...desktopFiles.map((file) => ({
        key: `file:${file.id}`,
        type: "file",
        id: file.id,
        icon: FileText,
        label: file.label,
        color: "bg-slate-600",
      })),
    ],
    [desktopAppItems, desktopFiles]
  );

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

  useEffect(() => {
    const closeDesktopMenu = () => setDesktopMenu((prev) => ({ ...prev, visible: false }));
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeDesktopMenu();
      }
    };

    window.addEventListener("click", closeDesktopMenu);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("click", closeDesktopMenu);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated || sessionState !== "on") return undefined;

    const currentLine = ABOUT_LINES[aboutLineIndex];
    const isDoneTyping = typedAboutLine === currentLine;
    const isFullyDeleted = typedAboutLine.length === 0;

    let delay = isDeletingAboutLine ? 36 : 52;
    if (!isDeletingAboutLine && isDoneTyping) delay = 1800;
    if (isDeletingAboutLine && isFullyDeleted) delay = 320;

    const timer = setTimeout(() => {
      if (!isDeletingAboutLine && isDoneTyping) {
        setIsDeletingAboutLine(true);
        return;
      }

      if (isDeletingAboutLine && isFullyDeleted) {
        setIsDeletingAboutLine(false);
        setAboutLineIndex((prev) => (prev + 1) % ABOUT_LINES.length);
        return;
      }

      const nextLength = typedAboutLine.length + (isDeletingAboutLine ? -1 : 1);
      setTypedAboutLine(currentLine.slice(0, nextLength));
    }, delay);

    return () => clearTimeout(timer);
  }, [aboutLineIndex, isAuthenticated, isDeletingAboutLine, sessionState, typedAboutLine]);

  useEffect(() => {
    const handleResize = () => setIconColumns(getDesktopIconColumns(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIconPositions((prev) => {
      if (!hasManualIconLayout) {
        return buildDefaultDesktopIconPositions(desktopIconItems, iconColumns);
      }

      const next = { ...prev };
      const activeKeys = new Set(desktopIconItems.map((item) => item.key));

      desktopIconItems.forEach((item, index) => {
        if (!next[item.key]) {
          next[item.key] = getDefaultDesktopIconPosition(index, iconColumns);
        }
      });

      Object.keys(next).forEach((key) => {
        if (!activeKeys.has(key)) delete next[key];
      });

      return next;
    });
  }, [desktopIconItems, hasManualIconLayout, iconColumns]);

  const clampIconPosition = (position) => {
    const minX = 8;
    const minY = 96;
    const maxX = Math.max(minX, window.innerWidth - DESKTOP_ICON_WIDTH - 8);
    const maxY = Math.max(minY, window.innerHeight - TASKBAR_HEIGHT - DESKTOP_ICON_HEIGHT - 8);
    return {
      x: Math.min(maxX, Math.max(minX, position.x)),
      y: Math.min(maxY, Math.max(minY, position.y)),
    };
  };

  const handleIconDragEnd = (iconKey, offset) => {
    dragClickSuppressUntilRef.current = Date.now() + 180;
    setHasManualIconLayout(true);
    setIconPositions((prev) => {
      const current = prev[iconKey] ?? { x: DESKTOP_ICON_START_X, y: DESKTOP_ICON_START_Y };
      const next = clampIconPosition({
        x: current.x + offset.x,
        y: current.y + offset.y,
      });
      return { ...prev, [iconKey]: next };
    });
  };

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

  const handleTaskbarSearch = (/** @type {string} */ query) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return;

    const matchedApp = apps.find((app) => app.label.toLowerCase().includes(normalized));
    if (matchedApp) {
      openApp(matchedApp.id);
    }
  };

  const handleDesktopContextMenu = (event) => {
    if (!isAuthenticated || sessionState !== "on") return;

    const target = /** @type {HTMLElement} */ (event.target);
    if (target.closest("[data-window-root='true']") || target.closest("[data-taskbar-root='true']")) {
      return;
    }

    event.preventDefault();
    setShowStartMenu(false);
    setDesktopMenu({
      visible: true,
      x: Math.min(event.clientX, window.innerWidth - 170),
      y: Math.min(event.clientY, window.innerHeight - 170),
    });
  };

  const handleDesktopRefresh = () => {
    setHasManualIconLayout(false);
    setIconPositions(buildDefaultDesktopIconPositions(desktopIconItems, iconColumns));
    setDesktopMenu((prev) => ({ ...prev, visible: false }));
  };

  const handleCreateNewFile = () => {
    setDesktopFiles((prev) => [
      ...prev,
      {
        id: `file-${Date.now()}`,
        label: `New File ${prev.length + 1}.txt`,
      },
    ]);
    setDesktopMenu((prev) => ({ ...prev, visible: false }));
  };

  const handleOpenSettings = () => {
    openApp("settings");
    setDesktopMenu((prev) => ({ ...prev, visible: false }));
  };

  const handleDesktopIconClick = (item) => {
    if (Date.now() < dragClickSuppressUntilRef.current) return;
    if (item.type === "app") {
      openApp(item.id);
      return;
    }
    openApp("notepad");
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
    <div className="relative min-h-screen overflow-hidden" onContextMenu={handleDesktopContextMenu}>
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

      <motion.div
        initial={systemSettings.animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="fixed left-[44%] top-[46%] hidden lg:block z-10 max-w-xl rounded-2xl border border-white/15 bg-slate-950/35 p-5 backdrop-blur-md"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/85">About Me</p>
        <p className="mt-3 min-h-[56px] text-xl font-medium text-white leading-relaxed">
          {typedAboutLine}
          <span className="ml-0.5 inline-block h-6 w-[2px] bg-cyan-300 align-[-3px] animate-pulse" />
        </p>
      </motion.div>

      {desktopIconItems.map((item, index) => {
        const position = iconPositions[item.key] ?? getDefaultDesktopIconPosition(index, iconColumns);

        return (
          <motion.div
            key={item.key}
            drag
            dragMomentum={false}
            dragElastic={0}
            whileDrag={{ scale: 1.03 }}
            initial={
              systemSettings.animationsEnabled
                ? { opacity: 0, x: position.x - 28, y: position.y }
                : { opacity: 1, x: position.x, y: position.y }
            }
            animate={{ opacity: 1, x: position.x, y: position.y }}
            transition={{
              delay: systemSettings.animationsEnabled ? index * 0.05 : 0,
              duration: 0.28,
            }}
            onDragStart={() => {
              setShowStartMenu(false);
              setDesktopMenu((prev) => ({ ...prev, visible: false }));
            }}
            onDragEnd={(_, info) => handleIconDragEnd(item.key, info.offset)}
            className="fixed top-0 left-0 z-10 cursor-grab active:cursor-grabbing touch-none"
          >
            <DesktopIcon
              icon={item.icon}
              label={item.label}
              color={item.color}
              onClick={() => handleDesktopIconClick(item)}
            />
          </motion.div>
        );
      })}

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

      <div className="fixed right-4 bottom-16 z-[65] pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 16, -12, 10, -8, 0],
            y: [0, -4, 0],
          }}
          transition={{
            rotate: { duration: 1.4, repeat: Infinity, repeatDelay: 1 },
            y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="text-4xl select-none"
          aria-hidden="true"
        >
          🐭
        </motion.div>

        <motion.div
          animate={{
            opacity: [0, 1, 1, 0],
            y: [8, 0, 0, -6],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            repeatDelay: 0.4,
            ease: "easeInOut",
          }}
          className="absolute bottom-12 right-0 w-64 rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 shadow-xl"
        >
          hi Im nhlanhla a full stack developer and a system engineer nice to meet you
        </motion.div>
      </div>

      <AnimatePresence>
        {desktopMenu.visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-[70] w-40 rounded-lg border border-slate-700 bg-slate-900/95 p-1 shadow-2xl"
            style={{ left: desktopMenu.x, top: desktopMenu.y }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleDesktopRefresh}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-white hover:bg-slate-800"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={handleCreateNewFile}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-white hover:bg-slate-800"
            >
              New File
            </button>
            <button
              type="button"
              onClick={handleOpenSettings}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-white hover:bg-slate-800"
            >
              Settings
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
                onClick={() => openApp("visual-studio")}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Cpu className="w-4 h-4" />
                Visual Studio
              </button>
              <button
                onClick={() => openApp("mini-game")}
                className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4" />
                Mini Game
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
        onAppSearch={handleTaskbarSearch}
      />
    </div>
  );
}
