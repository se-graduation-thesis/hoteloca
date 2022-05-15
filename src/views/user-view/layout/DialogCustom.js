import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open_dialog, handleClose }) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()
    React.useEffect(() => {
        setOpen(open_dialog)
    })
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Thông báo"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Bạn chưa đăng nhập không thể tiến hành đặt phòng!
                        Vui lòng đăng nhập để tiếp tụ
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { navigate("login") }} variant="outlined" color='secondary'>Đăng nhập tại đây</Button>
                    <Button onClick={() => navigate("register")} variant="outlined" color='secondary'>Đăng kí</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}