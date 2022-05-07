import * as React from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { AppBar, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/bill.action";
import { useParams } from "react-router-dom";
import * as pay_actions from "actions/payment.action";
import { useLocation, useNavigate } from 'react-router';
import moment from "moment";
import logo from 'assets/images/logo.png'

import './payment.css';
import MenuIcon from '@mui/icons-material/Menu';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./printpdf.css"
import Download from '@mui/icons-material/Download';
export default function PrintPdf() {

    const { state } = useLocation()

    const [show_export, setShowExport] = useState({})
    useEffect(() => {
        if (state) {
            setShowExport(state)
        }
    }, [state])

    const exportPdf = () => {
        html2canvas(document.querySelector("#topdf")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a4', false)
            pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
            pdf.save("download.pdf");
        });

    }
    console.log("state", show_export)
    return (
        <div>
            <div className="toolbar">
                <Tooltip title="Tải về">
                    <IconButton aria-label="delete" size="large" color="secondary" onClick={exportPdf}>
                        <Download fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </div>
            <Paper sx={{
                width: '100%', overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                backgroundColor: '#e3f2fd'
            }}>

                <Grid id="topdf" container style={{ width: '70%', padding: 100, margin: 10, backgroundColor: 'white' }}>
                    <Grid item xs={4}>
                        <img src={logo} alt="logo" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={6}>
                        <span style={{ fontSize: 25, fontWeight: 'bold' }}>Hoteloca</span>
                        <p>Địa chỉ 294/65 Đường số 8 P11, Gò Vấp, Tp Hồ Chí Minh</p>
                        <p>Số điện thoại: 0353784735</p>
                        <p>Website: Hoteloca.com</p>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", margin: 30 }}>
                        <h1 style={{ color: "black" }}>HÓA ĐƠN THANH TOÁN DỊCH VỤ</h1>
                    </Grid>
                    <Grid item xs={6} style={{ marginBottom: 20 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <span >Tên khách hàng</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{show_export !== null ? show_export.tenKhachHang : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Địa chỉ</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>123 Hồ chí minh</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Điện thoại</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{show_export !== null && show_export.khachHang !== undefined ? show_export.khachHang.dienThoai : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Email</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{show_export !== null && show_export.khachHang ? show_export.khachHang.email : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Phòng</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{show_export !== null ? show_export.phong : ""}</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <span>Ngày vào</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{show_export !== null ? show_export.ngayVao : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Ngày đi</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{show_export !== null ? show_export.ngayRa : ""} </span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Tổng ngày ở</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{show_export !== null ? show_export.countDay + " Ngày" : ""}</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Thu ngân</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>khang@gmail.com</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Ngày thu</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>{show_export !== null ? show_export.ngayRa : ""} </span>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ borderTop: "1px solid gray" }}>
                        <h3 style={{ marginTop: 20 }}>Các dịch vụ đã sử dụng</h3>
                        <Table aria-label="simple table" style={{ marginBottom: 50 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Số thứ tự</TableCell>
                                    <TableCell align="right">Tên dịch vụ</TableCell>
                                    <TableCell align="right">Đơn giá (VND)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    show_export !== null && show_export.listDichvu ?
                                        show_export.listDichvu.map((row, i) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>
                                                    {i + 1}
                                                </TableCell>
                                                <TableCell align="right">{row.dichVuid.ten}</TableCell>
                                                <TableCell align="right">{new Intl.NumberFormat('en-Vn').format(row.dichVuid.donGia)}</TableCell>
                                            </TableRow>
                                        ))
                                        : <></>
                                }
                            </TableBody>
                        </Table>
                        <Grid container spacing={2}>
                            <Grid item xs={7}>

                            </Grid>
                            <Grid item xs={2}>
                                <span style={{ fontSize: 18 }}>Tiền phòng: </span>
                            </Grid>
                            <Grid item xs={3} style={{ textAlign: "right" }}>
                                <span style={{ fontWeight: "bold" }}>{new Intl.NumberFormat('en-Vn').format(show_export !== null ? show_export.giaPhong : 0) + " VND"}</span>
                            </Grid>
                            <Grid item xs={7}>
                            </Grid>
                            <Grid item xs={2}>
                                <span style={{ fontSize: 18 }}>Phí dịch vụ: </span>
                            </Grid>
                            <Grid item xs={3} style={{ textAlign: "right" }}>
                                <span style={{ fontWeight: "bold" }}>{new Intl.NumberFormat('en-Vn').format(show_export !== null ? show_export.phiDv : 0) + " VND"}</span>
                            </Grid>
                            <Grid item xs={7}>
                            </Grid>
                            <Grid item xs={2}>
                                <span style={{ fontSize: 18 }}>Đã trả trước: </span>
                            </Grid>
                            <Grid item xs={3} style={{ textAlign: "right" }}>
                                <span style={{ fontWeight: "bold" }}>{new Intl.NumberFormat('en-Vn').format(show_export !== null ? show_export.tienCoc : 0) + " VND"}</span>
                            </Grid>
                            <Grid item xs={7}>

                            </Grid>
                            <Grid item xs={2}>
                                <span style={{ fontSize: 18 }}>Tổng tiền: </span>
                            </Grid>
                            <Grid item xs={3} style={{ textAlign: "right" }}>
                                <span style={{ fontSize: 18, fontWeight: "bold" }}>{new Intl.NumberFormat('en-Vn').format(show_export !== null ? show_export.tongChiPhi : 0) + " VND"}</span>
                            </Grid>
                        </Grid>
                        <div style={{ textAlign: 'right', padding: 10 }}>
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'center' }}>
                        <p style={{ fontWeight: 'bold' }}>Đã bao gồm thuế VAT</p>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'center' }}>
                        <p style={{ fontWeight: 'bold' }}>Thu ngân</p>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'center' }}>
                        <p style={{ fontWeight: 'bold' }}>Khách hàng</p>
                    </Grid>
                    <div style={{ marginTop: 30 }}></div>
                </Grid>
            </Paper >
        </div>
    );
}
