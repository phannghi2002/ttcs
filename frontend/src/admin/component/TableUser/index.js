/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import MaterialTable from 'material-table';

import classNames from 'classnames/bind';
import styles from '../TableFlight/TableFlight.module.scss';

import { useEffect, useState } from 'react';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import EastIcon from '@mui/icons-material/East';
// import { width } from '@mui/system';

const cx = classNames.bind(styles);

export const TableUserOneway = () => {
    const [data, setData] = useState([]);

    const commonHeaderStyle = {
        fontSize: '1.1rem',
        fontWeight: '600',
        // textAlign: 'center',

        // Add other common styles here
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${hours}:${minutes}`;
    };
    const columns = [
        {
            title: 'STT',
            headerStyle: { ...commonHeaderStyle, paddingRight: '0', width: '1%', maxWidth: 40 },
            cellStyle: { width: '1%', paddingLeft: '26px' },

            render: (rowData) => data.indexOf(rowData) + 1,
            // render: (rowData) => <div style={{ minWidth: '40px' }}> {data.indexOf(rowData) + 1} </div>,
        },
        {
            title: 'Mã vé',
            field: 'CodeTicket',
            headerStyle: commonHeaderStyle,
            cellStyle: { width: '9%' },
        },

        {
            title: 'Tên',
            field: 'UserName',
            headerStyle: commonHeaderStyle,
        },
        // {
        //     title: 'Email',
        //     field: 'Email',
        //     headerStyle: commonHeaderStyle,
        //
        // },

        {
            title: 'Sân bay',
            // field: 'Airport',
            headerStyle: commonHeaderStyle,
            render: (rowData) => (
                <>
                    {rowData.AirportFrom} <EastIcon /> {rowData.AirportTo}
                </>
            ),
        },
        {
            title: 'Ngày đi',
            field: 'DateGo',
            render: (rowData) => formatDate(rowData.DateGo),
            headerStyle: commonHeaderStyle,
        },
        // {
        //     title: 'Giờ bay',
        //     field: 'FlightTime',
        //     render: (rowData) => formatTime(rowData.FlightTime),
        //     headerStyle: commonHeaderStyle,
        //     cellStyle: { width: '10%' },
        // },
        // {
        //     title: 'Giờ đến',
        //     field: 'LandingTime',
        //     render: (rowData) => formatTime(rowData.LandingTime),
        //     headerStyle: commonHeaderStyle,
        //     cellStyle: { width: '10%' },
        // },
        {
            // title: (
            //     <>
            //         Giờ bay <EastIcon /> Giờ đến
            //     </>
            // ),

            title: 'Giờ',
            headerStyle: commonHeaderStyle,
            render: (rowData) => (
                <>
                    {formatTime(rowData.FlightTime)} <EastIcon /> {formatTime(rowData.LandingTime)}
                </>
            ),
        },

        {
            title: 'Hạng vé',
            field: 'TypeTicket',
            headerStyle: commonHeaderStyle,
        },
        {
            title: 'Chỗ ngồi',
            field: 'CodeSeat',
            headerStyle: commonHeaderStyle,
        },
    ];

    // const [page, setPage] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:4000/info/search/getAllInfoBookedOneway`)
            // fetch(`http://localhost:4000/tickets/search/getTicket${param}All`)
            .then((res) => res.json())
            .then((res) => {
                setData(res.data);

                // eslint-disable-next-line react-hooks/exhaustive-deps
                // if (res.data && res.data.length > 0) {
                //     setPage(5);
                //     console.log('hello cu em', page);
                // } else {
                //     setPage(0);
                //     console.log('hong duoc', page);
                // }
            });
    }, []);

    // const handleOrderChange = (orderBy, orderDirection) => {
    //     // Update data when sorting changes
    //     // For example, sort the data based on the current sorting
    //     // This assumes that your data is an array of objects with unique keys
    //     setData((prevData) =>
    //         prevData.slice().sort((a, b) => {
    //             const order = orderDirection === 'asc' ? 1 : -1;
    //             return a[orderBy] > b[orderBy] ? order : -order;
    //         }),
    //     );
    // };

    // const options = {
    //     search: true,
    //     paging: true,
    //     pageSize: data.length > 0 ? 5 : 0, // Set pageSize to 5 if data exists, 0 otherwise
    //     filtering: true,
    //     exportButton: true,
    // };

    return (
        <div className={cx('table')}>
            <MaterialTable
                title={<div className={cx('column')}>Thông tin hành khách đi một chiều</div>}
                data={data}
                columns={columns}
                // onOrderChange={handleOrderChange}

                options={{ search: true, paging: true, filtering: false, exportButton: true }}
                // options={options}
            />
        </div>
    );
};

