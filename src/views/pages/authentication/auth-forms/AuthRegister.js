import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Formsy from "formsy-react";
import { address } from 'assets/address';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Divider,
    FormControl,
    InputAdornment,
    IconButton,
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
import * as actionsCustomer from "actions/customer.action"
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { useLocation, useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialFieldValues = {
    diaChi: "",
    matKhau: "",
    ho: "",
    ten: "",
    dienThoai: "",
    taiKhoan: "",
    email: "",
    quyen: 1,
    trangthai: 1,
    cmnd: "",
    quocTich: "Viet Nam",
    diaChi: "",
    city: "",
    district: "",
    ward: ""
};

const FirebaseRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const listCus = useSelector((state) => state.customer.customers);
    const [listCusCompare, setListCuscompare] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [age, setAge] = useState('');

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    function handleClick() {
        setLoading(true);
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    useEffect(() => {
        dispatch(actionsCustomer.fetchAllCustomer());
    }, [])

    useEffect(() => {
        if (listCus) {
            setListCuscompare(listCus)
        }
    }, [listCus])

    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])
    const handleChange = (event) => {
        setAge(event.target.value);
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
        if ("cmnd" in fieldValues) {
            let err = 0;
            listCusCompare.map((user) => {
                if (
                    user.cmnd.toLowerCase() === fieldValues.cmnd.toLowerCase() && user.taiKhoanid !== null
                ) {
                    err = err + 1;
                }
            });
            if (fieldValues.cmnd === "") {
                temp.cmnd = fieldValues.cmnd ? "" : "Số chứng minh nhân dân hoặc căn cước công dân không được để trống";
            }
            if (fieldValues.cmnd !== "") {
                temp.cmnd = /^[0-9]\w{8,12}$/.test(fieldValues.cmnd)
                    ? ""
                    : "Số chứng minh nhân dân hoặc căn cước công dân là số chỉ 9 hoặc 12 kí tự";
            }
            if (err >= 1) {
                err < 1
                    ? (temp.cmnd = "")
                    : (temp.cmnd = "Số chứng minh nhân dân hoặc căn cước công dân này đã tồn tại");
            }
        }
        if ("dienThoai" in fieldValues) {
            let err = 0;
            listCusCompare.map((user) => {
                if (
                    user.dienThoai.toLowerCase() === fieldValues.dienThoai.toLowerCase() && user.taiKhoanid !== null
                ) {
                    err = err + 1;
                }
            });
            if (fieldValues.dienThoai === "") {
                temp.dienThoai = fieldValues.dienThoai ? "" : "Số điện thoại không được để trống";
            }
            if (fieldValues.dienThoai !== "") {
                temp.dienThoai = /^[0-9]\w{9,11}$/.test(fieldValues.dienThoai)
                    ? ""
                    : "Số điện thoại chỉ chứ 10 hoặc 11 chữ số";
            }
            if (err >= 1) {
                err < 1
                    ? (temp.dienThoai = "")
                    : (temp.dienThoai = "Số điện thoại này đã được sử dụng");
            }
        }
        if ("email" in fieldValues) {
            let err = 0;
            listCusCompare.map((user) => {
                if (
                    user.email.toLowerCase() === fieldValues.email.toLowerCase() && user.taiKhoanid !== null
                ) {
                    err = err + 1;
                }
            });
            if (fieldValues.email === "") {
                temp.email = fieldValues.email ? "" : "Email không được để trống";
            }
            if (fieldValues.email !== "") {
                temp.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValues.email)
                    ? ""
                    : "Định dạng email không đúng";
            }
            if (err >= 1) {
                err < 1
                    ? (temp.email = "")
                    : (temp.email = "Email này đã tồn tại");
            }
        }
        if ("ho" in fieldValues) {
            if (fieldValues.ho === "") {
                temp.ho = fieldValues.ho ? "" : "Họ không được để trống";
            }
            if (fieldValues.ho !== "") {
                temp.ho =
                    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
                        fieldValues.ho
                    )
                        ? ""
                        : "Vui lòng không nhập số hay kí tự đặc biệt";
            }
        }
        if ("ten" in fieldValues) {
            if (fieldValues.ten === "") {
                temp.ten = fieldValues.ten ? "" : "Tên không được để trống";
            }
            if (fieldValues.ten !== "") {
                temp.ten =
                    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
                        fieldValues.ten
                    )
                        ? ""
                        : "Vui lòng không nhập số hay kí tự đặc biệt";
            }
        }

        if ("matKhau" in fieldValues) {
            if (fieldValues.matKhau === "") {
                temp.matKhau = fieldValues.matKhau ? "" : "Mật khẩu không được để trống";
            }
            if (fieldValues.matKhau !== "") {
                temp.matKhau = /^[A-Za-z0-9!@#$%^&*]{6,20}$/.test(fieldValues.matKhau)
                    ? ""
                    : "Mật khẩu phải là 6 đến 20 kí tự gao bồm từ A-Z, 1-9 ";
            }
        }


        setErrors({
            ...temp,
        });

        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFieldValues, validate, 0);

    const handleSubmit = (e) => {
        if (validate()) {
            let accountRegister = {
                taiKhoan: dienThoai,
                matKhau: values.matKhau,
                quyen: 1,
                trangThai: 1
            }
            actions.register(accountRegister).then((res) => {
                let customer = listCusCompare.find(({ cmnd }) => cmnd === values.cmnd)
                if (customer !== undefined) {
                    if (customer.taiKhoanid === null) {
                        values.id = customer.id
                        values.diaChi = JSON.stringify({
                            diaChi: values.diaChi,
                            city: values.city,
                            district: values.district,
                            ward: values.ward
                        })
                        values.taiKhoanid = {
                            id: res.data.id
                        }
                        actionsCustomer.register(values).then((response) => {
                            console.log(response)
                        })
                    }
                } else {
                    values.taiKhoanid = {
                        id: res.data.id
                    }
                    actionsCustomer.addCustomer(values).then((response) => {
                        console.log(response)
                    })
                }
            }
            ).catch((err) => console.log(err));

            handleClick();
            setTimeout(() => {
                setOpen(true)
            }, 3000)
            setTimeout(() => {
                navigate("/login");
            }, 6000)
        }
    };
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                {/* <Grid item xs={12}>
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
                </Grid> */}
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Đăng kí với địa chỉ Email</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formsy onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            m={2} pt={3}
                            fullWidth
                            id="first-name"
                            label="Họ *"
                            name="ho"
                            variant="outlined"
                            value={values.ho}
                            onChange={handleInputChange}
                            {...(errors.ho && {
                                error: true,
                                helperText: errors.ho,
                            })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="last-name"
                            label="Tên *"
                            name="ten"
                            variant="outlined"
                            fullWidth
                            value={values.ten}
                            onChange={handleInputChange}
                            {...(errors.ten && { error: true, helperText: errors.ten })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="cmnd *"
                            label="CMND/CCCD"
                            name="cmnd"
                            variant="outlined"
                            fullWidth
                            value={values.cmnd}
                            onChange={handleInputChange}
                            {...(errors.cmnd && { error: true, helperText: errors.cmnd })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="age"
                            label="Số điện thoại *"
                            variant="outlined"
                            name="dienThoai"
                            type="text"
                            fullWidth
                            value={values.dienThoai}
                            onChange={handleInputChange}
                            {...(errors.dienThoai && { error: true, helperText: errors.dienThoai })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="email"
                            label="Email *"
                            name="email"
                            variant="outlined"
                            fullWidth
                            value={values.email}
                            onChange={handleInputChange}
                            {...(errors.email && { error: true, helperText: errors.email })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tỉnh / Thành phố</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Tỉnh / Thành phố"
                                defaultValue={""}
                                name="city"
                                onChange={handleInputChange}
                            >
                                {
                                    address.map((a) => (
                                        <MenuItem key={a.id} value={a.name} onClick={() => getDistrict(a)}>{a.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Quận / Huyện</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Quận / Huyện"
                                defaultValue={""}
                                name="district"
                                onChange={handleInputChange}
                            >
                                {
                                    district.map((a) => (
                                        <MenuItem key={a.id} value={a.name} onClick={() => getWards(a)}>{a.name} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Xã / Phường</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Xã / Phường"
                                defaultValue={""}
                                name="ward"
                                onChange={handleInputChange}
                            >
                                {
                                    wards.map((a) => (
                                        <MenuItem key={a.id} value={a.prefix + " " + a.name} > {a.prefix + " " + a.name} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address"
                            label="Địa chỉ"
                            name="diaChi"
                            variant="outlined"
                            fullWidth
                            value={values.diaChi}
                            onChange={handleInputChange}
                        // {...(errors.address && { error: true, helperText: errors.address })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            label="Mật khẩu *"
                            fullWidth
                            name="matKhau"
                            value={values.matKhau}
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleInputChange}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>

                            }}

                            // variant="outlined"
                            {...(errors.matKhau && { error: true, helperText: errors.matKhau })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            loadingPosition="start"
                            fullWidth
                            loading={loading}
                        >
                            Đăng ký
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Formsy >
            <Dialog
                open={open}
                maxWidth={'xs'}
                fullWidth={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CheckCircleTwoToneIcon color='success' sx={{ fontSize: 70 }} />
                    <span style={{ fontSize: 18, fontWeight: 'bold' }}>Tạo tài khoản thành công</span>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FirebaseRegister;
