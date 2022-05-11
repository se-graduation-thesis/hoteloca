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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InsertBrandDialog from './InsertDialog'
import UpdateBrand from './UpdateDialog'

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/account.action"
import { address } from 'assets/address';
const columns = [
    { id: 'stt', label: 'STT', minWidth: "10%" },
    { id: 'taiKhoan', label: 'Tài Khoản', minWidth: "30%" },
    { id: 'trangThai', label: 'Trạng thái', minWidth: "25%" },
    { id: 'quyen', label: 'Quyền', minWidth: "25%" },
];

export default function Account() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const rows = []
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const listAccount = useSelector((state) => state.account.listAccount);
    const [listAccountShow, setListAccount] = useState([])
    const account = useSelector((state) => state.account.userAuth);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [accManage, setAccManage] = useState(0);
    const [accCus, setAccCus] = useState(0);
    const [accActive, setAccActive] = useState(0);
    const [accBlock, setAccBlock] = useState(0);
    const [status, setStatus] = useState(0);
    const [role, setRole] = useState(0);
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
        if (account) {
            dispatch(actions.fetchAllAccount())
        }

    }, [account])

    useEffect(() => {
        if (listAccount) {
            listAccount.forEach((e, i) => {
                e.stt = i + 1
            })
            let manage = listAccount.filter(({ quyen }) => quyen === 2);
            let cus = listAccount.filter(({ quyen }) => quyen === 1);
            let active = listAccount.filter(({ trangThai }) => trangThai === 1);
            let block = listAccount.filter(({ trangThai }) => trangThai === 2);
            setAccManage(manage.length)
            setAccCus(cus.length)
            setAccActive(active.length)
            setAccBlock(block.length)
            setListAccount(listAccount)
        }

    }, [listAccount])
    const onFilterStatus = (e) => {
        let tt = e.target.value;
        setStatus(tt)
        if (listAccount) {
            if (tt === 0 && role === 0) {
                setListAccount(listAccount)
            }
            else if (role === 0) {
                let trt = listAccount.filter(({ trangThai }) => trangThai === tt);
                trt.forEach((e, i) => {
                    e.stt = i + 1
                })
                setListAccount(trt)
            } else {
                let trt = listAccount.filter(({ trangThai, quyen }) => trangThai === tt && quyen === role);
                trt.forEach((e, i) => {
                    e.stt = i + 1
                })
                setListAccount(trt)
            }
        }
    }
    const onFilterRole = (e) => {
        let r = e.target.value;
        setRole(r)
        if (listAccount) {
            if (status === 0 && r === 0) {
                setListAccount(listAccount)
            }
            else if (status === 0) {
                let rl = listAccount.filter(({ quyen }) => quyen === r);
                rl.forEach((e, i) => {
                    e.stt = i + 1
                })
                setListAccount(rl)
            } else {
                let rl = listAccount.filter(({ trangThai, quyen }) => trangThai === status && quyen === r);
                rl.forEach((e, i) => {
                    e.stt = i + 1
                })
                setListAccount(rl)
            }
        }
    }
    const onFind = (e) => {
        if (listAccount) {
            let rl = listAccount.filter((fb) =>
                fb.taiKhoan.toLowerCase().includes(e.target.value.toLowerCase())
            )
            rl.forEach((e, i) => {
                e.stt = i + 1
            })
            setListAccount(rl)
        }

    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h2 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN TÀI KHOẢN</h2>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 10, padding: 10 }}>
                    <span style={{ paddingTop: 10, fontWeight: "bold", marginRight: 10 }}>SỐ LƯỢNG TÀI KHOẢN HIỆN CÓ</span>
                    <Chip label={listAccountShow.length} color="primary" />
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 10, padding: 10 }}>
                    <Chip style={{ marginRight: 20, backgroundColor: "#b56005", color: "white" }} label={"Số lượng tài khoản quản lý: " + accManage + " TÀI KHOẢN"} />
                    <Chip style={{ marginRight: 20 }} label={"Số lượng tài khoản khách hàng: " + accCus + " TÀI KHOẢN"} color="secondary" />
                    <Chip style={{ marginRight: 20 }} label={"Số lượng tài khoản đang hoạt động: " + accActive + " TÀI KHOẢN"} color="primary" />
                    <Chip style={{ marginRight: 20, backgroundColor: "#990505", color: "white" }} label={"Số lượng tài khoản bị khóa: " + accBlock + " TÀI KHOẢN"} color="warning" />
                </Grid>

                <Grid item xs={3}>
                    <Button onClick={handleClickOpen} variant="contained" color="secondary">Tạo tài khoản cho nhân viên</Button>
                    <InsertBrandDialog open={open} isShowForm={handleClose} />
                </Grid>
                <Grid item xs={3} style={{ padding: 10, textAlign: "left" }}>
                    <TextField
                        label="Nhập tài khoản tìm kiếm"
                        size="small"
                        onChange={onFind}
                        fullWidth
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
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label1">Trạng Thái</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            value={status}
                            label="Trạng Thái"
                            onChange={onFilterStatus}
                        >
                            <MenuItem value={0}>Tất cả</MenuItem>
                            <MenuItem value={1}>Hoạt động</MenuItem>
                            <MenuItem value={2}>Bị khóa</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Quyền</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Quyền"
                            onChange={onFilterRole}
                        >
                            <MenuItem value={0}>Tất cả</MenuItem>
                            <MenuItem value={1}>Khách Hàng</MenuItem>
                            <MenuItem value={2}>Quản lý</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>


            </Grid>
            <h3>DANH SÁCH TÀI KHOẢN</h3>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ width: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                key={"action"}
                                style={{ width: "10%" }}
                            >
                                {"Hành động"}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listAccountShow
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.stt}>
                                        {/* <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : value

                                            }
                                        </TableCell> */}
                                        <TableCell>
                                            {row.stt}
                                        </TableCell>
                                        <TableCell>
                                            {row.taiKhoan}
                                        </TableCell>
                                        <TableCell>
                                            {row.trangThai == 1 ?
                                                < Chip label={"Đang hoạt động"} color="primary" /> :
                                                <Chip label={"Tài khoản đang bị khóa"} style={{ backgroundColor: "#990505", color: "white" }} />
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {row.quyen == 1 ?
                                                < Chip label={"Khách hàng"} icon={<PersonOutlineIcon />} color="secondary" /> :
                                                <Chip label={"Quản lý"} icon={<ManageAccountsIcon />} style={{ backgroundColor: "#b56005", color: "white" }} color="warning" />
                                            }
                                        </TableCell>
                                        <TableCell key={row.stt}>
                                            <Tooltip title="Sửa loại phòng">
                                                <IconButton key={row.stt} onClick={() => handleClickOpenUpdate(row.id)} aria-label="delete" color="primary">
                                                    <Edit />
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
