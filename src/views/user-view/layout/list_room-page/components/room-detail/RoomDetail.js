import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Container, Grid, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { IconArrowNarrowLeft, IconPhone, IconSnowflake, IconToolsKitchen2, IconWifi } from '@tabler/icons'
import { useState } from "react";
import { Link } from "react-router-dom";
import CarouselRoomDetail from "./carousel_room-detail/CarouselRoomDetail";

import './RoomDetail.css';

export default function RoomDetail() {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);

    return (
        <div className="room-detail">
            <Container sx={{ color: '#303030', mt: 5 }}>
                <h1 style={{ fontSize: 35, paddingLeft: 60 }}>Danh Sách Phòng</h1>
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
                            <h1 style={{ lineHeight: 0 }}> Junior Suite</h1>
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
                                            <p> Chỗ ở: 2 </p>
                                            <p>Giường: 2 Giường đôi</p>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <p>Size: 24 m2</p>
                                        </Grid>
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
                                    <p>
                                        Giá cả phải chăng, sang trọng.
                                        Các Suite Junior của chúng tôi là lựa chọn hoàn hảo nếu bạn đang tìm kiếm một chút sang trọng hơn.
                                        Với sơ đồ sàn rộng 400 foot vuông,
                                        các Suite Junior cung cấp thêm không gian mà bạn cần để trải dài và tận hưởng tầm nhìn ngoạn mục ra đường chân trời của thành phố.
                                    </p>
                                </Grid>
                            </Grid>
                        </div>

                        <div className="room-detail_info">
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <h2>Tiên Nghi: </h2>
                                </Grid>

                                <Grid item xs={8}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <IconSnowflake strokeWidth="1" style={{ marginRight: 25 }} /><span>A/C</span> <br /><br />
                                            <IconWifi strokeWidth="1" style={{ marginRight: 10, width: 30, height: 30 }} /> Wifi

                                        </Grid>

                                        <Grid item xs={6}>
                                            <IconPhone strokeWidth="1" style={{ marginRight: 10, width: 30, height: 30 }} /> Điện thoại <br /> <br />
                                            <IconToolsKitchen2 strokeWidth="1" style={{ marginRight: 10, width: 30, height: 30 }} /> Phòng bếp
                                        </Grid>
                                    </Grid>
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
                        <h1>2.500.000</h1>
                        <p style={{ fontSize: 16 }}>Mỗi đêm</p>
                    </div>

                    <div style={{ border: '1px solid chocolate', padding: 20, width: 280 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
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

                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
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

                            <Grid item xs={12}>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    defaultValue={1}
                                    type="number"
                                    startAdornment={<InputAdornment position="start">Người lớn</InputAdornment>}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    defaultValue={0}
                                    type="number"
                                    startAdornment={<InputAdornment position="start">Trẻ em</InputAdornment>}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button variant="contained" sx={{ height: 52, backgroundColor: 'Chocolate', color: 'white' }} fullWidth>Đặt Ngay</Button>
                            </Grid>
                        </Grid>
                    </div>

                </div>
            </Container>
        </div>
    );
}