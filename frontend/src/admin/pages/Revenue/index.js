import Sidenav from '../../component/Sidenav';
import Navbar from '../../component/Navbar';

import Box from '@mui/material/Box';
import { PieChartCompareTypeFlight, PieChartCompany } from '../../component/Chart';
import TotalMoney from './TotalMoney';

function Revenue() {
    console.log(TotalMoney().MoneyOneway);
    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div style={{ display: 'flex' }}>
                        <PieChartCompareTypeFlight />
                    </div>
                    <PieChartCompany />
                </Box>
            </Box>
        </>
    );
}

export default Revenue;
