import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { DialogContentText, Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import * as actions from 'actions/service.action';
import PositionedSnackbar from '../../components/PositionedSnackbar';

const width = 500;

const SignupSchema = yup.object().shape({
    tenNguoiDung: yup.string().required(),
});

export default function AddCustomerForm(props) {
    const dispatch = useDispatch();

    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(SignupSchema)
    });

    const [trangThai, setTrangThai] = useState(1);
    const [confirm, setConfirm] = useState(false);
    const buttonRef = useRef(null);
    const [snackbarState, setSnackbarState] = useState(false);
    const [message, setMessage] = useState(null);

    const onSubmit = data => {
        if (props.item) {
            data.id = props.item.id;
            setMessage("Cập nhật thành công.");
        } else {
            data.trangThai = 1;
            setMessage("Thêm thành công.");
        }
        dispatch(actions.addService(data));
        props.isShowAddForm(false);
        reset();

        setSnackbarState(true);
        setTimeout(function () {
            setSnackbarState(false);
        }, 3000);
    };

    useEffect(() => {
        if (props.item) {
            setValue("tenNguoiDung", props.item.tenNguoiDung);
            props.item.trangThai === "Hoạt động" ?
                setTrangThai(1) :
                setTrangThai(0);
        }
    }, [props.item])



    const handleChangeState = (event) => {
        setTrangThai(event.target.value);
    };

    const handleClose = () => {
        props.isShowAddForm(false);
        props.handleEditCustomer(null);
        props.handleIsView(false);
        reset();
    }

    return (
        <>
            <Dialog open={props.open} onClose={handleClose} >
                <DialogTitle sx={{ fontSize: 18 }}>
                    {props.item ?
                        props.isView ?
                            <>
                                CHI TIẾT DỊCH VỤ
                                <Button style={{ float: 'right' }}
                                    onClick={() => props.handleIsView(false)}
                                    variant="outlined"
                                >
                                    Chỉnh sửa
                                </Button>
                            </>
                            : "CẬP NHẬT KHÁCH HÀNG"
                        : "THÊM KHÁCH HÀNG"
                    }
                </DialogTitle>
                <Divider />

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <DialogContent>
                        <Grid container spacing={2} sx={{ width }}>
                            <Grid item xs={6}>
                                <TextField inputProps={{ readOnly: props.isView, }} {...register("hoNguoiDung")} id="outlined-basic" label="Họ người dùng" variant="outlined" fullWidth />
                                {errors.hoNguoiDung && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Họ người dùng không dược để trống.</span></>}
                            </Grid>

                            <Grid item xs={6}>
                                <TextField inputProps={{ readOnly: props.isView, }} {...register("tenNguoiDung")} id="outlined-basic" label="Tên người dùng" variant="outlined" fullWidth />
                                {errors.tenNguoiDung && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Tên người dùng không dược để trống.</span></>}
                            </Grid>

                            <Grid item xs={21}>
                                <TextField inputProps={{ readOnly: props.isView, }} {...register("diaChi")} id="outlined-basic" label="Địa chỉ" variant="outlined" fullWidth />
                                {errors.diaChi && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Địa chỉ không dược để trống.</span></>}
                            </Grid>

                        </Grid>

                    </DialogContent>
                    {!props.isView
                        ? <DialogActions>
                            <Button onClick={handleClose} variant="outlined" >Hủy</Button>
                            <Button ref={buttonRef} type="submit" style={props.item ? hidden : {}} variant="outlined">Thêm</Button>
                            <Button onClick={() => setConfirm(true)} variant="outlined" style={!props.item ? hidden : {}}>Cập nhật</Button>
                        </DialogActions>
                        : <></>
                    }
                </form>
            </Dialog >
            <div>
                <Dialog
                    open={confirm}
                    onClose={() => setConfirm(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Bạn chắc chắn muốn thay đổi thông tin Dịch vụ?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Thông tin dịch vụ sẽ được thay đổi và cập nhật loại toàn bộ trong hệ thống.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirm(false)}>Hủy</Button>
                        <Button onClick={() => { buttonRef.current.click(); setConfirm(false) }} autoFocus>
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <PositionedSnackbar open={snackbarState} message={message} />
        </>
    );
}

const hidden = {
    visibility: 'hidden',
    position: 'absolute',
}