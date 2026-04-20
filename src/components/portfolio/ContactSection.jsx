import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "luckydeburner@gmail.com",
    href: "mailto:luckydeburner@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "078 366 2424",
    href: "tel:+27783662424",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Johannesburg, South Africa",
    href: null,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "nhlanhla-shakudyiwa",
    href: "https://www.linkedin.com/in/nhlanhla-shakudyiwa",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "nhlanhlaShakudyiwa03",
    href: "https://github.com/nhlanhlaShakudyiwa03",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            Let's work
            <br />
            <span className="text-slate-600">together.</span>
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            I'm open to new opportunities, collaborations, and conversations.
            Feel free to reach out.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto grid gap-3">
          {contactLinks.map((item, i) => {
            const Wrapper = item.href ? "a" : "div";
            const wrapperProps = item.href
              ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
              >
                <Wrapper
                  {...wrapperProps}
                  className="group flex items-center justify-between p-5 rounded-2xl border border-slate-200 bg-white hover:border-cyan-500/30 hover:bg-cyan-50/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors duration-300">
                      <item.icon className="w-4.5 h-4.5 text-slate-600 group-hover:text-cyan-600 transition-colors" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-[11px] font-medium tracking-wider uppercase">
                        {item.label}
                      </p>
                      <p className="text-slate-900 text-sm font-medium mt-0.5">{item.value}</p>
                    </div>
                  </div>
                  {item.href && (
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  )}
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-24 pt-8 border-t border-slate-200"
        >
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Nhlanhla Shakudyiwa. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}