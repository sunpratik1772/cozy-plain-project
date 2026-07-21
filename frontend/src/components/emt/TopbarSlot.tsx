import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Portals page-level actions into the single top bar (Railway-style),
 * so pages never render a second full-width toolbar of their own.
 * The target container (#topbar-actions) lives in EmtTopbar.
 */
export function TopbarSlot({ children }: { children: ReactNode }) {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEl(document.getElementById("topbar-actions"));
  }, []);

  return el ? createPortal(children, el) : null;
}
