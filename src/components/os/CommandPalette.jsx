import React, { useMemo } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useOS } from "@/lib/os-store";
import { advancedApps } from "@/lib/os-apps";

export default function CommandPalette({ baseApps = [] }) {
  const { state, dispatch } = useOS();

  const allApps = useMemo(() => [...baseApps, ...advancedApps], [baseApps]);

  const openApp = (app) => {
    dispatch({
      type: "OPEN_WINDOW",
      payload: {
        id: app.id,
        label: app.label,
        icon: app.icon,
        color: app.color,
        component: app.component,
        size: app.size,
      },
    });
    dispatch({ type: "TOGGLE_COMMAND_PALETTE", value: false });
  };

  return (
    <CommandDialog open={state.commandPaletteOpen} onOpenChange={(open) => dispatch({ type: "TOGGLE_COMMAND_PALETTE", value: open })}>
      <CommandInput placeholder="Search apps, commands, files..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Apps">
          {allApps.map((app) => (
            <CommandItem key={app.id} onSelect={() => openApp(app)}>
              <app.icon className="w-4 h-4" />
              <span>{app.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => dispatch({ type: "TOGGLE_NOTIFICATIONS", value: true })}>Open Notifications</CommandItem>
          <CommandItem onSelect={() => dispatch({ type: "SET_ACTIVE_DESKTOP", id: "desktop-1" })}>Go to Portfolio Desktop</CommandItem>
          <CommandItem onSelect={() => dispatch({ type: "SET_ACTIVE_DESKTOP", id: "desktop-2" })}>Go to Projects Desktop</CommandItem>
          <CommandItem onSelect={() => dispatch({ type: "SET_ACTIVE_DESKTOP", id: "desktop-3" })}>Go to Hire Me Desktop</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}