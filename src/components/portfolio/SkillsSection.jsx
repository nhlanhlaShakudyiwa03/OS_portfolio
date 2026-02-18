import React from "react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming & Development",
    skills: ["C/C++", "Python", "PHP (Symfony)", "HTML", "CSS", "JavaScript", "C#"],
  },
  {
    title: "Database & Data",
    skills: ["SQL", "MySQL", "ETL", "Database Design", "JSON"],
  },
  {
    title: "Software & Systems",
    skills: ["OOP", "Algorithm Design", "Software Engineering", "Operating Systems", "REST APIs"],
  },
  {
    title: "Embedded & Digital",
    skills: ["ESP32", "Arduino", "PIC", "Digital Electronics", "PLC Programming", "IoT"],
  },
  {
    title: "Tools & DevOps",
    skills: ["VS Code", "Git", "Bitbucket", "Docker", "Jira", "Postman", "Linux"],
  },
  {
    title: "Soft Skills",
    skills: ["Communication", "Leadership", "Team Collaboration", "Adaptable", "Self-motivated"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-16">
            Technical
            <br />
            <span className="text-slate-600">expertise.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.08 * ci }}
              className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all duration-500"
            >
              <h3 className="text-slate-900 font-semibold text-sm mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-cyan-500/10 hover:text-cyan-700 hover:border-cyan-500/20 border border-transparent transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}