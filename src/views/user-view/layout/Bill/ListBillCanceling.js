import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
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
import PositionedSnackbar from '../cus-info/PositionedSnackbar';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
const columns = [
    { id: 'maHoaDon', label: 'Mã phiếu thuê', minWidth: 100 },
    { id: 'khachhang', label: 'Thông tin khách hàng', minWidth: 100 },
    { id: 'ngayVao', label: 'Ngày đến', minWidth: 100 },
    { id: 'ngayRa', label: 'Ngày đi', minWidth: 100 },
    { id: 'soluongphong', label: 'Số Lượng Phòng', minWidth: 100 },
    { id: 'tenPhong', label: 'Tên Phòng', minWidth: 100 },
    // { id: 'trangThai', label: 'Trạng thái', minWidth: 100 },
];

export default function ListBill() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const rows = []
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const listBillByStatus = useSelector((state) => state.bill.listBillByStatusCancel);
    const [listBillByStatusShow, setListBillByStatusShow] = useState([])
    const [snackbarState, setSnackbarState] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [billCancelId, setBillCancelId] = useState(null);

    const account = useSelector((state) => state.account.userAuth);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        dispatch(actions.fetchBillByStatusCancel())
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
    const submit = () => {
        dispatch(actions.updateStateOfBill(billCancelId, 5))
        setListBillByStatusShow(listBillByStatusShow.filter(e => e.id !== billCancelId))

        setConfirm(false);

        setSnackbarState(true);
        setTimeout(function () {
            setSnackbarState(false);
        }, 3000);
    }

    return (
        <div >
            <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN CÁC PHIẾU THUÊ ĐANG CHỜ HỦY</h3>
                    </Grid>
                    <Grid item xs={6}></Grid>
                </Grid>
                <TableContainer sx={{ height: '70%' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
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
                                                        <InfoIcon />
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
                                <Typography style={{ padding: 30, fontSize: 16 }}>Không có đơn nào chờ hủy</Typography>
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

            <div>
                <div>
                    <Dialog
                        open={confirm}
                        onClose={() => setConfirm(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{ fontSize: 16 }}>
                            {"Bạn chắc chắn muốn hủy phiếu thuê này?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Tiên của bạn sẽ được chúng tôi hoàn lại theo thỏa thuận sau khi liên hệ. Bạn có chắc muốn hủy phiếu thuê này chứ.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={() => setConfirm(false)}>Hủy</Button>
                            <Button variant="contained" onClick={submit} autoFocus>
                                Đồng ý
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div>
                <PositionedSnackbar open={snackbarState} message={"Hủy Thành Công."} />
            </div>
        </div>
    );
}