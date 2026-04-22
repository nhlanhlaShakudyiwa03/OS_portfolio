import { createContext, createElement, useContext, useMemo, useReducer } from "react";

const initialNotifications = [
  {
    id: "notif-welcome",
    title: "Portfolio OS",
    message: "System boot complete.",
    type: "system",
    read: false,
    createdAt: Date.now(),
  },
];

const initialAchievements = {
  openedApps: 0,
  foundTerminal: false,
  viewedProjects: false,
  discoveredEasterEgg: false,
};

const initialFiles = {
  desktop: [
    { id: "desktop-projects", name: "Projects", kind: "folder" },
    { id: "desktop-certs", name: "Certifications", kind: "folder" },
    { id: "desktop-architecture", name: "Architecture", kind: "folder" },
    { id: "desktop-experiments", name: "Experiments", kind: "folder" },
  ],
  recycleBin: [],
  folders: {Projects: [
      {
        id: "proj-biometric",
        name: "Biometric Dashboard",
        kind: "project",
        content: {
          overview: "Secure access dashboard with biometric authentication.",
          stack: ["PHP", "MySQL", "Sensors", "EasyAdmin"],
          screenshots: [],
          architecture: "API -> backend -> event logging -> dashboard",
          challenges: ["Session tracking", "Access control"],
          links: { github: "", demo: "" },
        },
      },
      {
        id: "proj-solar",
        name: "Solar Tracking System",
        kind: "project",
        content: {
          overview: "Arduino-based solar tracking system.",
          stack: ["Arduino", "Sensors", "Motors"],
          screenshots: [],
          architecture: "Sensors -> microcontroller -> motor control",
          challenges: ["Accuracy", "Mechanical alignment"],
          links: { github: "", demo: "" },
        },
      },
    ],
    Certifications: [
      { id: "cert-aws", name: "1753656634344 (1).jpg", kind: "image", src: "/assets/certificates/1753656634344 (1).jpg" },
    ],
    Architecture: [
      { id: "arch-1", name: "arctitecture.png", kind: "image", src: "/assets/architecture/arctitecture.png" },
    ],    Internship: [
      { id: "intern-1", name: "MfundoPedia Notes.txt", kind: "text", content: "Full Stack Developer internship notes." },
    ],
    Embedded: [
      { id: "emb-1", name: "ESP32 Project.txt", kind: "text", content: "Embedded systems work and experiments." },
    ],
    Experiments: [
      { id: "exp-1", name: "ideas.txt", kind: "text", content: "Future OS concepts and UI experiments." },
    ],
  },
};

const initialWidgets = {
  quickNotes: "Ship beautiful systems.",
  quote: "Great engineering feels simple.",
  focus: "Building Portfolio OS v2",
  weather: { location: "Johannesburg", tempC: 23, condition: "Clear" },
  github: { commitsThisWeek: 12, topRepo: "portfolio-os" },
};

const initialThemes = {
  active: "cyberpunk",
  all: {
    windows11: {
      id: "windows11",
      name: "Windows 11 Inspired",
      wallpaper: "nebula",
      accentColor: "#2563eb",
      shellClass: "theme-windows11",
    }, ubuntu: {
      id: "ubuntu",
      name: "Ubuntu Dev Mode",
      wallpaper: "sunset",
      accentColor: "#ea580c",
      shellClass: "theme-ubuntu",
    },
    cyberpunk: {
      id: "cyberpunk",
      name: "Cyberpunk",
      wallpaper: "nebula",
      accentColor: "#06b6d4",
      shellClass: "theme-cyberpunk",
    },
    matrix: {
      id: "matrix",
      name: "Matrix",
      wallpaper: "emerald",
      accentColor: "#22c55e",
      shellClass: "theme-matrix",
    },
    glass: {
      id: "glass",
      name: "Minimal Dark Glass",
      wallpaper: "nebula",
      accentColor: "#94a3b8",
      shellClass: "theme-glass",
    },
  },
};

const initialState = {
  desktops: [
    { id: "desktop-1", name: "Portfolio" },
    { id: "desktop-2", name: "Projects" },
    { id: "desktop-3", name: "Hire Me" },
  ],
  activeDesktopId: "desktop-1",
  windows: [],
  nextZ: 20,
  notifications: initialNotifications,
  achievements: initialAchievements,
  files: initialFiles,
  commandPaletteOpen: false,
  notificationsOpen: false,
  widgets: initialWidgets,
  themes: initialThemes,
  soundsEnabled: true,
  bootedAt: Date.now(),
  wallpaperMode: "animated",
};

