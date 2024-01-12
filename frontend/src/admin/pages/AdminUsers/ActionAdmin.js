import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { FormatDate } from '../../../function/FormatDate';

import { toast } from 'react-toastify';
import ToastCustom from '../../../Toast';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import FormHelperText from '@mui/material/FormHelperText';

export const AddAdmin = ({ open, handleClose, reRender, setReRender }) => {
    const [data, setData] = useState({
        AccountName: '',
        Password: '',
        Name: '',
        DayOfBirth: null,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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

    console.log(errors);
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
        if (data.AccountName.trim() === '') {
            newErrors['AccountName'] = 'Trường này không được bỏ trống';
        }

        if (data.Name.trim() === '') {
            newErrors['Name'] = 'Trường này không được bỏ trống';
        }
        if (data.Password.trim() === '') {
            newErrors['Password'] = 'Trường này không được bỏ trống';
        }
        if (data.DayOfBirth === null) {
            newErrors['DayOfBirth'] = 'Trường này không được bỏ trống';
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
                .post('http://localhost:4000/login/addAmin', {
                    AccountName: data.AccountName,
                    Password: data.Password,
                    Name: data.Name,
                    DayOfBirth: FormatDate(data.DayOfBirth),
                })
                .then((res) => {
                    console.log(res);

                    setData({
                        AccountName: '',
                        Password: '',
                        Name: '',
                        DayOfBirth: null,
                    });

                    setReRender(true);
                    toast.success('Thêm Admin thành công');
                })
                .catch((res) => {
                    console.log(res);
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
                <DialogTitle id="alert-dialog-title">Thêm thông tin Admin</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="AccountName"
                            label="Tên tài khoản"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={data.AccountName}
                            onChange={handleChange}
                            helperText={errors['AccountName'] || ''}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    color: errors['AccountName'] ? 'red' : 'inherit',
                                },
                            }}
                        />
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                name="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.Password}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                // helperText={errors['Password'] || ''}
                                // sx={{
                                //     '& .MuiFormHelperText-root': {
                                //         color: 'red',
                                //     },
                                // }}
                            />
                            <FormHelperText sx={{ color: 'red' }}>{errors['Password'] || ''}</FormHelperText>
                        </FormControl>
                        <TextField
                            name="Name"
                            label="Họ và tên"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={data.Name}
                            onChange={handleChange}
                            helperText={errors['Name'] || ''}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    color: errors['Name'] ? 'red' : 'inherit',
                                },
                            }}
                        />
                        <div className="date">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['Ngày sinh']}>
                                    <DatePicker
                                        label="Ngày sinh"
                                        format="DD/MM/YYYY"
                                        name="DayOfBirth"
                                        value={data.DayOfBirth}
                                        maxDate={dayjs()}
                                        // onChange={(date) => handleChangeDate(date)}
                                        onChange={(newValue) => {
                                            setData({ ...data, DayOfBirth: newValue });
                                            handleChangeDate('DayOfBirth', newValue);
                                        }}
                                        slotProps={{
                                            textField: {
                                                helperText: errors['DayOfBirth'] || '',
                                            },
                                        }}
                                        sx={{
                                            '& .MuiFormHelperText-root': {
                                                color: errors['DayOfBirth'] ? 'red' : 'inherit',
                                            },
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

export const EditAdmin = ({ row, open, setOpen, handleClose, reRender, setReRender }) => {
    const [data, setData] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
    const handleChangeDate = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        console.log(formattedDate);
        setData({ ...data, DayOfBirth: formattedDate });
    };
    const validate = () => {
        if (data.AccountName.trim() === '') {
            newErrors['AccountName'] = 'Trường này không được bỏ trống';
        }
        if (data.Name.trim() === '') {
            newErrors['Name'] = 'Trường này không được bỏ trống';
        }
        if (data.Password.trim() === '') {
            newErrors['Password'] = 'Trường này không được bỏ trống';
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
                .put(`http://localhost:4000/login/${row._id}`, {
                    AccountName: data.AccountName,
                    Password: data.Password,
                    Name: data.Name,
                    DayOfBirth: FormatDate(data.DayOfBirth),
                })
                .then((res) => {
                    console.log(res);

                    setReRender(true);
                    toast.success('Cập nhật Admin thành công');
                    setOpen(false);
                })
                .catch((res) => {
                    console.log(res);
                    toast.error(`${Object.keys(res.response.data.message.keyPattern)[0]} đã tồn tại`);
                });
        }
        console.log('hello babay');
        console.log(data);
    };

    useEffect(() => {
        setData({
            AccountName: row.AccountName,
            Password: row.Password,
            Name: row.Name,
            DayOfBirth: row.DayOfBirth,
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
                <DialogTitle id="alert-dialog-title">Cập nhật thông tin Admin</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="AccountName"
                            label="Tên tài khoản"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={data.AccountName}
                            onChange={handleChange}
                            helperText={errors['AccountName'] || ''}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    color: errors['AccountName'] ? 'red' : 'inherit',
                                },
                            }}
                        />
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                name="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.Password}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText sx={{ color: 'red' }}>{errors['Password'] || ''}</FormHelperText>
                        </FormControl>
                        <TextField
                            name="Name"
                            label="Họ và tên"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={data.Name}
                            onChange={handleChange}
                            helperText={errors['Name'] || ''}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    color: errors['Name'] ? 'red' : 'inherit',
                                },
                            }}
                        />
                        <div className="date">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['Ngày sinh']}>
                                    <DatePicker
                                        label="Ngày sinh"
                                        format="DD/MM/YYYY"
                                        name="DayOfBirth"
                                        // value={data.DayOfBirth}
                                        maxDate={dayjs()}
                                        defaultValue={dayjs(row.DayOfBirth)}
                                        value={data.DayOfBirth ? dayjs(data.DayOfBirth) : null}
                                        onChange={(date) => handleChangeDate(date)}
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
