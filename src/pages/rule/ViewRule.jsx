import React, { useState } from 'react';
import { DataTable } from "../../components/ProblemTable"

const viewrule = () => {


  return (
    <div style={{ height: 400, width: '100%', marginTop: 20 }}>
      <DataTable />
    </div>
  );
};

export default viewrule;
