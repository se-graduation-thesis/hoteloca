import * as React from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Button, Alert, AlertTitle, FormControl, Snackbar, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/bill.action";
import * as actionsBillDetail from "actions/bill-detail.action"
import { useParams } from "react-router-dom";
import * as pay_actions from "actions/payment.action";
import * as ser_bill_action from "actions/bill-service-detail.action"
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router';
import moment from "moment-timezone";

import './payment.css';
import NumberFormat from 'react-number-format';
export default function Payment() {

    const chipData = [
        { key: 0, label: 'primary' },
        { key: 1, label: 'secondary' },
        { key: 2, label: 'warning' },
        { key: 3, label: 'error' },
        { key: 4, label: 'info' },
        { key: 5, label: 'success' },
    ];
    let vertical = 'top';
    let horizontal = 'right';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bill } = useParams();
    const billDetail = useSelector((state) => state.bill.bill_by_id);

    const billServiceDetail = useSelector((state) => state.bill_service_detail.list_service_detail);
    const [billShow, setBillShow] = useState({})
    const [hoanTien, setHoanTien] = useState(0)
    const [billServiceDetailShow, setBillServiceDetailShow] = useState([])

    const [alertOpen, setAlertOpen] = useState(false);

    const [button, setButton] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    useEffect(() => {
        if (bill) {
            dispatch(actions.fetchById(bill))
        }
    }, [])
    useEffect(() => {
        if (bill) {
            dispatch(ser_bill_action.fetchAllBillDetailById(bill))
        }
    }, [])
    useEffect(() => {
        if (billServiceDetail) {
            setBillServiceDetailShow(billServiceDetail)
        }
    }, [billServiceDetail])

    useEffect(() => {
        if (billDetail !== null) {
            let gia = 0;
            let phiDv = 0;
            let phong = ""
            let numberDate = countDate(billDetail.ngayVao, billDetail.ngayRa);
            let count = numberDate.days;
            billDetail.chiTietPhieuThueList.forEach((e) => {
                gia += e.phongId.loaiPhongid.donGia
                phong += e.phongId.ten + " "
            });
            billServiceDetailShow.forEach((e) => {
                phiDv += e.dichVuid.donGia * e.soLuong
            })
            let data_bill_show = {};
            data_bill_show.tenKhachHang = billDetail.khachHangid.ho + " " + billDetail.khachHangid.ten
            data_bill_show.ngayRa = moment(billDetail.ngayRa).format('DD-MM-YYYY HH:mm:ss')
            data_bill_show.ngayVao = moment(billDetail.ngayVao).format('DD-MM-YYYY HH:mm:ss')
            data_bill_show.phong = phong
            // billDetail.tongDichvu = gia;
            data_bill_show.giaCheckin = billDetail.tienCoc


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
            data_bill_show.countDay = count

            data_bill_show.giaPhong = gia * count
            data_bill_show.tienCoc = billDetail.tienCoc
            data_bill_show.phiDv = phiDv
            data_bill_show.listDichvu = billServiceDetailShow
            data_bill_show.tongChiPhi = gia * count + phiDv
            data_bill_show.khachHang = billDetail.khachHangid
            data_bill_show.nhanVien = billDetail.nhanVienid
            setBillShow(data_bill_show)
        }

    }, [billDetail, billServiceDetailShow])
    console.log(billDetail)
    console.log(billServiceDetailShow)
    const countDate = (checkin, checkout) => {

        let offset = new Date(checkout).getTime() - new Date(checkin).getTime();

        const days = Math.floor(offset / 1000 / 60 / 60 / 24);

        offset -= days * 1000 * 60 * 60 * 24; // giảm offset đi

        const hours = Math.floor(offset / 1000 / 60 / 60);

        offset -= hours * 1000 * 60 * 60; // giảm offset đi

        const minutes = Math.floor(offset / 1000 / 60);

        offset -= minutes * 1000 * 60;

        const seconds = Math.floor(offset / 1000);

        return {
            days,
            hours,
            minutes
        }
    }
    const Change = (e) => {
        let value_hoan = e.target.value.replaceAll(",", "")
        if (value_hoan > billShow.tongChiPhi) {
            setHoanTien(value_hoan - billShow.tongChiPhi)
        } else {
            setHoanTien(0)
        }
    }
    const billDetails = useSelector(state => state.bill_detail.billDetailByBill);
    useEffect(() => {
        dispatch(actionsBillDetail.getBillDetailByBill(bill))
    }, [])

    const onSubmit = () => {
        if (billDetail !== null) {
            let payment = {
                maThanhToan: "TThoteloca" + String(moment.tz(new Date(), "Asia/Ho_Chi_Minh").format("DDMMYYhhmmss")),
                tongTienDichVu: billShow.phiDv,
                tongTienThanhToan: billShow.tongChiPhi,
                ngayThanhToan: new Date(),
                phieuThueid: bill
            }
            dispatch(pay_actions.addPay(payment))
            billDetails.forEach((e) => {
                if (e.trangThai === 0)
                    dispatch(actionsBillDetail.updateBillDetail(e.id));
            });

        }
        setButton(true)
        setAlertOpen(true)
        setTimeout(() => {
            navigate("/admin/export-pdf", { state: billShow });
        }, 2000)

    }
    const onExportPdf = () => {
        navigate("/admin/export-pdf", { state: billShow });
    }

    const renderButton = () => {
        if (billDetail) {
            if (billDetail.trangThai === 1 || billDetail.trangThai === 3) {
                return (
                    <Button disabled={button} variant="contained" size='large' endIcon={<PaidIcon />} color="secondary" onClick={onSubmit}>
                        Thanh Toán
                    </Button>
                )
            } else if (billDetail.trangThai === 2) {
                return (
                    <Button variant="contained" size='large' endIcon={<DescriptionIcon />} color="warning" onClick={onExportPdf}>
                        Xem hóa đơn
                    </Button>
                )
            }
        }

    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#e3f2fd' }}>
            <Grid container spacing={2} style={{ width: '100%', marginTop: 20 }} >
                <Grid item xs={6} >
                    <Paper className="componentPaper">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <span className="numberTitle">1</span><span className='lableTitle'>THÔNG TIN PHÒNG</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Tên khách hàng</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.tenKhachHang : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Vào lúc</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.ngayVao : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Ra lúc</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.ngayRa : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Phòng</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.phong : ""}</span>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="componentPaper">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <span className="numberTitle">2</span><span className='lableTitle'>TIỀN PHÒNG</span>
                            </Grid>
                            <Grid item xs={5}>
                                Số ngày ở
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{billShow !== null ? billShow.countDay + " Ngày" : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                Đã trả trước
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.tienCoc) + " VND" : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                Giá phòng khi check - in
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.giaCheckin) + " VND" : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                Giá phòng khi check - out
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.giaPhong) + " VND" : ""}</span>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className="componentPaper">
                        <Grid container>
                            <Grid item xs={12}>
                                <span className="numberTitle">3</span><span className='lableTitle'>CÁC DỊCH VỤ KHÁCH ĐÃ SỬ DỤNG</span>
                            </Grid>

                            {
                                billShow !== null && billShow.listDichvu !== undefined ?
                                    <Grid item xs={12} className="chipDisplay">
                                        {
                                            billShow.listDichvu.map((e, i) => (
                                                <Chip key={i} label={e.dichVuid.ten + " x" + e.soLuong + " " + new Intl.NumberFormat('en-Vn').format(e.dichVuid.donGia * e.soLuong) + " VND"} color={"secondary"} style={{ marginRight: 10 }} />
                                            ))
                                        }
                                    </Grid>
                                    : <></>
                            }
                            <Grid item xs={12} style={{ textAlign: "right" }}>
                                <span style={{ fontWeight: 'bold' }}>Tổng phí dịch vụ: </span>
                                <span style={{ fontWeight: 'bold', fontSize: 18 }}>{billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.phiDv) + " VND" : ""}</span>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className="componentPaper" style={{ marginTop: 10 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <span className="numberTitle">4</span><span className='lableTitle'>THANH TOÁN</span>
                            </Grid>
                            <Grid item xs={7}>
                                <Grid container spacing={1} >
                                    <Grid item xs={4}>
                                        <p style={{ fontWeight: 'bold' }}>Chi phí cần trả</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <p style={{ fontWeight: 'bold' }}>Tiền khách đưa</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <p style={{ fontWeight: 'bold' }}>Tiền thối lại</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id="outlined-basic"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                                inputProps: {
                                                    min: 0, readOnly: true
                                                }
                                            }}
                                            variant="outlined" fullWidth value={billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.tongChiPhi) : ""} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <NumberFormat customInput={TextField}
                                            thousandSeparator={true}
                                            disabled={billDetail?.trangThai === 2 ? true : false}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                                inputProps: { min: 0 }
                                            }}
                                            id="outlined-basic" variant="outlined" fullWidth onChange={(e) => Change(e)} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id="outlined-basic" variant="outlined"
                                            disabled={billDetail?.trangThai === 2 ? true : false}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                                inputProps: { min: 0, readOnly: true }
                                            }} fullWidth value={hoanTien !== 0 ? new Intl.NumberFormat('en-Vn').format(hoanTien) : ""} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p style={{ fontWeight: 'bold' }}>Ghi chú</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            disabled={billDetail?.trangThai === 2 ? true : false}
                                            placeholder="Nhập ghi chú"
                                            multiline
                                            rows={4}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={4} style={{ border: "1px solid #DFDFDE", borderRadius: 20, paddingLeft: 20 }} >
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <p style={{ fontWeight: 'bold', fontSize: 20 }}>Chi tiết chi phí</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold' }}>Phí phòng ở</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold' }}>{billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.giaPhong) + " VND" : ""}</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold' }}>Phí dịch vụ</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold' }}>{billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.phiDv) + " VND" : ""}</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold' }}>Đã trả trước</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold', color: 'red' }}>{billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.tienCoc) + " VND" : ""}</p>
                                    </Grid>
                                    {
                                        billShow.tienCoc > billShow.tongChiPhi ?
                                            <>
                                                <Grid item xs={6}>
                                                    <p style={{ fontWeight: 'bold' }}>Tiền hoàn lại</p>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <p style={{ fontWeight: 'bold', color: 'red' }}>{billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.tienCoc - billShow.tongChiPhi) + " VND" : ""}</p>
                                                </Grid> </> :
                                            <></>
                                    }
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold', fontSize: 20 }}>Tổng tiền</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold', color: 'red', fontSize: 24 }}>{billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.tongChiPhi) + " VND" : ""}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'right', marginTop: 20 }}>
                                {renderButton()}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid >
            </Grid >
            <Snackbar autoHideDuration={2000} open={alertOpen} anchorOrigin={{ vertical, horizontal }} onClose={handleClose} >
                <Alert variant="filled" severity="success"><AlertTitle>Thành công</AlertTitle>
                    Thông báo — <strong>Thanh toán thành công</strong></Alert>
            </Snackbar>
        </Paper >
    );
}
