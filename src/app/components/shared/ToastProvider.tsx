"use client";

import { useEffect, useState } from "react";
import type { ToastKind } from "../../lib/toast";

type Toast = {
  message: string;
  kind: ToastKind;
};

const ToastProvider = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<Toast>).detail;

      setToast(detail);

      window.setTimeout(() => {
        setToast(null);
      }, 2200);
    };

    window.addEventListener("fitlog:toast", handler);

    return () => {
      window.removeEventListener("fitlog:toast", handler);
    };
  }, []);

  if (!toast) return null;

  const isError = toast.kind === "error";

  return (
    <div
      className={`fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-lg border px-5 py-3 text-sm font-bold shadow-2xl ${
        isError
          ? "border-red-500/40 bg-red-950 text-red-300"
          : "border-[#cfff00]/30 bg-[#171717] text-[#cfff00]"
      }`}
    >
      {/* Icon */}
      <span className="text-lg">{isError ? "✕" : "✓"}</span>

      {/* Message */}
      <span>{toast.message}</span>
    </div>
  );
};

export default ToastProvider;
