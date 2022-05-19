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
import { useSelector } from 'react-redux';

export default function UpdatePassword(props) {

    const account = useSelector((state) => state.account.userAuth);
    const employeeId = isJson(account) ? JSON.parse(account).user_id : account.user_id;
    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

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

    const handleClose = () => {
        props.handleOpenEmail(false);
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

    const submit = () => {
        console.log(oldPass)
        console.log(newPass)
        console.log(confirmPass)
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
                    <p style={{ marginTop: -2 }}>Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</p>

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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Hủy</Button>
                    <Button onClick={submit} autoFocus variant="contained">Lưu Thay Đổi</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
