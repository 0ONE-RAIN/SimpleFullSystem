"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";

export type ModalSeverity = "info" | "danger";

export interface ModalOrigin {
  x: number;
  y: number;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  severity: ModalSeverity;
  title: string;
  description?: string;
  icon: LucideIcon;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  origin?: ModalOrigin;
}

const severityStyles: Record<
  ModalSeverity,
  { border: string; shadow: string; badge: string; glow: string }
> = {
  info: {
    border: "border-blue-200",
    shadow: "shadow-blue-500/20",
    badge: "bg-blue-100 text-blue-600",
    glow: "bg-blue-500/10",
  },
  danger: {
    border: "border-red-200",
    shadow: "shadow-red-500/20",
    badge: "bg-red-100 text-red-600",
    glow: "bg-red-500/10",
  },
};

export function Modal({
  open,
  onClose,
  severity,
  title,
  description,
  icon: Icon,
  children,
  footer,
  origin,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  const styles = severityStyles[severity];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="modal-backdrop-in absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`modal-panel-in relative w-full max-w-md overflow-hidden rounded-2xl border ${styles.border} bg-white backdrop-blur-xl shadow-2xl ${styles.shadow}`}
        style={
          origin ? { transformOrigin: `${origin.x}% ${origin.y}%` } : undefined
        }
      >
        <div
          className={`pointer-events-none absolute inset-0 ${styles.glow} opacity-40`}
          aria-hidden="true"
        />
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${styles.badge}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
              {description && (
                <p className="mt-1 text-sm text-stone-600">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children && <div className="mt-5">{children}</div>}
          {footer && (
            <div className="mt-6 flex justify-end gap-3">{footer}</div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
