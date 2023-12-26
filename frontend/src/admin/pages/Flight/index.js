import Sidenav from '../../component/Sidenav';
import Navbar from '../../component/Navbar';
import TableFlight from '../../component/TableFlight';

import Box from '@mui/material/Box';

function Flight() {
    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <TableFlight param="/search/getTicketIncompletedMonthNow" title="Chuyến bay chưa hoàn thành" />

                    <TableFlight param="/search/getTicketCompletedMonthNow" title="Chuyến bay đã hoàn thành" />

                    <TableFlight param="/" title="Tất cả các chuyến bay" />
                </Box>
            </Box>
        </>
    );
}

export default Flight;
