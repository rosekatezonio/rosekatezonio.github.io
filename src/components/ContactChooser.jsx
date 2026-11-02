import React, { useEffect } from "react";
import { PROFILE } from "../data.js";
import { Mail, X, ArrowUpRight } from "../icons.jsx";

const SUBJECT = "Let's connect: Internship Opportunity";

export function ContactChooser({ t, isDark, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const to = encodeURIComponent(PROFILE.email);
  const subject = encodeURIComponent(SUBJECT);

  const options = [
    {
      key: "gmail",
      label: "Gmail",
      hint: "Opens Gmail in a new tab",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}`,
      external: true,
      icon: <img src="https://cdn.simpleicons.org/gmail" alt="" className="h-5 w-5" />,
    },
    {
      key: "outlook",
      label: "Outlook",
      hint: "Opens Outlook in a new tab",
      href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}`,
      external: true,
      icon: <img src="https://cdn.simpleicons.org/microsoftoutlook" alt="" className="h-5 w-5" />,
    },
    {
      key: "others",
      label: "Others",
      hint: "Choose an email app on your device",
      href: `mailto:${PROFILE.email}?subject=${subject}`,
      external: false,
      icon: <Mail size={18} className={t.accent} />,
    },
  ];

  return (
    <div
      onClick={onClose}
      className="bento-swap-in fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Choose how to email me"
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm rounded-3xl border p-5 shadow-2xl ${
          isDark ? "border-neutral-800 bg-neutral-900" : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className={`font-display text-lg font-bold ${t.text}`}>Contact me</h2>
            <p className={`mt-1 font-body text-sm ${t.textMuted}`}>Choose where to open your email.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${t.border} ${t.textMuted} hover:border-accent-400/60 hover:text-accent-400 transition-colors`}
          >
            <X size={15} />
          </button>
        </div>

        <ul className="mt-5 space-y-2.5">
          {options.map((opt) => (
            <li key={opt.key}>
              <a
                href={opt.href}
                {...(opt.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={onClose}
                className={`group flex items-center gap-4 rounded-2xl border px-4 py-3 transition-colors hover:border-accent-400/60 ${t.border}`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    isDark ? "bg-neutral-800" : "bg-slate-100"
                  }`}
                >
                  {opt.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block font-body text-sm font-semibold ${t.text}`}>{opt.label}</span>
                  <span className={`block font-body text-xs ${t.textFaint}`}>{opt.hint}</span>
                </span>
                <ArrowUpRight size={15} className={`${t.textFaint} transition-colors group-hover:text-accent-400`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}