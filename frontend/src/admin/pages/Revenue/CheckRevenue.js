import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { fetchAPIOnewayAndCompanyThisMonth, fetchAPIRoundtripAndCompanyAndDateThisMonth } from './FetchAPI';
import { calculateMoneyPerDay, generateEmptyResult, mergeResults } from './RevenueEachCompany';

// import { RevenueOnewayOfCompany } from './RevenueEachCompany';
import { LineChartOption } from '../../component/Chart';

const selectCompany = [
    {
        label: 'Vietnam Airlines',
        value: 'VNA',
    },
    {
        label: 'VietJet',
        value: 'VJ',
    },
    {
        label: 'Jetstar Pacific Airlines',
        value: 'BL',
    },
    {
        label: 'BamBo Airways',
        value: 'QH',
    },
];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const startYear = 2023;
const startMonth = 11;

const selectMonthAndYear = [];

for (let year = startYear; year <= currentYear; year++) {
    for (let month = 1; month <= 12; month++) {
        if (year === startYear && month < startMonth) {
            continue;
        }
        if (year === currentYear && month > currentMonth) {
            break;
        }

        const label = `${month.toString().padStart(2, '0')}/${year}`;
        const value = `${month.toString().padStart(2, '0')}/${year}`;
        selectMonthAndYear.push({ label, value });
    }
}

function CheckRevenue() {
    const [company, setCompany] = useState('VNA');
    const [monthYear, setMonthYear] = useState(`${selectMonthAndYear[selectMonthAndYear.length - 1].value}`);
    const [month, year] = monthYear.split('/');

    const [data, setData] = useState(null);

    const [searchTriggered, setSearchTriggered] = useState(false);
    // const [totalMoneyPerDay, setTotalMoneyPerDay] = useState(null);
    const handleSearch = async () => {
        const endOfMonth = new Date(year, month, 0).getDate();
        try {
            const result_1 = await fetchAPIOnewayAndCompanyThisMonth(company, month, year);
            const result_2 = await fetchAPIRoundtripAndCompanyAndDateThisMonth(company, 'DateGo', month, year);
            const result_3 = await fetchAPIRoundtripAndCompanyAndDateThisMonth(company, 'DateReturn', month, year);
            console.log(company, month, year, result_1, result_2, result_3);

            setSearchTriggered(true);
            if (result_1 || result_2 || result_3) {
                let calculatedResult_1, calculatedResult_2, calculatedResult_3;
                if (result_1 && result_1.length > 0)
                    calculatedResult_1 = calculateMoneyPerDay(result_1, 'TotalMoneyGo');
                else calculatedResult_1 = generateEmptyResult(endOfMonth, month);
                if (result_2 && result_2.length > 0)
                    calculatedResult_2 = calculateMoneyPerDay(result_2, 'TotalMoneyGo');
                else calculatedResult_2 = generateEmptyResult(endOfMonth, month);
                if (result_3 && result_3.length > 0)
                    calculatedResult_3 = calculateMoneyPerDay(result_3, 'TotalMoneyReturn');
                else calculatedResult_3 = generateEmptyResult(endOfMonth, month);

                const mergedResult = mergeResults(calculatedResult_1, calculatedResult_2, calculatedResult_3);
                setData(mergedResult);
                console.log('chay voa day');
                console.log(calculatedResult_1, calculatedResult_2, calculatedResult_3);
            } else {
                // Handle the case where the API response has count: 0 or an error occurred

                const emptyResult = generateEmptyResult(endOfMonth, month);
                setData(emptyResult);
                console.log('chay duoi nay');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ paddingBottom: '100px', paddingTop: '30px' }}>
            <h2>Kiểm tra doanh thu theo:</h2>
            <div style={{ paddingBottom: '50px', paddingTop: '20px' }}>
                <TextField
                    name="Company"
                    select
                    label="Hãng hàng không"
                    defaultValue={selectCompany[0].value}
                    value={company}
                    onChange={(e) => {
                        setCompany(e.target.value);
                        setSearchTriggered(false);
                    }}
                    sx={{ width: '223px', marginRight: '20px' }}
                    margin="normal"
                >
                    {selectCompany.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    name="Date"
                    select
                    label="Tháng và Năm"
                    defaultValue={selectMonthAndYear[selectMonthAndYear.length - 1].value}
                    value={monthYear}
                    onChange={(e) => {
                        setMonthYear(e.target.value);
                        setSearchTriggered(false);
                    }}
                    sx={{ width: '223px', marginRight: '20px' }}
                    margin="normal"
                >
                    {selectMonthAndYear.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Button variant="outlined" sx={{ marginTop: '35px' }} onClick={handleSearch}>
                    <SearchIcon sx={{ marginRight: '8px' }} /> Search
                </Button>
            </div>

            {searchTriggered && <LineChartOption data={data} date={monthYear} company={company} month={month} />}
        </div>
    );
}

export default CheckRevenue;
