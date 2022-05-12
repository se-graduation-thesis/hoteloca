import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import * as actions from "actions/manager.action"
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    color: theme.palette.text.secondary,
    lineHeight: '60px',
}));


const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function FinalView({ customer, reservation, token, serviceSelect }) {

    const dispatch = useDispatch();
    const listAccount = useSelector((state) => state.manager.listManager);
    React.useEffect(() => {
        dispatch(actions.fetchAllManager())
    }, [])

    const nhanVien = listAccount.filter(e => e.id === reservation.nhanVienid)[0];

    const [diaChi, setDiaChi] = React.useState('');
    React.useEffect(() => {
        try {
            let object = JSON.parse(customer.diaChi);
            setDiaChi(object.diaChi + ', ' + object.ward + ', ' + object.district + ', ' + object.city);
        } catch {
            console.log("error")
        }
    })

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ThemeProvider theme={lightTheme}>
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: 'background.default',
                            display: 'grid',
                            gap: 2,
                        }}
                    >
                        <Item elevation={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Khách hàng</Typography>
                                    <hr />
                                </Grid>

                                {/* name + cmnd */}
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: 17 }}>Họ tên :</Typography>
                                    <Typography sx={{ fontSize: 17, marginLeft: 2 }}>{customer.ho} {customer.ten}</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: 17 }}>CMND/CCCD :</Typography>
                                    <Typography sx={{ fontSize: 17, marginLeft: 2 }}>{customer.cmnd}</Typography>
                                </Grid>

                                {/* sdt + email */}
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: 17 }}>SĐT :</Typography>
                                    <Typography sx={{ fontSize: 17, marginLeft: 2 }}>{customer.dienThoai}</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: 17 }}>E-Mail :</Typography>
                                    <Typography sx={{ fontSize: 17, marginLeft: 2 }}>{customer.email}</Typography>
                                </Grid>

                                {/* địa chỉl*/}
                                <Grid item xs={12} sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: 17 }}>Địa chỉ :</Typography>
                                    <Typography sx={{ fontSize: 17, marginLeft: 2 }}>{diaChi}</Typography>
                                </Grid>
                            </Grid>
                        </Item>

                        <Item elevation={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Đặt phòng</Typography>
                                    <hr />
                                </Grid>

                                {/* name + ngayLap */}
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: 17 }}>Nhân Viên :</Typography>
                                    <Typography sx={{ fontSize: 17, marginLeft: 2 }}>{nhanVien?.ho} {nhanVien?.ten}</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: 17 }}>Ngày Lập :</Typography>
                                    <Typography sx={{ fontSize: 17, marginLeft: 2 }}>{moment(reservation.ngayLap).format('YYYY-MM-DD')}</Typography>
                                </Grid>

                                {/* check in + check out */}
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: 17 }}>Ngày Vào :</Typography>
                                    <Typography sx={{ fontSize: 17, marginLeft: 2 }}>{moment(reservation.ngayVao).format('YYYY-MM-DD')}</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: 17 }}>Ngày Ra :</Typography>
                                    <Typography sx={{ fontSize: 17, marginLeft: 2 }}>{moment(reservation.ngayRa).format('YYYY-MM-DD')}</Typography>
                                </Grid>

                                {/*  số Phòng + tiền cọc */}
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: 17 }}>Số Phòng :</Typography>
                                    <Typography sx={{ fontSize: 17, marginLeft: 2 }}>{token}</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ fontSize: 17 }}>Tiền Cọc :</Typography>
                                    <Typography sx={{ fontSize: 17, marginLeft: 2 }}>{reservation.tienCoc}</Typography>
                                </Grid>
                            </Grid>
                        </Item>

                        <Item elevation={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Dịch vụ</Typography>
                                    <hr />
                                </Grid>

                                {/* name + ngayLap */}
                                <Grid item xs={12} sx={{ display: 'flex' }}>
                                    <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Tên</TableCell>
                                                    <TableCell align="center">Đơn Giá</TableCell>
                                                    <TableCell align="center">Mô Tả</TableCell>
                                                    <TableCell align="center"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {serviceSelect.map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.ten}
                                                        </TableCell>
                                                        <TableCell align="center">{row.donGia}</TableCell>
                                                        <TableCell align="center">{row.moTa}</TableCell>
                                                        <TableCell align="center"></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>

                            </Grid>
                        </Item>
                    </Box>
                </ThemeProvider>
            </Grid>
        </Grid>
    );
}
