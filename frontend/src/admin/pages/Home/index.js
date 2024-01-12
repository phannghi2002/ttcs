/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box';
import Sidenav from '../../component/Sidenav';
import Navbar from '../../component/Navbar';
import Grid from '@mui/material/Grid';
import Outside from '../../component/Outside';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import DoneIcon from '@mui/icons-material/Done';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FlightToday from '../../component/FlightToday';
import { useEffect, useState } from 'react';
// import NumberFormat from '../component/NumberFormat/NumberFormat';

import { useNavigate } from 'react-router-dom';
import { LineChart } from '../../component/Chart/index';

import CountUp from 'react-countup';

const cx = classNames.bind(styles);

function Home() {
    async function fetchAPI(param) {
        try {
            let response = await fetch(`http://localhost:4000/tickets/search/getTicket${param}MonthNow`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            console.log(data1.count);

            return data1.count;
        } catch (error) {
            // Handle the error here
            console.error(error);

            // You can also set an error state or show an error message to the user
        }
    }
    async function fetchAPIGetMoney(param) {
        try {
            let response = await fetch(`http://localhost:4000/info/search/getInfoBooked${param}MonthNow`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            console.log(data1.data);

            return data1.data;
        } catch (error) {
            // Handle the error here
            console.error(error);

            // You can also set an error state or show an error message to the user
        }
    }

    const [quantityCompleted, setQuantityCompleted] = useState(0);
    const [quantityIncompleted, setQuantityIncompleted] = useState(0);

    const [moneyOneway, setMoneyOneway] = useState(0);
    const [moneyRoundtrip, setMoneyRoundtrip] = useState(0);

    const getTotalMoney = (data) => {
        console.log(data);
        return data.reduce((accumuluator, currentValue) => {
            return accumuluator + currentValue.TotalMoney;
        }, 0);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const completed = await fetchAPI('Completed');
                const incompleted = await fetchAPI('Incompleted');

                let Oneway = await fetchAPIGetMoney('Oneway');
                let Roundtrip = await fetchAPIGetMoney('Roundtrip');

                setQuantityCompleted(completed);
                setQuantityIncompleted(incompleted);

                setMoneyOneway(getTotalMoney(Oneway));
                setMoneyRoundtrip(getTotalMoney(Roundtrip));

                // Handle the quantity data as needed
            } catch (error) {
                console.error(error);
                // Handle errors if necessary
            }
        }

        fetchData();
    }, [quantityCompleted, quantityIncompleted]);

    console.log(moneyOneway, moneyRoundtrip);

    const navigate = useNavigate();

    const handleSwitchFlight = () => {
        // Navigate to the desired page when the Card is clicked
        navigate('/admin/flight');
    };

    const handleSwitchRevenue = () => {
        // Navigate to the desired page when the Card is clicked
        navigate('/admin/revenue');
    };

    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={8} className={cx('one')}>
                                    <FlightToday />

                                    <div style={{ paddingTop: '50px' }}>
                                        <LineChart />
                                    </div>
                                </Grid>

                                <Grid item xs={4}>
                                    <Card
                                        sx={{ maxWidth: 345 }}
                                        className={cx('gradient_imcompleted')}
                                        onClick={handleSwitchFlight}
                                    >
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                className={cx('title')}
                                            >
                                                <span>Chuyến bay chưa hoàn thành</span>
                                                <HourglassTopIcon className={cx('icon')} />
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                className={cx('quantity')}
                                            >
                                                <CountUp start={0} end={quantityIncompleted} duration={2} />
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                    <Card
                                        sx={{ maxWidth: 345 }}
                                        className={cx('gradient_completed')}
                                        onClick={handleSwitchFlight}
                                    >
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                className={cx('title')}
                                            >
                                                <span>Chuyến bay đã hoàn thành</span>
                                                <DoneIcon className={cx('icon')} />
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                className={cx('quantity')}
                                            >
                                                <CountUp start={0} end={quantityCompleted} duration={2} />
                                                <ArrowDownwardIcon className={cx('decrease')} />
                                                <ArrowUpwardIcon className={cx('increase')} />
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                    <Card
                                        sx={{ maxWidth: 345 }}
                                        className={cx('gradient_revenue')}
                                        onClick={handleSwitchRevenue}
                                    >
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                className={cx('title')}
                                            >
                                                <span> Doanh thu</span>
                                                <MonetizationOnIcon className={cx('icon')} />
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                className={cx('quantity')}
                                            >
                                                <CountUp
                                                    start={0}
                                                    end={moneyOneway + moneyRoundtrip}
                                                    duration={2}
                                                    separator="."
                                                />{' '}
                                                đ{/* <NumberFormat number={moneyOneway + moneyRoundtrip} /> đ */}
                                                <ArrowDownwardIcon className={cx('decrease')} />
                                                <ArrowUpwardIcon className={cx('increase')} />
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Outside />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default Home;
