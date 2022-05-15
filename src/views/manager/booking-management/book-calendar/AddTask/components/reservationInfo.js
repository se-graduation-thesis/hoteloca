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

export default function ReservationInfo({ reservation, handleReservation, completed, token, complete, handleCompleteButton, handleComplete }) {

    const dispatch = useDispatch();
    const listAccount = useSelector((state) => state.manager.listManager);
    useEffect(() => {
        dispatch(actions.fetchAllManager())
    }, [])

    const [data, setData] = useState({
        nhanVienid: reservation.nhanVienid,
        ngayLap: moment_t.tz(new Date(), "Asia/Ho_Chi_Minh").format(),
        ngayVao: moment_t.tz(reservation.ngayVao, "Asia/Ho_Chi_Minh").format(),
        ngayRa: moment_t.tz(reservation.ngayRa, "Asia/Ho_Chi_Minh").format(),
        checkIn: null,
        tienCoc: 0,
        trangThai: 1,
        yeuCau: '',
        khachHangid: null
    })

    const handleData = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const [list_room_hotel, setListRoomHotel] = useState([]);
    const room = useSelector((state) => state.room.empty_room);
    const currentRoom = useSelector(state => state.room.room_id);
    useEffect(() => {
        dispatch(actionRoom.get_by_id(token))
    }, [])

    useEffect(() => {
        let room_find = {
            trangThai: 0,
            ngayVao: data.ngayVao,
            ngayRa: data.ngayRa
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
            setData({ ...data, tienCoc: count * currentRoom.loaiPhongid.donGia + currentRoom.loaiPhongid.donGia })
        else
            setData({ ...data, tienCoc: count * currentRoom.loaiPhongid.donGia })


    }, [data.ngayVao, data.ngayRa])
    useEffect(() => {
        if (room) {
            setListRoomHotel(room)
        }
    }, [room])

    const [checkin, setCheckin] = useState(false);
    useEffect(() => {
        let tienCoc = data.tienCoc;
        if (checkin) {
            setData({ ...data, tienCoc: tienCoc + currentRoom.loaiPhongid.donGia, checkIn: moment_t.tz(new Date(), "Asia/Ho_Chi_Minh").format() })
        }
        else {
            setData({ ...data, checkIn: null })
            if (tienCoc !== 0) {
                setData({ ...data, tienCoc: tienCoc - currentRoom.loaiPhongid.donGia, checkIn: null })
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
            if (stateRoom && data.ngayVao <= data.ngayRa) {
                handleComplete();
                handleReservation(data)
            }
            handleCompleteButton(false);

        }
    }, [complete === true])

    const countDate = () => {

        let offset = new Date(data.ngayRa).getTime() - new Date(data.ngayVao).getTime();

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
                        inputProps={{ readOnly: true, }}
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={moment(data.ngayLap).format('DD/MM/YYYY HH:mm:ss')}
                        id="outlined-basic"
                        label="Ngày Lập"
                        variant="outlined"
                        fullWidth
                        inputProps={{ readOnly: true, }}
                    />
                </Grid>

                {/* Checkin - checkOut */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} fullWidth />}
                            inputFormat="dd/MM/yyyy hh:mm a"
                            label="Ngày Vào"
                            inputProps={{ readOnly: completed['1'], }}
                            disableOpenPicker={completed['1']}
                            value={data.ngayVao}
                            minDateTime={new Date(data.ngayLap)}
                            onChange={(newValue) => {
                                setData({ ...data, ngayVao: moment_t.tz(newValue, "Asia/Ho_Chi_Minh").format() });
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
                            inputProps={{ readOnly: completed['1'], }}
                            disableOpenPicker={completed['1']}
                            value={data.ngayRa}
                            minDateTime={new Date(data.ngayVao)}
                            onChange={(newValue) => {
                                setData({ ...data, ngayRa: moment_t.tz(newValue, "Asia/Ho_Chi_Minh").format() });
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
                        <FormControlLabel control={<Checkbox disabled={completed['1']} onChange={e => setCheckin(e.target.checked)} />} label="Check - In" />
                    </FormGroup>
                </Grid>

                {/* Tiền cọc */}
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                        value={formatCash(data.tienCoc)}
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
                        value={data.yeuCau}
                        id="outlined-basic"
                        label="Yêu Cầu"
                        name="yeuCau"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}

                        onChange={handleData}
                        inputProps={{ readOnly: completed['1'], }}
                    />
                </Grid>
            </Grid>
        </>
    )
}