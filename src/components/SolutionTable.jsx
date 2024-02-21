import React, { useState } from 'react';
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

const sampleData = [
    {
        id: 1,
        issue: 'Blue Screen of Death (BSOD)',
        solutions: [
            'Check for driver updates.',
            'Run Windows Update.',
            'Seek professional help if needed.',
        ],
        response: 'Sample Response 1',
    },
    {
        id: 2,
        issue: 'Slow Performance',
        solutions: [
            'Check for malware.',
            'Clear disk space.',
            'Upgrade hardware components if necessary.',
        ],
        response: 'Sample Response 2',
    },
    {
        id: 3,
        issue: 'No Internet Connection',
        solutions: [
            'Restart the router.',
            'Check network cables.',
            'Contact your ISP if the issue persists.',
        ],
        response: 'Sample Response 3',
    },
];

const viewrule = () => {
    const [data, setData] = useState(sampleData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [selectedSolutions, setSelectedSolutions] = useState([]);
    const [selectedResponse, setSelectedResponse] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedSolutions, setEditedSolutions] = useState([]);
    const [editedResponse, setEditedResponse] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCloseModal = () => {
        setIsViewModalOpen(false);
        setIsEditModalOpen(false);
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

    return (
        <div style={{ height: 400, width: '100%', marginTop: 20 }}>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: 20 }}
            />

            <DataGrid
                rows={data}
                columns={[
                    { field: 'id', headerName: 'ID', width: 70 },
                    { field: 'issue', headerName: 'Symptom', flex: 1, sortable: true },
                    { field: 'solutions', headerName: 'Solutions', flex: 1, sortable: false, renderCell: renderSolutionsCell },
                    { field: 'response', headerName: 'Response', flex: 1, sortable: false },
                    { field: 'actions', headerName: 'Actions', flex: 1, sortable: false, renderCell: renderActionsCell },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                components={{
                    Toolbar: GridToolbar,
                    ToolbarFilterButton: GridToolbarFilterButton,
                }}
            />

            <Dialog open={isViewModalOpen || isEditModalOpen} onClose={handleCloseModal} maxWidth="md">
                <DialogTitle>{selectedIssue}</DialogTitle>
                <DialogContent>
                    <List>
                        {isEditModalOpen && (
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
                        )}
                        {isViewModalOpen && (
                            <ListItem>
                                <ListItemText primary={`Response: ${selectedResponse}`} />
                            </ListItem>
                        )}
                        {isEditModalOpen && renderEditSolutionsList()}
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

export default viewrule;
