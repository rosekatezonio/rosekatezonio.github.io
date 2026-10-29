import React, { useEffect, useMemo, useState } from "react";

const CACHE_KEY = "image-urls";
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

export const localImages = Object.fromEntries(
  Object.entries(import.meta.glob("./assets/*.{png,jpg,jpeg,webp,gif,svg}", { eager: true, import: "default" })).map(([path, url]) => [
    path.split("/").pop().replace(/\.[^.]+$/, ""),
    url,
  ])
);

const readCache = () => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
  } catch {
    return {};
  }
};

let remoteImages = readCache();

export const optimized = (url) =>
  url && url.includes("res.cloudinary.com") && !url.includes("/upload/f_auto") ? url.replace("/upload/", "/upload/f_auto,q_auto/") : url;

const isUrl = (value) => /^(https?:|data:|blob:|\/|\.)/.test(value);

export const img = (key) => {
  if (!key) return undefined;
  if (isUrl(key)) return key;
  return optimized(remoteImages[key]) || localImages[key] || undefined;
};

const escapeXml = (value) => String(value || "Image").replace(/[<>&"']/g, (character) => ({
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&apos;",
}[character]));

const fallbackFor = (label) => {
  const title = escapeXml(String(label || "Portfolio image").replace(/\s+/g, " ").trim().slice(0, 42));
  const initials = escapeXml(String(label || "RK").trim().split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "RK");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#0a0a0a"/>
          <stop offset="1" stop-color="#222"/>
        </linearGradient>
        <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="#737373" stroke-opacity=".16" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="1200" height="750" fill="url(#bg)"/>
      <rect width="1200" height="750" fill="url(#grid)"/>
      <path d="M760 0L1200 0 1200 750 650 750Z" fill="#f97316" fill-opacity=".06"/>
      <path d="M0 590H1200" stroke="#f97316" stroke-opacity=".7" stroke-width="2"/>
      <circle cx="1010" cy="150" r="150" fill="none" stroke="#f97316" stroke-opacity=".25" stroke-width="2"/>
      <circle cx="1010" cy="150" r="105" fill="none" stroke="#f97316" stroke-opacity=".18" stroke-width="2"/>
      <text x="72" y="112" fill="#fb923c" font-family="monospace" font-size="22" letter-spacing="7">ROSE KATE ZONIO / PORTFOLIO</text>
      <text x="72" y="390" fill="#f97316" font-family="Arial,sans-serif" font-size="130" font-weight="700">${initials}</text>
      <text x="76" y="462" fill="#f5f5f5" font-family="Arial,sans-serif" font-size="34" font-weight="600">${title}</text>
      <text x="76" y="650" fill="#a3a3a3" font-family="monospace" font-size="18" letter-spacing="5">PREVIEW UNAVAILABLE</text>
      <rect x="72" y="680" width="92" height="5" rx="2.5" fill="#f97316"/>
    </svg>
  `.trim();
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export function PortfolioImage({ imageKey, src: suppliedSrc, alt = "", fallbackLabel, ...props }) {
  const source = suppliedSrc || img(imageKey);
  const [failedSource, setFailedSource] = React.useState(null);
  const fallback = useMemo(() => fallbackFor(fallbackLabel || alt || imageKey || "Portfolio image"), [fallbackLabel, alt, imageKey]);
  const displaySource = source && failedSource !== source ? source : fallback;

  return (
    <img
      {...props}
      src={displaySource}
      alt={alt}
      onError={() => {
        if (source) setFailedSource(source);
      }}
    />
  );
}

export async function fetchRemoteImages() {
  if (!PROJECT_ID || !API_KEY) return {};
  const urls = {};
  let pageToken = "";
  do {
    const params = new URLSearchParams({ pageSize: "300", key: API_KEY });
    if (pageToken) params.set("pageToken", pageToken);
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/images?${params}`);
    if (!res.ok) throw new Error(`Firestore request failed (${res.status})`);
    const data = await res.json();
    for (const d of data.documents || []) {
      const url = d.fields?.url?.stringValue;
      if (url) urls[decodeURIComponent(d.name.split("/").pop())] = url;
    }
    pageToken = data.nextPageToken || "";
  } while (pageToken);
  return urls;
}

export function useRemoteImages() {
  const [, setVersion] = useState(0);
  useEffect(() => {
    let alive = true;
    fetchRemoteImages()
      .then((urls) => {
        if (!alive) return;
        remoteImages = urls;
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(urls));
        } catch {}
        setVersion((v) => v + 1);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
}
