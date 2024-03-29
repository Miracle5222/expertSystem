import { useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

//layouts
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Company from "./pages/Company";
import AboutLayout from "./layouts/AboutLayout";
import Overview from "./pages/about/Overview";
import Profile from "./pages/about/Profile";
import Dashboard from "./pages/Dashboard";
import RulesLayout from "./layouts/RulesLayout";
import AddRule from "./pages/rule/AddRule";
import ViewRule from "./pages/rule/ViewRule";
import ViewSymptoms from "./pages/rule/ViewSymptoms";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="about" element={<AboutLayout />}>
          <Route path="overview" element={<Overview />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="rules" element={<RulesLayout />}>
          <Route path="addrule" element={<AddRule />}></Route>
          <Route path="viewrule" element={<ViewRule />}>

          </Route>
          <Route path="viewsymptoms/:id" element={<ViewSymptoms />} />
        </Route>

      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
