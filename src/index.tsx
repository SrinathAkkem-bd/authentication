import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GithubAppLogin } from "./screens/GithubAppLogin";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <GithubAppLogin />
  </StrictMode>,
);
