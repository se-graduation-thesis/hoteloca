import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CancelBooking from './CancelBooking'
import UpdateBrand from './UpdateBrand'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/bill.action"
import moment from 'moment';
import CheckIn from './CheckIn';
const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'maHoaDon', label: 'Mã Phiếu Thuê', minWidth: 100 },
    { id: 'khachhang', label: 'Thông tin khách hàng', minWidth: 100 },
    { id: 'ngayVao', label: 'Ngày đến', minWidth: 100 },
    { id: 'ngayRa', label: 'Ngày đi', minWidth: 100 },
    // { id: 'loaiphong', label: 'Loại Phòng', minWidth: 100 },
    { id: 'soluongphong', label: 'Số Lượng Phòng', minWidth: 100 },
    { id: 'tenPhong', label: 'Tên Phòng', minWidth: 100 },
    // { id: 'trangThai', label: 'Ghi chú', minWidth: 100 },
    { id: 'checkIn', label: 'Check-In', minWidth: 100 },

];

export default function BookingLate() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const rows = []
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const listBillByStatus = useSelector((state) => state.bill.listBillByStatusLate);
    const [listInit, setListInit] = useState([])
    const [listBillByStatusShow, setListBillByStatusShow] = useState([])
    const [searchContent, setSearchContent] = React.useState("");

    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const [id_brand, setId] = useState(0);
    const [cancelState, setCancelState] = useState(false);
    const [cancelObject, setCancelObject] = useState({})
    const handleCancelState = (value) => {
        setCancelState(value);
    }

    const handleFilter = (value) => {
        setListBillByStatusShow(listBillByStatusShow.filter(e => e.id !== value));
    }

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
        dispatch(actions.fetchBillByStatusLate())
    }, [])
    useEffect(() => {
        if (listBillByStatus.length > 0 && listBillByStatus !== undefined) {
            listBillByStatus.forEach((e, i) => {
                e.stt = i + 1;
                e.checkOut = e.ngayRa
                e.ngayVao = e.ngayVao
                e.khachhang = e.khachHangid.ho + " " + e.khachHangid.ten
                e.ngayVao = moment(e.ngayVao).format('DD-MM-YYYY HH:mm:ss')
                e.ngayRa = moment(e.ngayRa).format('DD-MM-YYYY HH:mm:ss')
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
            setListBillByStatusShow(listBillByStatus)
            setListInit(listBillByStatus)
        }
    }, [listBillByStatus])

    const [checkInState, setCheckInState] = useState(false);
    const [checkInObject, setCheckInObject] = useState({})
    const handleCheckInState = (value) => setCheckInState(value);
    const onCheckIn = (row) => {
        handleCheckInState(true);
        setCheckInObject(row);
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
            <Grid container spacing={1} style={{ padding: 10 }}>
                <Grid item xs={12}>
                    <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN CÁC ĐƠN ĐẶT HÀNG ĐÃ QUÁ HẠN</h3>
                </Grid>
                <Grid item xs={8}>

                </Grid>

                <Grid item xs={4} style={{ padding: 10, textAlign: "right" }}>
                    <TextField
                        fullWidth
                        label="Nhập tên Khách hàng cần tìm"
                        size="small"
                        value={searchContent}
                        onChange={(e) => setSearchContent(e.target.value)}
                    />
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
                        {listBillByStatusShow
                            .filter(item => item.khachhang.toLowerCase().includes(searchContent.toLowerCase()))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value) :
                                                        column.id === 'checkIn' ?
                                                            value ?
                                                                value :
                                                                <Button variant="contained" color={"primary"} onClick={() => { onCheckIn(row) }} >{"Check - In"}</Button>
                                                            : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell key={row.stt}>
                                            <Tooltip title="Hủy phòng">
                                                <IconButton key={row.stt} onClick={() => { handleCancelState(true); setCancelObject(row); }} aria-label="delete" color="error">
                                                    <HighlightOffIcon />
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
            <UpdateBrand open={openUpdate} id={id_brand} isShowForm={handleCloseUpdate} />
            <CheckIn open={checkInState} handleCheckInState={handleCheckInState} checkInObject={checkInObject} />
            <CancelBooking open={cancelState} handleCancelState={handleCancelState} cancelObject={cancelObject} handleFilter={handleFilter} />
        </Paper >
    );
}
