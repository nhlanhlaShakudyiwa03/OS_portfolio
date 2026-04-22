import React, { useState } from "react";
import { CalendarDays, Github, Linkedin, Mail } from "lucide-react";
import { useOS } from "@/lib/os-store";

export default function HireMeApp() {
  const { dispatch } = useOS();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const submit = (event) => {
    event.preventDefault();
    dispatch({
      type: "PUSH_NOTIFICATION",
      payload: {
        title: "Recruiter Message",
        message: form.name ? `New recruiter message from ${form.name}.` : "New recruiter message received.",
        type: "success",
      },
    });
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white overflow-auto">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-2xl font-semibold text-slate-900">Hire Me</h3>
        <p className="text-slate-500 mt-1">Open to Full Stack Development, Systems Integration, and Embedded roles.</p>
      </div>

      <div className="p-6 grid lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 p-5">
            <h4 className="font-semibold text-slate-900">Availability</h4>
            <p className="text-slate-600 mt-2">
              Available for interviews, internships, junior-to-mid level roles, and contract project work.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
            <h4 className="font-semibold text-slate-900">Contact</h4>
            <a href="mailto:luckydeburner@gmail.com" className="flex items-center gap-2 text-cyan-700 hover:text-cyan-800">
              <Mail className="w-4 h-4" />
              luckydeburner@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/nhlanhla-shakudyiwa/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan-700 hover:text-cyan-800">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a href="https://github.com/nhlanhlaShakudyiwa03" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan-700 hover:text-cyan-800">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <CalendarDays className="w-4 h-4" />
              Interview Slots
            </div>
            <p className="text-slate-600 mt-2 text-sm">Weekdays 09:00-16:00 SAST, remote-friendly.</p>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 p-5 space-y-4">
          <h4 className="font-semibold text-slate-900">Send a message</h4>

          <input
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Your name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            value={form.company}
            onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
            placeholder="Company"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <textarea
            rows={6}
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            placeholder="Tell me about your role/project"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button type="submit" className="w-full rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-cyan-700">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
