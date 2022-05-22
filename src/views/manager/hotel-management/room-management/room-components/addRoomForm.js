import { Button, Card, CardActionArea, CardActions, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import * as actionCategory from 'actions/category.action';
import * as actions from 'actions/room.action';
import * as actionsUploadFile from 'actions/upload.action';
import PositionedSnackbar from "../../components/PositionedSnackbar";
import CardContent from "views/manager/statistical/customer-statistics/CardContent";
import { set } from "date-fns";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';



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

    const [image, setImage] = useState([]);
    const [file, setFile] = useState([]);

    const handleIma = (value, index) => {
        setImage(image.filter(e => e !== value));
        let i = 0;
        const newFile = Object.keys(file).reduce((object, key) => {
            if (key != index) {
                object[i++] = file[key]
            }
            return object
        }, {})

        setFile(newFile)
    }
    const handleImage = (e) => {

        if (e.target.files && e.target.files[0]) {
            let files = e.target.files;
            let fileTemp
            const photos = []
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                fileTemp = files[i];
                reader.onloadend = () => {
                    photos.push(reader.result);
                };
                reader.readAsDataURL(fileTemp);
            }
            setImage(photos)
            setFile(files)
        }
    }


    // ------------------------------
    console.log(Object.keys(file).length)
    // --------------------------------

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
            let length = Object.keys(file).length;
            let i = 0;
            if (file) {
                const formData = new FormData();
                const arr = [];
                const newFile = Object.keys(file).reduce((object, key) => {
                    formData.append("file", file[key]);
                    actionsUploadFile.upload(formData)
                        .then((response) => {
                            arr.push(response.data);
                            i++;
                            if (i === length) {
                                phong.hinhAnh = JSON.stringify(arr);
                                console.log("<><><>", phong.hinhAnh);

                                dispatch(actions.addRoom(phong));

                                props.isShowAddForm(false);
                                reset();

                                setSnackbarState(true);
                                setTimeout(function () {
                                    setSnackbarState(false);
                                }, 3000);
                            }
                            console.log("-----", arr);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    return object
                }, {})
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

    // const submit = () => {
    //     if (handleCheckValidation()) {
    //         if (file) {
    //             const formData = new FormData();
    //             formData.append("file", file);
    //             actionsUploadFile.upload(formData)
    //                 .then((response) => {
    //                     phong.hinhAnh = response.data;
    //                     dispatch(actions.addRoom(phong));

    //                     props.isShowAddForm(false);
    //                     reset();

    //                     setSnackbarState(true);
    //                     setTimeout(function () {
    //                         setSnackbarState(false);
    //                     }, 3000);
    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 });
    //         } else {
    //             dispatch(actions.addRoom(phong));

    //             props.isShowAddForm(false);
    //             reset();

    //             setSnackbarState(true);
    //             setTimeout(function () {
    //                 setSnackbarState(false);
    //             }, 3000);
    //         }
    //     }

    // }

    const width = image.length ? 1000 : 500;


    return (
        <>
            <Dialog open={props.open} onClose={handleClose} maxWidth="100000px">
                <DialogTitle sx={{ fontSize: 18 }}>THÊM PHÒNG</DialogTitle>
                <Divider />

                <DialogContent>
                    <Grid container spacing={2} sx={{ width, marginTop: 1 }}>
                        <Grid item xs={image.length ? 6 : 12}>
                            <Grid container spacing={2}>
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
                                <Grid item xs={12} >
                                    <div style={{ border: "1px solid gray", borderRadius: "5px", padding: "10px 10px" }}>
                                        <input type="file" multiple accept="image/*" onChange={handleImage} inputProps={{ multiple: true, readOnly: props.isView }} id=" outlined-basic" variant="outlined" fullWidth />
                                    </div>
                                </Grid>

                                {/* <Grid item xs={12}>
                            {image && <img src={image[0]} alt="" style={{ width: 490, height: 350 }} />}
                        </Grid> */}

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
                        </Grid>
                        <Grid item xs={6} sx={{ paddingLeft: 3 }}>
                            <Grid container spacing={2}>
                                {
                                    image.length ? image.map((ima, index) => (
                                        <Card sx={{ maxWidth: 140, marginLeft: 1, marginTop: 2 }} key={index} >
                                            <CardActionArea>
                                                {/* <span >abc</span> */}
                                                <IconButton onClick={() => handleIma(ima, index)} style={{ position: "absolute", top: 0, right: 0 }}>
                                                    <CancelPresentationIcon />
                                                </IconButton>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={ima}
                                                    alt="green iguana"
                                                />
                                            </CardActionArea>
                                        </Card>
                                    )) : <></>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Hủy</Button>
                    <Button onClick={submit} variant="contained" autoFocus>Thêm</Button>
                </DialogActions>
            </Dialog>

            <div>
                <PositionedSnackbar open={snackbarState} message={"Thêm Thành Công."} />
            </div>
        </>
    )
}