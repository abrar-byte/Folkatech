import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setClientCredential } from "../../hooks/useAuth";

// Skema Validasi Formik
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Format email tidak valid")
    .min(3, "Email minimal berisi 3 karakter")
    .max(255, "Email maksimum berisi 255 karakter")
    .required("Email harus diisi"),
  password: Yup.string()
    .min(8, "Password minmal berisi 8 karakter")
    .max(255, "Password maksimum berisi 255 karakter")
    .required("Password harus diisi"),
});

// skema data awal formik
const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      axios
        .post("login", {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          setClientCredential(response?.data?.data?.token).then(() => {
            window.location.href = '/home'
          })
        })
        .catch((error) => {
          console.log(error, "error");

          setSubmitting(false);
        });
    },
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 w-full max-w-md bg-white rounded-lg 0 shadow-lg sm:p-6 md:p-8 ">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <h5 className="text-xl font-medium text-danger">Masuk</h5>
          <div>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
              placeholder="Email"
            />
             {formik.touched.email && formik.errors.email && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.email}
                  </p>
                )}
          </div>
          <div className="relative  ">
            <input
              type={show ? "text" : "password"}
              {...formik.getFieldProps("password")}
              placeholder="Password"
              className="bg-gray-50 shadow-md text-gray-900 text-sm rounded-md  block w-full px-2.5 py-3 "
            />
            <span
              className="absolute top-3 right-3 text-danger hover:text-red-500 text-sm cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </span>
            {formik.touched.password && formik.errors.password && (
                  <p className="  text-rose-500  mt-2  text-xs">
                    {formik.errors.password}
                  </p>
                )}
          </div>
          <div className="flex items-start">
            <span className="ml-auto text-sm text-danger hover:text-red-500 cursor-pointer ">
              Lupa Password?
            </span>
          </div>
          <button
            type="submit"
            className="w-full uppercase text-white bg-dangerious hover:bg-red-800  font-medium rounded-md text-sm px-5 py-2.5 text-center shadow-lg "
          >
            Masuk
          </button>
          <hr />
          <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
            Belum punya akun?
            <span
              onClick={() => navigate("/register")}
              className="text-danger ml-1 hover:text-red-500 cursor-pointer "
            >
              Daftar Sekarang
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
