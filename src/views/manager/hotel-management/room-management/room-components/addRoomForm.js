import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import * as actionCategory from 'actions/category.action';
import * as actions from 'actions/room.action';
import * as actionsUploadFile from 'actions/upload.action';
import PositionedSnackbar from "../../components/PositionedSnackbar";


const width = 500;

const initialPhong = {
    ten: '',
    loaiPhongid: 1,
    trangThai: 1,
    moTa: '',
    hinhAnh: ''
};

export default function AddRoomForm(props) {

    const dispatch = useDispatch();


    const categories = useSelector(state => state.category.listCategory);
    const account = useSelector((state) => state.account.userAuth);
    useEffect(() => {
        if (account)
            dispatch(actionCategory.fetchAllCategory());
    }, [])
    const rooms = useSelector((state) => state.room.rooms);

    const [snackbarState, setSnackbarState] = useState(false);


    const [phong, setPhong] = useState({
        ten: '',
        loaiPhongid: 1,
        trangThai: 1,
        moTa: '',
        hinhAnh: ''
    });

    const [error, setError] = useState({
        ten: null,
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

    const [image, setImage] = useState();
    const [file, setFile] = useState(null);

    const handleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            let fileTemp = e.target.files[0];
            setFile(fileTemp)
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(fileTemp);
        }
    }

    const handleCheckValidation = () => {
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

    const submit = () => {
        if (handleCheckValidation()) {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                actionsUploadFile.upload(formData)
                    .then((response) => {
                        phong.hinhAnh = response.data;
                        dispatch(actions.addRoom(phong));

                        props.isShowAddForm(false);
                        reset();

                        setSnackbarState(true);
                        setTimeout(function () {
                            setSnackbarState(false);
                        }, 3000);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                dispatch(actions.addRoom(phong));

                props.isShowAddForm(false);
                reset();

                setSnackbarState(true);
                setTimeout(function () {
                    setSnackbarState(false);
                }, 3000);
            }
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

                        {/* File */}
                        <Grid item xs={12}>
                            <TextField type="file" accept="image/*" onChange={handleImage} inputProps={{ multiple: true, readOnly: props.isView }} id=" outlined-basic" variant="outlined" fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            {image && <img src={image} alt="" style={{ width: 490, height: 350 }} />}
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