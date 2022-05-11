import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Grid, TextField, Dialog, DialogActions, DialogTitle, DialogContent, IconButton, Tooltip } from '@mui/material';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/manager.action"
import * as accountActions from "actions/account.action"
import moment from "moment-timezone";
const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'ho', label: 'Họ người dùng', minWidth: 100 },
    { id: 'ten', label: 'Tên người dùng', minWidth: 100 },
    { id: 'dienThoai', label: 'Số điện thoại', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'ngayVaoLam', label: 'Ngày đăng kí', minWidth: 100 },
];
export default function InsertBrandDialog(props) {
    const dispatch = useDispatch();
    const listaccinrow = [];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const listAccount = useSelector((state) => state.manager.listManagerNone);
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
        dispatch(actions.fetchAllManagernoneAccount())
    }, [])

    React.useEffect(() => {
        if (listAccount) {
            listAccount.forEach((e, i) => {
                e.stt = i + 1
            })
            setListAccount(listAccount)
        }
    }, [listAccount])

    const onFind = (e) => {
        if (listAccount) {
            let rl = listAccount.filter((fb) =>
                fb.ten.toLowerCase().includes(e.target.value.toLowerCase()) || fb.dienThoai.toLowerCase().includes(e.target.value.toLowerCase()) || fb.email.toLowerCase().includes(e.target.value.toLowerCase())
            )
            rl.forEach((e, i) => {
                e.stt = i + 1
            })
            setListAccount(rl)
        }

    }

    const handleSubmit = (e) => {
        const d = new Date();
        let accountRegister = {
            taiKhoan: "Nvhoteloca" + String(moment.tz(new Date((new Date()).valueOf() + 1000 * 3600 * 24), "Asia/Ho_Chi_Minh").format("DDMMYY")) + e.id,
            matKhau: "123",
            quyen: 2,
            trangThai: 1
        }
        console.log(accountRegister)
        // accountActions.register(accountRegister).then((res) => {
        //     e.taiKhoanid=res.data.id
        // }
        // ).catch((err) => console.log(err));

        // handleClick();
        // setTimeout(() => {
        //     setOpen(true)
        // }, 3000)
        // setTimeout(() => {
        //     navigate("/pages/login");
        // }, 6000)
    }
    return (
        <>
            <Dialog keepMounted open={props.open} fullWidth={true} maxWidth={'lg'}>
                <DialogTitle>DANH SÁCH NHÂN VIÊN CHƯA CÓ TÀI KHOẢN</DialogTitle>
                <DialogContent style={{ padding: 30 }}>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: 10, textAlign: "left" }}>
                            <TextField
                                label="Nhập tên, số điện thoại hoặc email tìm kiếm"
                                size="small"
                                onChange={onFind}
                                autoComplete='off'
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
                                                <TableCell key={"action"} align="center">
                                                    <Tooltip title="Tạo tài khoản">
                                                        <IconButton onClick={() => handleSubmit(row)} aria-label="delete" color="primary">
                                                            <PersonAddAltIcon />
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
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { props.isShowForm() }}>Đóng</Button>
                </DialogActions>
            </Dialog>
            {/* <Snackbar autoHideDuration={2000} open={alertOpen} anchorOrigin={{ vertical, horizontal }} onClose={handleClose} >
                <Alert severity="success"><AlertTitle>Thành công</AlertTitle>
                    Thông báo — <strong>Thêm chi nhánh thành công</strong></Alert>
            </Snackbar> */}
        </>

    );
}
