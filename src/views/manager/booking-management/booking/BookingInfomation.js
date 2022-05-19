import * as React from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Grid, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import './payment.css';
import moment from "moment-timezone";

import * as actions from 'actions/room.action'
import * as actionPhongTN from 'actions/phongTN.action';
import * as actionService from 'actions/service.action';
import * as actionBillDetail from 'actions/bill-detail.action';
import * as actionBill from 'actions/bill.action';
import * as actionBillService from 'actions/bill-service.action';
import * as actionBillDetailService from 'actions/bill-service-detail.action';
import * as actionManager from 'actions/manager.action';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function BookingInfomation() {
    const dispatch = useDispatch()
    const { state } = useLocation()
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = useState(false)
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };
    function handleClick() {
        setLoading(true);
    }
    const [booking_info, setBookingInfo] = useState({
        khachHangid: 0,
        list_room_hotel: [],
        list_service: [],
        ngayLap: new Date,
        ngayRa: new Date,
        ngayVao: new Date,
        bill: null,
        nhanVienid: 0,
        yeuCau: "",
        tienCoc: 0,
        phiPhong: 0
    })

    useEffect(() => {
        let tienCoc = state.tienCoc;
        let tienPhong = state.phiPhong;
        if (checked) {
            setBookingInfo({ ...state, tienCoc: tienCoc + tienPhong, checkIn: moment.tz(new Date(), "Asia/Ho_Chi_Minh").format() })
        }
        else {
            setBookingInfo({ ...state, checkIn: null })
            if (tienCoc !== 0) {
                setBookingInfo({ ...state, tienCoc: tienCoc, checkIn: null })
            }
        }
    }, [checked, state])
    const listAccount = useSelector((state) => state.manager.listManager);
    useEffect(() => {
        dispatch(actionManager.fetchAllManager())
    }, [])
    const nhanVien = listAccount.filter(e => e.id === state.nhanVienid)[0];

    const onSubmit = () => {
        actionBill.addBill(booking_info).then((response) => {
            const phieuThueid = response.data;
            booking_info.list_room_hotel.forEach((e) => {
                const billDetail = {
                    phieuThueid: phieuThueid.id,
                    phongId: e.id,
                    ngayVao: phieuThueid.ngayVao,
                    ngayRa: phieuThueid.ngayRa,
                    trangThai: 1
                }
                dispatch(actionBillDetail.addBillDetail(billDetail));
            })
            if (booking_info.list_service.length) {
                const billService = {
                    ngayLap: moment.tz(new Date, "Asia/Ho_Chi_Minh").format(),
                    tongTien: 0,
                    ghiChu: "",
                    phieuThueid: phieuThueid
                }
                actionBillService.add_bill_service(billService).then((response) => {
                    booking_info.list_service.forEach((item) => {
                        dispatch(actionBillDetailService.add_bill_service_detail({
                            dichVuid: item.id,
                            soLuong: item.soLuong,
                            hoaDonDichVuid: response.data.id
                        }))
                    })
                })
            }
            handleClick();
            setTimeout(() => {
                setOpen(true)
            }, 3000)
            setTimeout(() => {
                navigate("/admin/update-booking/" + phieuThueid.id);
            }, 6000)
        }
        )
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#e3f2fd' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ marginBottom: 10 }}>
                    <Paper style={{ padding: 10 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <span className='lableTitle'>CHI TIẾT ĐẶT PHÒNG</span>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6} >
                    <Paper className="componentPaper">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <span className="numberTitle">1</span><span className='lableTitle'>THÔNG TIN KHÁCH HÀNG</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Tên khách hàng</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{booking_info.bill !== null ? booking_info.bill.ho + " " + booking_info.bill.ten : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>CMND / CCCD</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{booking_info.bill !== null ? booking_info.bill.cmnd : ""}</span>                            </Grid>
                            <Grid item xs={5}>
                                <span>Số điện thoại</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{booking_info.bill !== null ? booking_info.bill.dienThoai : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Email</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{booking_info.bill !== null ? booking_info.bill.email : ""}</span>                            </Grid>
                            <Grid item xs={5}>
                                <span>Địa chỉ</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{booking_info.bill !== null ? booking_info.bill.diaChi : ""}</span>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="componentPaper">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <span className="numberTitle">2</span><span className='lableTitle'>THÔNG TIN ĐẶT PHÒNG</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Nhân viên</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{nhanVien?.ho + " " + nhanVien?.ten}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Ngày lập</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{moment(booking_info.ngayLap).format('DD-MM-YYYY HH:mm:ss')}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Ngày vào</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{moment(booking_info.ngayVao).format('DD-MM-YYYY HH:mm:ss')}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Ngày ra</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{moment(booking_info.ngayRa).format('DD-MM-YYYY HH:mm:ss')}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Tiền cọc</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{new Intl.NumberFormat('en-Vn').format(booking_info.tienCoc) + " VND"}</span>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Paper className="componentPaper" style={{ height: "100%" }}>
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
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {booking_info.list_room_hotel.map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.ten}
                                                        </TableCell>
                                                        <TableCell align="center">{new Intl.NumberFormat('en-Vn').format(row.loaiPhongid.donGia) + " VND"}</TableCell>
                                                        <TableCell align="center">{row.moTa}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className="componentPaper" style={{ height: "100%" }}>
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
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {booking_info.list_service.map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.ten}
                                                        </TableCell>
                                                        <TableCell align="center">{new Intl.NumberFormat('en-Vn').format(row.donGia) + " VND"}</TableCell>
                                                        <TableCell align="center">{row.moTa}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{ textAlign: "right", padding: 10 }}>
                        <FormControlLabel control={<Checkbox onChange={(e) => { setChecked(e.target.checked) }} />} label="Check In tại chỗ" />
                    </Paper>
                </Grid>

                <Grid item xs={12}>

                    <Paper style={{ textAlign: "right", padding: 10 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={8} style={{ textAlign: 'left' }}></Grid>
                            <Grid item xs={2} style={{ textAlign: 'right' }}>
                                <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>Số ngày ở : </span>
                            </Grid>
                            <Grid item xs={2} style={{ textAlign: 'right' }}>
                                <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>{booking_info.count} Ngày</span>
                            </Grid>
                            <Grid item xs={8} style={{ textAlign: 'right' }}></Grid>
                            <Grid item xs={2} style={{ textAlign: 'right' }}>
                                <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>Tiền phòng : </span>
                            </Grid>
                            <Grid item xs={2} style={{ textAlign: 'right' }}>
                                <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>{new Intl.NumberFormat('en-Vn').format(booking_info.phiPhong) + " VND"}</span>
                            </Grid>
                            <Grid item xs={8} style={{ textAlign: 'right' }}></Grid>
                            <Grid item xs={2} style={{ textAlign: 'right' }}>
                                <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>Phí dịch vụ : </span>
                            </Grid>
                            <Grid item xs={2} style={{ textAlign: 'right' }}>
                                <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>{new Intl.NumberFormat('en-Vn').format(booking_info.phiDv) + " VND"}</span>
                            </Grid>
                            <Grid item xs={8} style={{ textAlign: 'right' }}></Grid>
                            <Grid item xs={2} style={{ textAlign: 'right' }}>
                                <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>TỔNG TIỀN CỌC PHẢI TRẢ: </span>
                            </Grid>
                            <Grid item xs={2} style={{ textAlign: 'right' }}>
                                <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>{new Intl.NumberFormat('en-Vn').format(booking_info.tienCoc) + " VND"}</span>
                            </Grid>
                        </Grid>
                        <LoadingButton
                            color="secondary"
                            onClick={onSubmit}
                            loading={loading}
                            loadingPosition="start"
                            style={{ marginTop: 20, marginBottom: 20 }}
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            Đặt Phòng
                        </LoadingButton>
                    </Paper>
                </Grid>

            </Grid >
            <Dialog
                open={open}
                maxWidth={'xs'}
                fullWidth={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CheckCircleTwoToneIcon color='success' sx={{ fontSize: 70 }} />
                    <span style={{ fontSize: 18, fontWeight: 'bold' }}>Đặt phòng thành công</span>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Paper >
    );
}
