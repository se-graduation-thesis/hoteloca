import Paper from '@mui/material/Paper';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import CellWifiOutlinedIcon from '@mui/icons-material/CellWifiOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as actions from 'actions/room.action'
import { Link, useNavigate } from 'react-router-dom';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';

export default function BrandManager() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const account = useSelector((state) => state.account.userAuth);
    const [checkin, setCheckIn] = useState(new Date)
    const [checkout, setCheckOut] = useState(new Date)
    const room = useSelector((state) => state.room.empty_room);
    const [list_room_hotel, setListRoomHotel] = useState([])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        let room_find = {
            ngayVao: null,
            ngayRa: null
        }
        dispatch(actions.get_empty_room(room_find))
    }, [])
    useEffect(() => {
        if (room) {
            setListRoomHotel(room)
        }
    }, [room])
    const onsubmit = () => {
        let room_find = {
            ngayVao: checkin,
            ngayRa: checkout
        }
        dispatch(actions.get_empty_room(room_find))
    }
    const onAllRoom = () => {
        let room = {
            ngayVao: null,
            ngayRa: null
        }
        dispatch(actions.get_empty_room(room))
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h3 style={{ marginTop: 8 }}>DANH SÁCH PHÒNG</h3>
                </Grid>

                {/* <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Loại Phòng</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            name="city"
                            label="Chi nhánh"
                        >

                            <MenuItem value="123">123</MenuItem>

                        </Select>
                    </FormControl>
                </Grid> */}
                <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} fullWidth />}
                            label="Ngày Vào"
                            value={checkin}
                            onChange={(newValue) => setCheckIn(newValue)}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} fullWidth />}
                            label="Ngày Ra"
                            value={checkout}
                            onChange={(newValue) => setCheckOut(newValue)}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} style={{ padding: 10, textAlign: "right" }}>
                    <Button style={{ marginRight: 10 }} color="primary" variant="contained" onClick={onAllRoom}>Tất cả phòng</Button>
                    <Button color="secondary" variant="contained" onClick={onsubmit}>Tìm kiếm</Button>
                </Grid>
            </Grid>

            <>
                <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                    {list_room_hotel.length !== 0 ?
                        list_room_hotel.map((e, i) => (
                            <Grid item xs={3} key={i}>
                                {/* < Link to="/admin/booking-calendar/" style={{ textDecoration: 'none' }}> */}
                                <Card style={{ backgroundColor: "#e3f2fd", border: '2px solid #e6e6e6' }}
                                    onClick={e.trangThai === 1 ? () => navigate(`/admin/booking-calendar/${e.id}`) : () => handleClickOpen()}
                                    disabled={false}
                                >
                                    <CardContent>
                                        <Typography variant="body2"
                                            style={{
                                                color: "black",
                                                textTransform: 'uppercase',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            PHÒNG: {e.ten}
                                        </Typography>
                                        <br></br>
                                        <Chip
                                            icon={e.trangThai === 1 ? < CheckCircleOutlinedIcon /> : <CancelOutlinedIcon />}
                                            label={e.trangThai === 1 ? "Đang hoạt động" : "Tạm ngưng"}
                                            color={e.trangThai === 1 ? "info" : "warning"}
                                        /><br></br>
                                        <div style={{ marginTop: 20 }}>
                                            <span style={{ fontWeight: "bold" }}>Loại phòng: </span> <span>{e.loaiPhongid.ten}</span>
                                        </div>
                                        <div style={{ marginTop: 5 }}>
                                            <span style={{ fontWeight: "bold" }}>Số giường: </span> <span>{e.loaiPhongid.soGiuong}</span>
                                        </div>
                                        <div style={{ marginTop: 5 }}>
                                            <span style={{ fontWeight: "bold" }}>Số người: </span> <span>{e.loaiPhongid.soNguoi}</span>
                                        </div>
                                    </CardContent>
                                    <CardActions >
                                        <IconButton size="small" aria-label="add to favorites">
                                            <CellWifiOutlinedIcon style={{
                                                color: "black",
                                            }} />
                                        </IconButton>
                                        <IconButton size="small" aria-label="share">
                                            <AcUnitOutlinedIcon style={{
                                                color: "black",
                                            }} />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                                {/* </Link> */}
                            </Grid>
                        )) :
                        <div style={{ textAlign: "center", width: "100%" }}>
                            <MapsHomeWorkOutlinedIcon sx={{ fontSize: 200 }} />
                            <h2>Thời gian này hiện tại không có phòng trống</h2>
                        </div>
                    }

                </Grid>
            </>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Không thể sử dụng phòng này"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Phòng này hiện tại đang ngừng hoạt động <br></br>vui lòng chọn phòng khác để sử dụng
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Đã hiểu</Button>
                </DialogActions>
            </Dialog>
        </Paper >

    );
}
