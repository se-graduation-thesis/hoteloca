import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import * as actionCategory from 'actions/category.action';
import * as actions from 'actions/room.action';
import PositionedSnackbar from "../../components/PositionedSnackbar";


const width = 500;

const initialPhong = {
    ten: '',
    loaiPhongid: 1,
    soGiuong: '',
    soNguoi: '',
    donGia: '',
    dienTich: '',
    trangThai: 1,
    moTa: '',
    hinhAnh: ''
};

export default function AddRoomForm(props) {

    const dispatch = useDispatch();


    const categories = useSelector(state => state.category.listCategoryByBrand);
    const account = useSelector((state) => state.account.userAuth);
    useEffect(() => {
        if (account)
            dispatch(actionCategory.fetchAllCategoryByBrand(JSON.parse(account).khachsan_id));
    }, [])
    const rooms = useSelector((state) => state.room.rooms);

    const [snackbarState, setSnackbarState] = useState(false);


    const [phong, setPhong] = useState({
        ten: '',
        loaiPhongid: 1,
        soGiuong: '',
        soNguoi: '',
        donGia: '',
        dienTich: '',
        trangThai: 1,
        moTa: '',
        hinhAnh: ''
    });

    const [error, setError] = useState({
        ten: null,
        soGiuong: null,
        soNguoi: null,
        donGia: null,
        dienTich: null
    });

    const reset = () => {
        setPhong(initialPhong);
    }

    const handleTen = (event) => {
        setPhong({ ...phong, ten: event.target.value });

        let checkName = rooms.filter(e => e.ten === event.target.value).length;

        checkName > 0 ?
            setError({ ...error, ten: 'Tên phòng đã tồn tại.' }) :
            setError({ ...error, ten: null })
    }

    const handleChangeRoomType = (event) => {
        setPhong({ ...phong, loaiPhongid: event.target.value });
    };

    const handleClose = () => {
        props.isShowAddForm(false);
    }

    const handleCheckValidation = () => {
        const reNum = new RegExp(/\d+$/);
        const reString = new RegExp(/\w+/);

        let soNguoi = null;
        let soGiuong = null;
        let donGia = null;
        let ten = null;
        let dienTich = null;

        let kt = false;

        if (!reNum.test(phong.soNguoi)) {
            soNguoi = 'Số người phải là một con số.';
            kt = true;
        }

        if (!reNum.test(phong.soGiuong)) {
            soGiuong = 'Số Giường phải là một con số.';
            kt = true;
        }

        if (!reNum.test(phong.donGia)) {
            donGia = 'Đơn giá phải là một con số.';
            kt = true;
        }

        if (!reString.test(phong.ten)) {
            ten = 'Tên không được để trống.';
            kt = true;
        }

        if (!reString.test(phong.dienTich)) {
            dienTich = 'Diện tích không được để trống.';
            kt = true;
        }

        setError({
            ten,
            soGiuong,
            soNguoi,
            donGia,
            dienTich
        })
        return !kt;

    }

    const submit = () => {
        if (handleCheckValidation()) {
            dispatch(actions.addRoom(phong));

            props.isShowAddForm(false);
            reset();

            setSnackbarState(true);
            setTimeout(function () {
                setSnackbarState(false);
            }, 3000);
        }

    }

    return (
        <>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 18 }}>THÊM PHÒNG</DialogTitle>
                <Divider />

                <DialogContent>
                    <Grid container spacing={2} sx={{ width }}>
                        {/* Tên Phòng */}
                        <Grid item xs={12}>
                            <TextField
                                value={phong.ten}
                                inputProps={{ readOnly: props.isView, }}
                                autoFocus
                                id="outlined-basic"
                                label="Tên Phòng"
                                variant="outlined"
                                fullWidth

                                onChange={handleTen}
                            />
                            {error.ten && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ten}</span></>}
                        </Grid>

                        {/* Loại Phòng */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Loại Phòng</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={phong.loaiPhongid}
                                    label="Loại Phòng"
                                    inputProps={{ readOnly: props.isView, }}

                                    onChange={handleChangeRoomType}
                                >
                                    {categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.ten}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Số Giường - Số Người */}
                        <Grid item xs={6}>
                            <TextField
                                value={phong.soGiuong}
                                inputProps={{ readOnly: props.isView, }}
                                id="outlined-basic"
                                label="Số Giường"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setPhong({ ...phong, soGiuong: e.target.value })}
                            />
                            {error.soGiuong && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.soGiuong}</span></>}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={phong.soNguoi}
                                inputProps={{ readOnly: props.isView, }}
                                id="outlined-basic"
                                label="Số Người"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setPhong({ ...phong, soNguoi: e.target.value })}
                            />

                            {error.soNguoi && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.soNguoi}</span></>}

                        </Grid>

                        {/* Đơn Giá - Diện Tích */}
                        <Grid item xs={6}>
                            <TextField
                                value={phong.donGia}
                                inputProps={{ readOnly: props.isView, }}
                                id="outlined-basic"
                                label="Đơn Giá"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setPhong({ ...phong, donGia: e.target.value })}
                            />
                            {error.donGia && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.donGia}</span></>}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={phong.dienTich}
                                inputProps={{ readOnly: props.isView, }}
                                id="outlined-basic"
                                label="Diện Tích"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setPhong({ ...phong, dienTich: e.target.value })}
                            />
                            {error.dienTich && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.dienTich}</span></>}
                        </Grid>

                        {/* File */}
                        <Grid item xs={12}>
                            <TextField type="file" inputProps={{ multiple: true, readOnly: props.isView }} id=" outlined-basic" variant="outlined" fullWidth />
                        </Grid>

                        {/* Mô Tả */}
                        <Grid item xs={12}>
                            <TextField
                                value={phong.moTa}
                                inputProps={{ readOnly: props.isView, }}
                                id="outlined-basic"
                                label="Mô tả"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}

                                onChange={(e) => setPhong({ ...phong, moTa: e.target.value })}
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