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
import Payment from '@mui/icons-material/Payment';
import AddTaskIcon from '@mui/icons-material/AddTask';
import UpdateBrand from './UpdateBrand'
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/bill.action"
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import CheckIn from './CheckIn';
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelBooking from './CancelBooking'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'maHoaDon', label: 'Mã phiếu thuê', minWidth: 100 },
    { id: 'khachhang', label: 'Thông tin khách hàng', minWidth: 100 },
    { id: 'ngayVao', label: 'Ngày đến', minWidth: 100 },
    { id: 'ngayRa', label: 'Ngày đi', minWidth: 100 },
    { id: 'soluongphong', label: 'Số Lượng Phòng', minWidth: 100 },
    { id: 'tenPhong', label: 'Tên Phòng', minWidth: 100 },
    { id: 'checkIn', label: 'Check-In', minWidth: 100 },
    // { id: 'trangThai', label: 'trangThai', minWidth: 100 },
];

export default function ListBooking() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const rows = []
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const listBillByStatus = useSelector((state) => state.bill.listBillByStatusAccept);
    const [listBillByStatusShow, setListBillByStatusShow] = useState([])
    const [stateBill, setStateBill] = useState(0);
    const handleChangeStateBill = (event) => {
        setStateBill(event.target.value);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [checkInState, setCheckInState] = useState(false);
    const [checkInObject, setCheckInObject] = useState({})
    const handleCheckInState = (value) => setCheckInState(value);

    const [cancelState, setCancelState] = useState(false);
    const [cancelObject, setCancelObject] = useState({})
    const handleCancelState = (value) => setCancelState(value);

    const handleFilter = (value) => {
        setListBillByStatusShow(listBillByStatusShow.filter(e => e.id !== value));
    }

    const [openUpdate, setOpenUpdate] = useState(false);

    const [id_brand, setId] = useState(0);
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClickOpenUpdate = (id) => {
    //     setOpenUpdate(true);
    //     setId(id)
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };
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

    const countDate = (ngayVao) => {

        let offset = new Date().getTime() - new Date(ngayVao).setSeconds(0);

        const days = Math.floor(offset / 1000 / 60 / 60 / 24);

        offset -= days * 1000 * 60 * 60 * 24; // giảm offset đi

        const hours = Math.floor(offset / 1000 / 60 / 60);

        offset -= hours * 1000 * 60 * 60; // giảm offset đi

        const minutes = Math.floor(offset / 1000 / 60);

        offset -= minutes * 1000 * 60;

        // console.log(days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây");
        return {
            days,
            hours,
            minutes
        }
    }

    useEffect(() => {
        dispatch(actions.fetchBillByStatusAccept())
    }, [])

    useEffect(() => {

        if (listBillByStatus.length > 0 && listBillByStatus !== undefined) {
            listBillByStatus.forEach((e, i) => {
                e.stt = i + 1;
                e.khachhang = e.khachHangid.ho + " " + e.khachHangid.ten
                e.ngayVao_old = e.ngayVao
                e.count = countDate(e.ngayVao_old);
                if (!e.checkIn && e.trangThai === 1 || e.trangThai === 3) {
                    if (e.count.days >= 0) {
                        if (e.count.hours >= 2)
                            dispatch(actions.updateStateOfBill(e.id, 4))
                        else if (e.count.hours > 0 || (e.count.hours === 0 && e.count.minutes > 0))
                            dispatch(actions.updateStateOfBill(e.id, 3))
                    }
                } else {
                    e.checkIn = moment(e.checkIn).format('DD-MM-YYYY HH:mm:ss')
                }
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
        }
    }, [listBillByStatus])

    const [autoTime, setAutoTime] = useState(new Date())
    useEffect(() => {
        setInterval(() => {
            setAutoTime(new Date().getMinutes())
        }, 1000)
    })


    useEffect(() => {
        listBillByStatusShow.forEach((e) => {
            if (!e.checkIn && (e.trangThai === 1 || e.trangThai === 3)) {
                e.count = countDate(e.ngayVao_old);
                if (e.count.days >= 0) {
                    if (e.count.hours >= 2) {
                        setListBillByStatusShow(listBillByStatusShow.filter(x => x.id !== e.id))
                        dispatch(actions.updateStateOfBill(e.id, 4))
                    }
                    else if (e.count.hours > 0 || (e.count.hours === 0 && e.count.minutes > 0)) {
                        dispatch(actions.updateStateOfBill(e.id, 3))
                    }
                }
            }
        })
        // setListBillByStatusShow(listBillByStatusShow);
    }, [autoTime])
    const onCheckIn = (row) => {
        let checkInKt = new Date()
        let checkKt = new Date(row.ngayVao_old)
        if (checkKt > checkInKt) {
            handleClickOpen(true)
            return
        } else {
            handleCheckInState(true);
            setCheckInObject(row);
        }
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
            <Grid container spacing={1} style={{ padding: 10 }}>
                <Grid item xs={12}>
                    <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN CÁC ĐƠN ĐẶT HÀNG HIỆN CÓ</h3>
                </Grid>
                <Grid item xs={10}>

                </Grid>

                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={stateBill}
                            label="Trạng Thái"
                            onChange={handleChangeStateBill}
                        >
                            <MenuItem value={0}>Tất cả</MenuItem>
                            <MenuItem value={1}>Chưa đến giờ</MenuItem>
                            <MenuItem value={3}>Trễ Check - In</MenuItem>
                        </Select>
                    </FormControl>
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
                                align="center"
                                style={{ minWidth: 150 }}
                            >Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listBillByStatusShow.filter(e => e.trangThai !== 4)
                            .filter(item => stateBill === 0 ? item : item.trangThai === stateBill)
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
                                            <Tooltip title="Thanh toán">
                                                <IconButton key={row.stt} disabled={!row["checkIn"] ? true : false} onClick={() => navigate(`/admin/booking-payment/${row.id}`)} aria-label="delete" color="primary">
                                                    <Payment />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Thêm dịch vụ">
                                                <IconButton key={row.stt} onClick={() => navigate(`/admin/update-booking/${row.id}`)} aria-label="add-service" color="secondary">
                                                    <RoomServiceIcon />
                                                </IconButton>
                                            </Tooltip>
                                            {
                                                !row["checkIn"] ?
                                                    <Tooltip title="Hủy phòng">
                                                        <IconButton key={row.stt} onClick={() => { handleCancelState(true); setCancelObject(row); }} aria-label="delete" color="error">
                                                            <HighlightOffIcon />
                                                        </IconButton>
                                                    </Tooltip> :
                                                    <Tooltip title="Trả Phòng">
                                                        <IconButton key={row.stt} onClick={() => navigate(`/admin/booking-checkout/${row.id}`)} style={{ color: 'green' }}>
                                                            <AddTaskIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                            }
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
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Thao tác này không thể thực hiện"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Chưa tới giờ Check In vui lòng thử lại sau
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Đã hiểu</Button>
                </DialogActions>
            </Dialog>
        </Paper >
    );
}
