import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { CgEye, CgAdd } from "react-icons/Cg";


export default function RulesLayout() {

  const [formData, setFormData] = useState({
    problem: '',
    problemType: '',

  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admin/problemRoute', {
        method: 'POST', // Change the method based on your server requirements
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully');
        // Optionally, reset the form data after successful submission
        setFormData({
          problem: '',
          problemType: '',

        });
      } else {
        console.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


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


      {/* <DataTable /> */}
      <Outlet />
    </div>
  );
}