export const TableUserRoundtrip = () => {
    const [data, setData] = useState([]);

    const commonHeaderStyle = {
        fontSize: '1.1rem',
        fontWeight: '600',
        // textAlign: 'center',

        // Add other common styles here
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${hours}:${minutes}`;
    };
    const columns = [
        {
            title: 'STT',
            headerStyle: { ...commonHeaderStyle, paddingRight: '0', width: '1%', maxWidth: 40 },
            cellStyle: { width: '1%', paddingLeft: '26px' },

            render: (rowData) => data.indexOf(rowData) + 1,
            // render: (rowData) => <div style={{ minWidth: '40px' }}> {data.indexOf(rowData) + 1} </div>,
        },
        {
            title: 'Mã vé',
            field: 'CodeTicket',
            headerStyle: commonHeaderStyle,
            cellStyle: { width: '9%' },
        },

        {
            title: 'Tên',
            field: 'UserName',
            headerStyle: commonHeaderStyle,
        },
        // {
        //     title: 'Email',
        //     field: 'Email',
        //     headerStyle: commonHeaderStyle,
        //
        // },

        {
            title: 'Sân bay',
            field: 'Airport',
            headerStyle: commonHeaderStyle,
            render: (rowData) => (
                <>
                    {rowData.AirportFrom} <SyncAltIcon /> {rowData.AirportTo}
                </>
            ),
        },
        {
            title: 'Ngày đi',
            field: 'DateGo',
            render: (rowData) => formatDate(rowData.DateGo),
            headerStyle: commonHeaderStyle,
        },
        {
            title: 'Ngày về',
            field: 'DateReturn',
            render: (rowData) => formatDate(rowData.DateReturn),
            headerStyle: commonHeaderStyle,
        },
        {
            title: 'Giờ đi',
            headerStyle: commonHeaderStyle,
            render: (rowData) => (
                <>
                    {formatTime(rowData.FlightTime)} <EastIcon /> {formatTime(rowData.LandingTime)}
                </>
            ),
        },
        {
            title: 'Giờ về',
            headerStyle: commonHeaderStyle,
            render: (rowData) => (
                <>
                    {formatTime(rowData.FlightTimeReturn)} <EastIcon /> {formatTime(rowData.LandingTimeReturn)}
                </>
            ),
        },
        {
            title: 'Hạng vé đi',
            field: 'TypeTicket',
            headerStyle: commonHeaderStyle,
        },
        {
            title: 'Hạng vé về',
            field: 'TypeTicketReturn',
            headerStyle: commonHeaderStyle,
        },
        {
            title: 'Chỗ ngồi đi',
            field: 'CodeSeat',
            headerStyle: commonHeaderStyle,
        },
        {
            title: 'Chỗ ngồi về',
            field: 'CodeSeatReturn',
            headerStyle: commonHeaderStyle,
        },
    ];

    // const [page, setPage] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:4000/info/search/getAllInfoBookedRoundtrip`)
            // fetch(`http://localhost:4000/tickets/search/getTicket${param}All`)
            .then((res) => res.json())
            .then((res) => {
                setData(res.data);

                // eslint-disable-next-line react-hooks/exhaustive-deps
                // if (res.data && res.data.length > 0) {
                //     setPage(5);
                //     console.log('hello cu em', page);
                // } else {
                //     setPage(0);
                //     console.log('hong duoc', page);
                // }
            });
    }, []);

    // const handleOrderChange = (orderBy, orderDirection) => {
    //     // Update data when sorting changes
    //     // For example, sort the data based on the current sorting
    //     // This assumes that your data is an array of objects with unique keys
    //     setData((prevData) =>
    //         prevData.slice().sort((a, b) => {
    //             const order = orderDirection === 'asc' ? 1 : -1;
    //             return a[orderBy] > b[orderBy] ? order : -order;
    //         }),
    //     );
    // };

    // const options = {
    //     search: true,
    //     paging: true,
    //     pageSize: data.length > 0 ? 5 : 0, // Set pageSize to 5 if data exists, 0 otherwise
    //     filtering: true,
    //     exportButton: true,
    // };

    return (
        <div className={cx('table')}>
            <MaterialTable
                title={<div className={cx('column')}>Thông tin hành khách đi khứ hồi</div>}
                data={data}
                columns={columns}
                // onOrderChange={handleOrderChange}

                options={{ search: true, paging: true, filtering: false, exportButton: true }}
                // options={options}
            />
        </div>
    );
};
