import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { address } from 'assets/address';
import * as actions from "actions/manager.action"
import * as actionBoPhan from "actions/bophan.action"
import moment from "moment-timezone";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateTimePicker, DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import PositionedSnackbar from "../components/PositionedSnackbar";

const width = 800;

const initialEmployee = {
    ho: '',
    ten: '',
    gioiTinh: 1,
    ngaySinh: '',
    cmnd: '',
    dienThoai: '',
    email: '',
    diachi: '',
    boPhanid: 1,
    luong: '',
    trangThai: 1,
    ngayVaoLam: moment.tz(new Date(), "Asia/Ho_Chi_Minh").format(),
    taiKhoanid: null
};

export default function AddEmployeeForm(props) {

    const dispatch = useDispatch();
    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])
    const [tinh, setTinh] = useState('');
    const [huyen, setHuyen] = useState('');
    const [xa, setXa] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [snackbarState, setSnackbarState] = useState(false);

    const bophans = useSelector(state => state.bophan.bophans);
    useEffect(() => {
        dispatch(actionBoPhan.fetchAllBoPhan());
    }, [])

    const getDistrict = (a) => {
        setDistrict(a.districts)
        setWards([])
    }

    const getWards = (a) => {
        setWards(a.wards)
    }

    const [employee, setEmployee] = useState({
        ho: '',
        ten: '',
        gioiTinh: 1,
        ngaySinh: moment.tz(new Date(1990, 1, 1), "Asia/Ho_Chi_Minh").format(),
        cmnd: '',
        dienThoai: '',
        email: '',
        diaChi: '',
        boPhanid: 1,
        luong: '',
        trangThai: 1,
        ngayVaoLam: moment.tz(new Date(), "Asia/Ho_Chi_Minh").format(),
        taiKhoanid: null
    });

    const handleClose = () => {
        props.isShowAddForm(false);
    }

    const handleDiachi = () => {
        let address = JSON.stringify({
            diaChi: diaChi,
            city: tinh,
            district: huyen,
            ward: xa
        })
        // setEmployee({ ...employee, diaChi: address })
        employee.diaChi = address;
        submit();
    }

    const submit = () => {
        dispatch(actions.add_Employee(employee));

        handleClose();
        reset();

        setSnackbarState(true);
        setTimeout(function () {
            setSnackbarState(false);
        }, 3000);
    }

    const reset = () => {
        setEmployee(initialEmployee);
        setTinh('');
        setHuyen('');
        setXa('');
        setDiaChi('');
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} maxWidth='1000px' >
                <DialogTitle sx={{ fontSize: 18 }}>THÊM NHÂN VIÊN</DialogTitle>
                <Divider />

                <DialogContent>
                    <Grid container spacing={2} sx={{ width }}>
                        {/* Họ - tên */}
                        <Grid item xs={6}>
                            <TextField
                                value={employee.ho}
                                inputProps={{ readOnly: props.isView, }}
                                autoFocus
                                autoComplete="off"
                                id="outlined-basic"
                                label="Họ Nhân Viên"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setEmployee({ ...employee, ho: e.target.value })}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={employee.ten}
                                inputProps={{ readOnly: props.isView, }}
                                autoComplete="off"
                                id="outlined-basic"
                                label="Tên Nhân Viên"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setEmployee({ ...employee, ten: e.target.value })}
                            />
                        </Grid>

                        {/* CMND - Gioi Tinh */}
                        <Grid item xs={6}>
                            <TextField
                                value={employee.cmnd}
                                inputProps={{ readOnly: props.isView, }}
                                autoComplete="off"
                                id="outlined-basic"
                                label="CMND/CCCD"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setEmployee({ ...employee, cmnd: e.target.value })}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Giới Tính</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={employee.gioiTinh}
                                    label="Giới Tính"
                                    inputProps={{ readOnly: props.isView, }}

                                    onChange={e => setEmployee({ ...employee, gioiTinh: e.target.value })}
                                >
                                    <MenuItem value={0}>Nữ</MenuItem>
                                    <MenuItem value={1}>Nam</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Ngày Sinh - Ngày Vào Làm */}
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    renderInput={(props) => <TextField {...props} fullWidth />}
                                    inputFormat="dd/MM/yyyy"
                                    label="Ngày Sinh"
                                    value={employee.ngaySinh}
                                    onChange={(newValue) => {
                                        setEmployee({ ...employee, ngaySinh: moment.tz(newValue, "Asia/Ho_Chi_Minh").format() })
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    renderInput={(props) => <TextField {...props} fullWidth />}
                                    inputFormat="dd/MM/yyyy hh:mm a"
                                    label="Ngày Vào Làm"
                                    value={employee.ngayVaoLam}
                                    onChange={(newValue) => {
                                        setEmployee({ ...employee, ngayVaoLam: moment.tz(newValue, "Asia/Ho_Chi_Minh").format() })
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        {/* SDT - Email */}
                        <Grid item xs={6}>
                            <TextField
                                value={employee.dienThoai}
                                inputProps={{ readOnly: props.isView, }}
                                autoComplete="off"
                                id="outlined-basic"
                                label="Số Điện Thoại"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setEmployee({ ...employee, dienThoai: e.target.value })}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={employee.email}
                                inputProps={{ readOnly: props.isView, }}
                                autoComplete="off"
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                            />
                        </Grid>

                        {/* Luong - Bộ Phận */}
                        <Grid item xs={6}>
                            <TextField
                                value={employee.luong}
                                inputProps={{ readOnly: props.isView, }}
                                autoComplete="off"
                                id="outlined-basic"
                                label="Lương"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setEmployee({ ...employee, luong: e.target.value })}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Bộ Phận</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={employee.boPhanid}
                                    label="Bộ Phận"
                                    inputProps={{ readOnly: props.isView, }}

                                    onChange={e => setEmployee({ ...employee, boPhanid: e.target.value })}
                                >
                                    {bophans.map((item) => <MenuItem key={item.id} value={item.id}>{item.ten}</MenuItem>)}

                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Đia Chi */}
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tỉnh / Thành phố</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Tỉnh / Thành phố"
                                    value={tinh}
                                    onChange={(e) => setTinh(e.target.value)}
                                >
                                    {
                                        address.map((a) => (
                                            <MenuItem key={a.id} value={a.name} onClick={() => getDistrict(a)}>{a.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Quận / Huyện</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Quận / Huyện"
                                    value={huyen}
                                    onChange={(e) => setHuyen(e.target.value)}
                                >
                                    {
                                        district.map((a) => (
                                            <MenuItem key={a.id} value={a.name} onClick={() => getWards(a)}>{a.name} </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Xã / Phường</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Xã / Phường"
                                    value={xa}
                                    onChange={(e) => setXa(e.target.value)}
                                >
                                    {
                                        wards.map((a) => (
                                            <MenuItem key={a.id} value={a.name} > {a.prefix + " " + a.name} </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                            <TextField
                                value={diaChi}
                                autoComplete="off"
                                id="outlined-basic"
                                label="Địa chỉ"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setDiaChi(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Hủy</Button>
                    <Button onClick={handleDiachi} variant="outlined">Thêm</Button>
                </DialogActions>
            </Dialog >

            <div>
                <PositionedSnackbar open={snackbarState} message={"Thêm Thành Công."} />
            </div>
        </div >
    )
}