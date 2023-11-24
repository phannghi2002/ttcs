import classNames from 'classnames/bind';
import styles from './GetAllData.module.scss';

const cx = classNames.bind(styles);

function GetAllData({ data }) {
    return (
        <div className={cx('contain', ' mt-3', ' ms-3')}>
            <h3>YOUR FLIGHT INFORMATION</h3>

            <div>Code Ticket: {data.CodeTicket} </div>
            <div>Type Flight: {data.TypeFlight}</div>

            <div>Passenger: {data.UserName} </div>

            <div>
                Trip: {data.AirportFrom}-{data.AirportTo}
            </div>

            <div>Class: {data.TypeTicket}</div>

            <div>Seat: {data.CodeSeat}</div>

            <div>Totel Money: {data.TotalMoney}</div>
        </div>
    );
}

export default GetAllData;