function bumpAchievement(state, key, value = true) {
  return {
    ...state,
    achievements: {
      ...state.achievements,
      [key]: value,
    },
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const existing = state.windows.find((w) => w.id === action.payload.id && w.desktopId === state.activeDesktopId);
      if (existing) {
        return {
          ...state,
          nextZ: state.nextZ + 1,
          windows: state.windows.map((w) =>
            w.id === existing.id && w.desktopId === existing.desktopId
              ? { ...w, isMinimized: false, zIndex: state.nextZ + 1 }
              : w
          ),
        };
      }

      const nextState = {
        ...state,
        nextZ: state.nextZ + 1,
        windows: [
          ...state.windows,
          {
            ...action.payload,
            desktopId: state.activeDesktopId,
            isMinimized: false,
            isMaximized: false,
            snap: null,
            zIndex: state.nextZ + 1,
            position: action.payload.position ?? { x: 80, y: 80 },
            size: action.payload.size ?? { width: 920, height: 620 },
          },
        ],
      };return bumpAchievement(nextState, "openedApps", state.achievements.openedApps + 1);
    }

    case "FOCUS_WINDOW":
      return {
        ...state,
        nextZ: state.nextZ + 1,
        windows: state.windows.map((w) =>
          w.id === action.id && w.desktopId === state.activeDesktopId ? { ...w, zIndex: state.nextZ + 1 } : w
        ),
      };

    case "CLOSE_WINDOW":
      return {
        ...state,
        windows: state.windows.filter((w) => !(w.id === action.id && w.desktopId === state.activeDesktopId)),
      };

    case "MINIMIZE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id && w.desktopId === state.activeDesktopId ? { ...w, isMinimized: true } : w
        ),
      };

      case "RESTORE_WINDOW":
      return {
        ...state,
        nextZ: state.nextZ + 1,
        windows: state.windows.map((w) =>
          w.id === action.id && w.desktopId === state.activeDesktopId
            ? { ...w, isMinimized: false, zIndex: state.nextZ + 1 }
            : w
        ),
      };

    case "TOGGLE_MAXIMIZE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id && w.desktopId === state.activeDesktopId ? { ...w, isMaximized: !w.isMaximized, snap: null } : w
        ),
      };

    case "SNAP_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id && w.desktopId === state.activeDesktopId
            ? { ...w, snap: action.snap, isMaximized: action.snap === "full" }
            : w
        ),
      };

      case "MOVE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id && w.desktopId === state.activeDesktopId ? { ...w, position: action.position } : w
        ),
      };

    case "SET_ACTIVE_DESKTOP":
      return { ...state, activeDesktopId: action.id };

    case "TOGGLE_COMMAND_PALETTE":
      return { ...state, commandPaletteOpen: action.value ?? !state.commandPaletteOpen };

    case "TOGGLE_NOTIFICATIONS":
      return { ...state, notificationsOpen: action.value ?? !state.notificationsOpen };

    case "PUSH_NOTIFICATION":
      return {
        ...state,
        notifications: [
          {
            id: `notif-${Date.now()}`,
            read: false,
            createdAt: Date.now(),
            ...action.payload,
          },
          ...state.notifications,
        ],
      };

      case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => (n.id === action.id ? { ...n, read: true } : n)),
      };

    case "DELETE_FILE_TO_RECYCLE": {
      const { folderName, fileId } = action.payload;
      const folder = state.files.folders[folderName] || [];
      const item = folder.find((f) => f.id === fileId);
      if (!item) return state;
      return {
        ...state,
        files: {
          ...state.files,
          folders: {
            ...state.files.folders,
            [folderName]: folder.filter((f) => f.id !== fileId),
          },
          recycleBin: [
            ...state.files.recycleBin,
            {
              ...item,
              originalFolder: folderName,
              deletedAt: Date.now(),
            },
          ],
        },
      };
    }

    case "RESTORE_FILE_FROM_RECYCLE": {
      const item = state.files.recycleBin.find((f) => f.id === action.id);
      if (!item) return state;
      return {
        ...state,
        files: {
          ...state.files,
          recycleBin: state.files.recycleBin.filter((f) => f.id !== action.id),
          folders: {
            ...state.files.folders,
            [item.originalFolder]: [...(state.files.folders[item.originalFolder] || []), item],
          },
        },
      };
    }

    case "EMPTY_RECYCLE_BIN":
      return {
        ...state,
        files: {
          ...state.files,
          recycleBin: [],
        },
      };

    case "SET_THEME":
      return {
        ...state,
        themes: {
          ...state.themes,
          active: action.id,
        },
      };

      case "SET_WIDGET_VALUE":
      return {
        ...state,
        widgets: {
          ...state.widgets,
          [action.key]: action.value,
        },
      };

    case "SET_WALLPAPER_MODE":
      return {
        ...state,
        wallpaperMode: action.value,
      };

    case "DISCOVER_EASTER_EGG":
      return bumpAchievement(state, "discoveredEasterEgg", true);

    case "FOUND_TERMINAL":
      return bumpAchievement(state, "foundTerminal", true);

    case "VIEWED_PROJECTS":
      return bumpAchievement(state, "viewedProjects", true);

    default:
      return state;
  }
}

const OSContext = createContext(null);

export function OSProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return createElement(OSContext.Provider, { value }, children);
}

export function useOS() {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error("useOS must be used within OSProvider");
  return ctx;
}
