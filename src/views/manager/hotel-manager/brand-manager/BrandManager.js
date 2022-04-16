import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Edit from '@mui/icons-material/Edit';

import InsertBrandDialog from './InsertBrandDialog'
import UpdateBrand from './UpdateBrand'

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/brand.action"
import { address } from 'assets/address';
const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'tenKhachSan', label: 'Tên khách sạn', minWidth: 100 },
    { id: 'soDienThoai', label: 'Số điện thoại', minWidth: 100 },
    { id: 'diaChi', label: 'Địa chỉ', minWidth: 100 },
    { id: 'trangthai', label: 'Trạng thái', minWidth: 100 },
];

export default function BrandManager() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const rows = []
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const listBrand = useSelector((state) => state.brand.listBrand);
    const [listBrandShow, setListBrand] = useState([])

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
        dispatch(actions.fetchAllBrand())
    }, [])

    useEffect(() => {
        if (listBrand.length > 0 && listBrand !== undefined) {
            listBrand.forEach((e, i) => {
                if (e.diaChi !== null) {
                    try {
                        var diachi = JSON.parse(e.diaChi)
                        e.stt = i + 1
                        e.diaChi = "Số nhà / Đường " + diachi.no + ", " + diachi.ward + ", Quận / Huyện " + diachi.district + ", Tỉnh / Thành " + diachi.city

                    } catch (e) {
                        console.log("a")
                    }

                }

            })
            setListBrand(listBrand)
        }
    }, [listBrand])

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN CÁC CHI NHÁNH</h3>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleClickOpen} variant="contained" color="secondary">Thêm chi nhánh</Button>
                    <InsertBrandDialog open={open} isShowForm={handleClose} />
                </Grid>

                <Grid item xs={6} style={{ padding: 10, textAlign: "right" }}>
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
                        {listBrandShow
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
                                            <IconButton key={row.stt} onClick={() => handleClickOpenUpdate(row.id)} aria-label="delete" color="primary">
                                                <Edit />
                                            </IconButton>
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
            <UpdateBrand open={openUpdate} id={id_brand} isShowForm={handleCloseUpdate} />
        </Paper >

    );
}
