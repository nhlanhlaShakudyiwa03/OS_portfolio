import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const projects = [
  {
    title: "Secure Access Dashboard with Biometric Authentication",
    context: "University Project",
    period: "Sep - Nov 2025",
    description:
      "Designed and implemented a secure access system with biometric authentication for a dashboard interface. Managed user authentication, data protection, and access control using modern security practices.",
    tech: ["PHP", "MySQL", "Biometric Sensors", "Web Dashboard"],
    color: "from-cyan-500/20 to-blue-500/20",
    border: "hover:border-cyan-500/30",
  },
  {
    title: "Automated Solar Tracking System",
    context: "University Project",
    period: "May 2025",
    description:
      "Built a solar tracking system using Arduino Uno, sensors, and motors to optimize solar panel positioning. Implemented data logging for performance tracking and system monitoring.",
    tech: ["Arduino C++", "Sensors", "Motors", "Embedded Systems"],
    color: "from-amber-500/20 to-orange-500/20",
    border: "hover:border-amber-500/30",
  },
  {
    title: "Banking Application",
    context: "Embarcadero - File-Based Storage",
    period: "Oct 2024",
    description:
      "Developed a student banking application featuring secure user registration and local file-based storage. Managed smooth financial transactions and implemented secure access for multiple users.",
    tech: ["Embarcadero C++", "File-Based Storage", "Database Management"],
    color: "from-green-500/20 to-emerald-500/20",
    border: "hover:border-green-500/30",
  },
  {
    title: "K-Means Clustering Visualization in Unity",
    context: "University Project",
    period: "Aug 2024",
    description:
      "Implemented k-means clustering for dataset analysis and visualized results using Unity Gizmos. Applied data normalization and statistical analysis to display meaningful patterns.",
    tech: ["Python", "PyTorch", "TensorFlow", "Unity", "C#"],
    color: "from-violet-500/20 to-purple-500/20",
    border: "hover:border-violet-500/30",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-16">
            Selected
            <br />
            <span className="text-slate-600">works.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`group relative rounded-2xl border border-slate-200 bg-white overflow-hidden ${project.border} transition-all duration-500`}
            >
              {/* Gradient header */}
              <div className={`h-2 bg-gradient-to-r ${project.color}`} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-slate-900 font-bold text-base leading-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-xs">{project.context}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
                  <Calendar className="w-3 h-3" />
                  {project.period}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
