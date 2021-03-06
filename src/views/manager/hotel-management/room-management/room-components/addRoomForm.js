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
                {!props.item ? "TH??M PH??NG" : "C???P NH???T PH??NG"}
                <Button style={{ float: 'right' }} onClick={() => props.handleIsView(false)} variant="outlined">Ch???nh s???a</Button>
            </DialogTitle>
            <Divider />

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <DialogContent>
                    <Grid container spacing={2} sx={{ width }}>
                        <Grid item xs={12}>
                            <TextField inputProps={{ readOnly: props.isView, }} {...register("tenPhong")} id="outlined-basic" label="T??n Ph??ng" variant="outlined" fullWidth />
                            {errors.tenPhong && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> T??n ph??ng kh??ng d?????c ????? tr???ng.</span></>}
                        </Grid>
                        <Grid item xs={props.item ? 6 : 12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Lo???i Ph??ng</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    {...register("loaiPhongid")}
                                    value={loaiPhong}
                                    label="Lo???i Ph??ng"
                                    onChange={handleChangeRoomType}
                                    inputProps={{ readOnly: props.isView, }}
                                >
                                    <MenuItem value={1}>VIP</MenuItem>
                                    <MenuItem value={2}>Special</MenuItem>
                                    <MenuItem value={3}>Th?????ng</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {
                            props.item ?
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Tr???ng Th??i</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...register("trangThai")}
                                            value={trangThai}
                                            label="Tr???ng Th??i"
                                            onChange={handleChangeState}
                                            inputProps={{ readOnly: props.isView, }}
                                        >
                                            <MenuItem value={1}>Ho???t ?????ng</MenuItem>
                                            <MenuItem value={0}>Ng???ng ho???t ?????ng</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> : <></>
                        }
                        <Grid item xs={6}>
                            <TextField {...register("donGia")} inputProps={{ readOnly: props.isView, }} id="outlined-basic" label="????n Gi??" variant="outlined" fullWidth />
                            {errors.donGia && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> ????n gi?? ph???i l?? m???t s???.</span></>}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField {...register("kichThuoc")} inputProps={{ readOnly: props.isView, }} id="outlined-basic" label="K??ch Th?????c" variant="outlined" fullWidth />
                            {errors.kichThuoc && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> K??ch th?????c kh??ng ???????c ????? tr???ng</span></>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="file" inputProps={{ multiple: true, readOnly: props.isView }} {...register("anh")} id=" outlined-basic" variant="outlined" fullWidth />
                            {/* <input type== */}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register("moTa")} inputProps={{ readOnly: props.isView, }} id="outlined-basic" label="M?? t???" variant="outlined" fullWidth multiline rows={4} />
                            {errors.moTa && <p style={{ color: 'red' }}>{errors.moTa.message}</p>}
                        </Grid>
                    </Grid>
                </DialogContent>
                {!props.isView
                    ? <DialogActions>
                        <Button onClick={handleClose} variant="outlined" >Cancel</Button>
                        <Button type="submit" variant="outlined">{props.item ? "C???p nh???t" : "Th??m"}</Button>
                    </DialogActions>
                    : <></>
                }
            </form>
        </Dialog >

    );
}
