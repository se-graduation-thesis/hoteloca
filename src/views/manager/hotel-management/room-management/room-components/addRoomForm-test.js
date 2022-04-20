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
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'actions/room.action';
import * as actionCategory from 'actions/category.action';
import PositionedSnackbar from '../../components/PositionedSnackbar';

const width = 500;

const SignupSchema = yup.object().shape({
    tenPhong: yup.string().required(),
    donGia: yup.number().required().positive().integer(),
    soGiuong: yup.number().required().positive().integer(),
    SoNGuoi: yup.number().required().positive().integer(),
    kichThuoc: yup.string().required(),
    moTa: yup.string()
});

export default function AddRoomFormTest(props) {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.listCategoryByBrand);
    const rooms = useSelector((state) => state.room.rooms);
    const account = useSelector((state) => state.account.userAuth);
    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
        resolver: yupResolver(SignupSchema)
    });
    useEffect(() => {
        if (account)
            dispatch(actionCategory.fetchAllCategoryByBrand(JSON.parse(account).khachsan_id));
    }, [])


    const [loaiPhong, setLoaiPhong] = useState(1);
    const [trangThai, setTrangThai] = useState(1);
    const [confirm, setConfirm] = useState(false);
    const buttonRef = useRef(null);
    const [snackbarState, setSnackbarState] = useState(false);
    const [message, setMessage] = useState(null);
    const [named, setNamed] = useState(false);

    const handleCheckName = (event) => {
        setValue("tenPhong", event.target.value);

        let checkName = rooms.filter(e => e.ten == getValues("tenPhong")).length;

        if (checkName > 0)
            setNamed(true);
        else
            setNamed(false);

    }

    const onSubmit = (data) => {
        console.log('named', named);
        if (!named) {
            data.anh = null;
            if (props.item) {
                data.id = props.item.id;
                setMessage("Cập nhật thành công.");
            } else {
                data.trangThai = 1;
                setMessage("Thêm thành công.");
            }

            dispatch(actions.addRoom(data));
            props.isShowAddForm(false);
            reset();

            setSnackbarState(true);
            setTimeout(function () {
                setSnackbarState(false);
            }, 3000);
        }
    };

    useEffect(() => {
        if (props.item) {
            setValue("tenPhong", props.item.tenPhong);
            setValue("donGia", props.item.donGia);
            setValue("kichThuoc", props.item.kichThuoc);
            setValue("moTa", props.item.moTa);
            setValue("soGiuong", props.item.soGiuong);
            setValue("soNguoi", props.item.soNguoi);
            setLoaiPhong(props.item.loaiPhongid.id);
            props.item.trangThai === "Hoạt động" ?
                setTrangThai(1) :
                setTrangThai(0);
        }
    }, [props.item])


    const handleChangeRoomType = (event) => {
        setLoaiPhong(event.target.value);
    };

    const handleChangeState = (event) => {
        setTrangThai(event.target.value);
    };

    const handleClose = () => {
        props.isShowAddForm(false);
        props.handleEditRoom(null);
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
                                CHI TIẾT PHÒNG
                                <Button style={{ float: 'right' }}
                                    onClick={() => props.handleIsView(false)}
                                    variant="outlined"
                                >
                                    Chỉnh sửa
                                </Button>
                            </>
                            : "CẬP NHẬT PHÒNG"
                        : "THÊM PHÒNG"
                    }
                </DialogTitle>
                <Divider />

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <DialogContent>
                        <Grid container spacing={2} sx={{ width }}>
                            <Grid item xs={12}>
                                <TextField inputProps={{ readOnly: props.isView, }} autoFocus {...register("tenPhong")} id="outlined-basic" label="Tên Phòng" variant="outlined" fullWidth onChange={handleCheckName} />
                                {errors.tenPhong?.type === 'required' && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Tên phòng không dược để trống.</span></>}
                                {/* {errors.tenPhong?.type === 'custom' && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> {errors.tenPhong.message}</span></>} */}
                                {named && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Tên phòng đã tồn tại.</span></>}
                            </Grid>
                            <Grid item xs={props.item ? 6 : 12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Loại Phòng</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        {...register("loaiPhongid")}
                                        value={loaiPhong}
                                        label="Loại Phòng"
                                        onChange={handleChangeRoomType}
                                        inputProps={{ readOnly: props.isView, }}
                                    >
                                        {categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.ten}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {
                                props.item ?
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                {...register("trangThai")}
                                                value={trangThai}
                                                label="Trạng Thái"
                                                onChange={handleChangeState}
                                                inputProps={{ readOnly: props.isView, }}
                                            >
                                                <MenuItem value={1}>Hoạt động</MenuItem>
                                                <MenuItem value={0}>Ngừng hoạt động</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid> : <></>
                            }

                            <Grid item xs={6}>
                                <TextField {...register("donGia")} inputProps={{ readOnly: props.isView, }} id="outlined-basic" label="Đơn Giá" variant="outlined" fullWidth />
                                {errors.donGia && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Đơn giá phải là một số.</span></>}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...register("kichThuoc")} inputProps={{ readOnly: props.isView, }} id="outlined-basic" label="Kích Thước" variant="outlined" fullWidth />
                                {errors.kichThuoc && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Kích thước không được để trống</span></>}
                            </Grid>

                            <Grid item xs={6}>
                                <TextField {...register("soGiuong")} inputProps={{ readOnly: props.isView, }} id="outlined-basic" label="Số Giường" variant="outlined" fullWidth />
                                {errors.soGiuong && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Số giường phải là một số.</span></>}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...register("soNguoi")} inputProps={{ readOnly: props.isView, }} id="outlined-basic" label="Số Người" variant="outlined" fullWidth />
                                {errors.soNguoi && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Số người không được để trống. </span></>}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField type="file" inputProps={{ multiple: true, readOnly: props.isView }} {...register("anh")} id=" outlined-basic" variant="outlined" fullWidth />
                                {/* <input type== */}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField {...register("moTa")} inputProps={{ readOnly: props.isView, }} id="outlined-basic" label="Mô tả" variant="outlined" fullWidth multiline rows={4} />
                                {errors.moTa && <p style={{ color: 'red' }}>{errors.moTa.message}</p>}
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
                        {"Bạn chắc chắn muốn thay đổi thông tin phòng?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Thông tin phòng sẽ được thay đổi và cập nhật loại toàn bộ trong hệ thống.
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
