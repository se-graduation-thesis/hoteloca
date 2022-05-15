import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';

export default function UpdateEmail(props) {

    const [data, setData] = useState(null);
    useEffect(() => {
        setData(props.object)
    }, [props.object])

    const handleClose = () => {
        props.handleOpenEmail(false);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 18 }}>CẬP NHẬT EMAIL</DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText sx={{ fontSize: 18 }}>
                        Vui lòng nhập email của bạn tại đây
                    </DialogContentText>
                    <TextField id="outlined-basic" autoFocus label="Địa chỉ Email" type="email" fullWidth sx={{ marginTop: 2 }} variant="standard" value={data?.email} />
                    <p>Mã xác thực (OTP) sẽ được gửi đến email này để xác minh email là của bạn</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Hủy</Button>
                    <Button onClick={handleClose} variant="outlined">Lưu Thay Đổi</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
