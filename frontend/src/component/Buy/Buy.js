import classNames from 'classnames/bind';
import styles from './Buy.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Buy() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <img
                        className={cx('Header_logo-img__tUcP2')}
                        alt="logo"
                        src="https://res.flynow.vn/logoflynow.png"
                    />
                </div>
                <div className={cx('content')}>
                    <div className={cx('information')}>
                        <div className={cx('supplier')}>
                            <div className={cx('title')}>
                                <FontAwesomeIcon className={cx('title-icon')} icon={faHouse} />
                                <span>Nhà cung cấp </span>
                            </div>
                            <span className={cx('information-line')}>Vietnam Airlines</span>
                        </div>
                        <div className={cx('supplier')}>
                            <div className={cx('title')}>
                                <FontAwesomeIcon className={cx('title-icon')} icon={faMoneyBill} />
                                <span> Số tiền </span>
                            </div>
                            <span className={cx('information-line')}>1000000</span>
                        </div>
                    </div>
                    <div className={cx('bank-card')}>
                        <span className={cx('card-title')}>Chi tiết thẻ</span>
                        <input className={cx('input-text')} type="text" placeholder="Số thẻ" />
                        <input
                            className={cx('input-text')}
                            autocomplete="off"
                            maxlength="5"
                            inputmode="numeric"
                            type="tel"
                            placeholder="Ngày hết hạn"
                        />
                        <input className={cx('input-text')} placeholder="Họ tên chủ thẻ" />
                        <div className={cx('submit-btn')}>
                            <button className={cx('btn', 'return-btn')}>Trở lại</button>
                            <button className={cx('btn', 'next-btn')}>Tiếp tục</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Buy;
