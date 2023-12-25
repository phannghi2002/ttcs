/* eslint-disable react-hooks/exhaustive-deps */
import AirPlane from '../../../asset/images/airplane_0.avif';
import classNames from 'classnames/bind';
import styles from './FlightToday.module.scss';
import { useEffect, useState } from 'react';
import HandlePlace from '../../../component/HandlePlace';

const cx = classNames.bind(styles);

function FlightToday() {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const DateGo = getCurrentDate();

    const [data, setData] = useState();

    async function fetchAPI() {
        try {
            // let response = await fetch(`http://localhost:4000/tickets/search/getTicketByToday?DateGo=${DateGo}`);
            let response = await fetch(`http://localhost:4000/tickets/search/getTicketByToday?DateGo=2024-01-01`);

            console.log(DateGo);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            console.log(data1);

            if (data1 && data1.count !== 0) {
                setData(data1.data);
                console.log('bo m hoi cat');
            }

            return data1;
        } catch (error) {
            // Handle the error here
            console.error(error);

            // You can also set an error state or show an error message to the user
        }
    }

    const convertTime = (time) => {
        const date = new Date(time);
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${hour}:${minute}`;
        return formattedDateTime;
    };
    // const FlightTime = convertTime(item.FlightTime);
    // const LandingTime = convertTime(item.LandingTime);

    const duration = (FlightTime, LandingTime) => {
        const [startHour, startMinute] = FlightTime.split(':');
        const [endHour, endMinute] = LandingTime.split(':');

        // Convert the hours and minutes to numbers
        const startHourNum = parseInt(startHour, 10);
        const startMinuteNum = parseInt(startMinute, 10);
        const endHourNum = parseInt(endHour, 10);
        const endMinuteNum = parseInt(endMinute, 10);

        // Calculate the difference in minutes
        const hourDifference = endHourNum - startHourNum;
        const minuteDifference = endMinuteNum - startMinuteNum;
        const totalMinutes = hourDifference * 60 + minuteDifference;

        return totalMinutes;
    };
    const convertMinutesToHourMinute = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h${remainingMinutes}`;
    };

    const allPassenger = (item) => {
        return (
            item.FirstClass.CodeSeat.length +
            item.BusinessClass.CodeSeat.length +
            item.PremiumClass.CodeSeat.length +
            item.EconomyClass.CodeSeat.length
        );
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <>
            <h2 className={cx('title')}>Tất cả chuyến bay ngày hôm nay</h2>

            <div className={cx('field')}>
                <span>Điểm khởi hành</span>

                <span>Số người</span>
            </div>

            {data && data.length !== 0 && (
                <div>
                    {data.map((item, key) => {
                        return (
                            <div key={item._id} className={cx('container')}>
                                <div className={cx('info')}>
                                    <img src={AirPlane} alt="Máy bay" className={cx('image')} />
                                    <div className={cx('time')}>
                                        {convertTime(item.FlightTime)}

                                        <HandlePlace place="HAN" />
                                    </div>

                                    <div className={cx('line')}>
                                        <div className={cx('duration')}>
                                            {convertMinutesToHourMinute(
                                                duration(convertTime(item.FlightTime), convertTime(item.LandingTime)),
                                            )}
                                        </div>
                                    </div>
                                    <div className={cx('time')}>
                                        {convertTime(item.LandingTime)}

                                        <HandlePlace place="SGN" />
                                    </div>
                                </div>

                                <div> {allPassenger(item)}</div>
                            </div>
                        );
                    })}
                </div>
            )}

            {(!data || data.length === 0) && <h2>Doi moc mom roi</h2>}
        </>
    );
}

export default FlightToday;
