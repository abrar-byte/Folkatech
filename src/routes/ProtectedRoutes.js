import axios from 'axios'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Product from '../pages/products'
import Detail from '../pages/products/Detail'

export default function ProtectedRoutes() {
    const { token } = useAuth()

    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
      Accept: "Application/json",
    }
  return (
    <BrowserRouter basename="">
    <Routes>
        <Route index element={<Product />} />
        <Route path="/home" element={<Product />} />
        <Route path="/home/:detail" element={<Detail />} />
    </Routes>
  </BrowserRouter>
  )
}
