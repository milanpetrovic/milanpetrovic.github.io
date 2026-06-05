import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// User GitHub Pages site (milanpetrovic.github.io) serves from the domain
// root, so base is "/". If you deploy to a project page instead, change
// this to "/<repo-name>/".
export default defineConfig({
    base: "/",
    plugins: [tailwindcss()],
    build: {
        outDir: "dist",
        emptyOutDir: true,
    },
});
