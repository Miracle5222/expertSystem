import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, GridToolbarFilterButton } from '@mui/x-data-grid';



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'rule', headerName: 'Rule', width: 250 },
    { field: 'problemType', headerName: 'Problem Type', width: 150 },
    { field: 'dateCreated', headerName: 'Date Created', width: 150 },
    { field: 'symptoms', headerName: 'Symptoms', width: 150 },
];

export const DataTable = () => {

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
    }, []); //

    return (
        <div style={{ height: 400, width: '100%' }}>
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

