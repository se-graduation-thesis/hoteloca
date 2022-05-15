import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Container, Grid, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { IconArrowNarrowLeft, IconPhone, IconSnowflake, IconToolsKitchen2, IconWifi } from '@tabler/icons'
import { useState } from "react";
import { Link } from "react-router-dom";
import CarouselRoomDetail from "./carousel_room-detail/CarouselRoomDetail";
import { useLocation } from "react-router";
import DialogCustom from '../../../DialogCustom'
import { useSelector } from "react-redux";
import './RoomDetail.css';

export default function RoomDetail() {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const { state } = useLocation()
    const account = useSelector((state) => state.account.userAuth);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }

    const onAddBill = () => {
        if (!account) {
            setOpen(true)
            return
        }
        navigate("/user-booking", { state: room })
    }
    return (
        <div className="room-detail">
            <Container sx={{ color: '#303030', mt: 5 }}>
                <h1 style={{ fontSize: 35, paddingLeft: 60 }}>{state?.loaiPhongid.ten}</h1>
                <div className="room-detail__body">
                    <div style={{ display: 'flex' }}>
                        <IconButton onClick={() => history.back()}>
                            <IconArrowNarrowLeft
                                style={{
                                    width: 40, height: 40,
                                    color: 'chocolate'
                                }} />
                        </IconButton>
                        <div style={{ borderLeft: "1px solid Chocolate", marginLeft: 30, paddingLeft: 30 }}>
                            <h1 style={{ lineHeight: 0 }}> {state?.ten}</h1>
                        </div>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <CarouselRoomDetail />
                    </div>

                    <div style={{ marginTop: 50, color: 'black' }}>
                        <div className="room-detail_info">
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <h2>Tính Chất: </h2>
                                </Grid>

                                <Grid item xs={8}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <p>Số người: {state?.loaiPhongid.soNguoi} </p>
                                            <p>Giường: {state?.loaiPhongid.soGiuong}</p>
                                        </Grid>

                                        {/* <Grid item xs={6}>
                                            <p>Size: 24 m2</p>
                                        </Grid> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>

                        <div className="room-detail_info">
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <h2>Thông Tin: </h2>
                                </Grid>

                                <Grid item xs={8}>
                                    <p style={{ whiteSpace: "pre-wrap", wordBreak: 'break-all' }}>
                                        {state?.loaiPhongid.moTa}
                                    </p>
                                </Grid>
                            </Grid>
                        </div>

                        <div className="room-detail_info">
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <h2>Điều kiện: </h2>
                                </Grid>

                                <Grid item xs={8}>
                                    <Link to="#">
                                        <p>
                                            Đọc chính sách của chúng tôi
                                        </p>
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>

                <div className="room-detail-book">
                    <div style={{ borderLeft: '1px solid chocolate', paddingLeft: 20 }}>
                        <p style={{ fontSize: 16 }}>Từ</p>
                        <h1>{new Intl.NumberFormat('en-Vn').format(state?.loaiPhongid.donGia) + " VND"}</h1>
                        <p style={{ fontSize: 16 }}>Mỗi đêm</p>
                    </div>

                    <div style={{ border: '1px solid chocolate', padding: 20, width: 280 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Button variant="contained" onClick={onAddBill} sx={{ height: 52, backgroundColor: 'Chocolate', color: 'white' }} fullWidth>Đặt Ngay</Button>
                            </Grid>
                        </Grid>
                    </div>
                    <DialogCustom open_dialog={open} handleClose={handleClose} />
                </div>
            </Container>
        </div>
    );
}