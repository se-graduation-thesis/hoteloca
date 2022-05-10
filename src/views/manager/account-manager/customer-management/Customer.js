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
import Visibility from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/customer.action";
// import * as actions from "actions/room.action";
import EditIcon from '@mui/icons-material/Edit';
import AddCustomerForm from './customer-components/addCustomerForm';

const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'hoten', label: 'Họ Tên', minWidth: 100 },
    { id: 'trangThai', label: 'Trạng Thái', minWidth: 100 },
    { id: 'diaChi', label: 'Địa Chỉ', minWidth: 100 },
    { id: 'dienThoai', label: 'Số điện thoại', minWidth: 100 },

    // { id: 'taiKhoanid', label: 'Tài Khoản', minWidth: 100 },
];

export default function Customer() {
    const dispatch = useDispatch();
    // const listaccinrow = [];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const customers = useSelector((state) => state.customer.customers);
    const [addForm, setAddForm] = React.useState(false);
    const [editCustomer, setEditCustomer] = React.useState(null);
    const [isView, setIsView] = React.useState(false);

    const handleIsView = (value) => setIsView(value);

    const handleEditCustomer = (item) => setEditCustomer(item);

    const isShowAddForm = (value) => setAddForm(value);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [listCustomer, setListCustomer] = React.useState([])

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = []

    React.useEffect(() => {
        dispatch(actions.fetchAllCustomer())
    }, [])

    React.useEffect(() => {
        if (customers) {
            customers.forEach((e, i) => {
                e.stt = i + 1
                e.hoten = e.ho + " " + e.ten
                e.trangThai === 1 ?
                    e.trangThai = "Hoạt động" :
                    e.trangThai = "Ngừng hoạt động"
            })
            setListCustomer(customers)
        }
    }, [customers])

    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', pl: 5, pr: 5 }}>
                <Grid container spacing={1} style={{ marginTop: 10, padding: 20 }}>
                    <Grid item xs={12}>
                        <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN KHÁCH HÀNG</h3>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="secondary"
                            onClick={() => isShowAddForm(true)}
                        >Thêm khách hàng</Button>
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
                            {listCustomer
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
                                                            : column.id === 'loaiPhongid' ? value.tenLoaiPhong
                                                                : value
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell key={"action"}>
                                                <IconButton aria-label="show" color="success" onClick={() => { handleEditCustomer(row); isShowAddForm(true); handleIsView(true) }}>
                                                    <Visibility />
                                                </IconButton>
                                                {/* <IconButton aria-label="edit" color="primary" onClick={() => { handleEditCustomer(row); isShowAddForm(true); }}>
                                                    <EditIcon />
                                                </IconButton> */}
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
            <div>
                <AddCustomerForm open={addForm}
                    isShowAddForm={isShowAddForm}
                    item={editCustomer}
                    handleEditCustomer={handleEditCustomer}
                    isView={isView}
                    handleIsView={handleIsView}
                />
            </div>
        </div>
    )
}