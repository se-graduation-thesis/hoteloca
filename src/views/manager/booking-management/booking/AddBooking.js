import * as React from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, AlertTitle, FormControl, Snackbar, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography, Checkbox } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState, useEffect } from 'react';
import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch, useSelector } from 'react-redux';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as actions from 'actions/room.action'
import * as actionPhongTN from 'actions/phongTN.action';
import * as actionService from 'actions/service.action';
import moment from "moment-timezone";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { nations } from "assets/nation"
import './payment.css';
import { useNavigate } from 'react-router';
import Formsy from 'formsy-react';
import useForm from './useForm'
import * as cus_actions from "actions/customer.action"
import imga from "assets/images/icons/room.png"
const initialFieldValues = {
    ho: "",
    ten: "",
    cmnd: "",
    diaChi: "123",
    dienThoai: "",
    email: "",
    quocTich: "Viet Nam",
    yeuCau: "",
    ngayLap: new Date,
    ngayVao: new Date,
    ngayRa: new Date((new Date()).valueOf() + 1000 * 3600 * 24)
};
const colors = ["primary", "secondary", "info", "error", "success"]
export default function Payment() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const account = useSelector((state) => state.account.userAuth);
    const [checkin, setCheckIn] = useState(new Date)
    const [checkout, setCheckOut] = useState(new Date((new Date()).valueOf() + 1000 * 3600 * 24))
    const room = useSelector((state) => state.room.empty_room);
    const [list_room_hotel, setListRoomHotel] = useState([]);
    const [disabled, setDisabled] = useState(false)
    const [idCustomer, setIdCustomer] = useState(0)
    const [idNv, setIdNv] = useState(0)
    const [serviceSelect, setServiceSelect] = useState([]);
    const [roomSelect, setRoomSelect] = useState([]);
    const [deposit, setDeposit] = useState(0);
    useEffect(() => {
        let room_find = {
            trangThai: 0,
            ngayVao: moment.tz(new Date, "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(new Date((new Date()).valueOf() + 1000 * 3600 * 24), "Asia/Ho_Chi_Minh").format()
        }
        dispatch(actions.get_empty_room(room_find))
    }, [])
    useEffect(() => {
        if (room) {
            setListRoomHotel(room)
        }
    }, [room])

    const listCus = useSelector((state) => state.customer.customers);
    useEffect(() => {
        dispatch(cus_actions.fetchAllCustomer());
    }, [])
    const [listCusCompare, setListCuscompare] = useState([]);
    useEffect(() => {
        if (listCus) {
            setListCuscompare(listCus)
        }
    }, [listCus])
    // console.log(listCus)
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("cmnd" in fieldValues) {
            // values.ho = "nânn"
            if (fieldValues.cmnd.length === 9 || fieldValues.cmnd.length === 12) {
                listCusCompare.forEach((e) => {
                    if (e.cmnd === fieldValues.cmnd) {
                        values.cmnd = fieldValues.cmnd
                        values.ho = e.ho
                        values.ten = e.ten
                        values.dienThoai = e.dienThoai
                        values.email = e.email
                        setValues({ ...values })
                        setDisabled(true)
                        setIdCustomer(e.id)
                    }
                })
            } else if (fieldValues.cmnd.length !== 9 || fieldValues.cmnd.length !== 12) {
                values.cmnd = fieldValues.cmnd
                values.ho = ""
                values.ten = ""
                values.dienThoai = ""
                values.email = ""
                setValues({ ...values })
                setDisabled(false)
                setIdCustomer(0)
            }

            // let err = 0;
            // listCategoryShow.map((u) => {
            //     if (
            //         u.ten.toLowerCase() === fieldValues.ten.toLowerCase()
            //     ) {
            //         err = err + 1;
            //     }
            // });
            // if (err >= 1) {
            //     err < 1
            //         ? (temp.ten = "")
            //         : (temp.ten = "Loại phòng này đã có");
            // }
            // else if (fieldValues.ten === "") {
            //     temp.ten = fieldValues.ten ? "" : "Tên loại phòng không được để trống";
            // }
            // else if (fieldValues.ten !== "") {
            //     temp.ten =
            //         /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
            //             fieldValues.ten
            //         )
            //             ? ""
            //             : "Tên khách sạn không chứa chữ số hoặc kí tự đặc biệt";
            // }
        }
        if ("ten" in fieldValues) {
            if (fieldValues.ten === "") {
                temp.ten = fieldValues.ten ? "" : "Tên không được để trống";
            }
        }
        setErrors({
            ...temp,
        });

        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFieldValues, validate, 0);

    useEffect(() => {
        if (account) {
            setIdNv(JSON.parse(account).user_id);
        }
    }, [account])

    const handleSubmit = (e) => {
        const booking_info = {
            list_room_hotel: roomSelect,
            list_service: serviceSelect,
            nhanVienid: idNv,
            khachHangid: idCustomer,
            khachHang: values,
            ngayLap: moment.tz(new Date, "Asia/Ho_Chi_Minh").format(),
            ngayVao: moment.tz(checkin, "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(checkout, "Asia/Ho_Chi_Minh").format(),
            yeuCau: values.yeuCau
        }
        if (validate()) {
            if (disabled === false) {

            }
            setTimeout(() => {
                navigate("/admin/booking-infomation", { state: booking_info });
            }, 2000)
        };
        console.log(booking_info)
    }
    // const onAutoComplete = () => {
    //     values.ho = "nânn"

    // }

    //Service
    const [open, setOpen] = useState(false);

    const tienNghiList = useSelector(state => state.phongTN.tienNghiList);

    const services = useSelector(state => state.service.services);
    useEffect(() => {
        dispatch(actionService.fetchAllService())
    }, [])


    const handleService = (e, checked) => {
        let i = null;
        let tam = services.filter(item => item.id === Number(e.target.value))[0];
        let arr = null;
        if (checked === true) {
            setServiceSelect([...serviceSelect, tam]);
        }
        else {
            arr = serviceSelect.filter(item => item.id !== Number(e.target.value));
            setServiceSelect(arr);
        }
    }

    const handleRoom = (e, checked) => {
        let i = null;
        let tam = list_room_hotel.filter(item => item.id === Number(e.target.value))[0];
        let arr = null;
        if (checked === true) {
            setRoomSelect([...roomSelect, tam]);
        }
        else {
            arr = roomSelect.filter(item => item.id !== Number(e.target.value));
            setRoomSelect(arr);
        }
    }
    useEffect(() => {
        let depo = 0;
        if (roomSelect.length > 0) {
            roomSelect.forEach((e) => {
                depo += e.loaiPhongid.donGia
            })
        }
        setDeposit(depo / 2)
    }, [roomSelect])
    const onChangeCheckIn = (e) => {
        setCheckIn(e)
        let room_find = {
            ngayVao: moment.tz(e, "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(checkout, "Asia/Ho_Chi_Minh").format()
        }
        console.log(room_find)
        dispatch(actions.get_empty_room(room_find))
    }
    const onChangeCheckOut = (e) => {
        setCheckOut(e)
        let room_find = {
            ngayVao: moment.tz(checkin, "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(e, "Asia/Ho_Chi_Minh").format()
        }
        console.log(room_find)
        dispatch(actions.get_empty_room(room_find))
    }

    console.log(idCustomer)
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#e3f2fd' }}>
            <Formsy style={{ width: "100%" }} onSubmit={handleSubmit} >
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
                                        type="text"
                                        fullWidth
                                        autoComplete='off'
                                        value={values.cmnd}
                                        onChange={(e) => {
                                            handleInputChange(e)
                                            // onAutoComplete()
                                        }
                                        }
                                        {...(errors.cmnd && { error: true, helperText: errors.cmnd })}
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
                                        value={values.ho}
                                        onChange={handleInputChange}
                                        {...(errors.ho && { error: true, helperText: errors.ho })}
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
                                        value={values.ten}
                                        onChange={handleInputChange}
                                        {...(errors.ten && { error: true, helperText: errors.ten })}
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
                                        value={values.dienThoai}
                                        onChange={handleInputChange}
                                        {...(errors.dienThoai && { error: true, helperText: errors.dienThoai })}
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
                                        value={values.email}
                                        onChange={handleInputChange}
                                        {...(errors.email && { error: true, helperText: errors.email })}
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
                                            value={values.quocTich}
                                            inputProps={{ readOnly: disabled }}
                                            label="Quốc tịch"
                                            onChange={handleInputChange}
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
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            helperText=" "
                                            inputFormat="dd/MM/yyyy hh:mm a"
                                            renderInput={(props) => <TextField {...props} fullWidth helperText=" " />}
                                            label="Ngày lập"
                                            value={values.ngayVao}
                                            onChange={(newValue) => onChangeCheckIn(newValue)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            helperText=" "
                                            inputFormat="dd/MM/yyyy hh:mm a"
                                            renderInput={(props) => <TextField {...props} fullWidth helperText=" " />}
                                            label="Ngày vào"
                                            value={checkin}
                                            onChange={(newValue) => onChangeCheckIn(newValue)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            inputFormat="dd/MM/yyyy hh:mm a"
                                            renderInput={(props) => <TextField {...props} fullWidth helperText=" " />}
                                            label="Ngày Ra"
                                            value={checkout}
                                            onChange={(newValue) => onChangeCheckOut(newValue)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                {/* <Grid item xs={4}>
                                    <TextField
                                        id="nhanVien"
                                        label="Nhân viên đặt phòng *"
                                        variant="outlined"
                                        helperText=" "
                                        name="nhanVien"
                                        type="text"
                                        fullWidth
                                        autoComplete='off'
                                        value={values.nhanVien}
                                        onChange={handleInputChange}
                                        {...(errors.nhanVien && { error: true, helperText: errors.nhanVien })}
                                    />
                                </Grid> */}
                                <Grid item xs={12}>
                                    <TextField
                                        id="yeuCau"
                                        label="Yêu cầu"
                                        variant="outlined"
                                        helperText=" "
                                        name="yeuCau"
                                        type="text"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        autoComplete='off'
                                        value={values.yeuCau}
                                        onChange={handleInputChange}
                                        {...(errors.yeuCau && { error: true, helperText: errors.yeuCau })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <h3>DANH SÁCH PHÒNG TRỐNG</h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={8}>
                                        {
                                            list_room_hotel.map((e, i) => {
                                                if (e.trangThaiHomNay === 1) {
                                                    return (
                                                        <Grid item xs={1} key={i}>
                                                            <img src={imga} alt="bk" width={"100%"} />
                                                            <p>{e.ten}</p>
                                                            <Checkbox
                                                                value={e.id} onChange={(el, checked) => handleRoom(el, checked)}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />
                                                        </Grid>
                                                    )
                                                }
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
                                                            <Chip style={{ margin: 5 }} key={e.id} color={colors[index]} label={e.ten} />
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
                                                                <TableCell align="center"></TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {services.map((row) => (
                                                                <TableRow
                                                                    key={row.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell component="th" scope="row">
                                                                        {row.ten}
                                                                    </TableCell>
                                                                    <TableCell align="center">{row.donGia}</TableCell>
                                                                    <TableCell align="center">{row.moTa}</TableCell>
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
                                    <Button type='submid' color="secondary" variant="contained">Hoàn thành</Button>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid >

                {/* <Snackbar autoHideDuration={2000} open={alertOpen} anchorOrigin={{ vertical, horizontal }} onClose={handleClose} >
                    <Alert variant="filled" severity="success"><AlertTitle>Thành công</AlertTitle>
                        Thông báo — <strong>Thanh toán thành công</strong></Alert>
                </Snackbar> */}
            </Formsy>
        </Paper >
    );
}
