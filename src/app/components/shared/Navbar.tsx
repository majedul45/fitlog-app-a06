
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { FitlogContext } from "../../context/FitlogContext";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = useContext(FitlogContext);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#242424] bg-[#0a0a0a]/95 backdrop-blur">
      <div className="container-fit relative flex h-20 items-center justify-between gap-5">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={42}
            height={42}
            className="h-9 w-9 object-contain"
          />

          <span className="font-display text-2xl">
            FITLOG
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-[#333] px-3 py-2 text-xl lg:hidden"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Navigation */}
        <nav
          className={`${
            open
              ? "absolute left-4 right-4 top-20 flex"
              : "hidden"
          } flex-col gap-2 rounded-xl border border-[#292929] bg-[#111] p-3
          lg:absolute lg:left-1/2 lg:top-1/2 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2
          lg:flex-row lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {/* Workouts */}
          <Link
            onClick={() => setOpen(false)}
            href="/"
            className={`rounded-full px-5 py-2 text-sm font-bold ${
              pathname === "/"
                ? "lime-bg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            WORKOUTS
          </Link>

          {/* My Plan */}
          <Link
            onClick={() => setOpen(false)}
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-sm font-bold ${
              pathname.startsWith("/my-plan")
                ? "lime-bg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            MY PLAN
          </Link>
        </nav>

        {/* Right Side */}
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <Link
            href="/my-plan"
            className="lime-bg rounded-full px-4 py-2 text-xs font-black"
          >
            PLAN
            <span className="ml-1">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-[#555] px-4 py-2 text-xs font-black"
          >
            SAVED
            <span className="ml-1">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;