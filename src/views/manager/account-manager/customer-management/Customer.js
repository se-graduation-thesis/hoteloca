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

import InsertBrandDialog from './InsertDialog'
import UpdateBrand from './UpdateDialog'

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/customer.action"
import { address } from 'assets/address';
const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'ho', label: 'Họ', minWidth: 100 },
    { id: 'ten', label: 'Tên', minWidth: 100 },
    { id: 'diaChi', label: 'Địa Chỉ', minWidth: 100 },
    { id: 'dienThoai', label: 'Số điện thoại', minWidth: 100 },
];

export default function Customer() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const rows = []
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const listCustomer = useSelector((state) => state.customer.customers);
    const [listCustomerShow, setListCustomer] = useState([])
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
        if (account) {
            dispatch(actions.fetchAllCustomer())
        }

    }, [account])

    useEffect(() => {
        if (listCustomer) {
            listCustomer.forEach((e, i) => {
                e.stt = i + 1
                try {
                    let object = JSON.parse(e.diaChi);
                    if (object)
                        e.diaChi = object.diaChi ? object.diaChi + ', ' : "" + object.ward + ', ' ? object.ward : "" + object.district ? object.district + ', ' : "" + object.city ? object.city : ""
                } catch {
                    console.log("error")
                }
            })
            setListCustomer(listCustomer)
        }
    }, [listCustomer])

    const onFind = (e) => {
        console.log(e)
        if (listCustomer) {
            let rl = listCustomer.filter((fb) =>
                fb.ten.toLowerCase().includes(e.target.value.toLowerCase()) || fb.ho.toLowerCase().includes(e.target.value.toLowerCase())
            )
            rl.forEach((e, i) => {
                e.stt = i + 1
            })
            setListCustomer(rl)
        }
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h2 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN KHÁCH HÀNG</h2>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 10, padding: 10 }}>
                    <span style={{ paddingTop: 10, fontWeight: "bold", marginRight: 10 }}>SỐ LƯỢNG KHÁCH HÀNG HIỆN CÓ</span>
                    <Chip label={listCustomerShow.length} color="primary" />
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleClickOpen} variant="contained" color="secondary">Thêm khách hàng</Button>
                    <InsertBrandDialog open={open} isShowForm={handleClose} />
                </Grid>


                <Grid item xs={6} style={{ padding: 10, textAlign: "right" }}>
                    <TextField
                        label="Nhập tên khách hàng cần tìm"
                        size="small"
                        onChange={(e) => onFind(e)}
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
            </Grid>
            <TableContainer sx={{ height: '60%' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ width: column.minWidth, whiteSpace: column.whiteSpace }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            {/* <TableCell
                                style={{ width: "10%" }}
                                key={"action"}
                            >
                                {"Hành động"}
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listCustomerShow
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
                                        {/* <TableCell key={row.stt}>
                                            <Tooltip title="Sửa loại phòng">
                                                <IconButton key={row.stt} onClick={() => handleClickOpenUpdate(row.id)} aria-label="delete" color="primary">
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell> */}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                labelRowsPerPage='Số hàng'
                count={listCustomerShow.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <UpdateBrand open={openUpdate} id={id_brand} isShowForm={handleCloseUpdate} />
        </Paper >

    );
}
