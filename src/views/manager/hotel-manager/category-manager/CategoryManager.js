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
import * as actions from "actions/category.action"
import { address } from 'assets/address';
const columns = [
    { id: 'stt', label: 'STT', minWidth: "5%", whiteSpace: "normal" },
    { id: 'ten', label: 'Tên loại phòng', minWidth: "10%", whiteSpace: "normal" },
    { id: 'soNguoi', label: 'Số Người', minWidth: "7%", whiteSpace: "normal" },
    { id: 'soGiuong', label: 'Số giường', minWidth: "8%", whiteSpace: "normal" },
    { id: 'dienTich', label: 'Diện tích', minWidth: "8%", whiteSpace: "normal" },
    { id: 'donGia', label: 'Đơn giá', minWidth: "13%", whiteSpace: "normal" },

];

export default function CategoryManager() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const rows = []
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const listCategory = useSelector((state) => state.category.listCategory);
    const [listCategoryShow, setListCategory] = useState([])
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
            dispatch(actions.fetchAllCategory())
        }

    }, [account])

    useEffect(() => {
        if (listCategory) {
            listCategory.forEach((e, i) => {
                e.stt = i + 1
                try {
                    let dienTich = JSON.parse(e.dienTich)
                    e.dienTich = dienTich.chieudai + " x " + dienTich.chieurong
                    e.donGia = new Intl.NumberFormat('en-Vn').format(e.donGia) + " VND"
                } catch {
                    console.log("err")
                }
            })
            setListCategory(listCategory)
        }
    }, [listCategory])
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h2 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN CÁC LOẠI PHÒNG</h2>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 10, padding: 10 }}>
                    <span style={{ paddingTop: 10, fontWeight: "bold", marginRight: 10 }}>SỐ LƯỢNG LOẠI PHÒNG HIỆN CÓ</span>
                    <Chip label={listCategoryShow.length} color="primary" />
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleClickOpen} variant="contained" color="secondary">Thêm loại phòng</Button>
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
                                    style={{ width: column.minWidth, whiteSpace: column.whiteSpace }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                style={{ width: "25%" }}
                            >
                                {"Mô tả"}
                            </TableCell>
                            <TableCell
                                style={{ width: "10%" }}
                            >
                                {"Ảnh mô tả"}
                            </TableCell>
                            <TableCell
                                style={{ width: "10%" }}
                                key={"action"}
                            >
                                {"Hành động"}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listCategoryShow
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
                                        <TableCell style={{ whiteSpace: 'pre-wrap' }}>
                                            {row.moTa}
                                        </TableCell>
                                        <TableCell>
                                            <img src="http://danlyhotel.com/upload/img/products/b178a1e4709a13e7f26ac2cd9ca79631.jpg" style={{ maxWidth: "100%" }} />
                                            {/* {row.hinhAnh} */}
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
                labelRowsPerPage='Số hàng'
                count={listCategoryShow.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <UpdateBrand open={openUpdate} id={id_brand} isShowForm={handleCloseUpdate} />
        </Paper >

    );
}
