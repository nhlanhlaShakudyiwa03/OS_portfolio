import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Languages } from "lucide-react";

const coursework = [
  "Software Development",
  "C++, C#, Python",
  "Embedded Systems",
  "Networking",
  "MySQL",
  "Operating Systems",
  "PLC Programming",
  "Digital Electronics",
  "Logic Design",
  "Artificial Intelligence",
  "Mathematics",
  "System Integration",
];

const languages = ["English", "IsiZulu", "Xitsonga", "Venda"];

export default function EducationSection() {
  return (
    <section id="education" className="relative bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Education
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-16">
            Academic
            <br />
            <span className="text-slate-600">background.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Degree */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 p-8 rounded-2xl border border-slate-200 bg-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg">Computer Systems Engineering</h3>
                <p className="text-slate-500 text-sm">
                  Tshwane University of Technology · Pretoria, South Africa
                </p>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Applied object-oriented design, algorithm development, and data structures to develop
              scalable programs. Worked on hardware-software integration projects using
              microcontrollers and automation systems. Developed strong analytical and
              problem-solving skills through projects involving control systems, system modeling, and
              AI applications.
            </p>

            <h4 className="text-slate-700 text-xs font-semibold tracking-wider uppercase mb-3">
              Key Coursework
            </h4>
            <div className="flex flex-wrap gap-2">
              {coursework.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Side column */}
          <div className="space-y-6">
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 rounded-2xl border border-slate-200 bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-slate-900 font-semibold text-sm">Certifications</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-slate-900 text-xs font-medium">AWS Cloud Practitioner Essentials</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Amazon Web Services</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-slate-900 text-xs font-medium">New Development Programme</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Kwena Mining & Metallurgical Services</p>
                </div>
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-2xl border border-slate-200 bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Languages className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-slate-900 font-semibold text-sm">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <span
                    key={l}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}