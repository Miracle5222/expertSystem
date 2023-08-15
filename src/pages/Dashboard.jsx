import React from "react";

export default function Dashboard() {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-4 gap-8 grid-rows-[200px_minmax(900px,_1fr)_100px]">
        <div className="bg-[#F48383] rounded-lg">
          <div className="flex justify-center items-center flex-col h-full">
            <h1 className="text-white font-bold text-[2rem]">Experts</h1>
            <h3 className="text-white font-bold text-[1.5rem]">2</h3>
          </div>
        </div>
        <div className="bg-[#83BEF4] rounded-lg">
          <div className="flex justify-center items-center flex-col h-full">
            <h1 className="text-white font-bold text-[2rem]">User</h1>
            <h3 className="text-white font-bold text-[1.5rem]">250</h3>
          </div>
        </div>
        <div className="bg-[#8395F4] rounded-lg">
          <div className="flex justify-center items-center flex-col h-full">
            <h1 className="text-white font-bold text-[2rem]">Rule Entries</h1>
            <h3 className="text-white font-bold text-[1.5rem]">50</h3>
          </div>
        </div>
        <div className="bg-[#F4C783] rounded-lg">
          <div className="flex justify-center items-center flex-col h-full">
            <h1 className="text-white font-bold text-[2rem]">Diagnosis</h1>
            <h3 className="text-white font-bold text-[1.5rem]">15</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
