import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';

export default function UpdatePhone(props) {

    const [data, setData] = useState(null);
    useEffect(() => {
        setData(props.object)
    }, [props.object])

    const handleClose = () => {
        props.handleOpenPhone(false);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 18 }}>CẬP NHẬT SỐ ĐIỆN THOẠI</DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText sx={{ fontSize: 18 }}>
                        Vui lòng nhập số điện thoại của bạn tại đây
                    </DialogContentText>
                    <TextField id="outlined-basic" autoFocus fullWidth sx={{ marginTop: 2 }} variant="outlined" value={data?.dienThoai} />
                    <p>Mã xác thực (OTP) sẽ được gửi đến số điện thoại này để xác minh số điện thoại là của bạn</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Hủy</Button>
                    <Button onClick={handleClose} variant="outlined">Lưu Thay Đổi</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
