import React, { useCallback, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, firebaseReady, googleProvider } from "./firebase.js";
import { PROFILE } from "./data.js";
import { localImages, optimized } from "./images.jsx";
import { IMAGE_SLOTS } from "./data.js";

const ADMIN_EMAIL = PROFILE.email.toLowerCase();
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const KEY_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

const btn = "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
const btnPlain = `${btn} border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white`;
const btnAccent = `${btn} border-accent-400 text-accent-400 hover:bg-accent-400/10`;

async function uploadToCloudinary(file, filename) {
  const body = new FormData();
  body.append("file", file, filename);
  body.append("upload_preset", UPLOAD_PRESET);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error?.message || `Cloudinary upload failed (${res.status})`);
  return data;
}

async function saveImage(key, file, filename) {
  const data = await uploadToCloudinary(file, filename);
  const entry = { url: data.secure_url, publicId: data.public_id, width: data.width || 0, height: data.height || 0 };
  await setDoc(doc(db, "images", key), { ...entry, updatedAt: serverTimestamp() });
  return entry;
}

function UploadButton({ label, disabled, onFile, accent }) {
  return (
    <label className={`${accent ? btnAccent : btnPlain} ${disabled ? "pointer-events-none opacity-40" : "cursor-pointer"}`}>
      {label}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) onFile(file);
        }}
      />
    </label>
  );
}

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-black text-neutral-100 font-body">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">{children}</div>
    </div>
  );
}

function Notice({ title, children }) {
  return (
    <Shell>
      <a href="#" className="text-sm text-neutral-400 hover:text-accent-400 transition-colors">← Back to site</a>
      <div className="mt-10 max-w-md rounded-2xl border border-neutral-800 p-6">
        <h1 className="font-display text-2xl font-bold">{title}</h1>
        <div className="mt-3 text-sm leading-relaxed text-neutral-400">{children}</div>
      </div>
    </Shell>
  );
}

