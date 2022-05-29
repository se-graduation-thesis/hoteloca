import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "actions/room.action";
import RoomItem from "./RoomItem";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Divider, Grid, InputAdornment, OutlinedInput, TextField } from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from "moment-timezone";
import * as actionsCategory from "actions/category.action"
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
export default function Rooms({ checkTime }) {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.room.empty_room);
    const listCategory = useSelector((state) => state.category.listCategory);
    const [listCategoryShow, setListCategory] = useState([])
    const [checkIn, setCheckIn] = useState(new Date);
    const [checkOut, setCheckOut] = useState(new Date((new Date()).valueOf() + 1000 * 3600 * 24));
    const [lp, setCategory] = useState(0);
    const [list_room_hotel, setListRoomHotel] = useState([]);
    const [open1, setOpen1] = React.useState(false);
    const [textAlert, setTextAlert] = useState("");
    const navigate = useNavigate()
    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    useEffect(() => {
        if (checkTime) {
            let room_find = {
                trangThai: 0,
                ngayVao: moment.tz(checkTime.checkin, "Asia/Ho_Chi_Minh").format(),
                ngayRa: moment.tz(checkTime.checkout, "Asia/Ho_Chi_Minh").format()
            }
            setCheckIn(checkTime.checkin)
            setCheckOut(checkTime.checkOut)
            dispatch(actions.get_empty_room(room_find))
        } else {
            let room_find = {
                trangThai: 0,
                ngayVao: moment.tz(new Date(), "Asia/Ho_Chi_Minh").format(),
                ngayRa: moment.tz(new Date((new Date()).valueOf() + 1000 * 3600 * 24), "Asia/Ho_Chi_Minh").format()
            }
            dispatch(actions.get_empty_room(room_find))
        }

    }, [])

    useEffect(() => {
        dispatch(actionsCategory.fetchAllCategory())
    }, [])
    useEffect(() => {
        if (listCategory) {
            setListCategory(listCategory)
        }
    }, [listCategory])
    useEffect(() => {
        if (rooms) {
            if (lp === 0) {
                setListRoomHotel(rooms.filter(({ trangThaiHomNay }) => trangThaiHomNay === 1))
            }
            else {
                setListRoomHotel(rooms.filter(({ trangThaiHomNay, loaiPhongid }) => trangThaiHomNay === 1 && loaiPhongid.id === lp))
            }
        }
    }, [rooms])
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const onFind = () => {
        if (checkIn < new Date(new Date().getTime() - 10 * 60000)) {
            handleClickOpen1()
            setTextAlert("Ngày vào phải lớn hơn hoặc bằng ngày hiện tại")
            return
        }
        if (checkOut < checkIn) {
            handleClickOpen1()
            setTextAlert("Ngày ra phải lớn hơn ngày vào")
            return
        }
        let room_find = {
            trangThai: 0,
            ngayVao: moment.tz(checkIn, "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(checkOut, "Asia/Ho_Chi_Minh").format()
        }
        dispatch(actions.get_empty_room(room_find))
    }
    return (
        <div>
            <div style={{ border: '1px solid Chocolate', padding: "10px 10px" }}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Check - In"
                                value={checkIn}
                                minDate={new Date()}
                                onChange={(newValue) => {
                                    setCheckIn(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Check - Out"
                                value={checkOut}
                                minDate={checkIn}
                                onChange={(newValue) => {
                                    setCheckOut(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Loại phòng</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={lp}
                                label="Loại phòng"
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>Tất cả các loại phòng</MenuItem>
                                {
                                    listCategoryShow.map((e, i) => (
                                        <MenuItem key={i} value={e.id}>{e.ten}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={onFind} variant="contained" sx={{ height: 52, backgroundColor: 'Chocolate', color: 'white' }} fullWidth>Tìm kiếm</Button>
                    </Grid>
                </Grid>
            </div>
            <hr style={{ border: '1px solid Chocolate' }} />
            <h2 style={{ color: "#707070" }}>Những Căn Phòng Của Chúng Tôi</h2>
            {
                list_room_hotel.length !== 0 ?
                    list_room_hotel.map((item) => <RoomItem key={item.id} room={item} />)
                    : <div style={{ width: "100%", height: 500, textAlign: "center", alignItems: "center" }}>
                        <SearchOffIcon style={{ fontSize: 200, paddingTop: 100 }} />
                        <p><b>KHÔNG TÌM THẤY PHÒNG NÀO NHƯ TIÊU CHÍ CỦA BẠN</b></p>
                    </div>
            }

            <Dialog
                open={open1}
                maxWidth={'xs'}
                fullWidth={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose1}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CancelOutlinedIcon color='error' sx={{ fontSize: 70 }} />
                    <span style={{ fontSize: 15, fontWeight: 'bold' }}>{textAlert}</span>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </div >


    )
}