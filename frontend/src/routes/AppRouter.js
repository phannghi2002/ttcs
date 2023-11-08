import NotFound from './NotFound';
import Check from '../component/Check';
// import App from '../App';
import { Routes, Route } from 'react-router-dom';
import SeatBooking from '../component/SeatBooking';
import Paying from '../component/Paying';
import Search from '../component/Search';

function AppRouter() {
    return (
        <Routes>
            {/* <Route path="/searchFlightOneway/check" element={<Check />} />
      <Route path="/searchFlightRoundtrip/check" element={<Check />} /> */}
            <Route path="/check" element={<Check />} />
            {/* <Route path="/" element={<App />} /> */}
            <Route path="*" element={<NotFound />} />
            <Route path="/seatBook" element={<SeatBooking />} />
            <Route path="/pay" element={<Paying />} />
            <Route path="/" element={<Search />} />
        </Routes>
    );
}

export default AppRouter;
