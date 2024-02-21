import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, GridToolbarFilterButton } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { CgEye } from 'react-icons/Cg';
import { MdModeEditOutline } from 'react-icons/Md';
import { useNavigate } from 'react-router-dom';

export const DataTable = () => {
    const navigate = useNavigate();
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'rule', headerName: 'Rule', width: 250 },
        { field: 'problemType', headerName: 'Problem Type', width: 150 },
        { field: 'dateCreated', headerName: 'Date Created', width: 150 },
        {
            field: 'symptoms',
            headerName: 'Symptoms',
            width: 150,
            renderCell: (params) => (
                <div className='flex'>
                    {/* Pass the selected row's ID to the handleSymptomsButtonClick function */}
                    <button onClick={() => handleSymptomsButtonClick(params.row.id)}>
                        <CgEye className="text-[#3F51B5] text-2xl" />
                    </button>
                    <button onClick={() => navigate(`/rules/viewsymptoms/`)} className='mx-2'>
                        <MdModeEditOutline className="text-[#3F51B5] text-2xl" />
                    </button>
                </div>
            ),
        },
    ];
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/problemRoute');
                if (response.ok) {
                    const data = await response.json();
                    setRows(data);
                } else {
                    console.error('Error fetching data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const handleSymptomsButtonClick = (selectedRowId) => {
        // Navigate to "rules/viewsymptoms" with the selected row's ID
        navigate(`/rules/viewsymptoms/${selectedRowId}`);
    };

    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                components={{
                    Toolbar: GridToolbar,
                }}
                componentsProps={{
                    toolbar: {
                        downloadCsv: false,
                        filterButton: GridToolbarFilterButton,
                    },
                }}
            />
        </div>
    );
};
