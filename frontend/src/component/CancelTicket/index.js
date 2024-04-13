import Header from '../DefaultPage/Header';
import classNames from 'classnames/bind';
import styles from './CancelTicket.module.scss';

import { useState } from 'react';

import { toast } from 'react-toastify';
import ToastCustom from '../../Toast';
import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';

import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';

import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const cx = classNames.bind(styles);

function CancelTicket() {
    const selectCustomer = [
        {
            value: 'Adult',
            label: 'Người lớn',
        },
        {
            value: 'Children',
            label: 'Trẻ em',
        },
        {
            value: 'Baby',
            label: 'Em bé',
        },
    ];

    const [data, setData] = useState({
        Customer: 'Adult',
        TypeFlight: 'Oneway',
        CodeTicket: '',
        Email: '',
        Phone: '',
        ID_Info: '',
    });

    const [errors, setErrors] = useState({});
    const newErrors = { ...errors };

    const extractText = (str) => {
        const match = str.match(/[a-zA-Z]+/);
        if (match) {
            return match[0];
        }
        return '';
    };

    const handleChangeCommon = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setData({ ...data, [name]: value });

        console.log('ngu mnguoi', name, value);

        if (value.trim() === '') {
            newErrors[name] = 'Trường này không được bỏ trống';
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };

    const handleChangeAdult = (e) => {
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
    const handleChangeAnother = (e) => {
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
    const handleClear = () => {
        // toast.warning('Yêu cầu của quý khách đang trong quá trình xử lý, vui lòng chờ đợi');

        setData({
            Customer: 'Adult',
            TypeFlight: 'Oneway',
            CodeTicket: '',
            Email: '',
            Phone: '',
            ID_Info: '',
        });
    };

    const handleClearChangeCustomer = (e) => {
        if (
            (data.Customer === 'Adult' && e.target.value !== 'Adult') ||
            (data.Customer !== 'Adult' && e.target.value === 'Adult')
        ) {
            setData({
                CodeTicket: '',
                Email: '',
                Phone: '',
                TypeFlight: 'Oneway',
                Customer: e.target.value,
            });
        } else handleChangeCommon(e);
    };

    let user;
    const handleCancel = async () => {
        if (data.Customer === 'Adult') {
            validateAdult();
            console.log('cahy vao day chu');
        } else {
            validateAnother();
            console.log('thuc thi naty');
            user = await fetchAPIUser(data);
        }

        console.log('xem loi', errors);
        console.log('xem du luieu', user);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        console.log('Lấy data:', data);
        let fetchResult;
        try {
            fetchResult = await fetchAPICheck(data);
            console.log('id ne con', fetchResult);
        } catch (error) {
            console.error(error);
        }

        let fetchCheckExist;

        if (Object.keys(fetchResult).length === 0) {
            // fetchResut return is object not array, because not used !fetchResult to check have value ?
            toast.error('Thông tin không chính xác');
        } else {
            console.log('Type of fetchResult:', typeof fetchResult);
            console.log('Value of fetchResult:', !fetchResult);

            if (!user && data.Customer !== 'Adult') {
                console.log('Deo thuc thiu pahir ko', user);
                toast.error('Thông tin không chính xác 2');

                return;
            }

            fetchCheckExist = await checkExist(data);

            let ID_Ticket;
            try {
                if (data.TypeFlight === 'Oneway' || data.TypeFlight === 'RoundtripGo') {
                    ID_Ticket = await getIDTicket(fetchResult[0].FlightNumber);
                    console.log('zo day', fetchResult[0].FlightNumber);
                } else if (data.TypeFlight === 'RoundtripReturn') {
                    ID_Ticket = await getIDTicket(fetchResult[0].FlightNumberReturn);
                    console.log('zo day ne', fetchResult[0].FlightNumberReturn);
                }
                console.log('Gia tri fetchResult:', fetchResult);
                console.log('id ne', ID_Ticket);
            } catch (error) {
                console.error(error);
            }

            if (fetchCheckExist) {
                toast.warning('Yêu cầu của quý khách đang trong quá trình xử lý, vui lòng chờ đợi');
            } else {
                // toast.success('Yêu cầu hủy vé đã được gửi đi, sẽ có thông báo sau vài phút');

                const dataPost = {
                    Customer: data.Customer,
                    TypeFlight: data.TypeFlight,
                    CodeTicket: data.CodeTicket,
                    ID_Info: fetchResult[0]._id,
                    ID_Ticket: ID_Ticket,
                    FlightNumber: fetchResult[0].FlightNumber,
                    TypeTicket: fetchResult[0].TypeTicket,
                    CodeSeat: fetchResult[0].CodeSeat.trim(),
                };

                console.log('dataPost', dataPost);

                if (data.Email || user.Email) {
                    dataPost.Email = data.Email || user.Email;
                }
                if (data.Phone) {
                    dataPost.Phone = data.Phone;
                }
                if (data.TypeFlight === 'RoundtripGo' || data.TypeFlight === 'Oneway') {
                    dataPost.Company = extractText(fetchResult[0].FlightNumber);
                } else if (data.TypeFlight === 'RoundtripReturn') {
                    dataPost.Company = extractText(fetchResult[0].FlightNumberReturn);
                }

                if (data) {
                    axios
                        .post('http://localhost:4000/cancel', dataPost)
                        .then((res) => {
                            console.log(res);
                            toast.success('Yêu cầu hủy vé đã được gửi đi, sẽ có thông báo sau vài phút');
                            handleClear();
                        })
                        .catch((res) => {
                            console.log(res);
                            toast.error('Thông tin không chính xác 3');
                        });
                }
            }
        }
    };
    const fetchAPICheck = async (data) => {
        console.log('Type Flgiht ne', data.TypeFlight);
        let typeFlightNew = data.TypeFlight;
        if (data && data.TypeFlight && data.TypeFlight.includes('Roundtrip')) typeFlightNew = 'Roundtrip';
        try {
            let response = await fetch(
                `http://localhost:4000/info/search/fetchAPICancelInfoTicket?CodeTicket=${data.CodeTicket}&TypeFlight=${typeFlightNew}`,
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            console.log(data1);

            return data1.data;
            // }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAPIUser = async (data) => {
        console.log(data);
        try {
            let response = await fetch(`http://localhost:4000/users/search/getUserEqualPhone?Phone=${data.Phone}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            console.log('In du lieu ra kiem tra', data1.data.Email);

            return data1.data;
        } catch (error) {
            console.error(error);
        }
    };

    const checkExist = async (data) => {
        console.log(data);
        try {
            let response = await fetch(
                `http://localhost:4000/cancel/getCancel?Customer=${data.Customer}&CodeTicket=${data.CodeTicket}`,
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            // console.log(data1.data);

            return data1.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getIDTicket = async (flightNumber) => {
        try {
            let response = await fetch(
                `http://localhost:4000/tickets/search/getTicketByFlightNumber?FlightNumber=${flightNumber}`,
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            console.log('in ra cho bo m', data1.data);
            console.log('in ra cho bo m flightNumber', flightNumber);

            console.log('in ra cho bo m ngay va lyon', data1.data[0]._id);

            return data1.data[0]._id;
        } catch (error) {
            console.error(error);
        }
    };

    const validateAdult = () => {
        if (data.CodeTicket.trim() === '') {
            newErrors['CodeTicket'] = 'Trường này không được bỏ trống';
        }

        if (data.Email.trim() === '') {
            newErrors['Email'] = 'Trường này không được bỏ trống';
        }
    };

    const validateAnother = () => {
        if (data.CodeTicket.trim() === '') {
            newErrors['CodeTicket'] = 'Trường này không được bỏ trống';
        }

        if (data.Phone.trim() === '') {
            newErrors['Phone'] = 'Trường này không được bỏ trống';
        }
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <Header />

                <div className={cx('content')}>
                    <div>
                        <TextField
                            name="Customer"
                            select
                            label="Khách hàng"
                            value={data.Customer}
                            onChange={(e) => {
                                handleClearChangeCustomer(e);
                                // handleChangeCommon(e);
                            }}
                            sx={{ width: '300px', marginRight: '20px' }}
                            margin="normal"
                        >
                            {selectCustomer.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <FormControl sx={{ width: 300 }} margin="normal">
                            <InputLabel htmlFor="grouped-select">Loại chuyến bay</InputLabel>
                            <Select
                                defaultValue="Oneway"
                                id="grouped-select"
                                label="Loại chuyến bay"
                                value={data.TypeFlight}
                                onChange={handleChangeCommon}
                                name="TypeFlight"
                            >
                                <ListSubheader>Một chiều</ListSubheader>
                                <MenuItem value="Oneway">Một chiều</MenuItem>

                                <ListSubheader>Khứ hồi</ListSubheader>
                                <MenuItem value="RoundtripGo">Chuyến đi</MenuItem>
                                <MenuItem value="RoundtripReturn">Chuyến về</MenuItem>
                                {/* <MenuItem value="RoundtripAll">Cả chuyến đi và về</MenuItem> */}
                            </Select>
                        </FormControl>
                    </div>

                    <TextField
                        name="CodeTicket"
                        label="Mã vé"
                        variant="outlined"
                        margin="normal"
                        value={data.CodeTicket}
                        helperText={errors['CodeTicket'] || ''}
                        onChange={handleChangeCommon}
                        sx={{
                            width: '300px',
                            marginRight: '20px',
                            '& .MuiFormHelperText-root': {
                                color: errors['CodeTicket'] ? 'red' : 'inherit',
                            },
                        }}
                    />
                    {data.Customer === 'Adult' && (
                        <TextField
                            name="Email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={data.Email}
                            helperText={errors['Email'] || ''}
                            onChange={handleChangeAdult}
                            sx={{
                                width: '300px',
                                marginRight: '20px',
                                '& .MuiFormHelperText-root': {
                                    color: errors['Email'] ? 'red' : 'inherit',
                                },
                            }}
                        />
                    )}

                    {data.Customer !== 'Adult' && (
                        <TextField
                            name="Phone"
                            label="Số điện thoại người giám hộ"
                            variant="outlined"
                            margin="normal"
                            value={data.Phone}
                            helperText={errors['Phone'] || ''}
                            onChange={handleChangeAnother}
                            sx={{
                                width: '300px',
                                '& .MuiFormHelperText-root': {
                                    color: errors['Phone'] ? 'red' : 'inherit',
                                },
                            }}
                        />
                    )}
                </div>

                <div className={cx('button')}>
                    <Button variant="outlined" sx={{ fontWeight: 600, marginRight: '30px' }} onClick={handleClear}>
                        <CleaningServicesIcon sx={{ marginRight: '10px' }} />
                        Xóa bỏ
                    </Button>
                    <Button variant="outlined" color="error" sx={{ fontWeight: 600 }} onClick={handleCancel}>
                        <CancelIcon sx={{ marginRight: '10px' }} />
                        Hủy vé
                    </Button>
                </div>
                <ToastCustom />
            </div>
        </>
    );
}

export default CancelTicket;
