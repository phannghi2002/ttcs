import NotFound from './NotFound';
import Check from '../component/Check';
// import App from '../App';
import { Routes, Route } from 'react-router-dom';
import SeatBooking from '../component/SeatBooking';
import Paying from '../component/Paying';
import Search from '../component/Search';
import MyFlight from '../component/MyFlight';
import Contact from '../component/Contact';

import Home from '../admin/pages/Home';
import Flight from '../admin/pages/Flight';
import Users from '../admin/pages/Users';
import AdminUsers from '../admin/pages/AdminUsers';

import Revenue from '../admin/pages/Revenue';

import SignIn from '../component/SignIn';

function AppRouter() {
    return (
        <Routes>
            {/* <Route path="/searchFlightRoundtrip" element={<Check />} /> */}
            <Route path="/check" element={<Check />} />

            <Route path="*" element={<NotFound />} />
            <Route path="/seatBook" element={<SeatBooking />} />
            <Route path="/pay" element={<Paying />} />
            <Route path="/" element={<Search />} />
            <Route path="/myFlight" element={<MyFlight />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/signin" element={<SignIn />} />

            <Route path="/admin" element={<Home />} />
            <Route path="/admin/flight" element={<Flight />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/adminUsers" element={<AdminUsers />} />
            <Route path="/admin/revenue" element={<Revenue />} />
        </Routes>
    );
}

export default AppRouter;
