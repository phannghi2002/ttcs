import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Header from '../DefaultPage/Header';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function Search() {
    return (
        <Fragment>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('radio')}>
                    <span className={cx('radio-content')}>
                        <input
                            defaultChecked="True"
                            data-val="true"
                            data-val-required="The IsRoundTrip field is required."
                            id="khu-hoi"
                            name="IsRoundTrip"
                            type="radio"
                            value="true"
                        />
                        <label htmlFor="khu-hoi">Khứ hồi</label>
                    </span>
                    <span className={cx('radio-content')}>
                        <input id="mot-chieu" name="IsRoundTrip" type="radio" value="false" />
                        <label htmlFor="mot-chieu">Một chiều</label>
                    </span>
                </div>
                <div className={cx('location')}>
                    <FontAwesomeIcon className={cx('location-icon')} icon={faLocationDot} />
                    <span className={cx('name-field')}>Điểm đi</span>
                    <select className={cx('location-list')}>
                        <optgroup label="MIỀN BẮC">
                            <option value="HAN">Hà Nội (HAN) </option>
                            <option value="HPH"> Hải Phòng (HPH) </option>
                            <option value="DIN"> Điện Biên (DIN) </option>
                            <option value="THD"> Thanh Hóa (THD) </option>
                            <option value="VDO"> Quảng Ninh (VDO) </option>
                        </optgroup>
                        <optgroup label="MIỀN TRUNG">
                            <option value="VII"> Vinh (VII) </option>
                            <option value="HUI"> Huế (HUI) </option>
                            <option value="VDH"> Đồng Nai (VDH) </option>
                            <option value="DAD"> Đà Nẵng (DAD) </option>
                            <option value="PXU"> Pleiku (PXU) </option>
                            <option value="TBB"> Tuy Hòa (TBB) </option>
                        </optgroup>
                        <optgroup label="MIỀN NAM">
                            <option value="SGN"> Hồ Chí Minh (SGN) </option>
                            <option value="CXR"> Nha Trang (CXR) </option>
                            <option value="DLI"> Đà Lạt (DLI) </option>
                            <option value="PQC"> Phú Quốc (PQC) </option>
                            <option value="VCL"> Tam Kì (VCL) </option>
                            <option value="UIH"> Qui Nhơn (UIH) </option>
                            <option value="VCA"> Cần Thơ (VCA) </option>
                            <option value="VCS"> Côn Đảo (VCS) </option>
                            <option value="BMV"> Ban Mê Thuật (BMV) </option>
                            <option value="VKG"> Rạch Giá (VKG) </option>
                            <option value="CAH"> Cà Mau (CAH) </option>
                        </optgroup>
                    </select>
                </div>
                <div className={cx('location')}>
                    <FontAwesomeIcon className={cx('location-icon')} icon={faLocationDot} />
                    <span className={cx('name-field')}>Điểm đến</span>
                    <select className={cx('location-list')}>
                        <optgroup label="MIỀN BẮC">
                            <option value="HAN">Hà Nội (HAN) </option>
                            <option value="HPH"> Hải Phòng (HPH) </option>
                            <option value="DIN"> Điện Biên (DIN) </option>
                            <option value="THD"> Thanh Hóa (THD) </option>
                            <option value="VDO"> Quảng Ninh (VDO) </option>
                        </optgroup>
                        <optgroup label="MIỀN TRUNG">
                            <option value="VII"> Vinh (VII) </option>
                            <option value="HUI"> Huế (HUI) </option>
                            <option value="VDH"> Đồng Nai (VDH) </option>
                            <option value="DAD"> Đà Nẵng (DAD) </option>
                            <option value="PXU"> Pleiku (PXU) </option>
                            <option value="TBB"> Tuy Hòa (TBB) </option>
                        </optgroup>
                        <optgroup label="MIỀN NAM">
                            <option value="SGN"> Hồ Chí Minh (SGN) </option>
                            <option value="CXR"> Nha Trang (CXR) </option>
                            <option value="DLI"> Đà Lạt (DLI) </option>
                            <option value="PQC"> Phú Quốc (PQC) </option>
                            <option value="VCL"> Tam Kì (VCL) </option>
                            <option value="UIH"> Qui Nhơn (UIH) </option>
                            <option value="VCA"> Cần Thơ (VCA) </option>
                            <option value="VCS"> Côn Đảo (VCS) </option>
                            <option value="BMV"> Ban Mê Thuật (BMV) </option>
                            <option value="VKG"> Rạch Giá (VKG) </option>
                            <option value="CAH"> Cà Mau (CAH) </option>
                        </optgroup>
                    </select>
                </div>
                <div className={cx('time')}>
                    <div className={cx('time-content')}>
                        <span className={cx('name-field')}>Ngày đi</span>
                        <input className={cx('input-date')} type="date" name="txtDate" id="txtDate" min="2000-01-01" />
                    </div>
                    <div className={cx('time-content', 'left-6')}>
                        <span className={cx('name-field')}>Ngày về</span>
                        <input className={cx('input-date')} type="date" name="txtDate" id="txtDate" min="2000-01-01" />
                    </div>
                </div>
                <div className={cx('people')}>
                    <div className={cx('custom-select')}>
                        <span className={cx('name-field')}> Người lớn</span>
                        <select name="Adults" className={cx('form-control')} aria-invalid="false">
                            <option value="-1" disabled="disabled">
                                &gt; 12 tuổi
                            </option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                        </select>
                    </div>
                    <div className={cx('custom-select', 'left-6')}>
                        <span className={cx('name-field')}> Trẻ em</span>
                        <select name="Adults" className={cx('form-control')} aria-invalid="false">
                            <option value="-1" disabled="disabled">
                                2-12 tuổi
                            </option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                        </select>
                    </div>
                    <div className={cx('custom-select', 'left-6')}>
                        <span className={cx('name-field')}> Em bé</span>
                        <select name="Adults" className={cx('form-control')} aria-invalid="false">
                            <option value="-1" disabled="disabled">
                                &lt; 24 tháng
                            </option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                        </select>
                    </div>
                </div>
                <div className={cx('submit')}>
                    <button className={cx('submit-btn')}>Tìm chuyến bay</button>
                </div>
            </div>
        </Fragment>
    );
}

export default Search;
