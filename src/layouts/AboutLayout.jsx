import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AboutLayout() {
  return (
    <div>
      <h2>Website About</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque quas
        debitis quibusdam deserunt repellat hic molestias ipsum commodi aut
        odit!
      </p>

      <nav>
        <NavLink to="overview">overview</NavLink>
        <NavLink to="profile">profile</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
