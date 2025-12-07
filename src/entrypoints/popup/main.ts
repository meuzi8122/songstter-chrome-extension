import { mount } from "svelte";
import App from "./App.svelte";
import "@/lib/styles/globals.css";

const app = mount(App, {
  target: document.getElementById("songstter-chrome-extension")!,
});

export default app;
