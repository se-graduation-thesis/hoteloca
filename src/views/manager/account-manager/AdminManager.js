import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Grid, TextField } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/manager.action"
const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'hoNguoidung', label: 'Họ người dùng', minWidth: 100 },
    { id: 'tenNguoidung', label: 'Tên người dùng', minWidth: 100 },
    { id: 'taiKhoan', label: 'Tài khoản', minWidth: 100 },
    { id: 'soDienThoai', label: 'Số điện thoại', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'diaChi', label: 'Địa chỉ', minWidth: 100 },
    { id: 'ngayVao', label: 'Ngày đăng kí', minWidth: 100 },
];

export default function StickyHeadTable() {
    const dispatch = useDispatch();
    const listaccinrow = [];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const listAccount = useSelector((state) => state.manager.listManager);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [listacc, setListAccount] = React.useState([])
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const rows = []
    React.useEffect(() => {
        dispatch(actions.fetchAllManager())
    }, [])

    React.useEffect(() => {
        if (listAccount) {
            listAccount.forEach((e, i) => {
                e.stt = i + 1
                e.taiKhoan = e.taiKhoanid.taiKhoan
                e.khachSan = e.khachSanid.tenKhachSan
            })
            setListAccount(listAccount)
        }
    }, [listAccount])
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN NHÂN VIÊN</h3>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="secondary">Thêm nhân viên</Button>
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
                        {listacc
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
                                        <TableCell key={"action"}>
                                            <IconButton aria-label="delete" color="success">
                                                <Visibility />
                                            </IconButton>
                                            <IconButton aria-label="delete" color="error">
                                                <DeleteIcon />
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
        </Paper>
    );
}
