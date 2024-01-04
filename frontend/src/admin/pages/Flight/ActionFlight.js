// import * as React from 'react';
// import { useState } from 'react';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';

// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import TextField from '@mui/material/TextField';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import axios from 'axios';
// import { FormatDate } from '../../../function/FormatDate';

// import { toast } from 'react-toastify';
// import ToastCustom from '../../../Toast';
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect } from 'react';
// import dayjs from 'dayjs';

// export const AddFlight = ({ open, handleClose, reRender, setReRender }) => {
//     const [data, setData] = useState({
//         FlightNumber: '',
//         AirlineCode: '',
//         AirportFrom: '',
//         AirportTo: '',
//         DateGo: null,
//         DayOfBirth: null,
//         FirstClass: {
//             PriceAdult: '',
//             PriceChildren: '',
//         },
//         BusinessClass: {
//             PriceAdult: '',
//             PriceChildren: '',
//         },

//         PremiumClass: {
//             PriceAdult: '',
//             PriceChildren: '',
//         },

//         EconomyClass: {
//             PriceAdult: '',
//             PriceChildren: '',
//         },
//         FlightTime: '',
//         LandingTime: '',
//     });

//     const handleChange = (e) => {
//         const value = e.target.value;
//         const name = e.target.name;

//         setData({ ...data, [name]: value });
//     };
//     const handleChangeDate = (date) => {
//         setData({ ...data, DayOfBirth: date });
//     };
//     const handleAdd = () => {
//         console.log(data);
//         if (data) {
//             axios
//                 .post('http://localhost:4000/login/addAmin', {
//                     AccountName: data.AccountName,
//                     Password: data.Password,
//                     Name: data.Name,
//                     DayOfBirth: FormatDate(data.DayOfBirth),
//                 })
//                 .then((res) => {
//                     console.log(res);

//                     setData({
//                         AccountName: '',
//                         Password: '',
//                         Name: '',
//                         DayOfBirth: null,
//                     });

//                     setReRender(true);
//                     toast.success('Thêm Admin thành công');
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         }
//     };

//     return (
//         <React.Fragment>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title">Thêm thông tin Admin</DialogTitle>
//                 <DialogContent>
//                     <form>
//                         <TextField
//                             name="FlightNumber"
//                             label="Mã chuyến bay"
//                             variant="outlined"
//                             margin="normal"
//                             // fullWidth
//                             value={data.FlightNumber}
//                             onChange={handleChange}
//                         />
//                           <TextField
//                             name="AirlineCode"
//                             label="Mã máy bay"
//                             variant="outlined"
//                             margin="normal"
//                             // fullWidth
//                             value={data.FlightNumber}
//                             onChange={handleChange}
//                         />
//                           <TextField
//                             name="FlightNumber"
//                             label="Mã chuyến bay"
//                             variant="outlined"
//                             margin="normal"
//                             // fullWidth
//                             value={data.FlightNumber}
//                             onChange={handleChange}
//                         />
//                           <TextField
//                             name="FlightNumber"
//                             label="Mã chuyến bay"
//                             variant="outlined"
//                             margin="normal"
//                             // fullWidth
//                             value={data.FlightNumber}
//                             onChange={handleChange}
//                         />
//                           <TextField
//                             name="FlightNumber"
//                             label="Mã chuyến bay"
//                             variant="outlined"
//                             margin="normal"
//                             // fullWidth
//                             value={data.FlightNumber}
//                             onChange={handleChange}
//                         />

//                         <TextField
//                             name="Name"
//                             label="Họ và tên"
//                             variant="outlined"
//                             margin="normal"
//                             fullWidth
//                             value={data.Name}
//                             onChange={handleChange}
//                         />
//                         <div className="date">
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <DemoContainer components={['Ngày sinh']}>
//                                     <DatePicker
//                                         label="Ngày sinh"
//                                         format="DD/MM/YYYY"
//                                         name="DayOfBirth"
//                                         value={data.DayOfBirth}
//                                         onChange={(date) => handleChangeDate(date)}
//                                     />
//                                 </DemoContainer>
//                             </LocalizationProvider>
//                         </div>
//                     </form>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Hủy</Button>
//                     <Button onClick={handleAdd} autoFocus>
//                         Thêm
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//             <ToastCustom />
//         </React.Fragment>
//     );
// };

// export const EditAdmin = ({ row, open, setOpen, handleClose, reRender, setReRender }) => {
//     const [data, setData] = useState({});

//     const [showPassword, setShowPassword] = useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     const handleChange = (e) => {
//         const value = e.target.value;
//         const name = e.target.name;

//         setData({ ...data, [name]: value });
//     };
//     const handleChangeDate = (date) => {
//         // setData({ ...data, DayOfBirth: date.DayOfBirth });
//         // setData({ ...data, DayOfBirth: date.toISOString() });
//         const formattedDate = dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
//         setData({ ...data, DayOfBirth: formattedDate });
//     };
//     const handleEdit = () => {
//         if (data) {
//             axios
//                 .put(`http://localhost:4000/login/${row._id}`, {
//                     AccountName: data.AccountName,
//                     Password: data.Password,
//                     Name: data.Name,
//                     DayOfBirth: FormatDate(data.DayOfBirth),
//                 })
//                 .then((res) => {
//                     console.log(res);

//                     setReRender(true);
//                     toast.success('Cập nhật Admin thành công');
//                     setOpen(false);
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         }
//         console.log('hello babay');
//         console.log(data);
//     };

//     useEffect(() => {
//         setData({
//             AccountName: row.AccountName,
//             Password: row.Password,
//             Name: row.Name,
//             DayOfBirth: row.DayOfBirth,
//         });
//     }, [row]);

//     console.log(row);
//     console.log(data);

//     return (
//         <React.Fragment>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title">Cập nhật thông tin Admin</DialogTitle>
//                 <DialogContent>
//                     <form>
//                         <TextField
//                             name="AccountName"
//                             label="Tên tài khoản"
//                             variant="outlined"
//                             margin="normal"
//                             fullWidth
//                             value={data.AccountName}
//                             onChange={handleChange}
//                         />
//                         <FormControl variant="outlined" margin="normal" fullWidth>
//                             <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//                             <OutlinedInput
//                                 name="Password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 value={data.Password}
//                                 onChange={handleChange}
//                                 endAdornment={
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             aria-label="toggle password visibility"
//                                             onClick={handleClickShowPassword}
//                                             onMouseDown={handleMouseDownPassword}
//                                             edge="end"
//                                         >
//                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 }
//                                 label="Password"
//                             />
//                         </FormControl>
//                         <TextField
//                             name="Name"
//                             label="Họ và tên"
//                             variant="outlined"
//                             margin="normal"
//                             fullWidth
//                             value={data.Name}
//                             onChange={handleChange}
//                         />
//                         <div className="date">
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <DemoContainer components={['Ngày sinh']}>
//                                     <DatePicker
//                                         label="Ngày sinh"
//                                         format="DD/MM/YYYY"
//                                         name="DayOfBirth"
//                                         // value={data.DayOfBirth}

//                                         defaultValue={dayjs(row.DayOfBirth)}
//                                         value={data.DayOfBirth ? dayjs(data.DayOfBirth) : null}
//                                         onChange={(date) => handleChangeDate(date)}
//                                     />
//                                 </DemoContainer>
//                             </LocalizationProvider>
//                         </div>
//                     </form>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Hủy</Button>
//                     <Button onClick={handleEdit} autoFocus>
//                         Cập nhật
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//             <ToastCustom />
//         </React.Fragment>
//     );
// };
