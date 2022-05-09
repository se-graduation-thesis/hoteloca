import * as React from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ButtonGroup, AlertTitle, FormControl, Snackbar, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography, Checkbox } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionService from 'actions/service.action';
import * as actionBillService from 'actions/bill-service.action';
import * as actionBillDetailService from 'actions/bill-service-detail.action';
import * as actionsBill from "actions/bill.action";
import { useParams } from "react-router-dom";
import * as ser_bill_action from "actions/bill-service-detail.action"
import moment from "moment-timezone";
import { LoadingButton } from "@mui/lab";
import { nations } from "assets/nation"
import SaveIcon from '@mui/icons-material/Save';
import './payment.css';
import imga from "assets/images/icons/room.png"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const colors = ["primary", "secondary", "info", "error", "success"]

export default function Payment() {
    let disabled = true
    const dispatch = useDispatch()
    const { booking } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = useState(true);
    const [open1, setOpen1] = useState(false);
    const [serviceSelect, setServiceSelect] = useState([]);
    const [deposit, setDeposit] = useState(0);
    const [countMin, setCountMin] = useState([]);
    const [billServiceDetailShow, setBillServiceDetailShow] = useState([])
    const [listService, setListService] = useState([])
    const [bill_service_by_id, setBillServiceById] = useState(null)
    const services = useSelector(state => state.service.services_not_use);
    const billDetail = useSelector((state) => state.bill.bill_by_id);
    const billServiceId = useSelector((state) => state.bill_service.bill_service_id);

    const billServiceDetail = useSelector((state) => state.bill_service_detail.list_service_detail);

    const [billShow, setBillShow] = useState({
        countDay: 0,
        giaCheckin: 0,
        giaPhong: 0,
        khachHang: null,
        listDichvu: [],
        ngayLap: new Date(),
        ngayRa: new Date(),
        ngayVao: new Date(),
        nhanVien: null,
        phiDv: 200000,
        phong: [],
        ho: "",
        ten: "",
        tienCoc: 0,
        tongChiPhi: 0,
        yeuCau: ""
    })


    useEffect(() => {
        dispatch(actionService.serviceNotUse(booking))
    }, [])

    useEffect(() => {
        dispatch(actionBillService.find_by_billId(booking))
    }, [])

    const handleService = (e, checked) => {
        let i = null;
        let tam = listService.filter(item => item.id === Number(e.target.value))[0];
        let arr = null;
        if (checked === true) {
            setServiceSelect([...serviceSelect, tam]);
        }
        else {
            arr = serviceSelect.filter(item => item.id !== Number(e.target.value));
            setServiceSelect(arr);
        }
    }
    const handleClose = () => {
        setOpen1(false)
    }
    //Show
    useEffect(() => {
        if (booking) {
            dispatch(actionsBill.fetchById(booking))
        }
    }, [])

    useEffect(() => {
        if (billServiceId) {
            setBillServiceById(billServiceId)
        }
    }, [billServiceId])

    useEffect(() => {
        if (booking) {
            dispatch(ser_bill_action.fetchAllBillDetailById(booking))
        }
    }, [booking])

    useEffect(() => {
        if (billServiceDetail) {
            setBillServiceDetailShow(billServiceDetail)
            setCountMin(billServiceDetail)
        }
    }, [billServiceDetail])

    useEffect(() => {
        if (billDetail !== null) {
            let gia = 0;
            let phiDv = 0;
            let phong = []
            billDetail.chiTietPhieuThueList.forEach((e) => {
                gia += e.phongId.loaiPhongid.donGia
                phong.push(e.phongId)
            });
            billServiceDetailShow.forEach((e) => {
                phiDv += e.dichVuid.donGia
            })
            let data_bill_show = {};
            data_bill_show.ho = billDetail.khachHangid.ho
            data_bill_show.ten = billDetail.khachHangid.ten
            data_bill_show.ngayLap = moment(billDetail.ngayLap).format("DD/MM/yyy hh:mm a")
            data_bill_show.ngayRa = moment(billDetail.ngayRa).format("DD/MM/yyy hh:mm a")
            data_bill_show.ngayVao = moment(billDetail.ngayVao).format("DD/MM/yyy hh:mm a")
            data_bill_show.phong = phong
            // billDetail.tongDichvu = gia;
            data_bill_show.giaCheckin = gia
            data_bill_show.countDay = DaysBetween(billDetail.ngayVao, billDetail.ngayRa)
            data_bill_show.giaPhong = gia * DaysBetween(billDetail.ngayVao, billDetail.ngayRa)
            data_bill_show.tienCoc = billDetail.tienCoc
            data_bill_show.phiDv = phiDv
            data_bill_show.listDichvu = billServiceDetailShow
            data_bill_show.tongChiPhi = gia * DaysBetween(billDetail.ngayVao, billDetail.ngayRa) + phiDv - billDetail.tienCoc
            data_bill_show.khachHang = billDetail.khachHangid
            data_bill_show.nhanVien = billDetail.nhanVienid
            data_bill_show.yeuCau = billDetail.yeuCau

            let service_list = []
            billServiceDetail.forEach((e) => {
                service_list.push(e.dichVuid)
            })
            setBillShow(data_bill_show)
        }

    }, [billDetail, billServiceDetailShow])


    function DaysBetween(start, end) {
        const oneDay = 1000 * 60 * 60 * 24;
        let day = (treatAsUTC(end) - treatAsUTC(start)) / oneDay
        if (day == 0) {
            day = 1
        }
        return day;
    }
    function treatAsUTC(date) {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }


    //Decrease and Increase

    useEffect(() => {
        if (services) {
            let list_tam = []
            services.forEach((e) => {
                let service_count = {
                    donGia: e.donGia,
                    id: e.id,
                    moTa: e.moTa,
                    ten: e.ten,
                    trangThai: e.trangThai,
                    soLuong: 1
                }
                list_tam.push(service_count)
            })
            setListService(list_tam)
        }
    }, [services])

    const handleIncrement = (id) => {
        let list_tam = []
        let list_select = []
        listService.forEach((e) => {
            if (e.id === id) {
                let service_count = {
                    donGia: e.donGia,
                    id: e.id,
                    moTa: e.moTa,
                    ten: e.ten,
                    trangThai: e.trangThai,
                    soLuong: e.soLuong + 1
                }
                list_tam.push(service_count)
            }
            else {
                list_tam.push(e)
            }
        })
        serviceSelect.forEach((e) => {
            if (e.id === id) {
                let service_count = {
                    donGia: e.donGia,
                    id: e.id,
                    moTa: e.moTa,
                    ten: e.ten,
                    trangThai: e.trangThai,
                    soLuong: e.soLuong + 1
                }
                list_select.push(service_count)
            }
            else {
                list_select.push(e)
            }
        })
        setServiceSelect(list_select)
        setListService(list_tam)
        // setCounter(counter + 1);
    };
    const handleDecrement = (id) => {
        let list_tam = []
        let list_select = []
        listService.forEach((e) => {
            if (e.id === id) {
                let service_count = {
                    donGia: e.donGia,
                    id: e.id,
                    moTa: e.moTa,
                    ten: e.ten,
                    trangThai: e.trangThai,
                    soLuong: e.soLuong === 1 ? 1 : e.soLuong - 1
                }
                list_tam.push(service_count)
            }
            else {
                list_tam.push(e)
            }
        })
        serviceSelect.forEach((e) => {
            if (e.id === id) {
                let service_count = {
                    donGia: e.donGia,
                    id: e.id,
                    moTa: e.moTa,
                    ten: e.ten,
                    trangThai: e.trangThai,
                    soLuong: e.soLuong === 1 ? 1 : e.soLuong - 1
                }
                list_select.push(service_count)
            }
            else {
                list_select.push(e)
            }
        })
        setServiceSelect(list_select)
        setListService(list_tam)
    };

    //Decrease and Increase Update
    const handleIncrementUpdate = (id) => {
        let list_tam = []
        billServiceDetailShow.forEach((e) => {
            if (e.id === id) {
                let service_count = {
                    id: e.id,
                    dichVuid: e.dichVuid,
                    soLuong: e.soLuong + 1,
                    hoaDonDichVuid: e.hoaDonDichVuid,

                }
                list_tam.push(service_count)
            }
            else {
                list_tam.push(e)
            }
        })
        setBillServiceDetailShow(list_tam)
    };

    const handleDecrementUpdate = (id) => {
        let list_tam = []
        billServiceDetailShow.forEach((e) => {
            if (e.id === id) {
                let idcout = countMin.find(({ id }) => id === e.id).soLuong;
                let service_count = {
                    id: e.id,
                    soLuong: e.soLuong === idcout ? e.soLuong : e.soLuong - 1,
                    dichVuid: e.dichVuid,
                    hoaDonDichVuid: e.hoaDonDichVuid,
                }
                list_tam.push(service_count)
            }
            else {
                list_tam.push(e)
            }
        })
        setBillServiceDetailShow(list_tam)
    };

    const onSubmitService = () => {
        if (bill_service_by_id == null) {
            const billService = {
                ngayLap: moment.tz(new Date, "Asia/Ho_Chi_Minh").format(),
                tongTien: 0,
                ghiChu: "",
                phieuThueid: booking
            }
            actionBillService.add_bill_service(billService).then((response) => {
                serviceSelect.forEach((item) => {
                    dispatch(actionBillDetailService.add_bill_service_detail({
                        dichVuid: item.id,
                        soLuong: item.soLuong,
                        hoaDonDichVuid: response.data.id
                    }))
                })
            })
        } else {
            serviceSelect.forEach((item) => {
                dispatch(actionBillDetailService.add_bill_service_detail({
                    dichVuid: item.id,
                    soLuong: item.soLuong,
                    hoaDonDichVuid: bill_service_by_id.id
                }))
            })
            billServiceDetailShow.forEach((item) => {
                dispatch(actionBillDetailService.edit_bill_service_detail(item))
            })
        }
        setLoading(true)
        setTimeout(() => {
            setOpen1(true)
        }, 3000)
        setTimeout(() => {
            location.reload();
        }, 6000)
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#e3f2fd' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Paper className="componentPaper">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <span className="numberTitle">1</span><span className='lableTitle'>THÔNG TIN KHÁCH HÀNG</span>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="cmnd"
                                    label="Chứng minh nhân dân *"
                                    variant="outlined"
                                    helperText=" "
                                    name="cmnd"
                                    inputProps={{ readOnly: disabled }}
                                    type="text"
                                    fullWidth
                                    autoComplete='off'
                                    value={billShow.khachHang !== null ? billShow.khachHang.cmnd : ""}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="ho"
                                    label="Họ người dùng *"
                                    variant="outlined"
                                    helperText=" "
                                    name="ho"
                                    type="text"
                                    inputProps={{ readOnly: disabled }}
                                    fullWidth
                                    autoComplete='off'
                                    value={billShow.khachHang !== null ? billShow.khachHang.ho : ""}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="ten"
                                    label="Tên người dùng *"
                                    variant="outlined"
                                    helperText=" "
                                    name="ten"
                                    type="text"
                                    fullWidth
                                    inputProps={{ readOnly: disabled }}
                                    autoComplete='off'
                                    value={billShow.khachHang !== null ? billShow.khachHang.ten : ""}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="dienthoai"
                                    label="Số điện thoại *"
                                    variant="outlined"
                                    helperText=" "
                                    name="dienThoai"
                                    type="text"
                                    fullWidth
                                    inputProps={{ readOnly: disabled }}
                                    autoComplete='off'
                                    value={billShow.khachHang !== null ? billShow.khachHang.dienThoai : ""}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="email"
                                    label="Email *"
                                    variant="outlined"
                                    helperText=" "
                                    name="email"
                                    type="text"
                                    fullWidth
                                    inputProps={{ readOnly: disabled }}
                                    autoComplete='off'
                                    value={billShow.khachHang !== null ? billShow.khachHang.email : ""}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="qt">Quốc tịch</InputLabel>
                                    <Select
                                        labelId="qt"
                                        id="qt"
                                        defaultValue="Viet Nam"
                                        name="quocTich"
                                        value={billShow.khachHang !== null ? billShow.khachHang.quocTich : ""}
                                        inputProps={{ readOnly: disabled }}
                                        label="Quốc tịch"
                                    >
                                        {
                                            nations.map((e, i) => (
                                                <MenuItem key={i} value={e.name}>{e.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className="componentPaper">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <span className="numberTitle">2</span><span className='lableTitle'>THÔNG TIN ĐẶT PHÒNG</span>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="ngaylap"
                                    label="Ngày lập"
                                    variant="outlined"
                                    helperText=" "
                                    name="ngaylap"
                                    type="text"
                                    fullWidth
                                    inputProps={{ readOnly: disabled }}
                                    autoComplete='off'
                                    value={billShow.ngayLap}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="ngaylap"
                                    label="Ngày lập"
                                    variant="outlined"
                                    helperText=" "
                                    name="ngaylap"
                                    type="text"
                                    fullWidth
                                    inputProps={{ readOnly: disabled }}
                                    autoComplete='off'
                                    value={billShow.ngayVao}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="ngaylap"
                                    label="Ngày lập"
                                    variant="outlined"
                                    helperText=" "
                                    name="ngaylap"
                                    type="text"
                                    fullWidth
                                    inputProps={{ readOnly: disabled }}
                                    autoComplete='off'
                                    value={billShow.ngayRa}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="yeuCau"
                                    label="Yêu cầu"
                                    variant="outlined"
                                    helperText=" "
                                    name="yeuCau"
                                    type="text"
                                    multiline
                                    inputProps={{ readOnly: disabled }}
                                    rows={4}
                                    fullWidth
                                    autoComplete='off'
                                    value={billShow.yeuCau}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <h3>DANH SÁCH PHÒNG ĐANG ĐƯỢC KHÁCH THUÊ</h3>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={8}>
                                    {
                                        billShow.phong.map((e, i) => {
                                            return (
                                                <Grid item xs={1} key={i}>
                                                    <img src={imga} alt="bk" width={"100%"} />
                                                    <p>{e.ten}</p>
                                                </Grid>
                                            )
                                        }
                                        )
                                    }
                                </Grid>
                            </Grid>

                            <Grid item xs={12} style={{ textAlign: 'right' }}>
                                <span style={{ color: "black", fontSize: 18, fontWeight: 'bold' }}>TIỀN CỌC : </span>
                                <span style={{ color: "black", fontSize: 18, fontWeight: 'bold' }}>{new Intl.NumberFormat('en-Vn').format(deposit) + " VND"}</span>
                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className="componentPaper">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <span className="numberTitle">3</span><span className='lableTitle'>THÔNG TIN DỊCH VỤ</span>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className="div-add">
                                            <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Dịch vụ</Typography>
                                            <div style={{ width: "100%" }}>
                                                {
                                                    serviceSelect.map((e, index) => (
                                                        <Chip style={{ margin: 5 }} key={e.id} color={colors[index]} label={e.ten + " x" + e.soLuong} />
                                                    ))
                                                }
                                                {
                                                    billShow.listDichvu.map((e, index) => (
                                                        <Chip style={{ margin: 5 }} key={e.id} color={colors[index]} label={e.dichVuid.ten + " x" + e.soLuong} />
                                                    ))
                                                }
                                            </div>
                                            <span className="div-lable-span">Thêm các dịch vụ mới</span>
                                            <IconButton aria-label="delete" color="secondary" onClick={() => setOpen(!open)}>
                                                {!open ? <AddCircleOutlineIcon /> : <RemoveCircleOutlineIcon />}
                                            </IconButton>
                                        </div>
                                    </Grid>
                                </Grid>

                                {
                                    open ?
                                        <div style={{ marginTop: 30 }}>
                                            <Typography sx={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center  ' }}>BẢNG DANH SÁCH CÁC DỊCH VỤ</Typography>
                                            <TableContainer style={{ marginTop: 20 }} component={Paper} sx={{ maxHeight: 300 }}>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Tên</TableCell>
                                                            <TableCell align="center">Đơn Giá</TableCell>
                                                            <TableCell align="center">Mô Tả</TableCell>
                                                            <TableCell align="center">Số lượng</TableCell>
                                                            <TableCell align="center"></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            billServiceDetailShow.map((row, i) => (
                                                                <TableRow
                                                                    key={i}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell component="th" scope="row">
                                                                        {row.dichVuid.ten}
                                                                    </TableCell>
                                                                    <TableCell align="center">{row.dichVuid.donGia}</TableCell>
                                                                    <TableCell align="center">{row.dichVuid.moTa}</TableCell>
                                                                    <TableCell align="center">
                                                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                                                            <Button onClick={() => handleDecrementUpdate(row.id)}>-</Button>
                                                                            <Button disabled>{row.soLuong}</Button>
                                                                            <Button onClick={() => handleIncrementUpdate(row.id)}>+</Button>
                                                                        </ButtonGroup>
                                                                    </TableCell>
                                                                    <TableCell align="center"><Checkbox disabled checked /></TableCell>
                                                                </TableRow>
                                                            ))
                                                        }
                                                        {listService.map((row) => (
                                                            <TableRow
                                                                key={row.id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {row.ten}
                                                                </TableCell>
                                                                <TableCell align="center">{row.donGia}</TableCell>
                                                                <TableCell align="center">{row.moTa}</TableCell>
                                                                <TableCell align="center">
                                                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                                                        <Button onClick={() => handleDecrement(row.id)}>-</Button>
                                                                        <Button disabled>{row.soLuong}</Button>
                                                                        <Button onClick={() => handleIncrement(row.id)}>+</Button>
                                                                    </ButtonGroup>
                                                                </TableCell>
                                                                <TableCell align="center"><Checkbox value={row.id} onChange={(e, checked) => handleService(e, checked)} /></TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div> : <></>
                                }
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'right' }}>
                                <LoadingButton
                                    onClick={onSubmitService} color="secondary" variant="contained"
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<SaveIcon />}
                                >Cập nhật dịch vụ cho phòng</LoadingButton>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
            </Grid >
            <Dialog
                open={open1}
                maxWidth={'xs'}
                fullWidth={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CheckCircleTwoToneIcon color='success' sx={{ fontSize: 70 }} />
                    <span style={{ fontSize: 18, fontWeight: 'bold' }}>Cập nhật dịch vụ thành công</span>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Paper >
    );
}
