import styles from './SeatBook.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ButtonSeat({ handleButtonClick, bookedButton, seatCode }) {
    return (
        <>
            <button
                onClick={handleButtonClick}
                className={cx(bookedButton.includes(seatCode) ? 'booked' : 'no_booked')}
            >
                {seatCode}
            </button>
        </>
    );
}

export default ButtonSeat;
