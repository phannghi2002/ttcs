/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import styles from './DefaultPage.module.scss';
import VNA from '../../asset/images/Vietnam_Airlines.jpg';
import VJ from '../../asset/images/VietJet_Air_logo.svg.png';
import QH from '../../asset/images/bambo.jpg';
import BL from '../../asset/images/Pacific_Airline.png';
import InforFlight from '../InforFlight';
import InforFlightRoundTrip from '../InforFlightRoundTrip';
import NotFoundFlight from '../NotFoundFlight';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import HandlePlace from '../HandlePlace';

const cx = classNames.bind(styles);

export function DefaultPage1({ data, handleConvert, handleSwitchPage, switchPage }) {
    if (data[0]) {
        const d = new Date(data[0].DateGo);
        const dateConvert = d.toLocaleDateString('en-GB');
        // console.log(dateConvert);
        return (
            <div className={cx('contain', 'roundtrip', 'ml-10')}>
                <center className={cx('info_flight ', 'mb-5', ' pt-4')}>
                    <h2 className={cx('title')}> Thông tin chuyến bay</h2>
                    <h4>Ngày đi: {dateConvert}</h4>
                    <h5>
                        Điểm đi: {data[0].AirportFrom} (<HandlePlace place={data[0].AirportFrom} />)
                    </h5>
                    <h5>
                        Điểm đến: {data[0].AirportTo} (<HandlePlace place={data[0].AirportTo} />)
                    </h5>
                </center>

                {/* eslint-disable-next-line array-callback-return */}
                {data.map((item, key) => {
                    return (
                        <div key={item._id}>
                            {item.AirlineCode === 'VNA' && (
                                <div className={cx('container', ' wrapper_info')}>
                                    <img src={VNA} alt="Vietnam Airlines" className={cx('image')} />

                                    <InforFlightRoundTrip
                                        item={item}
                                        name="Vietnam Airlines"
                                        handleConvert={handleConvert}
                                        handleSwitchPage={handleSwitchPage}
                                        switchPage={switchPage}
                                    />
                                </div>
                            )}

                            {item.AirlineCode === 'VJ' && (
                                <div className={cx('container', ' wrapper_info')}>
                                    <img src={VJ} alt="VietJet" className={cx('image')} />

                                    <InforFlightRoundTrip
                                        item={item}
                                        name="VietJet Air"
                                        handleConvert={handleConvert}
                                        handleSwitchPage={handleSwitchPage}
                                        switchPage={switchPage}
                                    />
                                </div>
                            )}

                            {item.AirlineCode === 'QH' && (
                                <div className={cx('container', ' wrapper_info')}>
                                    <img src={QH} alt="BamBo" className={cx('image')} />

                                    <InforFlightRoundTrip
                                        item={item}
                                        name="BamBo Airways"
                                        handleConvert={handleConvert}
                                        handleSwitchPage={handleSwitchPage}
                                        switchPage={switchPage}
                                    />
                                </div>
                            )}

                            {item.AirlineCode === 'BL' && (
                                <div className={cx('container', ' wrapper_info')}>
                                    <img src={BL} alt="Pacific" className={cx('image')} />

                                    <InforFlightRoundTrip
                                        item={item}
                                        name="Jetstar Pacific Airlines"
                                        handleConvert={handleConvert}
                                        handleSwitchPage={handleSwitchPage}
                                        switchPage={switchPage}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}

                {data.length === 0 && <NotFoundFlight />}
            </div>
        );
    }
}

//Oneway
export function DefaultPage2({ data, typeTrip, onData, AirportFrom, AirportTo, depart }) {
    // console.log(AirportFrom, AirportTo, depart);
    const formattedDate = new Date(depart).toLocaleDateString('en-GB');
    // console.log(formattedDate);

    const sendDataToParent = (value) => {
        // onData(handleOption());
        // console.log("kiemer tra lai xem", handleOption());

        onData(value);
        // console.log("Value sent to parent:", value);
    };

    // console.log('ko co du lieu:', data);

    // if (data.length === 0) {
    //     console.log('m ngu lam nghi à');
    // }
    const handleOption = (e) => {
        return e.target.value;
    };

    const [progress, setProgress] = useState(240);

    const convertToHourMinute = (progress) => {
        const hours = Math.floor(progress / 60);
        const minutes = progress % 60;
        if (minutes === 0) {
            return `${hours}h`;
        } else {
            return `${hours}h${minutes < 10 ? '0' : ''}${minutes}`;
        }
    };

    const handleProgressChange = (event) => {
        const value = parseInt(event.target.value);
        setProgress(value);
        console.log(value);
    };

    let filteredData = data;
    //const [filteredData, setFilterData] = useState(data);

    if (data) {
        filteredData = data.filter((item) => progress >= item.Duration);
        console.log(filteredData);
    }

    // const handleFilter = () => {
    //   if (filteredData) {
    //     // filteredData = data.filter((item) => progress >= item.Duration);
    //     setFilterData(data.filter((item) => progress >= item.Duration));

    //     console.log(filteredData);
    //   }
    // };

    const [isAction, setIsAction] = useState(true);

    const handleSearchHidden = () => {
        const downIcon = document.querySelector('#icon-1');
        const upIcon = document.querySelector('#icon-2');
        const rdo = document.querySelectorAll('#id-radio-dfpage');

        if (!isAction) {
            downIcon.style.display = 'none';
            upIcon.style.display = 'block';
            rdo.forEach((i) => {
                i.style.display = 'none';
            });
            setIsAction(true);
        } else {
            downIcon.style.display = 'block';
            upIcon.style.display = 'none';
            rdo.forEach((i) => {
                i.style.display = 'block';
            });
            setIsAction(false);
        }
        console.log('e cu');
    };

    return (
        <div className={cx('contain')}>
            <div className={cx('info_flight', ' mb-5', ' pt-2')}>
                <h2 className={cx('title')}> Thông tin chuyến bay</h2>
                <h4>Ngày đi: {formattedDate}</h4>
                <h5>Điểm đi: {AirportFrom && <HandlePlace place={AirportFrom} />}</h5>
                <h5>Điểm đến: {AirportTo && <HandlePlace place={AirportTo} />}</h5>
            </div>

            <div className={cx('wrapper_5')}>
                <div className="search_option">
                    <div className={cx('info_flight_1', ' mb-5', ' pt-4')}>
                        <div>
                            <h6 className={cx('search_title')}>
                                Tìm kiếm theo hãng bay
                                <span onClick={handleSearchHidden}>
                                    <FontAwesomeIcon
                                        id="icon-1"
                                        className={cx('search-icon')}
                                        icon={faCaretDown}
                                        style={{ display: 'block' }}
                                    />
                                    <FontAwesomeIcon
                                        id="icon-2"
                                        className={cx('search-icon')}
                                        icon={faCaretUp}
                                        style={{ display: 'none' }}
                                    />
                                </span>
                            </h6>
                            <div
                                id={'id-radio-dfpage'}
                                className={cx('radio-content')}
                                onClick={(e) => sendDataToParent(handleOption(e))}
                            >
                                <input
                                    type="radio"
                                    id="VNA"
                                    value="VNA"
                                    name="company"
                                    onChange={(e) => handleOption(e)}
                                />
                                <label htmlFor="VNA" className="ms-2">
                                    Vietnam Airlines
                                </label>
                            </div>

                            <div
                                id={'id-radio-dfpage'}
                                className={cx('radio-content')}
                                onClick={(e) => sendDataToParent(handleOption(e))}
                            >
                                <input
                                    type="radio"
                                    id="QH"
                                    value="QH"
                                    name="company"
                                    onChange={(e) => handleOption(e)}
                                />
                                <label htmlFor="QH" className="ms-2">
                                    BamBo Airways
                                </label>
                            </div>
                            <div
                                id={'id-radio-dfpage'}
                                className={cx('radio-content')}
                                onClick={(e) => sendDataToParent(handleOption(e))}
                            >
                                <input
                                    type="radio"
                                    id="BL"
                                    value="BL"
                                    name="company"
                                    onChange={(e) => handleOption(e)}
                                />
                                <label htmlFor="BL" className="ms-2">
                                    Jetstar Pacific Airlines
                                </label>
                            </div>
                            <div
                                id={'id-radio-dfpage'}
                                className={cx('radio-content')}
                                onClick={(e) => sendDataToParent(handleOption(e))}
                            >
                                <input
                                    type="radio"
                                    id="VJ"
                                    value="VJ"
                                    name="company"
                                    onChange={(e) => handleOption(e)}
                                />
                                <label htmlFor="VJ" className="ms-2">
                                    VietJet Air
                                </label>
                            </div>

                            <div
                                id={'id-radio-dfpage'}
                                className={cx('radio-content')}
                                onClick={(e) => sendDataToParent(handleOption(e))}
                            >
                                <input
                                    type="radio"
                                    id="all"
                                    value="all"
                                    name="company"
                                    defaultChecked
                                    onChange={(e) => handleOption(e)}
                                />
                                <label htmlFor="all" className="ms-2">
                                    Tất cả
                                </label>
                            </div>
                        </div>

                        <div>
                            <h6 className={cx('search_title')}>Tìm kiếm theo thời lượng bay</h6>
                            <input
                                type="range"
                                min="30"
                                max="240"
                                value={progress}
                                onChange={handleProgressChange}
                                // onMouseUp={handleFilter}
                                className={cx('progress-bar')}
                                step={15}
                            />
                            <p className="ms-2">Thời lượng: 0.5h - {convertToHourMinute(progress)}</p>
                        </div>
                    </div>
                </div>

                <div className={cx('show_data')}>
                    {filteredData[0] &&
                        filteredData.map((item, key) => {
                            return (
                                <div key={item._id}>
                                    {item.AirlineCode === 'VNA' && (
                                        <div className={cx('container')}>
                                            <img src={VNA} alt="Vietnam Airlines" className={cx('image')} />

                                            <InforFlight item={item} name="Vietnam Airlines" />
                                        </div>
                                    )}

                                    {item.AirlineCode === 'VJ' && (
                                        <div className={cx('container')}>
                                            <img src={VJ} alt="VietJet" className={cx('image')} />

                                            <InforFlight item={item} name="VietJet Air" />
                                        </div>
                                    )}

                                    {item.AirlineCode === 'QH' && (
                                        <div className={cx('container')}>
                                            <img src={QH} alt="BamBo" className={cx('image')} />

                                            <InforFlight item={item} name="BamBo Airways" />
                                        </div>
                                    )}

                                    {item.AirlineCode === 'BL' && (
                                        <div className={cx('container')}>
                                            <img src={BL} alt="Pacific" className={cx('image')} />

                                            <InforFlight item={item} name="Jetstar Pacific Airlines" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    {filteredData.length === 0 && <NotFoundFlight />}
                </div>
            </div>
        </div>
    );
}
