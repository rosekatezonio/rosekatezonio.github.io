import React, { Suspense, lazy, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./tailwind.css";
import App from "./App.jsx";
import { Preloader } from "./components/Preloader.jsx";

const Admin = lazy(() => import("./Admin.jsx"));
const isAdminHash = () => window.location.hash === "#admin";

function Root() {
  const [admin, setAdmin] = useState(isAdminHash);
  const [stage, setStage] = useState("loading");
  useEffect(() => {
    const sync = () => setAdmin(isAdminHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return admin ? (
    <Suspense fallback={null}>
      <Admin />
    </Suspense>
  ) : (
    <>
      {stage !== "loading" && <App />}
      {stage !== "done" && <Preloader onReady={() => setStage("ready")} onDone={() => setStage("done")} />}
    </>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
