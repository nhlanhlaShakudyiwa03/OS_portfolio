import React, { useEffect, useMemo, useState } from "react";
import { Cpu, HardDrive, Wifi, MemoryStick } from "lucide-react";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const processesSeed = [
  { name: "portfolio-shell.exe", cpu: 12, mem: 220 },
  { name: "terminal.service", cpu: 6, mem: 88 },
  { name: "ui-renderer.exe", cpu: 18, mem: 310 },
  { name: "notificationd", cpu: 3, mem: 40 },
  { name: "music-player", cpu: 5, mem: 72 },
];

export default function SystemMonitorApp() {
  const [stats, setStats] = useState({ cpu: 28, ram: 56, disk: 41, network: 14 });
  const [uptimeSeconds, setUptimeSeconds] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setStats({
        cpu: random(18, 72),
        ram: random(42, 81),
        disk: random(30, 66),
        network: random(4, 48),
      });
      setUptimeSeconds((v) => v + 1);
    }, 1500);
    return () => clearInterval(i);
  }, []);

  const processes = useMemo(
    () => processesSeed.map((p) => ({ ...p, cpu: random(1, 22), mem: random(35, 350) })),
    [stats]
  );

  const uptime = new Date(uptimeSeconds * 1000).toISOString().substring(11, 19);

  return (
    <div className="h-full grid grid-rows-[auto_1fr] rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">System Monitor</h3>
        <p className="text-sm text-slate-500">Live system activity</p>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4 overflow-auto">
        {[
          { label: "CPU", value: stats.cpu, icon: Cpu },
          { label: "RAM", value: stats.ram, icon: MemoryStick },
          { label: "Disk", value: stats.disk, icon: HardDrive },
          { label: "Network", value: stats.network, icon: Wifi },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border p-4">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <item.icon className="w-4 h-4" />
              {item.label}
            </div>
            <div className="text-3xl font-bold text-slate-900 mt-4">{item.value}%</div>
            <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-cyan-500" style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}

        <div className="col-span-2 rounded-2xl border p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-900">Processes</h4>
            <span className="text-sm text-slate-500">Uptime: {uptime}</span>
          </div>
          <div className="mt-4 space-y-2">
            {processes.map((p) => (
              <div key={p.name} className="grid grid-cols-[1fr_100px_100px] gap-3 text-sm border rounded-xl px-3 py-2">
                <div className="text-slate-800 font-medium">{p.name}</div>
                <div className="text-slate-600">CPU {p.cpu}%</div>
                <div className="text-slate-600">RAM {p.mem} MB</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}