import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Layers } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Full Stack Dev", desc: "PHP, JS, Python, C++" },
  { icon: Cpu, label: "Embedded Systems", desc: "ESP32, Arduino, PIC" },
  { icon: Globe, label: "Web Technologies", desc: "Symfony, HTML, CSS" },
  { icon: Layers, label: "System Integration", desc: "APIs, Middleware, Docker" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
            Engineering solutions from
            <br />
            <span className="text-slate-600">hardware to cloud.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl mb-16"
        >
          Computer Systems Engineering (ICT) graduate and Software developer (Full Stack Developer) with hands-on
          experience in software development, embedded systems, networking, and system integration.
          Passionate about applying technical knowledge to solve real-world problems and contribute
          to innovative software development. Experienced with enterprise platforms including Jira,
          iTop, SigningHub, and middleware solutions.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative p-6 rounded-2xl border border-slate-200 bg-white hover:border-cyan-500/30 hover:bg-cyan-50/30 transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors duration-300">
                <item.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-slate-900 font-semibold text-sm mb-1">{item.label}</h3>
              <p className="text-slate-500 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}