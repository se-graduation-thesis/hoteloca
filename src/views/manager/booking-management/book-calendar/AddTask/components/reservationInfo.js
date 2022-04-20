import { Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as actions from "actions/manager.action"
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function ReservationInfo() {


    const dispatch = useDispatch();
    const account = useSelector((state) => state.account.userAuth);

    const listAccount = useSelector((state) => state.manager.listManager);
    useEffect(() => {
        dispatch(actions.fetchAllManager())
    }, [])

    const [reservation, setReservation] = useState({
        nhanVienid: JSON.parse(account).user_id,
        ngayLap: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        ngayVao: new Date(),
        ngayRa: new Date(),
        tienCoc: '',
        trangThai: 1,
        yeuCau: ''
    })

    const nhanVien = listAccount.filter(e => e.id === reservation.nhanVienid)[0];

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginTop: 5 }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Phiếu Thuê</Typography>
                </Grid>

                {/* Nhan Vien - Ngay Lap */}
                <Grid item xs={6}>
                    <TextField
                        value={nhanVien?.ho + ' ' + nhanVien?.ten}
                        id="outlined-basic"
                        label="NhanVien"
                        variant="outlined"
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={moment(reservation.ngayLap).format('YYYY-MM-DD HH:mm:ss')}
                        id="outlined-basic"
                        label="Ngày Lập"
                        variant="outlined"
                        fullWidth
                        disabled

                        onChange={(e) => setCustomer({ ...customer, ten: e.target.value })}
                    />
                </Grid>

                {/* Checkin - checkOut */}
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} fullWidth />}
                            label="Ngày Vào"
                            value={reservation.ngayVao}
                            onChange={(newValue) => {
                                setReservation({ ...reservation, ngayVao: newValue });
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} fullWidth />}
                            label="Ngày Ra"
                            value={reservation.ngayRa}
                            minDateTime={reservation.ngayVao}
                            onChange={(newValue) => {
                                setReservation({ ...reservation, ngayRa: newValue });
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
        </>
    )
}