export type ToastKind = "success" | "info" | "error";

export const notify = (message: string, kind: ToastKind = "success") => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("fitlog:toast", { detail: { message, kind } }));
};
