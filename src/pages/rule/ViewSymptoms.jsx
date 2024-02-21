import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, GridToolbarFilterButton } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';



const ViewSymptoms = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [selectedSolutions, setSelectedSolutions] = useState([]);
    const [selectedResponse, setSelectedResponse] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewResponseModalOpen, setIsViewResponseModalOpen] = useState(false);
    const [editedSolutions, setEditedSolutions] = useState([]);
    const [editedResponse, setEditedResponse] = useState('');

    useEffect(() => {
        // Fetch data from the server when the component mounts
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/symptoms');
                const result = await response.json();
                console.log(result);
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCloseModal = () => {
        setIsViewModalOpen(false);
        setIsEditModalOpen(false);
        setIsViewResponseModalOpen(false);
    };

    const handleViewButtonClick = (issue, solutions, response) => {
        setSelectedIssue(issue);
        setSelectedSolutions(solutions);
        setSelectedResponse(response);
        setIsViewModalOpen(true);
    };

    const handleEditButtonClick = (issue, solutions, response) => {
        setSelectedIssue(issue);
        setEditedSolutions([...solutions]);
        setEditedResponse(response);
        setIsEditModalOpen(true);
    };

    const handleViewResponseButtonClick = (response) => {
        setSelectedResponse(response);
        setIsViewResponseModalOpen(true);
    };

    const handleEditSolutionChange = (index, newValue) => {
        setEditedSolutions((prevSolutions) =>
            prevSolutions.map((solution, i) => (i === index ? newValue : solution))
        );
    };

    const handleEditResponseChange = (event) => {
        setEditedResponse(event.target.value);
    };

    const handleSaveEdit = () => {
        setData((prevData) =>
            prevData.map((item) =>
                item.issue === selectedIssue
                    ? { ...item, solutions: editedSolutions, response: editedResponse }
                    : item
            )
        );
        setIsEditModalOpen(false);
    };

    const handleDeleteRow = () => {
        const newData = data.filter((item) => item.issue !== selectedIssue);
        setData(newData);
        setIsViewModalOpen(false);
    };

    const renderSolutionsCell = (params) => (
        <Button onClick={() => handleViewButtonClick(params.row.issue, params.row.solutions, params.row.response)} variant="outlined">
            View
        </Button>
    );

    const renderViewResponseButton = (params) => (
        <Button onClick={() => handleViewResponseButtonClick(params.row.response)} variant="outlined">
            View
        </Button>
    );

    const renderActionsCell = (params) => (
        <>
            <Button onClick={() => handleEditButtonClick(params.row.issue, params.row.solutions, params.row.response)} variant="outlined" style={{ marginRight: 8 }}>
                Edit
            </Button>
            <Button onClick={handleDeleteRow} variant="outlined">
                Delete
            </Button>
        </>
    );
    const renderEditSolutionsList = () => (
        <List>
            {editedSolutions.map((solution, index) => (
                <ListItem key={index}>
                    <ListItemText>
                        <TextField
                            value={solution}
                            onChange={(e) => handleEditSolutionChange(index, e.target.value)}
                            label={`Solution ${index + 1}`}
                        />
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    );

    const renderViewSolutionsList = () => (
        <List>
            {selectedSolutions.map((solution, index) => (
                <ListItem key={index}>
                    <ListItemText>{solution}</ListItemText>
                </ListItem>
            ))}
        </List>
    );

    return (
        <div style={{ height: 500, width: '100%', marginTop: 20 }}>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: 20 }}
            />


            <DataGrid
                rows={data.filter((item) => item.issue.toLowerCase().includes(searchTerm.toLowerCase()))}
                columns={[
                    { field: 'id', headerName: 'ID', width: 70 },
                    { field: 'issue', headerName: 'Symptom', flex: 1, sortable: true },
                    { field: 'solutions', headerName: 'Solutions', flex: 1, sortable: false, renderCell: renderSolutionsCell },
                    { field: 'response', headerName: 'Response', flex: 1, sortable: false, renderCell: renderViewResponseButton },
                    { field: 'actions', headerName: 'Actions', flex: 1, sortable: false, renderCell: renderActionsCell },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                components={{
                    Toolbar: GridToolbar,
                    ToolbarFilterButton: GridToolbarFilterButton,
                }}
            />
            <Dialog open={isViewModalOpen || isEditModalOpen || isViewResponseModalOpen} onClose={handleCloseModal} maxWidth="md">
                <DialogTitle>{selectedIssue}</DialogTitle>
                <DialogContent>
                    <List>
                        {isViewModalOpen && renderViewSolutionsList()}
                        {isEditModalOpen && (
                            <>
                                <ListItem>
                                    <ListItemText>
                                        <TextField
                                            value={editedResponse}
                                            onChange={handleEditResponseChange}
                                            label="Response"
                                            fullWidth
                                        />
                                    </ListItemText>
                                </ListItem>
                                {renderEditSolutionsList()}
                            </>
                        )}
                        {isViewResponseModalOpen && (
                            <ListItem>
                                <ListItemText>{selectedResponse}</ListItemText>
                            </ListItem>
                        )}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                    {isEditModalOpen && (
                        <Button onClick={handleSaveEdit} color="primary">
                            Save
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ViewSymptoms;
