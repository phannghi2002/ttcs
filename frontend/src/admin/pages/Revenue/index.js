import Sidenav from '../../component/Sidenav';
import Navbar from '../../component/Navbar';

import Box from '@mui/material/Box';
import { PieChartCompareTypeFlight, PieChartCompany, LineChart } from '../../component/Chart';
import TotalMoney from './TotalMoney';
import TotalMoneyPerDay from '../../component/TotalMoneyPerDay';

function Revenue() {
    // console.log('vcl', TotalMoney().MoneyOneway);
    const StorageMoney = TotalMoney();
    // console.log(StorageMoney);

    TotalMoneyPerDay();
    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div style={{ display: 'flex' }}>
                        <PieChartCompareTypeFlight StorageMoney={StorageMoney} />
                    </div>
                    <PieChartCompany StorageMoney={StorageMoney} />
                    <LineChart />
                </Box>
            </Box>
        </>
    );
}

export default Revenue;
