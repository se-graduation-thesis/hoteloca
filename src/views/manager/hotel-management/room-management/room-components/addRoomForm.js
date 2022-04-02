import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import * as actions from 'actions/room.action';

const width = 500;

const SignupSchema = yup.object().shape({
    tenPhong: yup.string().required(),
    donGia: yup.number().required().positive().integer(),
    kichThuoc: yup.string().required(),
    moTa: yup.string()
});

export default function AddRoomForm(props) {
    const dispatch = useDispatch();

    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(SignupSchema)
    });

    const [loaiPhong, setLoaiPhong] = useState(1);
    const [trangThai, setTrangThai] = useState(1);

    const onSubmit = data => {
        data.anh = null;
        props.item ?
            data.id = props.item.id :
            data.trangThai = 1;
        dispatch(actions.addRoom(data));
        props.isShowAddForm(false);
        reset();
    };

    useEffect(() => {
        if (props.item) {
            setValue("tenPhong", props.item.tenPhong);
            setValue("donGia", props.item.donGia);
            setValue("kichThuoc", props.item.kichThuoc);
            setValue("moTa", props.item.moTa);
            setLoaiPhong(props.item.loaiPhongid.id);
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
        <Dialog open={props.open} onClose={handleClose} >
            <DialogTitle sx={{ fontSize: 18 }}>
                {!props.item ? "THÊM PHÒNG" : "CẬP NHẬT PHÒNG"}
                <Button style={{ float: 'right' }} onClick={() => props.handleIsView(false)} variant="outlined">Chỉnh sửa</Button>
            </DialogTitle>
            <Divider />

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <DialogContent>
                    <Grid container spacing={2} sx={{ width }}>
                        <Grid item xs={12}>
                            <TextField inputProps={{ readOnly: props.isView, }} {...register("tenPhong")} id="outlined-basic" label="Tên Phòng" variant="outlined" fullWidth />
                            {errors.tenPhong && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Tên phòng không dược để trống.</span></>}
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
                                    <MenuItem value={1}>VIP</MenuItem>
                                    <MenuItem value={2}>Special</MenuItem>
                                    <MenuItem value={3}>Thường</MenuItem>
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
                        <Button onClick={handleClose} variant="outlined" >Cancel</Button>
                        <Button type="submit" variant="outlined">{props.item ? "Cập nhật" : "Thêm"}</Button>
                    </DialogActions>
                    : <></>
                }
            </form>
        </Dialog >

    );
}
