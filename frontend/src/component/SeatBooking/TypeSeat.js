import ButtonSeat from './ButtonSeat';
import classNames from 'classnames/bind';
import styles from './SeatBook.module.scss';

const cx = classNames.bind(styles);

function TypeSeat({ handleButtonClick, bookedButton, number }) {
    return (
        <div className={cx('body')}>
            <div className={cx('row ', 'mt-3')}>
                <div className={cx('button_seat', ' me-2')}>
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 'A'}
                    />
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 'B'}
                    />
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 'C'}
                    />
                </div>

                <div className={cx('button_seat')}>
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 'D'}
                    />
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 'E'}
                    />
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 'F'}
                    />
                </div>
            </div>

            <div className={cx('row', ' mt-3')}>
                <div className={cx('button_seat', ' me-2')}>
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 1 + 'A'}
                    />
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 1 + 'B'}
                    />
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 1 + 'C'}
                    />
                </div>

                <div className={cx('button_seat')}>
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 1 + 'D'}
                    />
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 1 + 'E'}
                    />
                    <ButtonSeat
                        handleButtonClick={handleButtonClick}
                        bookedButton={bookedButton}
                        seatCode={number + 1 + 'F'}
                    />
                </div>
            </div>
        </div>
    );
}

export default TypeSeat;
