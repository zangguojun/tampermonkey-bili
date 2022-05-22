import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

const tampermonkeyApp = document.createElement("div")
tampermonkeyApp.id = "tampermonkey"
document.body.appendChild(tampermonkeyApp)

const root = createRoot(tampermonkeyApp)
root.render(<App />)
