import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PositionedSnackbar from "../../components/PositionedSnackbar";
import * as actions from "actions/service.action";


const width = 500;

const initialService = {
    ten: '',
    donGia: '0',
    trangThai: 1,
    moTa: ''
};

export default function AddServiceForm(props) {

    const dispatch = useDispatch();

    const services = useSelector((state) => state.service.services);
    useEffect(() => {
        dispatch(actions.fetchAllService())
    }, [])
    const [snackbarState, setSnackbarState] = useState(false);


    const [service, setService] = useState({
        ten: '',
        donGia: '',
        trangThai: 1,
        moTa: ''
    });

    const [error, setError] = useState({
        ten: null,
        donGia: null,
    });

    const reset = () => {
        setService(initialService);
    }

    const handleTen = (event) => {
        setService({ ...service, ten: event.target.value });

        let checkName = services.filter(e => e.ten === event.target.value).length;

        checkName > 0 ?
            setError({ ...error, ten: 'Tên phòng đã tồn tại.' }) :
            setError({ ...error, ten: null })
    }


    const handleClose = () => {
        props.isShowAddForm(false);
    }

    const handleCheckValidation = () => {
        const reNum = new RegExp(/\d+$/);
        const reString = new RegExp(/\w+/);

        let ten = null;
        let donGia = null;

        let kt = false;

        if (!reNum.test(service.donGia)) {
            donGia = 'Đơn giá phải là một con số.';
            kt = true;
        }

        if (!reString.test(service.ten)) {
            ten = 'Tên không được để trống.';
            kt = true;
        }

        setError({
            ten,
            donGia
        })
        return !kt;

    }

    const submit = () => {
        if (handleCheckValidation()) {
            dispatch(actions.addService(service));

            props.isShowAddForm(false);
            reset();

            setSnackbarState(true);
            setTimeout(function () {
                setSnackbarState(false);
            }, 3000);
        }

        console.log(service)

    }

    const formatCash = (str) => {
        if (str === '') return '';
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

    return (
        <>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 18 }}>THÊM DỊCH VỤ</DialogTitle>
                <Divider />

                <DialogContent>
                    <Grid container spacing={2} sx={{ width }}>
                        {/* Tên Phòng */}
                        <Grid item xs={12}>
                            <TextField
                                value={service.ten}
                                inputProps={{ readOnly: props.isView, }}
                                autoFocus
                                id="outlined-basic"
                                label="Tên Dịch Vụ"
                                variant="outlined"
                                fullWidth

                                onChange={handleTen}
                            />
                            {error.ten && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ten}</span></>}
                        </Grid>

                        {/* Đơn Giá */}
                        <Grid item xs={12}>
                            <TextField
                                value={formatCash(service.donGia)}
                                inputProps={{ readOnly: props.isView, }}
                                // id="outlined-basic"
                                label="Đơn Giá"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setService({ ...service, donGia: e.target.value.replaceAll(',', '') })}
                            />
                            {error.donGia && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.donGia}</span></>}
                        </Grid>

                        {/* Mô Tả */}
                        <Grid item xs={12}>
                            <TextField
                                value={service.moTa}
                                inputProps={{ readOnly: props.isView, }}
                                id="outlined-basic"
                                label="Mô tả"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}

                                onChange={(e) => setService({ ...service, moTa: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Hủy</Button>
                    <Button onClick={submit} variant="outlined">Thêm</Button>
                </DialogActions>
            </Dialog>

            <div>
                <PositionedSnackbar open={snackbarState} message={"Thêm Thành Công."} />
            </div>
        </>
    )
}