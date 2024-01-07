import * as React from 'react';
import { useState, useEffect } from 'react';

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
import { toast } from 'react-toastify';
import ToastCustom from '../../../Toast';
import 'react-toastify/dist/ReactToastify.css';

import MenuItem from '@mui/material/MenuItem';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { FormatDateYMD } from '../../../function/FormatDate';
import dayjs from 'dayjs';
import CheckNumber from '../../../function/CheckNumber';

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

const selectAirCode = [
    {
        value: 'VNA',
        label: 'VNA',
    },
    {
        value: 'VJ',
        label: 'VJ',
    },
    {
        value: 'QH',
        label: 'QH',
    },
    {
        value: 'BL',
        label: 'BL',
    },
];
export const AddFlight = ({ open, handleClose, onUpdate, setReRender }) => {
    const [data, setData] = useState({
        FlightNumber: '',
        AirlineCode: 'VNA',
        AirportFrom: 'HAN',
        AirportTo: 'SGN',
        DateGo: null,

        FirstClass: {
            PriceAdult: '',
        },
        BusinessClass: {
            PriceAdult: '',
        },

        PremiumClass: {
            PriceAdult: '',
        },

        EconomyClass: {
            PriceAdult: '',
        },
        FlightTime: null,
        LandingTime: null,
    });

    const [errors, setErrors] = useState({});
    const newErrors = { ...errors };
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setData({ ...data, [name]: value });

        if (value.trim() === '') {
            newErrors[name] = 'Trường này không được bỏ trống';
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };

    const handleChangeSpecial = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setData({
            ...data,
            [name]: {
                PriceAdult: value,
            },
        });

        if (value.trim() === '') {
            newErrors[name] = 'Trường này không được bỏ trống';
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };

    const handleChangeDate = (name, newValue) => {
        console.log(newValue);
        if (newValue === '' || newValue === null) {
            newErrors[name] = 'Trường này không được bỏ trống';
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
        return newErrors;
    };

    const validate = () => {
        if (data.FlightNumber.trim() === '') {
            newErrors['FlightNumber'] = 'Trường này không được bỏ trống';
        }
        if (data.EconomyClass.PriceAdult.trim() === '') {
            newErrors['EconomyClass'] = 'Trường này không được bỏ trống';
        } else if (!CheckNumber(data.EconomyClass.PriceAdult)) {
            newErrors['EconomyClass'] = 'Trường này phải là số';
        }

        if (data.PremiumClass.PriceAdult.trim() === '') {
            newErrors['PremiumClass'] = 'Trường này không được bỏ trống';
        } else if (!CheckNumber(data.PremiumClass.PriceAdult)) {
            newErrors['PremiumClass'] = 'Trường này phải là số';
        }

        if (data.BusinessClass.PriceAdult.trim() === '') {
            newErrors['BusinessClass'] = 'Trường này không được bỏ trống';
        } else if (!CheckNumber(data.BusinessClass.PriceAdult)) {
            newErrors['BusinessClass'] = 'Trường này phải là số';
        }

        if (data.FirstClass.PriceAdult.trim() === '') {
            newErrors['FirstClass'] = 'Trường này không được bỏ trống';
        } else if (!CheckNumber(data.FirstClass.PriceAdult)) {
            newErrors['FirstClass'] = 'Trường này phải là số';
        }
        if (data.FlightTime === null) {
            newErrors['FlightTime'] = 'Trường này không được bỏ trống';
        }
        if (data.LandingTime === null) {
            newErrors['LandingTime'] = 'Trường này không được bỏ trống';
        }

        setErrors(newErrors);
    };

    const handleAdd = () => {
        console.log(data);

        validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        if (data) {
            axios
                .post('http://localhost:4000/tickets', {
                    FlightNumber: data.FlightNumber,
                    AirlineCode: data.AirlineCode,
                    AirportFrom: data.AirportFrom,
                    AirportTo: data.AirportTo,
                    FirstClass: {
                        PriceAdult: data.FirstClass.PriceAdult,
                    },
                    EconomyClass: {
                        PriceAdult: data.EconomyClass.PriceAdult,
                    },
                    BusinessClass: {
                        PriceAdult: data.BusinessClass.PriceAdult,
                    },
                    PremiumClass: {
                        PriceAdult: data.PremiumClass.PriceAdult,
                    },

                    FlightTime: data.FlightTime,
                    LandingTime: data.LandingTime,
                    // DateGo: data.FlightTime.toISOString(),
                    DateGo: FormatDateYMD(data.FlightTime),
                })
                .then((res) => {
                    console.log(res);

                    setData({
                        FlightNumber: '',
                        AirlineCode: 'VNA',
                        AirportFrom: 'HAN',
                        AirportTo: 'SGN',
                        FirstClass: {
                            PriceAdult: '',
                        },
                        EconomyClass: {
                            PriceAdult: '',
                        },
                        BusinessClass: {
                            PriceAdult: '',
                        },
                        PremiumClass: {
                            PriceAdult: '',
                        },

                        DateGo: null,
                        FlightTime: null,
                        LandingTime: null,
                    });

                    // setReRender(true);
                    toast.success('Thêm chuyến bay thành công');
                    onUpdate();
                })
                .catch((res) => {
                    console.log(res.response.data.message);

                    toast.error(`${Object.keys(res.response.data.message.keyPattern)[0]} đã tồn tại`);
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
                <DialogTitle id="alert-dialog-title">Thêm thông tin chuyến bay</DialogTitle>
                <DialogContent>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <TextField
                                name="AirlineCode"
                                select
                                label="Mã máy bay"
                                defaultValue={data.AirlineCode}
                                value={data.AirlineCode}
                                onChange={handleChange}
                                sx={{ width: '223px', marginRight: '20px' }}
                                margin="normal"
                            >
                                {selectAirCode.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                name="FlightNumber"
                                label="Mã chuyến bay"
                                variant="outlined"
                                margin="normal"
                                value={data.FlightNumber}
                                helperText={errors['FlightNumber'] || ''}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                        color: errors['FlightNumber'] ? 'red' : 'inherit',
                                    },
                                }}
                            />
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
                                name="EconomyClass"
                                label="Giá vé người lớn Economy Class"
                                variant="outlined"
                                margin="normal"
                                value={data.EconomyClass.PriceAdult}
                                helperText={errors['EconomyClass'] || ''}
                                onChange={handleChangeSpecial}
                                sx={{
                                    paddingRight: '20px',
                                    '& .MuiFormHelperText-root': {
                                        color: errors['EconomyClass'] ? 'red' : 'inherit',
                                    },
                                }}
                            />
                            <TextField
                                name="PremiumClass"
                                label="Giá vé người lớn Premium Class"
                                variant="outlined"
                                margin="normal"
                                value={data.PremiumClass.PriceAdult}
                                helperText={errors['PremiumClass'] || ''}
                                onChange={handleChangeSpecial}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                        color: errors['PremiumClass'] ? 'red' : 'inherit',
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                name="BusinessClass"
                                label="Giá vé người lớn Business Class"
                                variant="outlined"
                                margin="normal"
                                value={data.BusinessClass.PriceAdult}
                                helperText={errors['BusinessClass'] || ''}
                                onChange={handleChangeSpecial}
                                sx={{
                                    paddingRight: '20px',
                                    '& .MuiFormHelperText-root': {
                                        color: errors['BusinessClass'] ? 'red' : 'inherit',
                                    },
                                }}
                            />
                            <TextField
                                name="FirstClass"
                                label="Giá vé người lớn First Class"
                                variant="outlined"
                                margin="normal"
                                value={data.FirstClass.PriceAdult}
                                helperText={errors['FirstClass'] || ''}
                                onChange={handleChangeSpecial}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                        color: errors['FirstClass'] ? 'red' : 'inherit',
                                    },
                                }}
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
                                    minDateTime={dayjs()}
                                    slotProps={{
                                        textField: {
                                            helperText: errors['FlightTime'] || '',
                                        },
                                    }}
                                    onChange={(newValue) => {
                                        setData({ ...data, FlightTime: newValue });
                                        handleChangeDate('FlightTime', newValue);
                                    }}
                                    sx={{
                                        '& .MuiFormHelperText-root': {
                                            color: errors['FlightTime'] ? 'red' : 'inherit',
                                        },
                                    }}
                                    //onChange={(newValue) => handleChangeDate('FlightTime', newValue)}
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
                                    minDateTime={dayjs()}
                                    slotProps={{
                                        textField: {
                                            helperText: errors['LandingTime'] || '',
                                        },
                                    }}
                                    onChange={(newValue) => {
                                        setData({ ...data, LandingTime: newValue });
                                        handleChangeDate('LandingTime', newValue);
                                    }}
                                    sx={{
                                        '& .MuiFormHelperText-root': {
                                            color: errors['LandingTime'] ? 'red' : 'inherit',
                                        },
                                    }}
                                    //onChange={(newValue) => handleChangeDate('FlightTime', newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
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

export const EditFlight = ({ row, open, setOpen, handleClose, onUpdate, setReRender }) => {
    console.log(row);

    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const newErrors = { ...errors };

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData({ ...data, [name]: value });
        if (value.trim() === '') {
            newErrors[name] = 'Trường này không được bỏ trống';
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };
    const handleChangeSpecial = (e) => {
        console.log('hehe');
        const value = e.target.value;
        const name = e.target.name;
        setData({
            ...data,
            [name]: {
                PriceAdult: value,
            },
        });
        if (value.trim() === '') {
            newErrors[name] = 'Trường này không được bỏ trống';
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };
    const validate = () => {
        if (data.FlightNumber.trim() === '') {
            newErrors['FlightNumber'] = 'Trường này không được bỏ trống';
        }
        if (!CheckNumber(data.EconomyClass.PriceAdult)) {
            newErrors['EconomyClass'] = 'Trường này phải là số';
        } else if (typeof data.EconomyClass.PriceAdult === 'string' && data.EconomyClass.PriceAdult.trim() === '') {
            newErrors['EconomyClass'] = 'Trường này không được bỏ trống';
        }

        if (!CheckNumber(data.PremiumClass.PriceAdult)) {
            newErrors['PremiumClass'] = 'Trường này phải là số';
        } else if (typeof data.PremiumClass.PriceAdult === 'string' && data.PremiumClass.PriceAdult.trim() === '') {
            newErrors['PremiumClass'] = 'Trường này không được bỏ trống';
        }

        if (!CheckNumber(data.BusinessClass.PriceAdult)) {
            newErrors['BusinessClass'] = 'Trường này phải là số';
        } else if (typeof data.BusinessClass.PriceAdult === 'string' && data.BusinessClass.PriceAdult.trim() === '') {
            newErrors['BusinessClass'] = 'Trường này không được bỏ trống';
        }

        if (!CheckNumber(data.FirstClass.PriceAdult)) {
            newErrors['FirstClass'] = 'Trường này phải là số';
        } else if (typeof data.FirstClass.PriceAdult === 'string' && data.FirstClass.PriceAdult.trim() === '') {
            newErrors['FirstClass'] = 'Trường này không được bỏ trống';
        }

        setErrors(newErrors);
    };

    const handleEdit = () => {
        validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        if (data) {
            axios
                .put(`http://localhost:4000/tickets/${row._id}`, {
                    FlightNumber: data.FlightNumber,
                    AirlineCode: data.AirlineCode,
                    AirportFrom: data.AirportFrom,
                    AirportTo: data.AirportTo,
                    FirstClass: {
                        PriceAdult: data.FirstClass.PriceAdult,
                    },
                    EconomyClass: {
                        PriceAdult: data.EconomyClass.PriceAdult,
                    },
                    BusinessClass: {
                        PriceAdult: data.BusinessClass.PriceAdult,
                    },
                    PremiumClass: {
                        PriceAdult: data.PremiumClass.PriceAdult,
                    },

                    FlightTime: data.FlightTime,
                    LandingTime: data.LandingTime,
                    // DateGo: data.FlightTime.toISOString(),
                    DateGo: FormatDateYMD(data.FlightTime),
                })
                .then((res) => {
                    console.log(res);

                    // setReRender(true);
                    onUpdate();
                    toast.success('Cập nhật thông tin chuyến bay thành công');
                    setOpen(false);
                })
                .catch((res) => {
                    console.log(res);
                    console.log(res.response.data.message);

                    toast.error(`${Object.keys(res.response.data.message.keyPattern)[0]} đã tồn tại`);
                });
        }

        // console.log('hello babay');
        // console.log(data);
    };

    useEffect(() => {
        console.log(row);

        if (row) {
            setData({
                FlightNumber: row.FlightNumber,
                AirlineCode: row.AirlineCode,
                AirportFrom: row.AirportFrom,
                AirportTo: row.AirportTo,
                FirstClass: {
                    PriceAdult: row.FirstClass?.PriceAdult || undefined,
                },
                EconomyClass: {
                    PriceAdult: row.EconomyClass?.PriceAdult || undefined,
                },
                BusinessClass: {
                    PriceAdult: row.BusinessClass?.PriceAdult || undefined,
                },
                PremiumClass: {
                    PriceAdult: row.PremiumClass?.PriceAdult || undefined,
                },

                FlightTime: row.FlightTime,
                LandingTime: row.LandingTime,
                // DateGo: row.FlightTime.toISOString(),
                DateGo: FormatDateYMD(row.FlightTime),
                //DayOfBirth: row.DayOfBirth,
            });
        }
    }, [row]);

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Cập nhật thông tin chuyến bay</DialogTitle>
                <DialogContent>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <TextField
                                name="AirlineCode"
                                select
                                label="Mã máy bay"
                                defaultValue={row.AirlineCode}
                                value={data.AirlineCode}
                                onChange={handleChange}
                                sx={{ width: '223px', marginRight: '20px' }}
                                margin="normal"
                            >
                                {selectAirCode.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                name="FlightNumber"
                                label="Mã chuyến bay"
                                variant="outlined"
                                margin="normal"
                                value={data.FlightNumber}
                                onChange={handleChange}
                                helperText={errors['FlightNumber'] || ''}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                        color: errors['FlightNumber'] ? 'red' : 'inherit',
                                    },
                                }}
                            />
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
                                name="EconomyClass"
                                label="Giá vé người lớn Economy Class"
                                variant="outlined"
                                margin="normal"
                                value={data.EconomyClass?.PriceAdult || undefined}
                                helperText={errors['EconomyClass'] || ''}
                                onChange={handleChangeSpecial}
                                sx={{
                                    paddingRight: '20px',
                                    '& .MuiFormHelperText-root': {
                                        color: errors['EconomyClass'] ? 'red' : 'inherit',
                                    },
                                }}
                            />
                            <TextField
                                name="PremiumClass"
                                label="Giá vé người lớn Premium Class"
                                variant="outlined"
                                margin="normal"
                                value={data.PremiumClass?.PriceAdult || undefined}
                                helperText={errors['PremiumClass'] || ''}
                                onChange={handleChangeSpecial}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                        color: errors['PremiumClass'] ? 'red' : 'inherit',
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                name="BusinessClass"
                                label="Giá vé người lớn Business Class"
                                variant="outlined"
                                margin="normal"
                                value={data.BusinessClass?.PriceAdult || undefined}
                                helperText={errors['BusinessClass'] || ''}
                                onChange={handleChangeSpecial}
                                sx={{
                                    paddingRight: '20px',
                                    '& .MuiFormHelperText-root': {
                                        color: errors['BusinessClass'] ? 'red' : 'inherit',
                                    },
                                }}
                            />
                            <TextField
                                name="FirstClass"
                                label="Giá vé người lớn First Class"
                                variant="outlined"
                                margin="normal"
                                value={data.FirstClass?.PriceAdult || undefined}
                                helperText={errors['FirstClass'] || ''}
                                onChange={handleChangeSpecial}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                        color: errors['FirstClass'] ? 'red' : 'inherit',
                                    },
                                }}
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
                                    minDateTime={dayjs()}
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
                                    minDateTime={dayjs()}
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
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastCustom />
        </React.Fragment>
    );
};
