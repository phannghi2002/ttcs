import Sidenav from '../../component/Sidenav';
import Navbar from '../../component/Navbar';

import Box from '@mui/material/Box';

import { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import classNames from 'classnames/bind';
import styles from '../../component/TableFlight/TableFlight.module.scss';

// import { width } from '@mui/system';

const cx = classNames.bind(styles);

function AdminUsers() {
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

        console.log('DAy', date, day, month, year);

        return `${day}-${month}-${year}`;
    };

    const columns = [
        {
            title: 'STT',
            // field: 'tableData',
            headerStyle: { ...commonHeaderStyle, paddingRight: '0', width: '1%', maxWidth: 40 },
            cellStyle: { width: '1%', paddingLeft: '26px' },

            render: (rowData) => data.indexOf(rowData) + 1,

            // render: (rowData) => <div style={{ minWidth: '40px' }}> {data.indexOf(rowData) + 1} </div>,
        },
        {
            title: 'Tên tài khoản',
            field: 'AccountName',
            headerStyle: commonHeaderStyle,
        },

        {
            title: 'Mật khẩu',
            field: 'Password',
            headerStyle: commonHeaderStyle,
        },
        {
            title: 'Họ và tên',
            field: 'Name',
            headerStyle: commonHeaderStyle,
        },
        {
            title: 'Ngày sinh',
            field: 'DayOfBirth',
            render: (rowData) => formatDate(rowData.DayOfBirth),
            headerStyle: commonHeaderStyle,
        },
    ];

    // const [page, setPage] = useState(0);

    useEffect(() => {
        fetch('http://localhost:4000/login')
            // fetch(`http://localhost:4000/tickets/search/getTicket${param}All`)
            .then((res) => res.json())
            .then((res) => {
                setData(res.data);
                console.log('user', data);

                // eslint-disable-next-line react-hooks/exhaustive-deps
                // if (res.data && res.data.length > 0) {
                //     setPage(5);
                //     console.log('hello cu em', page);
                // } else {
                //     setPage(0);
                //     console.log('hong duoc', page);
                // }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div className={cx('table')}>
                        <MaterialTable
                            title={<div className={cx('column')}>Thông tin nhân viên Admin</div>}
                            data={data}
                            columns={columns}
                            // onOrderChange={handleOrderChange}

                            options={{ search: true, paging: true, filtering: false, exportButton: true }}
                            // options={options}
                        />
                    </div>
                </Box>
            </Box>
        </>
    );
}

export default AdminUsers;
