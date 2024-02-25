import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/Lu";
import { PiEngineLight } from "react-icons/Pi";
import { AiOutlineUser } from "react-icons/Ai";
import { IoAlertCircleOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/Ri";
import Breadcrumbs from "../components/Breadcrumbs";

export default function RootLayout() {
  return (
    <div>
      <header>
        <nav className="w-[100vw] absolute z-50 bg-gray-100 h-[60px] flex justify-end items-center font-Mons px-12">
          <div className="flex  w-full justify-between  items-center">
            <div className="p-2 -ml-6 font-Neue text-4xl">
              <h2>PC TROUBLESHOOTING EXPERT SYSTEM</h2>
            </div>
            <div>
              <NavLink to="about">Profile</NavLink>
              <NavLink to="/">Logout</NavLink>
            </div>
          </div>
        </nav>
      </header>
      <div className="flex fixed z-40">
        <aside className="w-[250px] bg-gray-100   h-[100vh]">
          <nav className="flex flex-col items-start mt-12 p-4 w-auto text-lg ">
            <div className="py-1 hover:border-l-4 border-indigo-500 px-3">
              <div className="flex items-center">
                <div className="px-1">
                  <LuLayoutDashboard className="text-[#3F51B5]" />
                </div>
                <NavLink to="dashboard">Dasbhoard</NavLink>
              </div>
            </div>

            <div className="py-1 hover:border-l-4 border-indigo-500 px-3">
              <div className="flex items-center">
                <div className="px-1">
                  <PiEngineLight className="text-[#3F51B5]" />
                </div>
                <NavLink to="rules">Rule Set</NavLink>
              </div>
            </div>
            <div className="py-1 hover:border-l-4 border-indigo-500 px-3">
              <div className="flex items-center">
                <div className="px-1">
                  <RiAdminLine className="text-[#3F51B5]" />
                </div>
                <NavLink to="dashboard">Experts</NavLink>
              </div>
            </div>
            <div className="py-1 hover:border-l-4 border-indigo-500 px-3">
              <div className="flex items-center">
                <div className="px-1">
                  <AiOutlineUser className="text-[#3F51B5]" />
                </div>
                <NavLink to="dashboard">User</NavLink>
              </div>
            </div>
            <div className="py-1 hover:border-l-4 border-indigo-500 px-3">
              <div className="flex items-center">
                <div className="px-1">
                  <IoAlertCircleOutline className="text-[#3F51B5]" />
                </div>
                <NavLink to="about">About</NavLink>
              </div>
            </div>
          </nav>
        </aside>

        
        <main className="px-4 my-[70px] min-w-[1200px]">
          <div className="p-4 w-100">
            {/* <span className="border-b-2  border-indigo-500">scrubs</span> */}
            <Breadcrumbs />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
