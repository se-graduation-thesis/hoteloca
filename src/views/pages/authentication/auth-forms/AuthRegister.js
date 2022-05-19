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
import firebase from './firebase'
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DangerousTwoToneIcon from '@mui/icons-material/DangerousTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
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
    diaChi: "{}",
    city: "",
    district: "",
    ward: "",
    ngayThamGia: new Date,
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
    const [registerComponent, setRegisterComponent] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [otp, setOTP] = useState("");
    const handleClose = () => {
        setOpen(false);
        setOpen1(false)
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
                temp.cmnd = /^((\d{9})|(\d{12}))$/.test(fieldValues.cmnd)
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
                temp.dienThoai = /^[0-9]\w{8,11}$/.test(fieldValues.dienThoai)
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
            handleClick()
            setTimeout(() => {
                setRegisterComponent(false);
                onSignInSubmit(e);
            }, 8000);
        }
    };

    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "sign-in-button",
            {
                size: "invisible",
                callback: (response) => {
                    onSignInSubmit();
                    console.log("Recaptca varified");
                },
                defaultCountry: "IN",
            }
        );
    };
    const onSignInSubmit = (e) => {
        configureCaptcha();
        const phoneNumber = "+84" + values.dienThoai;
        const appVerifier = window.recaptchaVerifier;
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult)
                console.log("OTP đã gởi");
            })
            .catch((error) => {
                console.log(error)
            });
    };
    const onSubmitOTP = (e) => {
        e.preventDefault();
        const code = otp;
        console.log(code)
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                const user = result.user;
                let accountRegister = {
                    taiKhoan: values.dienThoai,
                    matKhau: values.matKhau,
                    quyen: 1,
                    trangThai: 1
                }
                console.log(user)
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
                            values.ngayThamGia = new Date()

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
                setLoading1(true)
                setTimeout(() => {
                    setOpen(true)
                }, 3000)
                setTimeout(() => {
                    navigate("/login");
                }, 6000)
            })
            .catch((error) => {
                setOpen1(true)
                console.log(error)
            });
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Đăng kí với địa chỉ Email</Typography>
                    </Box>
                </Grid>
            </Grid>
            <div id="sign-in-button"></div>
            {
                registerComponent ?

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
                                    startIcon={<AddCircleOutlineIcon />}
                                    fullWidth
                                    loading={loading}
                                >
                                    Đăng ký
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Formsy > :
                    <form autoComplete="off" noValidate onSubmit={onSubmitOTP}>
                        <TextField
                            fullWidth
                            label="OTP"
                            name="maOTP"
                            onChange={(e) => setOTP(e.target.value)}
                        />
                        <br></br>
                        <LoadingButton
                            style={{ marginTop: 20 }}
                            fullWidth
                            size="large"
                            type="submit"
                            color="secondary"
                            variant="contained"
                            startIcon={<CheckTwoToneIcon />}
                            loading={loading1}
                        >
                            Xác nhận
                        </LoadingButton>
                    </form>
            }

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
            <Dialog
                open={open1}
                maxWidth={'xs'}
                fullWidth={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DangerousTwoToneIcon color='error' sx={{ fontSize: 70 }} />
                    <span style={{ fontSize: 18, fontWeight: 'bold' }}>Mã xác thực OTP sai</span>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FirebaseRegister;
