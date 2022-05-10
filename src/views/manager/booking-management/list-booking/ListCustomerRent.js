import { Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "actions/customer.action";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Visibility } from "@mui/icons-material";

const columns = [
    { id: 'stt', label: 'STT', minWidth: 1 },
    { id: 'ho', label: 'Họ', minWidth: 100 },
    { id: 'ten', label: 'Tên', minWidth: 100 },
    { id: 'cmnd', label: 'CMND/CCCD', minWidth: 100 },
    { id: 'diaChi', label: 'Địa chỉ', minWidth: 100 },
    { id: 'dienThoai', label: 'Điện thoại', minWidth: 100 },
    { id: 'quocTich', label: 'Quốc tịch', minWidth: 100 },
];

export default function ListCustomerRent() {


    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const listCustomerRent = useSelector(state => state.customer.listCustomerRent)

    const [customerRents, setCustomerRents] = useState([]);

    useEffect(() => {
        dispatch(actions.listCustomerRent());
    }, [])

    useEffect(() => {
        if (listCustomerRent) {
            listCustomerRent.forEach((e, i) => {
                e.stt = i + 1
            })
            setCustomerRents(listCustomerRent)
        }
    }, [listCustomerRent])

    const [searchContent, setSearchContent] = useState("");


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h3 style={{ marginTop: 8 }}>DANH SÁCH CÁC KHÁCH HÀNG ĐANG THUÊ PHÒNG</h3>
                </Grid>
                <Grid item xs={8}>

                </Grid>
                <Grid item xs={4} style={{ padding: 10, textAlign: "right" }}>
                    <TextField
                        label="Nhập tên khách hàng để tìm kiếm"
                        size="small"
                        fullWidth
                        value={searchContent}
                        onChange={(e) => setSearchContent(e.target.value)}
                    // InputProps={{
                    //     endAdornment: (
                    //         <InputAdornment position="start">
                    //             <IconButton>
                    //                 <SearchIcon />
                    //             </IconButton>
                    //         </InputAdornment>
                    //     )
                    // }}
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
                        {customerRents
                            .filter(item => item.ten.toLowerCase().includes(searchContent.toLowerCase()))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.stt}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {
                                                        value
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell key={"action"}>
                                            <IconButton aria-label="show" color="success">
                                                <Visibility />
                                            </IconButton>
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
                count={listCustomerRent.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}