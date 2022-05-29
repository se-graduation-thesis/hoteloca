import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import SendIcon from '@mui/icons-material/Send';

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
    TextField,
    Typography
} from '@mui/material';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// project imports
import useForm from "./useForm";

import * as actions from "actions/account.action"
import * as actionsCustomer from "actions/customer.action"
import LoadingButton from '@mui/lab/LoadingButton';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { useLocation, useNavigate } from 'react-router';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DangerousTwoToneIcon from '@mui/icons-material/DangerousTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AuthForgetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const [age, setAge] = useState('');
    const [registerComponent, setRegisterComponent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [otp, setOTP] = useState("");
    const [phoneF, setPhoneF] = useState('')
    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [phoneErr, setPhoneErr] = useState('')
    const handleClose = () => {
        setOpen(false);
        setOpen1(false)
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    function handleClick() {
        setLoading(true);
    }
    function handleClick1() {
        setLoading1(true);
    }

    const handleSubmit = (e) => {
        if (phoneErr === "") {
            handleClick()
            setTimeout(() => {
                setRegisterComponent(1);
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
        const phoneNumber = "+84" + phoneF;
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
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                handleClick1()
                setTimeout(() => {
                    setRegisterComponent(2)
                }, 5000);
            })
            .catch((error) => {
                setOpen1(true)
                console.log(error)
            });
    };
    const handleChangePhone = (va) => {
        setPhoneF(va)
        let err = /^[0-9]\w{9,11}$/.test(va)
            ? ""
            : "Số điện thoại chỉ chứ 10 hoặc 11 chữ số";
        setPhoneErr(err)
    }

    const handleChangePassword = (va) => {
        setPassword(va)
        let err = /^[A-Za-z0-9!@#$%^&*]{6,20}$/.test(va)
            ? ""
            : "Mật khẩu phải là 6 đến 20 kí tự gao bồm từ A-Z, 1-9 "
        setPasswordErr(err)
    }
    const onSubmitForgotPassword = () => {
        if (passwordErr === "") {
            setLoading2(true)
            let acc = {
                taiKhoan: phoneF,
                matKhau: password
            }
            actions.forget(acc).then((res) => {
                console.log(res)
            })
            setTimeout(() => {
                setOpen(true)
            }, 3000)
            setTimeout(() => {
                navigate("/login")
            }, 4000)
        }
    }
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Quên mật khẩu</Typography>
                    </Box>
                </Grid>
            </Grid>
            <div id="sign-in-button"></div>
            {
                registerComponent === 0 ?
                    <Formsy onSubmit={handleSubmit} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <p>Vui lòng nhập số điện thoại để nhận mã xác nhận</p>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    m={2} pt={3}
                                    fullWidth
                                    id="phone"
                                    label='Số điện thoại'
                                    name="ho"
                                    value={phoneF}
                                    onChange={(e) => handleChangePhone(e.target.value)}
                                    variant="outlined"
                                    {...(phoneErr && {
                                        error: true,
                                        helperText: phoneErr,
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    loadingPosition="start"
                                    startIcon={<SendIcon />}
                                    fullWidth
                                    loading={loading}
                                >
                                    Gửi mã xác nhận
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Formsy > :
                    registerComponent === 1 ?
                        <>
                            <Alert variant="outlined" severity="success">
                                <AlertTitle>Mã OTP đã được gửi đến số điện thoại {phoneF}</AlertTitle>
                                Vui lòng kiểm tra tin nhắn gửi về
                            </Alert>
                            <br></br>
                            <form autoComplete="off" noValidate onSubmit={onSubmitOTP}>
                                <TextField
                                    fullWidth
                                    label="Nhập mã OTP"
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
                            </form> </> :
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    m={2} pt={3}
                                    fullWidth
                                    id="mk"
                                    label='Nhập mật khẩu mới'
                                    name="mk"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => handleChangePassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'}
                                    {...(passwordErr && {
                                        error: true,
                                        helperText: passwordErr,
                                    })}
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    size="large"
                                    variant="contained"
                                    color="secondary"
                                    loadingPosition="start"
                                    startIcon={<SendIcon />}
                                    fullWidth
                                    loading={loading2}
                                    onClick={onSubmitForgotPassword}
                                >
                                    Xác nhận
                                </LoadingButton>
                            </Grid>
                        </Grid>
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

export default AuthForgetPassword;
