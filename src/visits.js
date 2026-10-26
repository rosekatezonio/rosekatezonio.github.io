import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";
import { db } from "./firebase.js";

const SESSION_KEY = "rk-visit-counted";
const SKIP_KEY = "rk-skip-visit";

export const monthKey = (d = new Date()) => `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;

export const monthLabel = (d = new Date()) =>
  d.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

let pending = null;

function loadCount() {
  if (pending) return pending;
  pending = (async () => {
    if (!db) return null;
    const key = monthKey();
    const ref = doc(db, "visits", key);

    let shouldCount = true;
    try {
      shouldCount = sessionStorage.getItem(SESSION_KEY) !== key && !localStorage.getItem(SKIP_KEY);
    } catch {}

    if (shouldCount) {
      try {
        await setDoc(ref, { count: increment(1) }, { merge: true });
        try {
          sessionStorage.setItem(SESSION_KEY, key);
        } catch {}
      } catch {}
    }

    try {
      const snap = await getDoc(ref);
      return snap.exists() ? Number(snap.data().count) || 0 : 0;
    } catch {
      return null;
    }
  })();
  return pending;
}

export function useMonthlyVisits() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let alive = true;
    loadCount().then((c) => alive && setCount(c));
    return () => {
      alive = false;
    };
  }, []);
  return count;
}