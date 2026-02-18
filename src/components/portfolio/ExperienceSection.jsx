import React from "react";
import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "MfundoPedia",
    location: "Sandton, South Africa",
    period: "Aug 2025 – Present",
    highlights: [
      "Integrated SigningHub workflows with enterprise systems for document signing and tracking",
      "Developed a CRM system to manage client interactions and automate workflows",
      "Designed solution architecture documentation for Jira integrations",
      "Built and maintained web applications using PHP (Symfony), HTML, CSS, JavaScript",
      "Worked with enterprise platforms: Jira, iTop, SigningHub, and middleware solutions",
      "Designed and tested RESTful API integrations using Postman and PHP scripts",
      "Managed environment workflows across DEV, QA, UAT, and PROD",
      "Created technical documentation for API authentication, endpoints, and usage reporting",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative bg-white">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-16">
            Professional
            <br />
            <span className="text-slate-600">work history.</span>
          </h2>
        </motion.div>

        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-cyan-500/20 hidden md:block" />
            <div className="absolute left-[5px] top-3 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/40 to-transparent hidden md:block" />

            <div className="md:pl-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                  </div>
                  <p className="text-slate-600 text-sm">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <span className="mt-2 md:mt-0 inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20">
                  {exp.period}
                </span>
              </div>

              <div className="grid gap-3">
                {exp.highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * i }}
                    className="flex items-start gap-3 group"
                  >
                    <ChevronRight className="w-4 h-4 text-cyan-500/50 mt-0.5 flex-shrink-0 group-hover:text-cyan-400 transition-colors" />
                    <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}