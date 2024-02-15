import { useState } from 'react';

import { DataTable } from "../../components/ProblemTable"

const AddRule = () => {


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
    <div className=''>
      <div className='w-[80%] grid grid-cols-2 gap-8'>
        <form onSubmit={handleSubmit} className='bg-[#F4FCFF] p-8'>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Problem</label>
            <input
              type="text"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Problem Type</label>
            <select
              name="problemType"
              value={formData.problemType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Problem Type</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
            </select>
          </div>



          <button
           
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      <div className='mt-8 mb-12'><DataTable /></div>
    </div>
  );
};

export default AddRule;
