import React, { Suspense, lazy, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./tailwind.css";
import App from "./App.jsx";

const Admin = lazy(() => import("./Admin.jsx"));
const isAdminHash = () => window.location.hash === "#admin";

function Root() {
  const [admin, setAdmin] = useState(isAdminHash);
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
    <App />
  );
}

createRoot(document.getElementById("root")).render(<Root />);
