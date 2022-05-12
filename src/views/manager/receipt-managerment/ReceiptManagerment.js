import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Edit from '@mui/icons-material/Edit';
import moment from "moment";
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
    { id: 'stt', label: 'STT', minWidth: 1 },
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
    const account = useSelector((state) => state.account.userAuth);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const [id_brand, setId] = useState(0);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenUpdate = (id) => {
        setOpenUpdate(true);
        setId(id)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };

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

    useEffect(() => {
        if (listPayment) {
            listPayment.forEach((e, i) => {
                e.stt = i + 1
                e.ten = e.phieuThueid.khachHangid.ho + " " + e.phieuThueid.khachHangid.ten
                e.ngayThanhToan = moment(e.ngayThanhToan).format('DD-MM-YYYY HH:mm:ss')
                e.ngayThue = moment(e.phieuThueid.ngayVao).format('DD-MM-YYYY HH:mm:ss')
                e.tienThu = new Intl.NumberFormat('en-Vn').format(e.tongTienThanhToan) + " VND"
            })
            setListPayment(listPayment)
        }
    }, [listPayment])
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h2 style={{ marginTop: 8 }}>QUẢN LÝ HÓA ĐƠN</h2>
                </Grid>
                <Grid item xs={4}>
                    <CardDay />
                </Grid>
                <Grid item xs={4}>
                    <CardWeek />
                </Grid>
                <Grid item xs={4}>
                    <CardYear />
                </Grid>
            </Grid>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={4}>
                    <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN CÁC HÓA ĐƠN ĐÃ THANH TOÁN</h3>
                </Grid>
            </Grid>
            <TableContainer sx={{ height: '70%' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
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
                        {listPaymentShow
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.stt}>
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
            </TableContainer>

            <TablePagination
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
