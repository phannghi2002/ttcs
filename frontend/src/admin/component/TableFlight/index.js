/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

// import classNames from 'classnames/bind';
// import styles from './TableFlight.module.scss';

import { useEffect, useState } from 'react';
import { FormatDate, FormatTime } from '../../../function/FormatDate';

import Button from '@mui/material/Button';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

// import { AddAdmin, EditAdmin } from './ActionAdmin';

// import { toast } from 'react-toastify';
import ToastCustom from '../../../Toast';
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import ConfirmDelete from '../../component/ConfirmDelete';

// const cx = classNames.bind(styles);

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const TableFlight = ({ param, title }) => {
    const [data, setData] = useState([]);

    const columns = [
        {
            field: 'FlightNumber',
            headerName: 'Số hiệu máy bay',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.2,
        },
        {
            field: 'AirportFrom',
            headerName: 'Sân bay đi',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'AirportTo',
            headerName: 'Sân bay về',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'DateGo',
            headerName: 'Ngày đi',
            renderCell: (params) => FormatDate(params.value),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },
        {
            field: 'FlightTime',
            headerName: 'Giờ bay',
            renderCell: (params) => FormatTime(params.value),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },
        {
            field: 'LandingTime',
            headerName: 'Giờ đến',
            renderCell: (params) => FormatTime(params.value),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },

        {
            field: 'Action',
            headerName: 'Hành động',
            renderCell: (params) => {
                if (data.length !== 0) {
                    return (
                        <div className="action">
                            <Button
                                variant="outlined"
                                sx={{ marginRight: '10px' }}
                                // onClick={() => {
                                //     handleEdit();
                                //     setParamdEdit(params.row);
                                // }}
                            >
                                <EditIcon />{' '}
                            </Button>

                            <Button
                                variant="outlined"
                                width="30px"
                                // onClick={() => {
                                //     handleCloseConfirmDelete();
                                //     setGetID(params.row._id);
                                // }}
                            >
                                <DeleteIcon />
                            </Button>
                        </div>
                    );
                }
                return null;
            },
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },
    ];

    useEffect(() => {
        fetch(`http://localhost:4000/tickets${param}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res.data);
            });
    }, []);

    return (
        <>
            <div className="title">
                <h1 style={{ marginBottom: '30px' }}>{title}</h1>
                {/* <Button variant="contained" color="success" className="add" onClick={handleClickOpen}>
                            <PersonAddAlt1Icon sx={{ marginRight: '10px' }} /> Thêm người
                        </Button> */}
            </div>

            <DataGrid
                rows={data}
                getRowId={(row) => row._id || row.id}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                slots={{
                    toolbar: CustomToolbar,
                }}
                sx={{
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows ': {
                        'margin-top': '1em',
                        'margin-bottom': '1em',
                    },
                    width: '98%',
                    height: 'auto',
                    margin: 'auto',
                }}
            />

            {/* <AddAdmin
                        open={openAddAdmin}
                        handleClose={handleCloseAddAdmin}
                        reRender={reRender}
                        setReRender={setReRender}
                    /> */}

            {/* <EditAdmin
                        row={paramsEdit}
                        open={openEditAdmin}
                        setOpen={setOpenEditAdmin}
                        handleClose={handleCloseEditAdmin}
                        reRender={reRender}
                        setReRender={setReRender}
                    />
                    <ConfirmDelete
                        open={openConfirmDelete}
                        setOpenConfirmDelete={setOpenConfirmDelete}
                        handleClose={handleCloseConfirmDelete}
                        handleConfirm={handleCloseConfirmDelete}
                    /> */}
            <ToastCustom />
        </>
    );
};

export default TableFlight;
