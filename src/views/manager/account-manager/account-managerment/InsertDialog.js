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
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import moment from "moment-timezone";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClickOpen = (e) => {
        setTK(e)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const listAccount = useSelector((state) => state.manager.listManagerNone);
    const [tk, setTK] = React.useState(null)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [listacc, setListAccount] = React.useState([])
    const [accountShow, setAccountShow] = React.useState(null)
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

    const handleSubmit = () => {
        if (tk) {
            let accountRegister = {
                taiKhoan: "Nvhoteloca" + String(moment.tz(new Date(), "Asia/Ho_Chi_Minh").format("DDMMYY")) + tk.id,
                matKhau: "123",
                quyen: 2,
                trangThai: 1
            }
            accountActions.register(accountRegister).then((res) => {
                tk.boPhanid = tk.boPhanid.id
                tk.taiKhoanid = {
                    id: res.data.id
                }
                dispatch(accountActions.addAccoutNv(tk))
                setAccountShow({
                    hoTen: tk.ho + " " + tk.ten,
                    email: tk.email,
                    taiKhoan: res.data.taiKhoan,
                    matKhau: "123"
                })
            }
            ).catch((err) => console.log(err));

            setLoading(true)
            setTimeout(() => {
                setListAccount(listacc.filter(({ id }) => id !== tk.id))
                setOpen(false)
                setLoading(false)
                setOpen1(true)
            }, 3000)
        }
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
                                                        <IconButton onClick={() => handleClickOpen(row)} aria-label="delete" color="primary">
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

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Tạo tài khoản mới cho nhân viên?"}
                </DialogTitle>
                <DialogContent>
                    Tạo tài khoản cho người này
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        onClick={handleSubmit}
                    >
                        Tạo tài khoản
                    </LoadingButton>
                    <Button onClick={handleClose} autoFocus>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open1}
                TransitionComponent={Transition}
                keepMounted
                maxWidth={'xs'}
                fullWidth={true}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CheckCircleTwoToneIcon color='success' sx={{ fontSize: 70 }} />
                        <span style={{ fontSize: 18, fontWeight: 'bold' }}>Tạo tài khoản thành công</span>
                    </div>

                    <Grid container>
                        <Grid item xs={4}><p><b>Họ tên nhân viên</b></p></Grid>
                        <Grid item xs={8}><p>{accountShow?.hoTen}</p></Grid>
                        <Grid item xs={4}><p><b>Email</b></p></Grid>
                        <Grid item xs={8}><p>{accountShow?.email}</p></Grid>
                        <Grid item xs={4}><p><b>Tài khoản</b></p></Grid>
                        <Grid item xs={8}><p>{accountShow?.taiKhoan}</p></Grid>
                        <Grid item xs={4}><p><b>Mật khẩu</b></p></Grid>
                        <Grid item xs={8}><p>{accountShow?.matKhau}</p></Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose1}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </>

    );
}
