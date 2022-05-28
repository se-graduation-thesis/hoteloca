import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PositionedSnackbar from "../../components/PositionedSnackbar";
import * as actions from "actions/service.action";


const width = 500;

export default function EditServiceForm(props) {

    const dispatch = useDispatch();

    const services = useSelector((state) => state.service.services);
    useEffect(() => {
        dispatch(actions.fetchAllService())
    }, [])
    const [snackbarState, setSnackbarState] = useState(false);
    const [confirm, setConfirm] = useState(false)


    const [service, setService] = useState({});

    useEffect(() => {
        setService({
            id: props.item?.id,
            ten: props.item?.ten,
            donGia: props.item?.donGia,
            trangThai: props.item?.trangThai === "Hoạt động" ? 1 : 0,
            moTa: props.item?.moTa
        })
    }, [props.item])

    const [error, setError] = useState({
        ten: null,
        donGia: null,
    });


    const handleTen = (event) => {
        setService({ ...service, ten: event.target.value });

        let checkName = services.filter(e => e.ten === event.target.value);

        (checkName.length > 0 && checkName[0].id !== props.item.id) ?
            setError({ ...error, ten: 'Tên phòng đã tồn tại.' }) :
            setError({ ...error, ten: null })
    }


    const handleClose = () => {
        props.isShowEditForm(false);
        props.handleIsView(false);
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

    const validation = () => {
        if (handleCheckValidation())
            setConfirm(true);
    }

    const submit = () => {
        dispatch(actions.addService(service));

        props.isShowEditForm(false);
        setConfirm(false);

        setSnackbarState(true);
        setTimeout(function () {
            setSnackbarState(false);
        }, 3000);
    }

    const formatCash = (str) => {
        if (str === '') return '';
        return String(str).split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

    return (
        <>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 18 }}>
                    {props.isView ?
                        <>
                            CHI TIẾT Dịch Vụ
                            <Button style={{ float: 'right' }}
                                onClick={() => props.handleIsView(false)}
                                variant="outlined"
                            >
                                Chỉnh sửa
                            </Button>
                        </>
                        : "CẬP NHẬT DỊCH VỤ"}
                </DialogTitle>
                <Divider />

                <DialogContent>
                    <Grid container spacing={2} sx={{ width }}>
                        {/* Tên Phòng */}
                        <Grid item xs={12}>
                            <TextField
                                value={service.ten}
                                inputProps={{ readOnly: props.isView, }}
                                autoFocus={!props.isView}
                                id="outlined-basic"
                                label="Tên Dịch Vụ"
                                variant="outlined"
                                fullWidth

                                onChange={handleTen}
                            />
                            {error.ten && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ten}</span></>}
                        </Grid>

                        {/* Đơn Giá - Trạng Thái */}
                        <Grid item xs={6}>
                            <TextField
                                value={formatCash(service.donGia)}
                                inputProps={{ readOnly: props.isView, }}
                                id="outlined-basic"
                                label="Đơn Giá"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setService({ ...service, donGia: e.target.value.replaceAll(',', '') })}
                            />
                            {error.donGia && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.donGia}</span></>}
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={service.trangThai}
                                    label="Trạng Thái"
                                    onChange={(e) => setService({ ...service, trangThai: e.target.value })}
                                    inputProps={{ readOnly: props.isView, }}
                                >
                                    <MenuItem value={1}>Hoạt động</MenuItem>
                                    <MenuItem value={0}>Ngừng hoạt động</MenuItem>
                                </Select>
                            </FormControl>
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
                    {
                        !props.isView ?
                            <Button onClick={validation} variant="contained">Cập Nhật</Button> : <></>
                    }
                </DialogActions>
            </Dialog>

            <div>
                <div>
                    <Dialog
                        open={confirm}
                        onClose={() => setConfirm(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{ fontSize: 16 }}>
                            {"Bạn chắc chắn muốn thay đổi thông tin dịch vụ?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Thông tin dịch vụ sẽ được thay đổi và cập nhật lại toàn bộ trong hệ thống.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirm(false)} variant="outlined">Hủy</Button>
                            <Button onClick={submit} variant="contained">
                                Đồng ý
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div>
                <PositionedSnackbar open={snackbarState} message={"Cập nhật Thành Công."} />
            </div>
        </>
    )
}