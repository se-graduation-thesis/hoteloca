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
import { useNavigate } from 'react-router';
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
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function PrintPdf() {
    const exportPdf = () => {

        html2canvas(document.querySelector("#topdf")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a4', false)
            pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
            pdf.save("download.pdf");
        });

    }
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
                                <span style={{ fontWeight: 'bold' }}>Lê tuấn Khang</span>
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
                                <span style={{ fontWeight: 'bold' }}>0302106626145</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Email</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>khang@gmail.com</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Phòng</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>101 102</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <span>Ngày vào</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>Lê tuấn Khang</span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Ngày đi</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>123 Hồ chí minh </span>
                            </Grid>
                            <Grid item xs={5}>
                                <span>Tổng ngày ở</span>
                            </Grid>
                            <Grid item xs={7}>
                                <span style={{ fontWeight: 'bold' }}>0302106626145</span>
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
                                <span style={{ fontWeight: 'bold' }}>101 102</span>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ borderTop: "1px solid black" }}>
                        <h3 style={{ marginTop: 20 }}>Các dịch vụ đã sử dụng</h3>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div style={{ textAlign: 'right', padding: 10 }}>
                            <span>Tổng tiền: </span>
                            <span>1234543</span>
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
