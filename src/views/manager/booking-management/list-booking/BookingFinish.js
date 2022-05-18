import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Edit from '@mui/icons-material/Edit';

import InsertBrandDialog from './InsertBrandDialog'
import UpdateBrand from './UpdateBrand'

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/bill.action"
import moment from 'moment';
const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'khachhang', label: 'Thông tin khách hàng', minWidth: 100 },
    { id: 'ngayVao', label: 'Ngày đến', minWidth: 100 },
    { id: 'ngayRa', label: 'Ngày đi', minWidth: 100 },
    // { id: 'loaiphong', label: 'Loại Phòng', minWidth: 100 },
    { id: 'soluongphong', label: 'Số Lượng Phòng', minWidth: 100 },
    { id: 'tenPhong', label: 'Tên Phòng', minWidth: 100 },
    { id: 'trangThai', label: 'Ghi chú', minWidth: 100 },
];

export default function BookingPendingApprove() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const rows = []
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const listBillByStatus = useSelector((state) => state.bill.listBillByStatusFinish);
    const [listInit, setListInit] = useState([])
    const [listBillByStatusShow, setListBillByStatusShow] = useState([])

    const [searchContent, setSearchContent] = useState("");

    const [monthSelect, setMonth] = useState(new Date().getMonth() + 1);
    const [yearSelect, setYearSelect] = useState(new Date().getFullYear());
    const [daySelect, setDaySelect] = useState(new Date().getDate());
    const [list_year, setListYear] = useState([]);
    const [list_day, setListDay] = useState([]);

    const list_month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    useEffect(() => {
        const year = new Date().getFullYear();
        const years = [];
        for (let i = 2021; i <= year; i++) {
            years.push(i)
        }
        setListYear(years)
    }, [])

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
        dispatch(actions.fetchBillByStatusFinish())
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
            setListBillByStatusShow(filterListByDay(listBillByStatus))
            setListInit(listBillByStatus)
        }
    }, [listBillByStatus])

    const stringToDay = (day) => {
        const tamp = new Date(day);
        return new Date(tamp.getFullYear(), tamp.getMonth() + 1, tamp.getDate()).setHours(0, 0, 0);
    }

    const filterListByDay = (list) => {
        const dayFilter = new Date(yearSelect, monthSelect, daySelect).setHours(0, 0, 0);
        const arr = list.filter(e => stringToDay(e.checkOut) === dayFilter);
        return arr;
    }

    useEffect(() => {
        setListBillByStatusShow(filterListByDay(listInit))
    }, [yearSelect, monthSelect, daySelect])

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
            <Grid container spacing={1} style={{ padding: 10 }}>
                <Grid item xs={12}>
                    <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN CÁC ĐƠN ĐẶT HÀNG HIỆN CÓ</h3>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
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

                        <Grid item xs={3}>
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

                        <Grid item xs={3}>
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
                            <Button variant="contained" onClick={() => setListBillByStatusShow(listInit)}>Tất cả</Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={2}>

                </Grid>
                <Grid item xs={4} style={{ padding: 10, textAlign: "right" }}>
                    <TextField
                        fullWidth
                        label="Nhập tên Khách Hàng cần tìm"
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
                            {/* <TableCell
                                key={"action"}
                            >
                                {"Hành động"}
                            </TableCell> */}
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
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        {/* <TableCell key={row.stt}>
                                            <IconButton key={row.stt} onClick={() => handleClickOpenUpdate(row.id)} aria-label="delete" color="primary">
                                                <Edit />
                                            </IconButton>
                                        </TableCell> */}
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
        </Paper >
    );
}
