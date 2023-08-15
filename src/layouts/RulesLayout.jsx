import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { CgEye, CgAdd } from "react-icons/Cg";
export default function RulesLayout() {
  return (
    <div>
      <div>
        <nav>
          <div className="w-full flex justify-center items-center my-4">
            <div className="px-2 hover:border-b-2 ease-in-out duration-75 border-indigo-500 ">
              <div className="flex items-center">
                <div className="px-1">
                  <CgAdd className="text-[#3F51B5]" />
                </div>
                <NavLink to="addrule">Add Rule</NavLink>
              </div>
            </div>
            <div className="px-2 hover:border-b-2 ease-in-out duration-75 border-indigo-500 ">
              <div className="flex items-center">
                <div className="px-1">
                  <CgEye className="text-[#3F51B5]" />
                </div>
                <NavLink to="viewrule">View Rule</NavLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