export default function Admin() {
  const [user, setUser] = useState(undefined);
  const [remote, setRemote] = useState({});
  const [busy, setBusy] = useState("");
  const [status, setStatus] = useState(null);
  const [filter, setFilter] = useState("");
  const [newKey, setNewKey] = useState("");
  const [migration, setMigration] = useState(null);

  useEffect(() => (auth ? onAuthStateChanged(auth, setUser) : undefined), []);

  const isAdmin = Boolean(user?.email && user.email.toLowerCase() === ADMIN_EMAIL);
  const cloudinaryReady = Boolean(CLOUD_NAME && UPLOAD_PRESET);

  const loadRemote = useCallback(async () => {
    const snap = await getDocs(collection(db, "images"));
    setRemote(Object.fromEntries(snap.docs.map((d) => [d.id, d.data()])));
  }, []);

  useEffect(() => {
    if (isAdmin) loadRemote().catch((e) => setStatus({ error: true, text: e.message }));
  }, [isAdmin, loadRemote]);

  const slots = useMemo(() => {
    const keys = new Set([...Object.keys(IMAGE_SLOTS), ...Object.keys(localImages), ...Object.keys(remote)]);
    return [...keys].sort().map((key) => ({
      key,
      labels: IMAGE_SLOTS[key] || [],
      remoteUrl: remote[key]?.url,
      localUrl: localImages[key],
    }));
  }, [remote]);

  const visible = slots.filter((s) => {
    const q = filter.trim().toLowerCase();
    return !q || s.key.includes(q) || s.labels.some((l) => l.toLowerCase().includes(q));
  });

  const pending = slots.filter((s) => s.localUrl && !s.remoteUrl);
  const unused = slots.filter((s) => !s.labels.length);

  const upload = async (key, file) => {
    setBusy(key);
    setStatus(null);
    try {
      const entry = await saveImage(key, file, file.name);
      setRemote((r) => ({ ...r, [key]: entry }));
      setStatus({ text: `Saved "${key}".` });
    } catch (e) {
      setStatus({ error: true, text: e.message });
    } finally {
      setBusy("");
    }
  };

  const reset = async (key) => {
    if (!window.confirm(`Remove the uploaded image for "${key}"? The site will fall back to the bundled file, if there is one.`)) return;
    setBusy(key);
    try {
      await deleteDoc(doc(db, "images", key));
      setRemote((r) => {
        const next = { ...r };
        delete next[key];
        return next;
      });
      setStatus({ text: `Removed "${key}" from Firestore.` });
    } catch (e) {
      setStatus({ error: true, text: e.message });
    } finally {
      setBusy("");
    }
  };

  const migrate = async () => {
    setStatus(null);
    const failed = [];
    for (let i = 0; i < pending.length; i++) {
      const { key, localUrl } = pending[i];
      setMigration({ done: i, total: pending.length, key });
      try {
        const blob = await (await fetch(localUrl)).blob();
        const ext = (blob.type.split("/")[1] || "png").replace("jpeg", "jpg").replace("svg+xml", "svg");
        const entry = await saveImage(key, blob, `${key}.${ext}`);
        setRemote((r) => ({ ...r, [key]: entry }));
      } catch (e) {
        failed.push(`${key}: ${e.message}`);
      }
    }
    setMigration(null);
    setStatus(
      failed.length
        ? { error: true, text: `${failed.length} failed. ${failed.join(" · ")}` }
        : { text: "All bundled images are on Cloudinary. You can now delete them from src/assets." }
    );
  };

  const addNew = (file) => {
    const key = newKey.trim().toLowerCase();
    if (!KEY_PATTERN.test(key)) {
      setStatus({ error: true, text: "Key can only use lowercase letters, numbers and dashes, e.g. new-project-1." });
      return;
    }
    upload(key, file).then(() => setNewKey(""));
  };

  if (!firebaseReady) {
    return <Notice title="Firebase isn't configured">Add the VITE_FIREBASE_* values to your .env file (see .env.example) and restart the dev server.</Notice>;
  }
  if (user === undefined) return <Shell />;
  if (!user) {
    return (
      <Notice title="Admin">
        <p>Sign in with the Google account that manages this portfolio.</p>
        <button type="button" onClick={() => signInWithPopup(auth, googleProvider).catch((e) => setStatus({ error: true, text: e.message }))} className={`${btnAccent} mt-5`}>
          Sign in with Google
        </button>
        {status?.error && <p className="mt-4 text-accent-400">{status.text}</p>}
      </Notice>
    );
  }
  if (!isAdmin) {
    return (
      <Notice title="Not allowed">
        <p>{user.email} can't manage this site.</p>
        <button type="button" onClick={() => signOut(auth)} className={`${btnPlain} mt-5`}>Sign out</button>
      </Notice>
    );
  }

  const locked = Boolean(busy || migration) || !cloudinaryReady;

  return (
    <Shell>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <a href="#" className="text-sm text-neutral-400 hover:text-accent-400 transition-colors">← Back to site</a>
          <h1 className="mt-3 font-display text-3xl font-bold">Images</h1>
          <p className="mt-1 text-sm text-neutral-500">{slots.length} images · {slots.length - pending.length} on Cloudinary · signed in as {user.email}</p>
        </div>
        <button type="button" onClick={() => signOut(auth)} className={btnPlain}>Sign out</button>
      </header>

      {!cloudinaryReady && (
        <p className="mt-6 rounded-lg border border-accent-400 px-4 py-3 text-sm text-accent-400">
          Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env to enable uploads.
        </p>
      )}

      {status && (
        <p className={`mt-6 rounded-lg border px-4 py-3 text-sm ${status.error ? "border-accent-400 text-accent-400" : "border-neutral-700 text-neutral-300"}`}>{status.text}</p>
      )}

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800 p-5">
          <h2 className="font-display text-lg font-bold">Migrate bundled images</h2>
          <p className="mt-1 text-sm text-neutral-400">
            {migration
              ? `Uploading ${migration.done + 1} of ${migration.total}: ${migration.key}`
              : pending.length
                ? `${pending.length} images still only live in src/assets.`
                : "Nothing left to migrate."}
          </p>
          <button type="button" onClick={migrate} disabled={locked || !pending.length} className={`${btnAccent} mt-4`}>
            {migration ? "Migrating…" : `Upload ${pending.length} to Cloudinary`}
          </button>
        </div>
        <div className="rounded-2xl border border-neutral-800 p-5">
          <h2 className="font-display text-lg font-bold">Add a new image</h2>
          <p className="mt-1 text-sm text-neutral-400">Pick a key, upload, then use that key in App.jsx (e.g. thumbnail: "my-key").</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <input
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="new-project-thumb"
              className="min-w-0 flex-1 rounded-lg border border-neutral-700 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-accent-400"
            />
            <UploadButton label="Upload" accent disabled={locked || !newKey.trim()} onFile={addNew} />
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by key or project"
          className="w-full sm:w-72 rounded-lg border border-neutral-700 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-accent-400"
        />
        {unused.length > 0 && <p className="text-xs text-neutral-500">{unused.length} not used in App.jsx yet</p>}
      </div>

      <ul className="mt-4 divide-y divide-neutral-800 border-y border-neutral-800">
        {visible.map((s) => {
          const preview = optimized(s.remoteUrl) || s.localUrl;
          return (
            <li key={s.key} className="flex flex-wrap items-center gap-4 py-4">
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
                {preview && <img src={preview} alt="" loading="lazy" className="h-full w-full object-contain" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm text-neutral-200 break-all">{s.key}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{s.labels.length ? s.labels.join(", ") : "Not used in App.jsx"}</p>
                <p className={`mt-1 inline-block rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${s.remoteUrl ? "border-accent-400 text-accent-400" : "border-neutral-700 text-neutral-400"}`}>
                  {s.remoteUrl ? "Cloudinary" : s.localUrl ? "Bundled only" : "Missing"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {busy === s.key ? (
                  <span className="text-sm text-neutral-400">Saving…</span>
                ) : (
                  <>
                    <UploadButton label={s.remoteUrl ? "Replace" : "Upload"} disabled={locked} onFile={(file) => upload(s.key, file)} />
                    {s.remoteUrl && (
                      <button type="button" onClick={() => reset(s.key)} disabled={locked} className={btnPlain}>Remove</button>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}
