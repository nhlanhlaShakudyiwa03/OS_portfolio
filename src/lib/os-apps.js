import {
  TerminalSquare,
  Bell,
  FolderOpen,
  Cpu,
  FileText,
  Image,
  Music4,
  Monitor,
  UserRoundSearch,
  Trash2,
  FolderGit2,
} from "lucide-react";

import TerminalApp from "@/components/os/TerminalApp";
import NotificationCenter from "@/components/os/NotificationCenter";
import RecycleBinApp from "@/components/os/RecycleBinApp";
import PhotoViewerApp from "@/components/os/PhotoViewerApp";
import MusicPlayerApp from "@/components/os/MusicPlayerApp";
import SystemMonitorApp from "@/components/os/SystemMonitorApp";
import CVApp from "@/components/os/CVApp";
import ProjectExplorerApp from "@/components/os/ProjectExplorerApp";
import SkillsMatrixApp from "@/components/os/SkillsMatrixApp";
import HireMeApp from "@/components/os/HireMeApp";

export const advancedApps = [
  {
    id: "terminal",
    label: "Terminal",
    icon: TerminalSquare,
    color: "bg-emerald-700",
    component: TerminalApp,
    size: { width: 960, height: 620 },
  },
  {
    id: "notification-center",
    label: "Notifications",
    icon: Bell,
    color: "bg-slate-700",
    component: NotificationCenter,
    size: { width: 420, height: 560 },
  },
  {
    id: "recycle-bin",
    label: "Recycle Bin",
    icon: Trash2,
    color: "bg-slate-600",
    component: RecycleBinApp,
    size: { width: 860, height: 560 },
  },{
    id: "photo-viewer",
    label: "Photo Viewer",
    icon: Image,
    color: "bg-fuchsia-600",
    component: PhotoViewerApp,
    size: { width: 980, height: 640 },
  },
  {
    id: "music-player",
    label: "Music Player",
    icon: Music4,
    color: "bg-pink-600",
    component: MusicPlayerApp,
    size: { width: 560, height: 460 },
  },
  {
    id: "system-monitor",
    label: "System Monitor",
    icon: Monitor,
    color: "bg-sky-700",
    component: SystemMonitorApp,
    size: { width: 980, height: 600 },
  },{
    id: "cv-app",
    label: "CV Viewer",
    icon: FileText,
    color: "bg-cyan-600",
    component: CVApp,
    size: { width: 960, height: 680 },
  },
  {
    id: "project-explorer",
    label: "Project Explorer",
    icon: FolderGit2,
    color: "bg-orange-600",
    component: ProjectExplorerApp,
    size: { width: 1120, height: 700 },
  },
  {
    id: "skills-matrix",
    label: "Skills Matrix",
    icon: Cpu,
    color: "bg-green-600",
    component: SkillsMatrixApp,
    size: { width: 900, height: 620 },
  }, {
    id: "hire-me",
    label: "Hire Me",
    icon: UserRoundSearch,
    color: "bg-blue-600",
    component: HireMeApp,
    size: { width: 820, height: 620 },
  },
];
