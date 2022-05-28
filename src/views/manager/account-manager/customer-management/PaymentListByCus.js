import { ContactlessOutlined, ReceiptLong } from "@mui/icons-material";
import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import moment from "moment-timezone";
import * as actionsCus from "actions/customer.action"
import * as actionsPayment from "actions/payment.action"

const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'maThanhToan', label: 'Mã Thanh Toán', minWidth: 100 },
    { id: 'ngayThanhToan', label: 'Ngày Thanh Toán', minWidth: 100 },
    { id: 'tongTienDichVu', label: 'Tiền Dịch Vụ', minWidth: 100 },
    { id: 'tongTienThanhToan', label: 'Tiền Thanh Toán', minWidth: 100 },
];

export default function PaymentListBycus() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cusId } = useParams();

    const cus = useSelector(state => state.customer.customer);
    useEffect(() => {
        dispatch(actionsCus.getCustomerById(cusId));
    }, [])

    const listPayment = useSelector(state => state.payment.paymentByCus)
    useEffect(() => {
        dispatch(actionsPayment.get_all_by_cus(cusId))
    }, [])

    const [customer, setCustomer] = useState(null);
    useEffect(() => {
        setCustomer(cus)
    }, [cus])

    const [cusName, setCusName] = useState(null)
    useEffect(() => {
        if (customer !== null) {
            let fullName = customer.ho + " " + customer.ten
            setCusName(fullName.toUpperCase());
        }
    }, [customer])

    const [listPaymentShow, setListPaymentShow] = useState([])
    useEffect(() => {
        listPayment.forEach((e, i) => {
            e.stt = i + 1;
            e.ngayThanhToan = moment(e.ngayThanhToan).format('DD-MM-YYYY HH:mm:ss');
            e.tongTienDichVu = new Intl.NumberFormat('en-Vn').format(e.tongTienDichVu) + " VND";
            e.tongTienThanhToan = new Intl.NumberFormat('en-Vn').format(e.tongTienThanhToan) + " VND";
        })
        setListPaymentShow(listPayment)
    }, [listPayment])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const rows = []
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', pl: 5, pr: 5 }}>
                <Grid container spacing={1} style={{ marginTop: 10, padding: 20 }}>
                    <Grid item xs={12}>
                        <h3 style={{ marginTop: 8 }}>DANH SÁCH HÓA ĐƠN CỦA KHÁCH HÀNG {cusName}</h3>
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
                            {listPaymentShow
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.stt}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell key={row.stt}>
                                                <Tooltip title="Xem chi tiết hóa đơn">
                                                    <IconButton key={row.stt} onClick={() => navigate(`/admin/booking-payment/${row.phieuThueid.id}`)} aria-label="delete" color="primary">
                                                        <ReceiptLong />
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
                    labelRowsPerPage='Số hàng'
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={listPaymentShow.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    )
}
