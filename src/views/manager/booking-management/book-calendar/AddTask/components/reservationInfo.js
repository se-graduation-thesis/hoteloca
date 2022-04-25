import { Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as actions from "actions/manager.action"
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import imga from "assets/images/icons/room.png"

export default function ReservationInfo({ reservation, handleReservation }) {


    const dispatch = useDispatch();
    // const account = useSelector((state) => state.account.userAuth);
    const listAccount = useSelector((state) => state.manager.listManager);
    useEffect(() => {
        dispatch(actions.fetchAllManager())
    }, [])

    // const [reservation, setReservation] = useState({
    //     nhanVienid: JSON.parse(account).user_id,
    //     ngayLap: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
    //     ngayVao: new Date(),
    //     ngayRa: new Date(),
    //     tienCoc: '',
    //     trangThai: 1,
    //     yeuCau: ''
    // })

    const nhanVien = listAccount.filter(e => e.id === reservation.nhanVienid)[0];
    const [isOpen, setIsOpen] = useState(false);

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
                        value={moment(reservation.ngayLap).format('YYYY-MM-DD HH:mm:ss')}
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
                            label="Ngày Vào"
                            value={reservation.ngayVao}
                            onChange={(newValue) => {
                                handleReservation('ngayVao', moment(newValue).format('YYYY-MM-DDTHH:mm:ss'));
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} fullWidth />}
                            label="Ngày Ra"
                            value={reservation.ngayRa}
                            minDateTime={reservation.ngayVao}
                            onChange={(newValue) => {
                                handleReservation('ngayRa', moment(newValue).format('YYYY-MM-DDTHH:mm:ss'));
                            }}
                        />
                    </LocalizationProvider>
                </Grid>

                {/* Check box */}
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={() => setIsOpen(!isOpen)} />} label="Nhiều phòng" />
                    </FormGroup>
                </Grid>

                {/* Tiền cọc */}
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                        value={reservation.tienCoc}
                        id="outlined-basic"
                        label="Tiền Cọc"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => handleReservation('tienCoc', e.target.value)}
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

            <div style={{
                backgroundColor: 'white',
                position: "fixed",
                zIndex: 1,
                top: 0,
                bottom: 0,
                left: 700,
                width: !isOpen ? "0px" : "500px",
                transition: "width 1s",
                display: "block",
                visibility: !isOpen ? "hidden" : "visible",
                padding: "50px 20px 10px 10px"
            }}>
                <Grid container spacing={5}>
                    <Grid item xs={3}>
                        <img src={imga} alt="bk" width={"100%"} />
                        <p>Phòng 101</p>
                        <Checkbox
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <img src={imga} alt="bk" width={"100%"} />
                    </Grid><Grid item xs={3}>
                        <img src={imga} alt="bk" width={"100%"} />
                    </Grid><Grid item xs={3}>
                        <img src={imga} alt="bk" width={"100%"} />
                    </Grid><Grid item xs={3}>
                        <img src={imga} alt="bk" width={"100%"} />
                    </Grid><Grid item xs={3}>
                        <img src={imga} alt="bk" width={"100%"} />
                    </Grid>
                    <Grid item xs={3}>
                        <img src={imga} alt="bk" width={"100%"} />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}