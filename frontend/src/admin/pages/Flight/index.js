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
                    <TableFlight param="Incompleted" title="Chuyến bay chưa hoàn thành" />

                    <TableFlight sx={{ marginTop: 30 }} param="Completed" title="Chuyến bay đã hoàn thành" />
                </Box>
            </Box>
        </>
    );
}

export default Flight;
