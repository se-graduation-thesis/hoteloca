import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import * as actionCategory from 'actions/category.action';
import * as actions from 'actions/room.action';
import PositionedSnackbar from "../../components/PositionedSnackbar";


const width = 500;

export default function EditRoomForm(props) {

    const dispatch = useDispatch();


    const categories = useSelector(state => state.category.listCategory);
    const account = useSelector((state) => state.account.userAuth);
    useEffect(() => {
        if (account)
            dispatch(actionCategory.fetchAllCategoryByBrand(JSON.parse(account).khachsan_id));
    }, [])
    const rooms = useSelector((state) => state.room.rooms);

    const [snackbarState, setSnackbarState] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [phong, setPhong] = useState({});

    useEffect(() => {
        setPhong({
            id: props.item?.id,
            ten: props.item?.ten,
            loaiPhongid: props.item?.loaiPhongid.id,
            trangThai: props.item?.trangThai === "Hoạt động" ? 1 : 0,
            moTa: props.item?.moTa,
            hinhAnh: props.item?.hinhAnh
        })
    }, [props.item])

    const [error, setError] = useState({
        ten: null,
    });

    const handleTen = (event) => {
        setPhong({ ...phong, ten: event.target.value });

        let checkName = rooms.filter(e => e.ten === event.target.value);

        (checkName.length > 0 && checkName[0].id !== props.item.id) ?
            setError({ ...error, ten: 'Tên phòng đã tồn tại.' }) :
            setError({ ...error, ten: null })
    }

    const handleClose = () => {
        props.isShowEditForm(false);
        props.handleIsView(false);
    }

    const handleCheckValidation = () => {
        // const reNum = new RegExp(/\d+$/);
        const reString = new RegExp(/\w+/);

        let ten = null;
        let kt = false;

        if (!reString.test(phong.ten)) {
            ten = 'Tên không được để trống.';
            kt = true;
        }

        setError({
            ten
        })
        return !kt;

    }

    const validation = () => {
        if (handleCheckValidation())
            setConfirm(true);
    }

    const submit = () => {
        dispatch(actions.addRoom(phong));

        props.isShowEditForm(false);
        setConfirm(false);

        setSnackbarState(true);
        setTimeout(function () {
            setSnackbarState(false);
        }, 3000);
    }


    return (
        <>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 18 }}>
                    {props.isView ?
                        <>
                            CHI TIẾT PHÒNG
                            <Button style={{ float: 'right' }}
                                onClick={() => props.handleIsView(false)}
                                variant="outlined"
                            >
                                Chỉnh sửa
                            </Button>
                        </>
                        : "CẬP NHẬT PHÒNG"}
                </DialogTitle>
                <Divider />

                <DialogContent>
                    <Grid container spacing={2} sx={{ width }}>
                        {/* Tên Phòng */}
                        <Grid item xs={12}>
                            <TextField
                                value={phong.ten}
                                inputProps={{ readOnly: props.isView, }}
                                autoFocus={!props.isView}
                                id="outlined-basic"
                                label="Tên Phòng"
                                variant="outlined"
                                fullWidth

                                onChange={handleTen}
                            />
                            {error.ten && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ten}</span></>}
                        </Grid>

                        {/* Loại Phòng - Trạng Thái */}
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Loại Phòng</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={phong.loaiPhongid}
                                    label="Loại Phòng"
                                    inputProps={{ readOnly: props.isView, }}

                                    onChange={(e) => setPhong({ ...phong, loaiPhongid: e.target.value })}
                                >
                                    {categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.ten}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={phong.trangThai}
                                    label="Trạng Thái"
                                    onChange={(e) => setPhong({ ...phong, trangThai: e.target.value })}
                                    inputProps={{ readOnly: props.isView, }}
                                >
                                    <MenuItem value={1}>Hoạt động</MenuItem>
                                    <MenuItem value={0}>Ngừng hoạt động</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* File */}
                        {
                            !props.isView ?
                                <Grid item xs={12}>
                                    <TextField type="file" inputProps={{ multiple: true, readOnly: props.isView }} id=" outlined-basic" variant="outlined" fullWidth />
                                </Grid> : <></>
                        }

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

                        {
                            props.isView ?
                                <Grid item xs={12}>
                                    <img src={phong.hinhAnh} style={{ width: 490 }} />
                                </Grid> : <></>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Hủy</Button>
                    {
                        !props.isView ?
                            <Button onClick={validation} variant="outlined">Cập nhật</Button> : <></>
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
                            {"Bạn chắc chắn muốn thay đổi thông tin phòng?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Thông tin phòng sẽ được thay đổi và cập nhật lại toàn bộ trong hệ thống.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirm(false)}>Hủy</Button>
                            <Button onClick={submit} autoFocus>
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