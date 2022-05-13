import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Button, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as actions from "actions/bill.action";
import * as actionsBillDetail from "actions/bill-detail.action"
import * as pay_actions from "actions/payment.action";
import * as ser_bill_action from "actions/bill-service-detail.action"
import DescriptionIcon from '@mui/icons-material/Description';
import PaidIcon from '@mui/icons-material/Paid';
import moment from "moment";

export default function Payment() {
    let disabled = true

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bill } = useParams();
    const billDetail = useSelector((state) => state.bill.bill_by_id);
    const billServiceDetail = useSelector((state) => state.bill_service_detail.list_service_detail);
    const [billShow, setBillShow] = useState({})
    const [billServiceDetailShow, setBillServiceDetailShow] = useState([])
    const [button, setButton] = useState(false)

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
            let phong = []
            billDetail.chiTietPhieuThueList.forEach((e) => {
                gia += e.phongId.loaiPhongid.donGia
                phong.push(e.phongId)
            });
            billServiceDetailShow.forEach((e) => {
                phiDv += e.dichVuid.donGia
            })
            let data_bill_show = {};
            data_bill_show.nhanVienid = billDetail.khachHangid
            data_bill_show.ngayRa = billDetail.ngayRa
            data_bill_show.ngayVao = billDetail.ngayVao
            data_bill_show.phong = phong
            // billDetail.tongDichvu = gia;
            data_bill_show.giaCheckin = gia
            data_bill_show.countDay = Math.round(DaysBetween(billDetail.ngayVao, billDetail.ngayRa))
            data_bill_show.giaPhong = gia * Math.round(DaysBetween(billDetail.ngayVao, billDetail.ngayRa))
            data_bill_show.tienCoc = billDetail.tienCoc
            data_bill_show.phiDv = phiDv
            data_bill_show.listDichvu = billServiceDetailShow
            data_bill_show.tongChiPhi = gia * Math.round(DaysBetween(billDetail.ngayVao, billDetail.ngayRa)) + phiDv
            data_bill_show.khachHang = billDetail.khachHangid
            data_bill_show.nhanVien = billDetail.nhanVienid
            setBillShow(data_bill_show)
        }

    }, [billDetail, billServiceDetailShow])

    function DaysBetween(start, end) {
        const oneDay = 1000 * 60 * 60 * 24;
        let day = (treatAsUTC(end) - treatAsUTC(start)) / oneDay
        if (day == 0) {
            day = 1
        }
        return day;
    }
    function treatAsUTC(date) {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }
    const billDetails = useSelector(state => state.bill_detail.billDetailByBill);
    useEffect(() => {
        dispatch(actionsBillDetail.getBillDetailByBill(bill))
    }, [])

    return (
        <div style={{ justifyContent: 'center', display: 'flex' }}>
            <Paper sx={{ width: '70%', overflow: 'hidden', height: '100%', padding: 10 }}>
                <Grid container>
                    <Grid item xs={12}>
                        <h2>Chi tiết thuê phòng</h2>
                    </Grid>
                    <Grid item xs={12} style={{ backgroundColor: "#fafafa", padding: 20, border: "1px solid #c7c7c7" }}>
                        <p><b>Nhận phòng: </b> {moment(billShow?.ngayVao).format("DD/MM/yyy hh:mm a")}</p>
                        <p><b>Trả phòng: </b>{moment(billShow?.ngayRa).format("DD/MM/yyy hh:mm a")}</p>
                    </Grid>
                    <Grid item xs={12}>
                        <h3>Chi tiết đặt phòng</h3>
                    </Grid>
                    <Grid item xs={12} style={{ backgroundColor: "#fafafa", padding: 20, border: "1px solid #c7c7c7" }}>
                        {
                            billShow?.phong?.map((e) => (
                                <span style={{ color: "black", fontWeight: "bold", paddingRight: 20 }}>{e.ten + "( " + e.loaiPhongid.ten + " )"} </span>

                            ))
                        }

                        <p style={{ color: "black", fontWeight: "bold" }}>Số ngày: {billShow.countDay + " Ngày"} </p>
                        <div style={{ width: "100%", textAlign: "right" }}>
                            <p style={{ color: "black", fontWeight: "bold" }}>Tổng tiền {new Intl.NumberFormat('en-Vn').format(billShow.tienCoc) + " VND"} </p>
                        </div>
                    </Grid>
                    <Grid item xs={12}>

                        <Grid container >
                            <Grid item xs={6} >
                                <h3>Tổng giá trị</h3>
                            </Grid>
                            <Grid item xs={6} >
                                <h3>Thông tin khách hàng</h3>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container spacing={1}>
                            <Grid item xs={6} >
                                <Grid container >
                                    <Grid item xs={12} style={{ backgroundColor: "#fafafa", padding: 20, border: "1px solid #c7c7c7" }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <p>Giá phòng</p>
                                            </Grid>
                                            <Grid item xs={6} style={{ textAlign: 'right' }}>
                                                <p>{new Intl.NumberFormat('en-Vn').format(billShow.tienCoc) + " VND"}</p>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <p style={{ color: "black", fontWeight: "bold" }}>Tổng giá</p>
                                            </Grid>
                                            <Grid item xs={6} style={{ textAlign: 'right' }}>
                                                <p style={{ color: "black", fontWeight: "bold" }}>{new Intl.NumberFormat('en-Vn').format(billShow.tienCoc) + " VND"}</p>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <p >Giá bao gồm thuế</p>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p></p>
                                    </Grid>
                                    <Grid item xs={12} style={{ backgroundColor: "#fafafa", padding: 20, border: "1px solid #c7c7c7" }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <p style={{ color: "black", fontWeight: "bold" }}>Số tiền đặt cọc</p>
                                            </Grid>
                                            <Grid item xs={6} style={{ textAlign: 'right' }}>
                                                <p style={{ color: "black", fontWeight: "bold" }}>{new Intl.NumberFormat('en-Vn').format(billShow.tienCoc) + " VND"}</p>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} style={{ height: "revert" }} >
                                <Grid container style={{ height: "100%" }}>
                                    <Grid container style={{ backgroundColor: "#fafafa", padding: 20, border: "1px solid #c7c7c7" }}>
                                        <Grid item xs={6}>
                                            <span style={{ color: 'black', fontWeight: 'bold' }}>Chứng minh nhân dân</span>
                                            <p>{billShow?.nhanVienid?.cmnd}</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <span style={{ color: 'black', fontWeight: 'bold' }}>Số điện thoại</span>
                                            <p>{billShow?.nhanVienid?.ho}</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <span style={{ color: 'black', fontWeight: 'bold' }}>Họ</span>
                                            <p>{billShow?.nhanVienid?.ho}</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <span style={{ color: 'black', fontWeight: 'bold' }}>Tên</span>
                                            <p>{billShow?.nhanVienid?.ten}</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <span style={{ color: 'black', fontWeight: 'bold' }}>Email</span>
                                            <p>{billShow?.nhanVienid?.email}</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <span style={{ color: 'black', fontWeight: 'bold' }}>Quốc tịch</span>
                                            <p>{billShow?.nhanVienid?.quocTich}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
