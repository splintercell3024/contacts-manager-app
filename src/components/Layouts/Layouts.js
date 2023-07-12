import React, { useReducer } from "react";
import { Outlet } from "react-router-dom";
import { NavbarHeader } from "../index";
import { ToastContainer } from "react-toastify";

export default function Layouts() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        closeOnClick={true}
        theme="colored"
      />
      <NavbarHeader />
      <Outlet />
    </div>
  );
}
