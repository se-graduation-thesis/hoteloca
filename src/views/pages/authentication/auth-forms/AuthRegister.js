import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Formsy from "formsy-react";
import { address } from 'assets/address';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';


// project imports
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useForm from "./useForm";

import * as actions from "actions/account.action"
// assets

// ===========================|| FIREBASE - REGISTER ||=========================== //

const initialFieldValues = {
    diaChi: "",
    matKhau: "",
    hoNguoidung: "",
    tenNguoidung: "",
    soDienThoai: "",
    taiKhoan: "",
    email: "",
    quyen: 1
};

const FirebaseRegister = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [age, setAge] = useState('');
    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])
    const handleChange = (event) => {
        setAge(event.target.value);
        console.log(event.target.value)
    };

    const googleHandler = async () => {
        console.error('Register');
    };

    const getDistrict = (a) => {
        setDistrict(a.districts)
        setWards([])
    }
    const getWards = (a) => {
        setWards(a.wards)
    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("username" in fieldValues) {
            let err = 0;
            user.map((user) => {
                if (
                    user.username.toLowerCase() === fieldValues.username.toLowerCase()
                ) {
                    err = err + 1;
                }
            });
            if (fieldValues.username === "") {
                temp.username = fieldValues.username ? "" : "Username is required.";
            }
            if (fieldValues.username !== "") {
                temp.username = /^[A-Za-z1-9]\w{5,14}$/.test(fieldValues.username)
                    ? ""
                    : "Username must be at least 6 and at most 15 characters without any special characters";
            }
            if (err >= 1) {
                err < 1
                    ? (temp.username = "")
                    : (temp.username = "Username is existed");
            }
        }
        if ("lastName" in fieldValues) {
            if (fieldValues.lastName === "") {
                temp.lastName = fieldValues.lastName ? "" : "lastName is required.";
            }
            if (fieldValues.lastName !== "") {
                temp.lastName =
                    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
                        fieldValues.lastName
                    )
                        ? ""
                        : "lastName is not valid.";
            }
        }
        if ("firstName" in fieldValues) {
            if (fieldValues.firstName === "") {
                temp.firstName = fieldValues.firstName ? "" : "First is required.";
            }
            if (fieldValues.firstName !== "") {
                temp.firstName =
                    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
                        fieldValues.firstName
                    )
                        ? ""
                        : "firstName is not valid.";
            }
        }
        if ("address" in fieldValues) {
            temp.address = fieldValues.address ? "" : "First is required.";
        }
        if ("age" in fieldValues) {
            temp.age = fieldValues.age ? "" : "Age is required";
        }
        if ("password" in fieldValues)
            if (fieldValues.password === "") {
                temp.password = fieldValues.password ? "" : "Password is required.";
            }
        if (fieldValues.password !== "") {
            temp.password = /^[A-Za-z0-9!@#$%^&*]{6,20}$/.test(fieldValues.password)
                ? ""
                : "Password must be at least 6 and at most 15 characters";
        }
        if ("passwordconfirm" in fieldValues) {
            fieldValues.passwordconfirm == values.password
                ? (temp.passwordconfirm = "")
                : (temp.passwordconfirm = "Confirmation password does not match");
        }

        setErrors({
            ...temp,
        });

        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFieldValues, validate, 0);

    const handleSubmit = (e) => {
        // if (validate()) {
        values.quyen = 1
        actions.register(values).then((res) => {
            if (res) {
                const admin_account = values;
                admin_account.khachSanid = 1
                admin_account.taiKhoanid = {
                    id: res.data.id
                }
                actions.addAdmin(admin_account).then((response) => {
                    console.log(response)
                })
            }
        }
        ).catch((err) => console.log(err));
        //     alert.success("Register Successfull !!! Login now !");
        //     navigate("/login");
        // }
        // dispatch(actions.fetchAllAccount())
        console.log(values)
    };
    console.log(address)
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Đăng nhập với Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            Hoặc
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Đăng kí với địa chỉ Email</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formsy onSubmit={handleSubmit} >
                <p><b>Thông tin chung</b></p>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField
                            m={2} pt={3}
                            fullWidth
                            id="first-name"
                            label="Họ"
                            name="hoNguoidung"
                            variant="outlined"
                            helperText=" "
                            value={values.hoNguoidung}
                            onChange={handleInputChange}
                        // {...(errors.firstName && {
                        //     error: true,
                        //     helperText: errors.firstName,
                        // })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="last-name"
                            label="Tên"
                            name="tenNguoidung"
                            variant="outlined"
                            fullWidth
                            helperText=" "
                            value={values.tenNguoidung}
                            onChange={handleInputChange}
                        // {...(errors.lastName && { error: true, helperText: errors.lastName })}
                        />
                    </Grid>
                </Grid>



                <TextField
                    id="age"
                    label="Số điện thoại"
                    variant="outlined"
                    helperText=" "
                    name="soDienThoai"
                    type="text"
                    fullWidth
                    value={values.soDienThoai}
                    onChange={handleInputChange}
                // {...(errors.age && { error: true, helperText: errors.age })}
                />
                <TextField
                    id="address"
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    helperText=" "
                    value={values.email}
                    onChange={handleInputChange}
                // {...(errors.address && { error: true, helperText: errors.address })}
                />
                <TextField
                    id="address"
                    label="Địa chỉ"
                    name="diaChi"
                    variant="outlined"
                    fullWidth
                    helperText=" "
                    value={values.diaChi}
                    onChange={handleInputChange}
                // {...(errors.address && { error: true, helperText: errors.address })}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tỉnh / Thành phố</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Tỉnh / Thành phố"
                        onChange={handleChange}
                    >
                        {
                            address.map((a) => (
                                <MenuItem value={a.id} onClick={() => getDistrict(a)}>{a.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <div><br></br></div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Quận / Huyện</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Quận / Huyện"
                        onChange={handleChange}
                    >
                        {
                            district.map((a) => (
                                <MenuItem value={a.id} onClick={() => getWards(a)}>{a.name} </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <div><br></br></div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Xã / Phường</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Xã / Phường"
                        onChange={handleChange}
                    >
                        {
                            wards.map((a) => (
                                <MenuItem value={a.id} > {a.prefix + " " + a.name} </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <p><b>Thông tin tài khoản</b></p>
                <TextField
                    id="username"
                    label="Tên tài khoản"
                    variant="outlined"
                    fullWidth
                    helperText=" "
                    name="taiKhoan"
                    value={values.taiKhoan}
                    onChange={handleInputChange}
                // {...(errors.username && { error: true, helperText: errors.username })}
                />
                <TextField
                    id="password"
                    label="Mật khẩu"
                    fullWidth
                    name="matKhau"
                    value={values.matKhau}
                    type="password"
                    onChange={handleInputChange}
                    // variant="outlined"
                    helperText=" "
                // {...(errors.password && { error: true, helperText: errors.password })}
                />

                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="secondary"
                    type="submit"
                >
                    Đăng ký
                </Button>
            </Formsy >
        </>
    );
};

export default FirebaseRegister;
