import { createBrowserRouter } from "react-router-dom"
import { App } from "../App.js"

export const router = createBrowserRouter([
  { path: "/", id: "/", element: <App /> },
])
