import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Typography, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import moment from "moment-timezone";
// import InsertBrandDialog from './InsertDialog'
// import UpdateBrand from './UpdateDialog'

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/payment.action"
import CardDay from "./CardDay"
import CardWeek from "./CardWeek"
import CardYear from "./CardYear"
import { ReceiptLong } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
const columns = [
    { id: 'maThanhToan', label: 'Mã Thanh Toán', minWidth: 100 },
    { id: 'ten', label: 'Họ Tên Khách Hàng', minWidth: 100 },
    { id: 'ngayThue', label: 'Ngày Thuê', minWidth: 100 },
    { id: 'ngayThanhToan', label: 'Ngày Thanh Toán', minWidth: 100 },
    { id: 'tienThu', label: 'Tiền thu', minWidth: 100 },
];

export default function PaymentManager() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const rows = []
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const listPayment = useSelector((state) => state.payment.all_payment);
    const [listPaymentShow, setListPayment] = useState([])
    const [checkRadio, setCheckRadio] = useState("1")
    const [textSearch, setTextSearch] = useState("")
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        dispatch(actions.get_all())
    }, [])

    ///DAy 
    const [monthSelect, setMonth] = React.useState(new Date().getMonth() + 1);
    const [yearSelect, setYearSelect] = React.useState(new Date().getFullYear());
    const [daySelect, setDaySelect] = React.useState(new Date().getDate());
    const [list_year, setListYear] = React.useState([]);
    const [list_day, setListDay] = React.useState([]);

    const list_month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    useEffect(() => {
        const year = new Date().getFullYear();
        const years = [];
        for (let i = 2021; i <= year; i++) {
            years.push(i)
        }
        setListYear(years)
    }, [])

    const setNow = () => {
        setMonth(new Date().getMonth() + 1);
        setYearSelect(new Date().getFullYear());
        setDaySelect(new Date().getDate())
    }
    useEffect(() => {
        let month_find = monthSelect - 1
        const date = new Date(yearSelect, month_find, 1);
        const dates = [];
        while (date.getMonth() === month_find) {
            dates.push(new Date(date).getDate());
            date.setDate(date.getDate() + 1);
        }
        setListDay(dates)
    }, [yearSelect, monthSelect])

    useEffect(() => {
        if (listPayment) {
            if (checkRadio === "1") {
                let payment = []
                listPayment.forEach((e, i) => {
                    let day = moment(e.ngayThanhToan).date();
                    let month = moment(e.ngayThanhToan).month() + 1;
                    let year = moment(e.ngayThanhToan).year();
                    if (day === daySelect && month === monthSelect && year === yearSelect) {
                        let pay = {
                            id: e.id,
                            phieuThueid: e.phieuThueid,
                            maThanhToan: e.maThanhToan,
                            ten: e.phieuThueid.khachHangid.ho + " " + e.phieuThueid.khachHangid.ten,
                            ngayThanhToan: moment(e.ngayThanhToan).format('DD-MM-YYYY HH:mm:ss'),
                            ngayThue: moment(e.phieuThueid.ngayVao).format('DD-MM-YYYY HH:mm:ss'),
                            tienThu: new Intl.NumberFormat('en-Vn').format(e.tongTienThanhToan) + " VND"
                        }
                        payment.push(pay)
                    }

                })
                setListPayment(payment)
            }
            if (checkRadio === "2") {
                let payment = []
                listPayment.forEach((e, i) => {
                    let month = moment(e.ngayThanhToan).month() + 1;
                    let year = moment(e.ngayThanhToan).year();
                    if (month === monthSelect && year === yearSelect) {
                        let pay = {
                            id: e.id,
                            phieuThueid: e.phieuThueid,
                            maThanhToan: e.maThanhToan,
                            ten: e.phieuThueid.khachHangid.ho + " " + e.phieuThueid.khachHangid.ten,
                            ngayThanhToan: moment(e.ngayThanhToan).format('DD-MM-YYYY HH:mm:ss'),
                            ngayThue: moment(e.phieuThueid.ngayVao).format('DD-MM-YYYY HH:mm:ss'),
                            tienThu: new Intl.NumberFormat('en-Vn').format(e.tongTienThanhToan) + " VND"
                        }
                        payment.push(pay)
                    }

                })
                setListPayment(payment)
            }
            if (checkRadio === "3") {
                let payment = []
                listPayment.forEach((e, i) => {
                    let year = moment(e.ngayThanhToan).year();
                    if (year === yearSelect) {
                        let pay = {
                            id: e.id,
                            phieuThueid: e.phieuThueid,
                            maThanhToan: e.maThanhToan,
                            ten: e.phieuThueid.khachHangid.ho + " " + e.phieuThueid.khachHangid.ten,
                            ngayThanhToan: moment(e.ngayThanhToan).format('DD-MM-YYYY HH:mm:ss'),
                            ngayThue: moment(e.phieuThueid.ngayVao).format('DD-MM-YYYY HH:mm:ss'),
                            tienThu: new Intl.NumberFormat('en-Vn').format(e.tongTienThanhToan) + " VND"
                        }
                        payment.push(pay)
                    }
                })
                setListPayment(payment)
            }
        }
    }, [listPayment, monthSelect, yearSelect, daySelect, checkRadio])
    console.log(listPaymentShow)
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h2 style={{ marginTop: 8 }}>QUẢN LÝ HÓA ĐƠN</h2>
                </Grid>
                <Grid item xs={4}>
                    <CardDay monthSelect={monthSelect} yearSelect={yearSelect} daySelect={daySelect} />
                </Grid>
                <Grid item xs={4}>
                    <CardWeek monthSelect={monthSelect} yearSelect={yearSelect} />
                </Grid>
                <Grid item xs={4}>
                    <CardYear yearSelect={yearSelect} />
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ margin: 0 }}>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Ngày</InputLabel>
                        <Select
                            labelId="ngay"
                            id="demo-simple-select"
                            value={daySelect}
                            size='small'
                            label="Ngày"
                            onChange={(e) => setDaySelect(e.target.value)}
                        >
                            {
                                list_day.map((e, i) => (
                                    <MenuItem key={i} value={e}>Ngày {e}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={monthSelect}
                            size='small'
                            label="Tháng"
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            {
                                list_month.map((e, i) => (
                                    <MenuItem key={i} value={e}>Tháng {e}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Năm</InputLabel>
                        <Select
                            labelId="demo-simple"
                            id="demo-simple"
                            value={yearSelect}
                            size='small'
                            label="Năm"
                            onChange={(e) => setYearSelect(e.target.value)}
                        >
                            {
                                list_year.map((e, i) => (
                                    <MenuItem key={i} value={e}>{e}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={2}>
                    <Button variant="contained" color='secondary' onClick={setNow}>Hiện tại</Button>
                </Grid>
                <Grid item xs={4} style={{ paddingRight: 30 }}>
                    <TextField
                        fullWidth
                        size='small'
                        id="outlined-basic"
                        label="Nhập mã hoặc hóa đơn tên khách hàng cần tìm"
                        variant="outlined"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={checkRadio}
                            onChange={(e) => setCheckRadio(e.target.value)}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Ngày" />
                            <FormControlLabel value="2" control={<Radio />} label="Tháng" />
                            <FormControlLabel value="3" control={<Radio />} label="Năm" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN CÁC HÓA ĐƠN ĐÃ THANH TOÁN TRONG
                        {
                            checkRadio === "1" ?
                                " NGÀY " + daySelect + "/" + monthSelect + "/" + yearSelect :
                                checkRadio === "2" ?
                                    " THÁNG " + monthSelect + "/" + yearSelect :
                                    " NĂM " + yearSelect
                        }
                    </h3>
                </Grid>
            </Grid>

            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                key={"id"}
                            >
                                {"STT"}
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                key={"action"}
                            >
                                {"Hành động"}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listPaymentShow.filter((e) => e.maThanhToan?.toLowerCase().includes(textSearch) || e.ten?.toLowerCase().includes(textSearch))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={i + 1}>
                                        <TableCell align={"center"}>
                                            {i + 1}
                                        </TableCell>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell key={row.stt}>
                                            <Tooltip title="Xem chi tiết hóa đơn">
                                                <IconButton key={row.stt} onClick={() => navigate(`/admin/booking-payment/${row.phieuThueid.id}`)} aria-label="delete" color="primary">
                                                    <ReceiptLong />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                {
                    listPaymentShow.length ?
                        <div></div>
                        :
                        <div style={{ textAlign: "center" }}>
                            <Typography style={{ padding: 30, fontSize: 16 }}>Không tìm thấy đơn nào đã thanh toán

                            </Typography>
                        </div>
                }
            </TableContainer>

            <TablePagination
                labelRowsPerPage='Số hàng'
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* <UpdateBrand open={openUpdate} id={id_brand} isShowForm={handleCloseUpdate} /> */}
        </Paper >

    );
}
