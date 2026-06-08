import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/kingeyewearfashion/",

  plugins: [react()],

  tanstackStart: {
    server: {
      entry: "server"
    }
  }
});
