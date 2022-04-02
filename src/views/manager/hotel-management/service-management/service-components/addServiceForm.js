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
import * as actions from 'actions/service.action';

const width = 500;

const SignupSchema = yup.object().shape({
    tenDichVu: yup.string().required(),
    donGia: yup.number().required().positive().integer(),
});

export default function AddServiceForm(props) {
    const dispatch = useDispatch();

    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(SignupSchema)
    });

    const [trangThai, setTrangThai] = useState(1);

    const onSubmit = data => {
        props.item ?
            data.id = props.item.id :
            data.trangThai = 1;
        dispatch(actions.addService(data));
        props.isShowAddForm(false);
        reset();
    };

    useEffect(() => {
        if (props.item) {
            setValue("tenDichVu", props.item.tenDichVu);
            setValue("donGia", props.item.donGia);
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
        props.handleEditService(null);
        props.handleIsView(false);
        reset();
    }

    return (
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
                        : "CẬP NHẬT DỊCH VỤ"
                    : "THÊM DỊCH VỤ"
                }
            </DialogTitle>
            <Divider />

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <DialogContent>
                    <Grid container spacing={2} sx={{ width }}>
                        <Grid item xs={12}>
                            <TextField inputProps={{ readOnly: props.isView, }} {...register("tenDichVu")} id="outlined-basic" label="Tên Phòng" variant="outlined" fullWidth />
                            {errors.tenDichVu && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Tên phòng không dược để trống.</span></>}
                        </Grid>
                        <Grid item xs={props.item ? 6 : 12}>
                            <TextField {...register("donGia")} inputProps={{ readOnly: props.isView, }} id="outlined-basic" label="Đơn Giá" variant="outlined" fullWidth />
                            {errors.donGia && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}> Đơn giá phải là một số.</span></>}
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
