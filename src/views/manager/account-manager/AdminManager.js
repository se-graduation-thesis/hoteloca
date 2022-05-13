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
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import * as actionBoPhan from "actions/bophan.action"
import * as actions from "actions/manager.action"
import { address } from 'assets/address';
import AddEmployeeForm from './employeeComponent/addEmployeeForm';
import EditEmployeeForm from './employeeComponent/editEmployeeForm';
const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'ho', label: 'Họ người dùng', minWidth: 100 },
    { id: 'ten', label: 'Tên người dùng', minWidth: 100 },
    { id: 'dienThoai', label: 'Số điện thoại', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'diaChi', label: 'Địa chỉ', minWidth: 100 },
    { id: 'boPhanid', label: 'Bộ phận', minWidth: 100 },
    { id: 'ngayVaoLam', label: 'Ngày Vào Làm', minWidth: 100 },
];

export default function StickyHeadTable() {
    const dispatch = useDispatch();
    const listaccinrow = [];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [addForm, setAddForm] = React.useState(false);
    const [editForm, setEditForm] = React.useState(false);
    const [isView, setIsView] = React.useState(false);
    const [editEmployee, setEditEmployee] = React.useState(null);
    const listAccount = useSelector((state) => state.manager.listManager);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [listacc, setListAccount] = React.useState([])
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleEditEmployee = (item) => setEditEmployee(item);
    const isShowEditForm = (value) => setEditForm(value);
    const handleIsView = (value) => setIsView(value);

    const rows = []
    React.useEffect(() => {
        dispatch(actions.fetchAllManager())
    }, [])

    React.useEffect(() => {
        dispatch(actionBoPhan.fetchAllBoPhan());
    }, [])

    React.useEffect(() => {
        if (listAccount) {
            listAccount.forEach((e, i) => {
                e.stt = i + 1
                e.address = e.diaChi
                e.boPhan = e.boPhanid
                e.boPhanid = e.boPhanid.ten
                try {
                    let object = JSON.parse(e.diaChi);
                    e.diaChi = object.diaChi + ', ' + object.ward + ', ' + object.district + ', ' + object.city
                } catch {
                    console.log("error")
                }
            })
            setListAccount(listAccount)
        }
    }, [listAccount])
    const isShowAddForm = (value) => setAddForm(value);
    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', pl: 5, pr: 5 }}>
                <Grid container spacing={1} style={{ marginTop: 10, padding: 20 }}>
                    <Grid item xs={12}>
                        <h3 style={{ marginTop: 8 }}>DANH SÁCH THÔNG TIN NHÂN VIÊN</h3>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="secondary" onClick={() => isShowAddForm(true)}>Thêm nhân viên</Button>
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
                                                <IconButton aria-label="delete" color="success"
                                                    onClick={() => { handleEditEmployee(row); isShowEditForm(true); handleIsView(true) }}>
                                                    <Visibility />
                                                </IconButton>
                                                <IconButton aria-label="edit" color="primary" onClick={() => { handleEditEmployee(row); isShowEditForm(true); }}>
                                                    <EditIcon />
                                                </IconButton>
                                                {/* <IconButton aria-label="delete" color="error">
                                                <DeleteIcon />
                                            </IconButton> */}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    labelRowsPerPage='Số hàng'
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={listacc.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <AddEmployeeForm open={addForm}
                isShowAddForm={isShowAddForm} />

            <EditEmployeeForm
                open={editForm}
                isShowEditForm={isShowEditForm}
                item={editEmployee}  //item
                isView={isView} //type = view
                handleIsView={handleIsView} // changetype
            />
        </div>
    );
}
