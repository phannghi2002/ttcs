import NotFound from './NotFound';
import Check from '../component/Check';
// import App from '../App';
import { Routes, Route } from 'react-router-dom';
import SeatBooking from '../component/SeatBooking';
import Paying from '../component/Paying';
import Search from '../component/Search';
import MyFlight from '../component/MyFlight';
import Contact from '../component/Contact';
import SignIn from '../component/SignIn/SignIn';
import Admin from '../component/Admin/Admin';

function AppRouter() {
    return (
        <Routes>
            {/* <Route path="/searchFlightRoundtrip" element={<Check />} /> */}
            <Route path="/check" element={<Check />} />
            {/* <Route path="/" element={<App />} /> */}
            <Route path="*" element={<NotFound />} />
            <Route path="/seatBook" element={<SeatBooking />} />
            <Route path="/pay" element={<Paying />} />
            <Route path="/" element={<Search />} />
            <Route path="/myFlight" element={<MyFlight />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    );
}

export default AppRouter;
