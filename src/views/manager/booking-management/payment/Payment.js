import * as React from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/bill.action";
import { useParams } from "react-router-dom";
import * as pay_actions from "actions/payment.action";
import { useNavigate } from 'react-router';
import moment from "moment";

import './payment.css';
export default function Payment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bill } = useParams();
    const billDetail = useSelector((state) => state.bill.bill_by_id);
    const [billShow, setBillShow] = useState({
        tenKhachHang: ''
    })
    const [hoanTien, setHoanTien] = useState(0)
    useEffect(() => {
        if (bill) {
            dispatch(actions.fetchById(bill))
        }
    }, [])

    useEffect(() => {
        if (billDetail !== null) {
            billDetail.tenKhachHang = billDetail.khachHangid.ho + " " + billDetail.khachHangid.ten
            let gia = 0;
            billDetail.chiTietPhieuThueList.forEach((e1) => {
                gia += e1.phongId.donGia
            });
            billDetail.tongDichvu = gia;
            billDetail.giaCheckin = billDetail.chiTietPhieuThueList[0].phongId.donGia
            billDetail.giaPhong = gia * DaysBetween(billDetail.ngayVao, billDetail.ngayRa)
            billDetail.countDay = DaysBetween(billDetail.ngayVao, billDetail.ngayRa)
            billDetail.ngayRa = moment(billDetail.ngayRa).format('DD-MM-YYYY HH:mm:ss')
            billDetail.ngayVao = moment(billDetail.ngayVao).format('DD-MM-YYYY HH:mm:ss')
            setBillShow(billDetail)
        }

    }, [billDetail])

    function DaysBetween(start, end) {
        const oneDay = 1000 * 60 * 60 * 24;
        return (treatAsUTC(end) - treatAsUTC(start)) / oneDay;
    }
    function treatAsUTC(date) {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }
    const Change = (e) => {
        if (billDetail !== null) {
            if (e.target.value > billDetail.giaPhong) {
                setHoanTien(e.target.value - billDetail.giaPhong)
            } else {
                setHoanTien(0)
            }
        }

    }
    const onSubmit = () => {
        if (billDetail !== null) {
            let payment = {
                tongTienDichVu: billDetail.tongDichvu,
                tongTienThanhToan: billDetail.giaPhong,
                phieuThueid: bill
            }
            dispatch(pay_actions.addPay(payment))
        }
        window.alert("Thanh toán thành công")
        navigate("/admin/list-booking");
    }
    console.log(billShow)
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
                                <span style={{ fontWeight: 'bold' }}>101 102</span>
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
                            <Grid item xs={5}>
                                Đã trả trước
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.tienCoc) + " VND" : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                Tổng tiền phòng
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.tienCoc) + " VND" : ""}</span>
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
                            <Grid item xs={12} className="chipDisplay">
                                <Chip label="primary" color="primary" />
                                <Chip label="primary" color="secondary" />
                                <Chip label="primary" color="warning" />
                                <Chip label="primary" color="error" />
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
                                        <TextField id="outlined-basic" inputProps={
                                            { readOnly: true, }
                                        } variant="outlined" fullWidth value={billShow !== null ? new Intl.NumberFormat('en-Vn').format(billShow.giaPhong) + " VND" : ""} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id="outlined-basic" variant="outlined" fullWidth onChange={(e) => Change(e)} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id="outlined-basic" variant="outlined" inputProps={
                                            { readOnly: true, }
                                        } fullWidth value={hoanTien !== 0 ? new Intl.NumberFormat('en-Vn').format(hoanTien) + " VND" : ""} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p style={{ fontWeight: 'bold' }}>Ghi chú</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            placeholder="Nhập ghi chú"
                                            multiline
                                            rows={4}
                                            maxRows={15}
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
                                        <p style={{ fontWeight: 'bold' }}>2000000</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold' }}>Phí dịch vụ</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold' }}>3000</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold' }}>Đã trả trước</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold' }}>3000</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold', fontSize: 20 }}>Tổng tiền</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{ fontWeight: 'bold', color: 'red', fontSize: 24 }}>3000000</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'right', marginTop: 20 }}>
                                <Button variant="contained" size='large' endIcon={<PaidIcon />} color="secondary" onClick={onSubmit}>
                                    Thanh Toán
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid >
            </Grid >
        </Paper >
    );
}
