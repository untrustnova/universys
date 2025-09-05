import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// const isBaseOnPages = !!(process.argv.includes("--basehomepages"))
// let basePath = "/"
// if(isBaseOnPages) {
//   const requirepackage = require("./package.json")
//   const parseURL = new URL(requirepackage.homepage)
//   basePath = parseURL.pathname
// }

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: "/",
  server: {
    host: "0.0.0.0"
  }
})
