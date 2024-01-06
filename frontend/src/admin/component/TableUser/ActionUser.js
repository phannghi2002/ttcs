import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ToastCustom from '../../../Toast';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import axios from 'axios';

import MenuItem from '@mui/material/MenuItem';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import { FormatDateYMD } from '../../../function/FormatDate';
import dayjs from 'dayjs';

//use add all
// const selectTypeFlight = [
//     {
//       value: 'Oneway',
//       label: 'One way',
//     },
//     {
//       value: 'Roundtrip',
//       label: 'Round trip',
//     },

//   ];

const selectTypeTicket = [
    {
        value: 'EconomyClass',
        label: 'Economy Class',
    },
    {
        value: 'PremiumClass',
        label: 'Premium Class',
    },

    {
        value: 'BusinessClass',
        label: 'Business Class',
    },
    {
        value: 'FirstClass',
        label: 'First Class',
    },
];

const selectAirport = [
    {
        value: 'HAN',
        label: 'Hà Nội (HAN)',
    },
    {
        value: 'HPH',
        label: 'Hải Phòng (HPH)',
    },

    {
        value: 'DIN',
        label: 'Điện Biên (DIN)',
    },
    {
        value: 'THD',
        label: 'Thanh Hóa (THD)',
    },
    {
        value: 'VDO',
        label: 'Quảng Ninh (VDO)',
    },
    {
        value: 'VII',
        label: 'Vinh (VII)',
    },

    {
        value: 'HUI',
        label: 'Huế (HUI)',
    },
    {
        value: 'VDH',
        label: 'Đồng Nai (VDH)',
    },
    {
        value: 'DAD',
        label: 'Đà Nẵng (DAD)',
    },
    {
        value: 'PXU',
        label: 'Pleiku (PXU)',
    },

    {
        value: 'TBB',
        label: 'Tuy Hòa (TBB)',
    },
    {
        value: 'SGN',
        label: 'Hồ Chí Minh (SGN)',
    },
    {
        value: 'CXR',
        label: 'Nha Trang (CXR)',
    },
    {
        value: 'DLI',
        label: 'Đà Lạt (DLI)',
    },

    {
        value: 'PQC',
        label: 'Phú Quốc (PQC)',
    },
    {
        value: 'VCL',
        label: 'Tam Kỳ (VCL)',
    },
    {
        value: 'UIH',
        label: 'Qui Nhơn (UIH)',
    },
    {
        value: 'VCA',
        label: 'Cần Thơ (VCA)',
    },

    {
        value: 'VCS',
        label: 'Côn Đảa (VCS)',
    },
    {
        value: 'BMV',
        label: 'Ban Mê Thuật (BMV)',
    },
    {
        value: 'VKG',
        label: 'Rạch Giá (VKG)',
    },
    {
        value: 'CAH',
        label: 'Cà Mau (CAH)',
    },
];
export const AddUser = ({ open, handleClose, setReRender }) => {
    const [data, setData] = useState({
        CodeTicket: '',
        FlightNumber: '',
        UserName: '',
        ID_Card: '',
        Email: '',
        TypeTicket: 'EconomyClass',
        AirportFrom: 'HAN',
        AirportTo: 'HAN',
        CodeSeat: '',
        TotalMoney: '',
        FlightTime: null,
        LandingTime: null,
        DateGo: null,
        TypeFlight: 'Oneway',
    });

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setData({ ...data, [name]: value });
    };

    const handleAdd = () => {
        console.log(data);
        if (data) {
            axios
                .post('http://localhost:4000/info/', {
                    CodeTicket: data.CodeTicket,
                    FlightNumber: data.FlightNumber,
                    UserName: data.UserName,
                    ID_Card: data.ID_Card,
                    Email: data.Email,
                    TypeTicket: data.TypeTicket,
                    AirportFrom: data.AirportFrom,
                    AirportTo: data.AirportTo,
                    CodeSeat: data.CodeSeat,
                    TotalMoney: data.TotalMoney,
                    TypeFlight: 'Oneway',

                    FlightTime: data.FlightTime,
                    LandingTime: data.LandingTime,
                    // DateGo: data.FlightTime.toISOString(),
                    DateGo: FormatDateYMD(data.FlightTime),
                })
                .then((res) => {
                    console.log(res);

                    setData({
                        CodeTicket: '',
                        FlightNumber: '',
                        UserName: '',
                        ID_Card: '',
                        Email: '',
                        TypeTicket: 'EconomyClass',
                        AirportFrom: 'HAN',
                        AirportTo: 'HAN',
                        CodeSeat: '',
                        TotalMoney: '',
                        FlightTime: null,
                        LandingTime: null,
                        DateGo: null,
                    });

                    setReRender(true);
                    toast.success('Thêm thông tin hành khách một chiều thành công');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Thêm thông tin người dùng một chiều</DialogTitle>
                <DialogContent>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <TextField
                                name="CodeTicket"
                                label="Mã vé"
                                variant="outlined"
                                margin="normal"
                                value={data.CodeTicket}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />
                            <TextField
                                name="FlightNumber"
                                label="Mã chuyến bay"
                                variant="outlined"
                                margin="normal"
                                value={data.FlightNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <TextField
                                name="UserName"
                                label="Tên"
                                variant="outlined"
                                margin="normal"
                                value={data.UserName}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />

                            <TextField
                                name="ID_Card"
                                label="Số CMND"
                                variant="outlined"
                                margin="normal"
                                value={data.ID_Card}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                name="Email"
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                value={data.Email}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />

                            <TextField
                                name="TypeTicket"
                                select
                                label="Hạng vé"
                                value={data.TypeTicket}
                                onChange={handleChange}
                                sx={{ width: '223px' }}
                                margin="normal"
                            >
                                {selectTypeTicket.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div>
                            <TextField
                                name="AirportFrom"
                                select
                                label="Sân bay đi"
                                value={data.AirportFrom}
                                onChange={handleChange}
                                sx={{ width: '223px', marginRight: '20px' }}
                                margin="normal"
                            >
                                {selectAirport.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                name="AirportTo"
                                select
                                label="Sân bay đến"
                                value={data.AirportTo}
                                onChange={handleChange}
                                sx={{ width: '223px' }}
                                margin="normal"
                            >
                                {selectAirport.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div>
                            <TextField
                                name="CodeSeat"
                                label="Chỗ ngồi"
                                variant="outlined"
                                margin="normal"
                                value={data.CodeSeat}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />
                            <TextField
                                name="TotalMoney"
                                label="Tổng tiền (VND)"
                                variant="outlined"
                                margin="normal"
                                value={data.TotalMoney}
                                onChange={handleChange}
                            />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                <DateTimePicker
                                    label="Giờ đi"
                                    format="DD/MM/YYYY hh:mm A"
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    value={data.FlightTime}
                                    onChange={(newValue) => {
                                        setData({ ...data, FlightTime: newValue });
                                    }}
                                />
                                <DateTimePicker
                                    label="Giờ đến"
                                    format="DD/MM/YYYY hh:mm A"
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    value={data.LandingTime}
                                    onChange={(newValue) => {
                                        setData({ ...data, LandingTime: newValue });
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        {/* <div style={{ display: 'flex', marginTop: '8px', marginBottom: '12px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']} sx={{ width: '223px', marginRight: '20px' }}>
                                    <TimePicker
                                        label="Giờ đi"
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                        }}
                                        value={data.FlightTime}
                                        onChange={handleChange}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']} sx={{ width: '223px' }}>
                                    <TimePicker
                                        label="Giờ đến"
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="date">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['Ngày đi']}>
                                    <DatePicker
                                        label="Ngày đi"
                                        format="DD/MM/YYYY"
                                        name="DateGo"
                                        value={data.DateGo}
                                        onChange={(date) => handleChangeDate(date)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div> */}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleAdd} autoFocus>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastCustom />
        </React.Fragment>
    );
};

export const EditUser = ({ row, open, setOpen, handleClose, reRender, setReRender }) => {
    const [data, setData] = useState({});

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setData({ ...data, [name]: value });
    };
    // const handleChangeDate = (date) => {
    //     const formattedDate = dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    //     console.log(formattedDate);
    //     setData({ ...data, DayOfBirth: formattedDate });
    // };
    const handleEdit = () => {
        if (data) {
            axios
                .put(`http://localhost:4000/info/${row._id}`, {
                    CodeTicket: data.CodeTicket,
                    FlightNumber: data.FlightNumber,
                    UserName: data.UserName,
                    ID_Card: data.ID_Card,
                    Email: data.Email,
                    TypeTicket: data.TypeTicket,
                    AirportFrom: data.AirportFrom,
                    AirportTo: data.AirportTo,
                    CodeSeat: data.CodeSeat,
                    TotalMoney: data.TotalMoney,
                    TypeFlight: 'Oneway',

                    FlightTime: data.FlightTime,
                    LandingTime: data.LandingTime,
                    DateGo: FormatDateYMD(data.FlightTime),

                    // DateGo: FormatDate(data.FlightTime), CHẢ HIỂU NỔI SAO ROUNDTRIP CHẠY ĐƯỢC CÒN ONEWAY THÌ KHÔNG
                    // DateGo: '2023-12-25',

                    // DateGo: data.FlightTime.toISOString(),
                    // DayOfBirth: FormatDate(data.DayOfBirth),
                    // DayOfBirth: FormatDate(data.DayOfBirth),
                })
                .then((res) => {
                    console.log(res);

                    setReRender(true);
                    toast.success('Cập nhật người dùng một chiều thành công');
                    setOpen(false);
                })
                .catch((err) => {
                    console.log('in loi', err);
                });
        }

        console.log('hello babay');
        console.log(data);
    };

    useEffect(() => {
        setData({
            CodeTicket: row.CodeTicket,
            FlightNumber: row.FlightNumber,
            UserName: row.UserName,
            ID_Card: row.ID_Card,
            Email: row.Email,
            TypeTicket: row.TypeTicket,
            AirportFrom: row.AirportFrom,
            AirportTo: row.AirportTo,
            CodeSeat: row.CodeSeat,
            TotalMoney: row.TotalMoney,
            TypeFlight: row.TypeFlight,

            FlightTime: row.FlightTime,
            LandingTime: row.LandingTime,
            DateGo: row.FlightTime,
            //DayOfBirth: row.DayOfBirth,
        });
    }, [row]);

    console.log(row);
    console.log(data);

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Cập nhật thông tin người dùng 1 chiều</DialogTitle>
                <DialogContent>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <TextField
                                name="CodeTicket"
                                label="Mã vé"
                                variant="outlined"
                                margin="normal"
                                value={data.CodeTicket}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />
                            <TextField
                                name="FlightNumber"
                                label="Mã chuyến bay"
                                variant="outlined"
                                margin="normal"
                                value={data.FlightNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <TextField
                                name="UserName"
                                label="Tên"
                                variant="outlined"
                                margin="normal"
                                value={data.UserName}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />

                            <TextField
                                name="ID_Card"
                                label="Số CMND"
                                variant="outlined"
                                margin="normal"
                                value={data.ID_Card}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                name="Email"
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                value={data.Email}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />

                            <TextField
                                name="TypeTicket"
                                select
                                label="Hạng vé"
                                defaultValue={row.TypeTicket}
                                value={data.TypeTicket}
                                onChange={handleChange}
                                sx={{ width: '223px' }}
                                margin="normal"
                            >
                                {selectTypeTicket.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div>
                            <TextField
                                name="AirportFrom"
                                select
                                label="Sân bay đi"
                                defaultValue={row.AirportFrom}
                                value={data.AirportFrom}
                                onChange={handleChange}
                                sx={{ width: '223px', marginRight: '20px' }}
                                margin="normal"
                            >
                                {selectAirport.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                name="AirportTo"
                                select
                                label="Sân bay đến"
                                defaultValue={row.AirportTo}
                                value={data.AirportTo}
                                onChange={handleChange}
                                sx={{ width: '223px' }}
                                margin="normal"
                            >
                                {selectAirport.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div>
                            <TextField
                                name="CodeSeat"
                                label="Chỗ ngồi"
                                variant="outlined"
                                margin="normal"
                                value={data.CodeSeat}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />
                            <TextField
                                name="TotalMoney"
                                label="Tổng tiền (VND)"
                                variant="outlined"
                                margin="normal"
                                value={data.TotalMoney}
                                onChange={handleChange}
                            />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                <DateTimePicker
                                    label="Giờ đi"
                                    format="DD/MM/YYYY hh:mm A"
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    defaultValue={dayjs(row.FlightTime)}
                                    value={data.FlightTime ? dayjs(data.FlightTime) : null}
                                    onChange={(newValue) => {
                                        setData({ ...data, FlightTime: newValue });
                                    }}
                                />
                                <DateTimePicker
                                    label="Giờ đến"
                                    format="DD/MM/YYYY hh:mm A"
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    defaultValue={dayjs(row.LandingTime)}
                                    value={data.LandingTime ? dayjs(data.LandingTime) : null}
                                    onChange={(newValue) => {
                                        setData({ ...data, LandingTime: newValue });
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleEdit} autoFocus>
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastCustom />
        </React.Fragment>
    );
};

export const AddUserRoundtrip = ({ open, handleClose, setReRender }) => {
    const [data, setData] = useState({
        CodeTicket: '',
        FlightNumber: '',
        UserName: '',
        ID_Card: '',
        Email: '',
        TypeTicket: 'EconomyClass',
        AirportFrom: 'HAN',
        AirportTo: 'HAN',
        CodeSeat: '',
        TotalMoney: '',
        FlightTime: null,
        LandingTime: null,
        DateGo: null,
        TypeFlight: 'Roundtrip',
        TypeTicketReturn: 'EconomyClass',
        FlightNumberReturn: '',
        CodeSeatReturn: '',
        FlightTimeReturn: null,
        LandingTimeReturn: null,
        DateReturn: null,
    });

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setData({ ...data, [name]: value });
    };

    const handleAdd = () => {
        console.log(data);
        if (data) {
            axios
                .post('http://localhost:4000/info/', {
                    CodeTicket: data.CodeTicket, //
                    FlightNumber: data.FlightNumber, //
                    UserName: data.UserName, //
                    ID_Card: data.ID_Card, //
                    Email: data.Email, //
                    TypeTicket: data.TypeTicket, //
                    AirportFrom: data.AirportFrom, //
                    AirportTo: data.AirportTo, //
                    CodeSeat: data.CodeSeat, //
                    TotalMoney: data.TotalMoney, //
                    TypeFlight: 'Roundtrip',

                    FlightTime: data.FlightTime, //
                    LandingTime: data.LandingTime, //
                    DateGo: data.FlightTime.toISOString(),

                    TypeTicketReturn: data.TypeTicketReturn, //
                    FlightNumberReturn: data.FlightNumberReturn, //
                    CodeSeatReturn: data.CodeSeatReturn, //
                    FlightTimeReturn: data.FlightTimeReturn, //
                    LandingTimeReturn: data.LandingTimeReturn, //
                    DateReturn: data.FlightTimeReturn.toISOString(),
                })
                .then((res) => {
                    console.log(res);

                    setData({
                        CodeTicket: '',
                        FlightNumber: '',
                        UserName: '',
                        ID_Card: '',
                        Email: '',
                        TypeTicket: 'EconomyClass',
                        AirportFrom: 'HAN',
                        AirportTo: 'HAN',
                        CodeSeat: '',
                        TotalMoney: '',
                        FlightTime: null,
                        LandingTime: null,
                        DateGo: null,

                        TypeTicketReturn: 'EconomyClass',
                        FlightNumberReturn: '',
                        CodeSeatReturn: '',
                        FlightTimeReturn: null,
                        LandingTimeReturn: null,
                        DateReturn: null,
                    });

                    setReRender(true);
                    toast.success('Thêm thông tin hành khách khứ hồi thành công');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Thêm thông tin người dùng khứ hồi</DialogTitle>
                <DialogContent>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            name="CodeTicket"
                            label="Mã vé"
                            variant="outlined"
                            margin="normal"
                            // fullWidth
                            value={data.CodeTicket}
                            onChange={handleChange}
                        />
                        <div>
                            <TextField
                                name="FlightNumber"
                                label="Mã chuyến bay đi"
                                variant="outlined"
                                margin="normal"
                                value={data.FlightNumber}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />
                            <TextField
                                name="FlightNumberReturn"
                                label="Mã chuyến bay về"
                                variant="outlined"
                                margin="normal"
                                value={data.FlightNumberReturn}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <TextField
                                name="UserName"
                                label="Tên"
                                variant="outlined"
                                margin="normal"
                                value={data.UserName}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />

                            <TextField
                                name="ID_Card"
                                label="Số CMND"
                                variant="outlined"
                                margin="normal"
                                value={data.ID_Card}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                name="Email"
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                value={data.Email}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />
                            <TextField
                                name="TotalMoney"
                                label="Tổng tiền (VND)"
                                variant="outlined"
                                margin="normal"
                                value={data.TotalMoney}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <TextField
                                name="TypeTicket"
                                select
                                label="Hạng vé đi"
                                value={data.TypeTicket}
                                onChange={handleChange}
                                sx={{ width: '223px', marginRight: '20px' }}
                                margin="normal"
                            >
                                {selectTypeTicket.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                name="TypeTicketReturn"
                                select
                                label="Hạng vé về"
                                value={data.TypeTicketReturn}
                                onChange={handleChange}
                                sx={{ width: '223px' }}
                                margin="normal"
                            >
                                {selectTypeTicket.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div>
                            <TextField
                                name="AirportFrom"
                                select
                                label="Sân bay đi"
                                value={data.AirportFrom}
                                onChange={handleChange}
                                sx={{ width: '223px', marginRight: '20px' }}
                                margin="normal"
                            >
                                {selectAirport.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                name="AirportTo"
                                select
                                label="Sân bay đến"
                                value={data.AirportTo}
                                onChange={handleChange}
                                sx={{ width: '223px' }}
                                margin="normal"
                            >
                                {selectAirport.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div>
                            <TextField
                                name="CodeSeat"
                                label="Chỗ ngồi đi"
                                variant="outlined"
                                margin="normal"
                                value={data.CodeSeat}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />
                            <TextField
                                name="CodeSeatReturn"
                                label="Chỗ ngồi về"
                                variant="outlined"
                                margin="normal"
                                value={data.CodeSeatReturn}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ marginTop: '8px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                    <DateTimePicker
                                        label="Giờ khởi hành chiều đi"
                                        format="DD/MM/YYYY hh:mm A"
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        value={data.FlightTime}
                                        onChange={(newValue) => {
                                            setData({ ...data, FlightTime: newValue });
                                        }}
                                    />
                                    <DateTimePicker
                                        label="Giờ đến chiều đi"
                                        format="DD/MM/YYYY hh:mm A"
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        value={data.LandingTime}
                                        onChange={(newValue) => {
                                            setData({ ...data, LandingTime: newValue });
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                    <DateTimePicker
                                        label="Giờ khởi hành chiều về"
                                        format="DD/MM/YYYY hh:mm A"
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        value={data.FlightTimeReturn}
                                        onChange={(newValue) => {
                                            setData({ ...data, FlightTimeReturn: newValue });
                                        }}
                                    />
                                    <DateTimePicker
                                        label="Giờ đến chiều về"
                                        format="DD/MM/YYYY hh:mm A"
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        value={data.LandingTimeReturn}
                                        onChange={(newValue) => {
                                            setData({ ...data, LandingTimeReturn: newValue });
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleAdd} autoFocus>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastCustom />
        </React.Fragment>
    );
};

export const EditUserRoundtrip = ({ row, open, setOpen, handleClose, reRender, setReRender }) => {
    const [data, setData] = useState({});

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setData({ ...data, [name]: value });
    };
    // const handleChangeDate = (date) => {
    //     const formattedDate = dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    //     console.log(formattedDate);
    //     setData({ ...data, DayOfBirth: formattedDate });
    // };
    const handleEdit = () => {
        if (data) {
            axios
                .put(`http://localhost:4000/info/${row._id}`, {
                    CodeTicket: data.CodeTicket,
                    FlightNumber: data.FlightNumber,
                    UserName: data.UserName,
                    ID_Card: data.ID_Card,
                    Email: data.Email,
                    TypeTicket: data.TypeTicket,
                    AirportFrom: data.AirportFrom,
                    AirportTo: data.AirportTo,
                    CodeSeat: data.CodeSeat,
                    TotalMoney: data.TotalMoney,
                    TypeFlight: 'Roundtrip',

                    FlightTime: data.FlightTime,
                    LandingTime: data.LandingTime,
                    DateGo: FormatDateYMD(data.FlightTime),
                    // DayOfBirth: FormatDate(data.DayOfBirth),
                    // DayOfBirth: FormatDate(data.DayOfBirth),
                    TypeTicketReturn: data.TypeTicketReturn, //
                    FlightNumberReturn: data.FlightNumberReturn, //
                    CodeSeatReturn: data.CodeSeatReturn, //
                    FlightTimeReturn: data.FlightTimeReturn, //
                    LandingTimeReturn: data.LandingTimeReturn, //
                    DateReturn: FormatDateYMD(data.FlightTimeReturn),
                })
                .then((res) => {
                    console.log(res);

                    setReRender(true);
                    toast.success('Cập nhật người dùng khứ hồi thành công');
                    setOpen(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        console.log('hello baby');
        console.log(data);
    };

    useEffect(() => {
        setData({
            CodeTicket: row.CodeTicket,
            FlightNumber: row.FlightNumber,
            UserName: row.UserName,
            ID_Card: row.ID_Card,
            Email: row.Email,
            TypeTicket: row.TypeTicket,
            AirportFrom: row.AirportFrom,
            AirportTo: row.AirportTo,
            CodeSeat: row.CodeSeat,
            TotalMoney: row.TotalMoney,
            TypeFlight: row.TypeFlight,

            FlightTime: row.FlightTime,
            LandingTime: row.LandingTime,
            DateGo: row.FlightTime,
            //DayOfBirth: row.DayOfBirth,
            TypeTicketReturn: row.TypeTicketReturn, //
            FlightNumberReturn: row.FlightNumberReturn, //
            CodeSeatReturn: row.CodeSeatReturn, //
            FlightTimeReturn: row.FlightTimeReturn, //
            LandingTimeReturn: row.LandingTimeReturn, //
            DateReturn: row.FlightTimeReturn,
        });
    }, [row]);

    console.log(row);
    console.log(data);

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Cập nhật thông tin người dùng khứ hồi</DialogTitle>
                <DialogContent>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            name="CodeTicket"
                            label="Mã vé"
                            variant="outlined"
                            margin="normal"
                            // fullWidth
                            value={data.CodeTicket}
                            onChange={handleChange}
                        />
                        <div>
                            <TextField
                                name="FlightNumber"
                                label="Mã chuyến bay đi"
                                variant="outlined"
                                margin="normal"
                                value={data.FlightNumber}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />
                            <TextField
                                name="FlightNumberReturn"
                                label="Mã chuyến bay về"
                                variant="outlined"
                                margin="normal"
                                value={data.FlightNumberReturn}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <TextField
                                name="UserName"
                                label="Tên"
                                variant="outlined"
                                margin="normal"
                                value={data.UserName}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />

                            <TextField
                                name="ID_Card"
                                label="Số CMND"
                                variant="outlined"
                                margin="normal"
                                value={data.ID_Card}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                name="Email"
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                value={data.Email}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />
                            <TextField
                                name="TotalMoney"
                                label="Tổng tiền (VND)"
                                variant="outlined"
                                margin="normal"
                                value={data.TotalMoney}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <TextField
                                name="TypeTicket"
                                select
                                label="Hạng vé đi"
                                defaultValue={row.TypeTicket}
                                value={data.TypeTicket}
                                onChange={handleChange}
                                sx={{ width: '223px', marginRight: '20px' }}
                                margin="normal"
                            >
                                {selectTypeTicket.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                name="TypeTicketReturn"
                                select
                                label="Hạng vé về"
                                defaultValue={row.TypeTicketReturn}
                                value={data.TypeTicketReturn}
                                onChange={handleChange}
                                sx={{ width: '223px' }}
                                margin="normal"
                            >
                                {selectTypeTicket.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div>
                            <TextField
                                name="AirportFrom"
                                select
                                label="Sân bay đi"
                                defaultValue={row.AirportFrom}
                                value={data.AirportFrom}
                                onChange={handleChange}
                                sx={{ width: '223px', marginRight: '20px' }}
                                margin="normal"
                            >
                                {selectAirport.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                name="AirportTo"
                                select
                                label="Sân bay đến"
                                defaultValue={row.AirportTo}
                                value={data.AirportTo}
                                onChange={handleChange}
                                sx={{ width: '223px' }}
                                margin="normal"
                            >
                                {selectAirport.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div>
                            <TextField
                                name="CodeSeat"
                                label="Chỗ ngồi đi"
                                variant="outlined"
                                margin="normal"
                                value={data.CodeSeat}
                                onChange={handleChange}
                                sx={{ paddingRight: '20px' }}
                            />
                            <TextField
                                name="CodeSeatReturn"
                                label="Chỗ ngồi về"
                                variant="outlined"
                                margin="normal"
                                value={data.CodeSeatReturn}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ marginTop: '8px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                    <DateTimePicker
                                        label="Giờ khởi hành chiều đi"
                                        format="DD/MM/YYYY hh:mm A"
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        defaultValue={dayjs(row.FlightTime)}
                                        value={data.FlightTime ? dayjs(data.FlightTime) : null}
                                        onChange={(newValue) => {
                                            setData({ ...data, FlightTime: newValue });
                                        }}
                                    />
                                    <DateTimePicker
                                        label="Giờ đến chiều đi"
                                        format="DD/MM/YYYY hh:mm A"
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        defaultValue={dayjs(row.LandingTime)}
                                        value={data.LandingTime ? dayjs(data.LandingTime) : null}
                                        onChange={(newValue) => {
                                            setData({ ...data, LandingTime: newValue });
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                    <DateTimePicker
                                        label="Giờ khởi hành chiều về"
                                        format="DD/MM/YYYY hh:mm A"
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        defaultValue={dayjs(row.FlightTimeReturn)}
                                        value={data.FlightTimeReturn ? dayjs(data.FlightTimeReturn) : null}
                                        onChange={(newValue) => {
                                            setData({ ...data, FlightTimeReturn: newValue });
                                        }}
                                    />
                                    <DateTimePicker
                                        label="Giờ đến chiều về"
                                        format="DD/MM/YYYY hh:mm A"
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        defaultValue={dayjs(row.LandingTimeReturn)}
                                        value={data.LandingTimeReturn ? dayjs(data.LandingTimeReturn) : null}
                                        onChange={(newValue) => {
                                            setData({ ...data, LandingTimeReturn: newValue });
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleEdit} autoFocus>
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastCustom />
        </React.Fragment>
    );
};
