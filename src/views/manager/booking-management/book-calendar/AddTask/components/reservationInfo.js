import { Checkbox, FormControlLabel, FormGroup, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as actionRoom from 'actions/room.action'
import * as actions from "actions/manager.action"
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import moment_t from "moment-timezone";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import imga from "assets/images/icons/room.png"
import NumberFormat from 'react-number-format';

export default function ReservationInfo({ reservation, handleReservation, token, complete, handleCompleteButton, handleComplete }) {

    const dispatch = useDispatch();
    // const account = useSelector((state) => state.account.userAuth);
    const listAccount = useSelector((state) => state.manager.listManager);
    useEffect(() => {
        dispatch(actions.fetchAllManager())
    }, [])

    const [list_room_hotel, setListRoomHotel] = useState([]);
    const room = useSelector((state) => state.room.empty_room);
    useEffect(() => {
        let room_find = {
            trangThai: 0,
            ngayVao: reservation.ngayVao,
            ngayRa: reservation.ngayRa
        }
        dispatch(actionRoom.get_empty_room(room_find))
    }, [reservation.ngayVao, reservation.ngayRa])
    useEffect(() => {
        if (room) {
            setListRoomHotel(room)
        }
    }, [room])

    const [stateRoom, setStateRoom] = useState(false);
    useEffect(() => {
        const temp = list_room_hotel.filter(e => e.id == token)[0];
        temp?.trangThaiHomNay !== 0 ?
            setStateRoom(true) :
            setStateRoom(false)
    }, [list_room_hotel])

    const nhanVien = listAccount.filter(e => e.id === reservation.nhanVienid)[0];

    const formatCash = (str) => {
        if (str === '') return '';
        return String(str).split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

    useEffect(() => {
        if (complete === true) {
            if (stateRoom && reservation.ngayVao <= reservation.ngayRa) {
                handleComplete();
            }
            handleCompleteButton(false);

        }
    }, [complete === true])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginTop: 5 }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Phiếu thuê</Typography>
                </Grid>

                {/* Nhan Vien - Ngay Lap */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={nhanVien?.ho + ' ' + nhanVien?.ten}
                        id="outlined-basic"
                        label="Nhân Viên"
                        variant="outlined"
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={moment(reservation.ngayLap).format('DD/MM/YYYY HH:mm:ss')}
                        id="outlined-basic"
                        label="Ngày Lập"
                        variant="outlined"
                        fullWidth
                        disabled
                    />
                </Grid>

                {/* Checkin - checkOut */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} fullWidth />}
                            inputFormat="dd/MM/yyyy hh:mm a"
                            label="Ngày Vào"
                            value={reservation.ngayVao}
                            onChange={(newValue) => {
                                handleReservation('ngayVao', moment_t.tz(newValue, "Asia/Ho_Chi_Minh").format());
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} fullWidth />}
                            inputFormat="dd/MM/yyyy hh:mm a"
                            label="Ngày Ra"
                            value={reservation.ngayRa}
                            minDateTime={new Date(reservation.ngayVao)}
                            onChange={(newValue) => {
                                handleReservation('ngayRa', moment_t.tz(newValue, "Asia/Ho_Chi_Minh").format());
                            }}
                        />
                    </LocalizationProvider>
                </Grid>

                {
                    !stateRoom ?
                        <Grid item xs={12}>
                            <WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /><span style={{ color: 'red', marginLeft: 10 }}>Thời gian không hợp lệ. Vui lòng chọn thời gian khác</span>
                        </Grid> : <></>
                }

                {/* Tiền cọc */}
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                        value={formatCash(reservation.tienCoc)}
                        id="outlined-basic"
                        label="Tiền Cọc"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => handleReservation('tienCoc', e.target.value.replaceAll(',', ''))}
                    />
                    {/* <NumberFormat customInput={TextField}
                        thousandSeparator={true}
                        id="tienCoc"
                        label="Tiền Cọc *"
                        variant="outlined"
                        helperText=" "
                        autoComplete='off'
                        name="tienCoc"
                        type="t"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                        }}
                        inputProps={{
                            maxLength: 15,
                        }}
                        fullWidth
                        value={reservation.tienCoc}
                        onChange={(e) => handleReservation('tienCoc', e.target.value)} /> */}
                </Grid>

                {/* Yêu Cầu */}
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                        value={reservation.yeuCau}
                        id="outlined-basic"
                        label="Yêu Cầu"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}

                        onChange={(e) => handleReservation('yeuCau', e.target.value)}

                    />
                </Grid>
            </Grid>
        </>
    )
}