import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import * as actions from 'actions/account.action';
import PositionedSnackbar from '../../components/PositionedSnackbar';


export default function UpdatePassword(props) {

    const userAuth = useSelector((state) => state.account.userAuth);
    const accountid = isJson(userAuth) ? JSON.parse(userAuth).account_id : userAuth.account_id;
    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const dispatch = useDispatch()

    const account = useSelector((state) => state.account.account);
    useEffect(() => {
        dispatch(actions.getById(accountid));
    }, [])

    const [error, setError] = useState({
        oldPassE: null,
        newPassE: null,
        confirmPassE: null,
    });

    const [oldPass, setOldPass] = useState({
        value: '',
        showPassword: false
    })

    const [newPass, setNewPass] = useState({
        value: '',
        showPassword: false
    })

    const [confirmPass, setConfirmPass] = useState({
        value: '',
        showPassword: false
    })

    const [snackbarState, setSnackbarState] = useState(false);

    const handleClose = () => {
        props.handleOpenPass(false);
    };

    const handleClickShowPassword = (type) => {

        if (type === 0) {
            setOldPass({ ...oldPass, showPassword: !oldPass.showPassword })
        } else if (type === 1) {
            setNewPass({ ...newPass, showPassword: !newPass.showPassword })
        } else {
            setConfirmPass({ ...confirmPass, showPassword: !confirmPass.showPassword })
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleCheckValidation = () => {
        const rePass = new RegExp(/^[A-Za-z0-9!@#$%^&*]{6,20}$/);

        let newPassE = null;
        let oldPassE = null;
        let confirmPassE = null;

        if (!rePass.test(newPass.value)) {
            newPassE = 'Mật khẩu phải là 6 đến 20 kí tự gao bồm từ A-Z, 1-9';
            setError({
                oldPassE,
                newPassE,
                confirmPassE
            })
            return false;
        }

        if (newPass.value !== confirmPass.value) {
            confirmPassE = 'Mật khẩu chưa trùng khớp';
            setError({
                oldPassE,
                newPassE,
                confirmPassE
            })
            return false;
        }

        if (!oldPass.value) {
            oldPassE = "mật khẩu không đúng"
            setError({
                oldPassE,
                newPassE,
                confirmPassE
            })
            return false;
        } else {
            console.log(account)
            let kt = actions.hashPass(account, oldPass.value).then((response) => {
                if (!response.data) {
                    oldPassE = "mật khẩu không đúng"
                    setError({
                        oldPassE,
                        newPassE,
                        confirmPassE
                    })
                    return false;
                } else {
                    setError({
                        oldPassE,
                        newPassE,
                        confirmPassE
                    })
                    return true;
                }
            }).catch((err) => {
                console.log(err);
                return false;
            }).then(data => {
                if (data)
                    submit()
                else
                    console.log(data)
            });
        }
        return true;
    }

    const reset = () => {
        setOldPass({ ...oldPass, value: '' })
        setNewPass({ ...newPass, value: '' })
        setConfirmPass({ ...confirmPass, value: '' })
    }

    const submit = () => {
        account.matKhau = newPass.value;
        dispatch(actions.resetPass(account))

        reset()
        handleClose()
        setSnackbarState(true);
        setTimeout(function () {
            setSnackbarState(false);
        }, 3000);


    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 18 }}>CẬP NHẬT MẬT KHẨU</DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText sx={{ fontSize: 18, color: 'black' }}>
                        Mật khẩu hiển tại
                    </DialogContentText>
                    <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                        <OutlinedInput
                            type={oldPass.showPassword ? 'text' : 'password'}
                            value={oldPass.value}
                            fullWidth
                            placeholder='Nhập mật khẩu hiện tại'
                            onChange={(e) => setOldPass({ ...oldPass, value: e.target.value })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword(0)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {oldPass.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <br />
                    {error.oldPassE && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.oldPassE}</span></>}

                    <DialogContentText sx={{ fontSize: 18, color: 'black', marginTop: 2 }}>
                        Mật khẩu mới
                    </DialogContentText>
                    <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                        <OutlinedInput
                            type={newPass.showPassword ? 'text' : 'password'}
                            value={newPass.value}
                            fullWidth
                            placeholder='Nhập mật khẩu mới'
                            onChange={(e) => setNewPass({ ...newPass, value: e.target.value })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword(1)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {newPass.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <br />
                    {error.newPassE && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.newPassE}</span></>}
                    {/* <p style={{ marginTop: -2 }}>Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</p> */}

                    <DialogContentText sx={{ fontSize: 18, color: 'black', marginTop: 2 }}>
                        Nhập lại mật khẩu mới
                    </DialogContentText>
                    <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                        <OutlinedInput
                            type={confirmPass.showPassword ? 'text' : 'password'}
                            value={confirmPass.value}
                            fullWidth
                            placeholder='Nhập lại mật khẩu mới'
                            onChange={(e) => setConfirmPass({ ...confirmPass, value: e.target.value })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword(2)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {confirmPass.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <br />
                    {error.confirmPassE && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.confirmPassE}</span></>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Hủy</Button>
                    <Button onClick={handleCheckValidation} autoFocus variant="contained">Lưu Thay Đổi</Button>
                </DialogActions>
            </Dialog>

            <PositionedSnackbar open={snackbarState} message={"cập nhật Thành Công."} />
        </div>
    );
}
