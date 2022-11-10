import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"


export default function PublicRoutes() {
  return (
    <BrowserRouter basename="">
      <Routes>
          <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
