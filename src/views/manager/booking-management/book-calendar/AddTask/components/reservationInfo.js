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
import Customer from "views/manager/account-manager/customer-management/Customer";

export default function ReservationInfo({ reservation, handleReservation, setReservation, token, complete, handleCompleteButton, handleComplete }) {

    const dispatch = useDispatch();
    // const account = useSelector((state) => state.account.userAuth);
    const listAccount = useSelector((state) => state.manager.listManager);
    useEffect(() => {
        dispatch(actions.fetchAllManager())
    }, [])

    const [list_room_hotel, setListRoomHotel] = useState([]);
    const room = useSelector((state) => state.room.empty_room);
    const currentRoom = useSelector(state => state.room.room_id);
    useEffect(() => {
        dispatch(actionRoom.get_by_id(token))
    }, [])

    useEffect(() => {
        let room_find = {
            trangThai: 0,
            ngayVao: reservation.ngayVao,
            ngayRa: reservation.ngayRa
        }
        dispatch(actionRoom.get_empty_room(room_find))

        let numberDate = countDate();
        let count = numberDate.days;
        if (numberDate.days < 0)
            count = 0
        else if (numberDate.days === 0) {
            if (numberDate.hours === 0 && numberDate.minutes === 0)
                count = 0
            else if (numberDate.hours < 12)
                count = 0.5
            else
                count = 1
        }
        else {
            if (numberDate.hours >= 18)
                count += 1
            else if (numberDate.hours >= 6)
                count += 0.5
        }
        if (checkin)
            handleReservation('tienCoc', count * currentRoom.loaiPhongid.donGia + currentRoom.loaiPhongid.donGia)
        else
            handleReservation('tienCoc', count * currentRoom.loaiPhongid.donGia)

    }, [reservation.ngayVao, reservation.ngayRa])
    useEffect(() => {
        if (room) {
            setListRoomHotel(room)
        }
    }, [room])

    const [checkin, setCheckin] = useState(false);
    useEffect(() => {
        let tienCoc = reservation.tienCoc;
        if (checkin) {
            handleReservation('tienCoc', tienCoc + currentRoom.loaiPhongid.donGia);
            setReservation({ ...reservation, tienCoc: tienCoc + currentRoom.loaiPhongid.donGia, checkIn: moment_t.tz(new Date(), "Asia/Ho_Chi_Minh").format() })
        }
        else {
            handleReservation('checkIn', null)
            if (tienCoc !== 0) {
                setReservation({ ...reservation, tienCoc: tienCoc - currentRoom.loaiPhongid.donGia, checkIn: null })
            }
        }

    }, [checkin])

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

    const countDate = () => {

        let offset = new Date(reservation.ngayRa).getTime() - new Date(reservation.ngayVao).getTime();

        const days = Math.floor(offset / 1000 / 60 / 60 / 24);

        offset -= days * 1000 * 60 * 60 * 24; // giảm offset đi

        const hours = Math.floor(offset / 1000 / 60 / 60);

        offset -= hours * 1000 * 60 * 60; // giảm offset đi

        const minutes = Math.floor(offset / 1000 / 60);

        offset -= minutes * 1000 * 60;

        const seconds = Math.floor(offset / 1000);

        // console.log(days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây");
        return {
            days,
            hours,
            minutes
        }
    }


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
                            views={['ngày', 'tháng', 'năm']}
                            renderInput={(props) => <TextField {...props} fullWidth />}
                            inputFormat="dd/MM/yyyy hh:mm a"
                            label="Ngày Vào"
                            value={reservation.ngayVao}
                            minDateTime={new Date(reservation.ngayLap)}
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
                        </Grid> :
                        <Grid item xs={12}>
                            <span style={{ marginLeft: 10, color: 'green', fontStyle: 'italic' }}>{countDate().days} ngày {countDate().hours} giờ {countDate().minutes} phút</span>
                        </Grid>

                }

                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={e => setCheckin(e.target.checked)} />} label="Check - In" />
                    </FormGroup>
                </Grid>

                {/* Tiền cọc */}
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                        value={formatCash(reservation.tienCoc)}
                        id="outlined-basic"
                        label="Tiền Cọc"
                        variant="outlined"
                        fullWidth
                        inputProps={{ readOnly: true, }}
                    />
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