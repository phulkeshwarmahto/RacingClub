import { useState } from "react";
import { NavLink } from "react-router-dom";
import { iconMap } from "./icons";

const { FaBars } = iconMap;

const links = [
  { to: "/", label: "Home" },
  { to: "/achievements", label: "Achievements" },
  { to: "/departments", label: "Departments" },
  { to: "/sponsorship", label: "Sponsorship" },
  { to: "/alumni", label: "Alumni" },
  { to: "/contact", label: "ContactUs" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#ffc95559] bg-[#030a12d1] px-4 py-3 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <a href="/"><img src="/assets/logoniamtrACING (1).png" alt="Team Thrusters logo" className="h-12 w-12 object-contain" /></a>
        <div>
          <h1 className="font-display text-base tracking-wide">Team Thrusters</h1>
          <p className="text-sm text-slate-300">NIAMT Student Racing Club</p>
        </div>
      </div>

      <button
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0c2038] md:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <FaBars />
      </button>

      <nav
        className={`absolute right-4 top-[4.5rem] flex min-w-[11.5rem] flex-col overflow-hidden rounded-xl bg-[#0c2038] shadow-2xl md:static md:min-w-0 md:flex-row md:bg-transparent md:shadow-none ${
          open ? "flex" : "hidden md:flex"
        }`}
      >
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-4 py-3 font-semibold tracking-wide transition md:rounded-lg md:px-3 md:py-2 ${
                isActive ? "bg-[#ffc95526] text-[#ffc955]" : "hover:bg-[#ffc9551f] hover:text-[#ffc955]"
              }`
            }
            onClick={() => setOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
