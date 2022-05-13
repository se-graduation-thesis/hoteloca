import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Edit from '@mui/icons-material/Edit';
import Payment from '@mui/icons-material/Payment';
import AddTaskIcon from '@mui/icons-material/AddTask';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/bill.action"
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
const columns = [
    { id: 'khachhang', label: 'Thông tin khách hàng', minWidth: 100 },
    { id: 'ngayVao', label: 'Ngày đến', minWidth: 100 },
    { id: 'ngayRa', label: 'Ngày đi', minWidth: 100 },
    { id: 'soluongphong', label: 'Số Lượng Phòng', minWidth: 100 },
    { id: 'tenPhong', label: 'Tên Phòng', minWidth: 100 },
    { id: 'trangThai', label: 'Trạng thái', minWidth: 100 },
];

export default function ListBill() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const rows = []
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const listBillByStatus = useSelector((state) => state.bill.listBillByStatusAccept);
    const [listBillByStatusShow, setListBillByStatusShow] = useState([])

    const account = useSelector((state) => state.account.userAuth);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        dispatch(actions.fetchBillByStatusAccept())
    }, [])
    useEffect(() => {
        if (listBillByStatus.length > 0 && listBillByStatus !== undefined) {
            listBillByStatus.forEach((e, i) => {
                e.ngayVao = e.ngayVao
                e.khachhang = e.khachHangid.ho + " " + e.khachHangid.ten
                e.ngayVao = moment(e.ngayVao).format('DD-MM-YYYY HH:mm:ss')
                e.ngayRa = moment(e.ngayRa).format('DD-MM-YYYY HH:mm:ss')
                if (e.checkIn)
                    e.checkIn = moment(e.checkIn).format('DD-MM-YYYY HH:mm:ss')

                if (e.chiTietPhieuThueList.length > 0) {

                    e.soluongphong = e.chiTietPhieuThueList.length;
                    let tenphong = "";
                    e.chiTietPhieuThueList.forEach((e1) => {
                        tenphong += e1.phongId.ten + " "
                        // listBillByStatus.loaiphong
                    });
                    e.tenPhong = tenphong
                }

            })
            let id = isJson(account) ? JSON.parse(account).user_id : account.user_id
            setListBillByStatusShow(listBillByStatus.filter(({ khachHangid }) => khachHangid.id === id))
        }
    }, [listBillByStatus])
    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    return (
        <div style={{ justifyContent: 'center', display: 'flex', height: 700 }}>
            <Paper sx={{ width: '70%', overflow: 'hidden', height: '100%' }}>
                <Grid container spacing={1} style={{ padding: 30 }} >
                    <Grid item xs={12}>
                        <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN CÁC ĐƠN ĐẶT HÀNG HIỆN CÓ</h3>
                    </Grid>
                    <Grid item xs={6}>
                        {/* <Button onClick={handleClickOpen} variant="contained" color="secondary">Thêm chi nhánh</Button>
                    <InsertBrandDialog open={open} isShowForm={handleClose} /> */}
                    </Grid>

                    {/* <Grid item xs={6} style={{ padding: 10, textAlign: "right" }}>
                    <TextField
                        label="Nhập nội dung tìm kiếm"
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid> */}
                </Grid>
                <TableContainer sx={{ height: '70%' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    key={"action"}
                                >
                                    {"Số thứ tự"}
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
                            {listBillByStatusShow
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                            <TableCell>
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
                                                <Tooltip title="Xem thông tin đơn đặt">
                                                    <IconButton key={row.stt} onClick={() => navigate(`/bill-info/${row.id}`)} aria-label="add-service" color="secondary">
                                                        <RoomServiceIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    {
                        listBillByStatusShow.length ?
                            <div></div>
                            :
                            <div style={{ textAlign: "center" }}>
                                <Typography style={{ padding: 30, fontSize: 16 }}>Không có đơn nào đã thanh toán </Typography>
                            </div>
                    }
                </TableContainer>

                <TablePagination
                    labelRowsPerPage='Số hàng'
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper >
        </div>
    );
}
