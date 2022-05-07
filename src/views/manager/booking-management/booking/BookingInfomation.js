import * as React from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, AlertTitle, FormControl, Snackbar, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography, Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as actions from 'actions/room.action'
import * as actionPhongTN from 'actions/phongTN.action';
import * as actionService from 'actions/service.action';
import moment from "moment-timezone";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { nations } from "assets/nation"
import './payment.css';
import Formsy from 'formsy-react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
export default function BookingInfomation() {
    const dispatch = useDispatch()

    const { state } = useLocation()

    const [booking_info, setBookingInfo] = useState({
        khachHangid: 0,
        list_room_hotel: [],
        list_service: [],
        ngayLap: "",
        ngayRa: "",
        ngayVao: "",
        nhanVienid: 0,
        yeuCau: "",
    })
    useEffect(() => {
        if (state) {
            setBookingInfo(state)
        }
    }, [state])

    console.log(booking_info)

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#e3f2fd' }}>
            <Grid container spacing={2}>
                <Grid item xs={6} >
                    <Paper className="componentPaper">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <span className="numberTitle">1</span><span className='lableTitle'>THÔNG TIN KHÁCH HÀNG</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Tên khách hàng</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>nknkj</span>
                                {/* <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.tenKhachHang : ""}</span> */}
                            </Grid>
                            <Grid item xs={5}>
                                <span>CMND / CCCD</span>
                            </Grid>
                            <Grid item xs={7}>
                                {/* <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.ngayVao : ""}</span> */}
                            </Grid>
                            <Grid item xs={5}>
                                <span>Số điện thoại</span>
                            </Grid>
                            <Grid item xs={7}>
                                {/* <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.ngayRa : ""}</span> */}
                            </Grid>
                            <Grid item xs={5}>
                                <span>Email</span>
                            </Grid>
                            <Grid item xs={7}>
                                {/* <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.phong : ""}</span> */}
                            </Grid>
                            <Grid item xs={5}>
                                <span>Địa chỉ</span>
                            </Grid>
                            <Grid item xs={7}>
                                {/* <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.phong : ""}</span> */}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="componentPaper">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <span className="numberTitle">2</span><span className='lableTitle'>THÔNG TIN ĐẶT PHÒNG</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Nhân viên</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>nknkj</span>
                                {/* <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.tenKhachHang : ""}</span> */}
                            </Grid>
                            <Grid item xs={5}>
                                <span>Ngày lập</span>
                            </Grid>
                            <Grid item xs={7}>
                                {/* <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.ngayVao : ""}</span> */}
                            </Grid>
                            <Grid item xs={5}>
                                <span>Ngày vào</span>
                            </Grid>
                            <Grid item xs={7}>
                                {/* <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.ngayRa : ""}</span> */}
                            </Grid>
                            <Grid item xs={5}>
                                <span>Ngày ra</span>
                            </Grid>
                            <Grid item xs={7}>
                                {/* <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.phong : ""}</span> */}
                            </Grid>
                            <Grid item xs={5}>
                                <span>Tiền cọc</span>
                            </Grid>
                            <Grid item xs={7}>
                                {/* <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.phong : ""}</span> */}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="componentPaper">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <span className="numberTitle">3</span><span className='lableTitle'>DANH SÁCH PHÒNG ĐẶT</span>
                            </Grid>
                            <Grid item xs={12}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tên</TableCell>
                                            <TableCell align="center">Đơn Giá</TableCell>
                                            <TableCell align="center">Mô Tả</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {services.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.ten}
                                                    </TableCell>
                                                    <TableCell align="center">{row.donGia}</TableCell>
                                                    <TableCell align="center">{row.moTa}</TableCell>
                                                    <TableCell align="center"><Checkbox value={row.id} onChange={(e, checked) => handleService(e, checked)} /></TableCell>
                                                </TableRow>
                                            ))} */}
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="componentPaper">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <span className="numberTitle">4</span><span className='lableTitle'>DỊCH VỤ SỬ DỤNG</span>
                            </Grid>
                            <Grid item xs={12}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tên</TableCell>
                                            <TableCell align="center">Đơn Giá</TableCell>
                                            <TableCell align="center">Mô Tả</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {services.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.ten}
                                                    </TableCell>
                                                    <TableCell align="center">{row.donGia}</TableCell>
                                                    <TableCell align="center">{row.moTa}</TableCell>
                                                    <TableCell align="center"><Checkbox value={row.id} onChange={(e, checked) => handleService(e, checked)} /></TableCell>
                                                </TableRow>
                                            ))} */}
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid >

            {/* <Snackbar autoHideDuration={2000} open={alertOpen} anchorOrigin={{ vertical, horizontal }} onClose={handleClose} >
                    <Alert variant="filled" severity="success"><AlertTitle>Thành công</AlertTitle>
                        Thông báo — <strong>Thanh toán thành công</strong></Alert>
                </Snackbar> */}
        </Paper >
    );
}
