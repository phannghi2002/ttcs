import VNA from '../../asset/images/Vietnam_Airlines.png';
import VJ from '../../asset/images/VietJet_Air_logo.svg.png';
import QH from '../../asset/images/bambo.jpg';
import BL from '../../asset/images/Pacific_Airline.png';
import InforFlight from '../InforFlight';
import classNames from 'classnames/bind';
import styles from './DefaultPage.module.scss';

// import InforFlightRoundTrip from '../InforFlightRoundTrip';
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useState } from 'react';

// export function DefaultPage1({ data, typeTrip, return1 }) {
//   console.log(data, typeTrip, return1);
//   // const formattedDateReturn = new Date(return1).toISOString();
//   // console.log(formattedDateReturn);
//   // let data1 = [];
//   // let formattedDateReturn = new Date(return1).toISOString();

//   // if (typeTrip === 'Roundtrip' && return1) {
//   //   data1 = data.filter(
//   //     (item) => item.Roundtrip.DateReturn === formattedDateReturn
//   //   );
//   // } else data1 = data;

//   // console.log(data1);

//   console.log(data);

//   const handleSelect = () => {
//     // Store bookedButton in localStorage
//     console.log(data);
//     // localStorage.setItem(
//     //   'inforFlight',
//     //   JSON.stringify({ item, selectedValue, value1, value2, total })
//     // );
//   };

//   // const [total1, setTotal1] = useState(0);
//   return (
//     <div className='contain'>
//       <h2 className='title'> Information Flight</h2>

//       {/* eslint-disable-next-line array-callback-return */}
//       {data.map((item, key) => {
//         if (item.AirlineCode === 'VNA') {
//           return (
//             <div className='wrapper_info wrapper_add'>
//               <div className='flight_info'>
//                 {' '}
//                 <div className='my-2 ps-3'>Chuyến bay đi:</div>
//                 <div key={item._id} className='container add'>
//                   <img src={VNA} alt='Vietnam Airlines' className='image' />

//                   <InforFlight
//                     item={item}
//                     name='Vietnam Airlines'
//                     select='true'
//                   />
//                 </div>
//                 <div className='my-2 ps-3'>Chuyến bay về:</div>
//                 <div key={item._id} className='container add'>
//                   <img src={VNA} alt='Vietnam Airlines' className='image' />

//                   <InforFlightRoundTrip item={item} name='Vietnam Airlines' />
//                 </div>
//               </div>

//               <div className='contain_total'>
//                 <div className='total_new'>Total All: 1000</div>
//                 {
//                   <Link to='check'>
//                     <Button className='select' onClick={handleSelect}>
//                       Select <FontAwesomeIcon icon={faArrowRight} />
//                     </Button>
//                   </Link>
//                 }
//               </div>
//             </div>
//           );
//         } else if (item.AirlineCode === 'VJ') {
//           return (
//             <div key={item._id} className='container'>
//               <img src={VJ} alt='VietJet' className='image' />
//               {item.AirlineCode}

//               <InforFlight item={item} />
//             </div>
//           );
//         } else if (item.AirlineCode === 'QH') {
//           return (
//             <div key={item._id} className='container'>
//               <img src={QH} alt='BamBo' className='image' />
//               {item.AirlineCode}

//               <InforFlight item={item} />
//             </div>
//           );
//         } else if (item.AirlineCode === 'BL') {
//           return (
//             <div key={item._id} className='container'>
//               <img src={BL} alt='Pacific' className='image' />
//               {item.AirlineCode}

//               <InforFlight item={item} />
//             </div>
//           );
//         }

//         // console.log(item);
//         // return <div>Duration: {item.Duration}</div>;
//       })}
//     </div>
//   );
// }

const cx = classNames.bind(styles);

export function DefaultPage1({ data, typeTrip }) {
    if (data[0]) {
        const d = new Date(data[0].DateGo);
        const dateConvert = d.toLocaleDateString('en-GB');
        // console.log(dateConvert);
        return (
            <div className={cx('contain')}>
                <div className={cx('info_flight', ' mb-5', ' pt-4')}>
                    <h2 className={cx('title')}> Information Flight</h2>
                    <h4>Ngày đi: {dateConvert}</h4>
                    <h5>Điểm đi: {data[0].AirportFrom}</h5>
                    <h5>Điểm đến: {data[0].AirportTo}</h5>
                </div>

                {/* eslint-disable-next-line array-callback-return */}
                {data.map((item, key) => {
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
            </div>
        );
    }
}

//Oneway
export function DefaultPage2({ data, typeTrip }) {
    if (data[0]) {
        const d = new Date(data[0].DateGo);
        const dateConvert = d.toLocaleDateString('en-GB');
        // console.log(dateConvert);
        return (
            <div className={cx('contain', 'ms-3')}>
                <div className={cx('info_flight', ' mb-5', ' pt-4')}>
                    <h2 className={cx('title')}> Information Flight</h2>
                    <h4>Ngày đi: {dateConvert}</h4>
                    <h5>Điểm đi: {data[0].AirportFrom}</h5>
                    <h5>Điểm đến: {data[0].AirportTo}</h5>
                </div>

                {/* eslint-disable-next-line array-callback-return */}
                {data.map((item, key) => {
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
            </div>
        );
    }
}
