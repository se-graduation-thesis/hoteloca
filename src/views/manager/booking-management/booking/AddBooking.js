import * as React from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ButtonGroup, AlertTitle, FormControl, Snackbar, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState, useEffect } from 'react';
import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch, useSelector } from 'react-redux';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as actions from 'actions/room.action'
import * as actionPhongTN from 'actions/phongTN.action';

import * as actionCustomer from 'actions/customer.action';
import * as actionService from 'actions/service.action';
import * as actionCategory from 'actions/category.action'
import moment from "moment-timezone";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { nations } from "assets/nation"
import './payment.css';
import { useNavigate } from 'react-router';
import Formsy from 'formsy-react';
import useForm from './useForm'
import * as cus_actions from "actions/customer.action"
import imga from "assets/images/icons/room.png"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import da from 'date-fns/locale/da/index';
import { CheckBox } from '@mui/icons-material';
import { vi } from "date-fns/locale";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const initialFieldValues = {
    ho: "",
    ten: "",
    cmnd: "",
    diaChi: '',
    dienThoai: "",
    email: "",
    quocTich: "Viet Nam",
    yeuCau: "",
    ngayThamGia: new Date,
};
const colors = ["primary", "secondary", "info", "error", "success"]
export default function Payment() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const account = useSelector((state) => state.account.userAuth);
    const tienNghiList = useSelector(state => state.phongTN.tienNghiList);
    const [textAlert, setTextAlert] = useState("");
    const listCategory = useSelector((state) => state.category.listCategory);
    const services = useSelector(state => state.service.services);
    const room = useSelector((state) => state.room.empty_room);
    const [checkin, setCheckIn] = useState(new Date)
    const [checkout, setCheckOut] = useState(new Date((new Date()).valueOf() + 1000 * 3600 * 24))
    const [list_room_hotel, setListRoomHotel] = useState([]);
    const [listCategoryShow, setListCategory] = useState([])
    const [lp, setCategory] = useState(1);
    const [disabled, setDisabled] = useState(false)
    const [idCustomer, setIdCustomer] = useState(0)
    const [idNv, setIdNv] = useState(0)
    const [serviceSelect, setServiceSelect] = useState([]);
    const [roomSelect, setRoomSelect] = useState([]);
    const [deposit, setDeposit] = useState(0);
    const [open, setOpen] = useState(false);
    const [listService, setListService] = useState([])
    const [open1, setOpen1] = React.useState(false);
    const [phiDv, setPhiDv] = React.useState(0)
    const [phiPhong, setPhiPhong] = React.useState(0)
    const [count, setCount] = React.useState(0)
    useEffect(() => {
        dispatch(actionCategory.fetchAllCategory())
    }, [])
    useEffect(() => {
        if (listCategory) {
            setListCategory(listCategory)
        }
    }, [listCategory])
    const handleClickOpen = () => {
        setOpen1(true);
    };

    const handleClose = () => {
        setOpen1(false);
    };
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
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
            let set_list_room = []
            room.forEach((e) => {
                if (e.trangThaiHomNay === 1 && e.trangThai == 1) {
                    set_list_room.push(e)
                }
            })
            if (lp === 0) {
                setListRoomHotel(set_list_room.filter(({ trangThaiHomNay }) => trangThaiHomNay === 1))
            }
            else {
                setListRoomHotel(set_list_room.filter(({ trangThaiHomNay, loaiPhongid }) => trangThaiHomNay === 1 && loaiPhongid.id === lp))
            }
        }
    }, [room, lp])
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
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("cmnd" in fieldValues) {
            temp.cmnd = /^((\d{9})|(\d{12}))$/.test(fieldValues.cmnd)
                ? ""
                : "Số chứng minh nhân dân là 9 hoặc 12 chữ số";
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
                        setErrors({})
                    }
                })
            } else if (fieldValues.cmnd.length !== 9 || fieldValues.cmnd.length !== 12) {
                values.cmnd = fieldValues.cmnd
                values.ho = ""
                values.ten = ""
                values.dienThoai = ""
                values.email = ""
                setValues({ ...values })
                setIdCustomer(0)
                setDisabled(false)
            }
        }

        if ("dienThoai" in fieldValues) {
            let err = 0;
            listCusCompare.map((user) => {
                if (
                    user.dienThoai.toLowerCase() === fieldValues.dienThoai.toLowerCase()
                ) {
                    err = err + 1;
                }
            });
            if (fieldValues.dienThoai === "") {
                temp.dienThoai = fieldValues.dienThoai ? "" : "Số điện thoại không được để trống";
            }
            if (fieldValues.dienThoai !== "") {
                temp.dienThoai = /^[0-9]\w{9}$/.test(fieldValues.dienThoai)
                    ? ""
                    : "Số điện thoại chỉ chứa 10 chữ số";
            }
            if (err >= 1) {
                disabled === true
                    ? (temp.dienThoai = "")
                    : (temp.dienThoai = "Số điện thoại này đã được sử dụng");
            }
        }
        if ("email" in fieldValues) {
            let err = 0;
            listCusCompare.map((user) => {
                if (
                    user.email.toLowerCase() === fieldValues.email.toLowerCase()
                ) {
                    err = err + 1;
                }
            });
            if (fieldValues.email === "") {
                temp.email = fieldValues.email ? "" : "Email không được để trống";
            }
            if (fieldValues.email !== "") {
                temp.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValues.email)
                    ? ""
                    : "Định dạng email không đúng";
            }
            if (err >= 1) {
                disabled === true
                    ? (temp.email = "")
                    : (temp.email = "Email này đã tồn tại");
            }
        }
        if ("ho" in fieldValues) {
            if (fieldValues.ho === "") {
                temp.ho = fieldValues.ho ? "" : "Họ không được để trống";
            }
            if (fieldValues.ho !== "") {
                temp.ho =
                    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
                        fieldValues.ho
                    )
                        ? ""
                        : "Vui lòng không nhập số hay kí tự đặc biệt";
            }
        }
        if ("ten" in fieldValues) {
            if (fieldValues.ten === "") {
                temp.ten = fieldValues.ten ? "" : "Tên không được để trống";
            }
            if (fieldValues.ten !== "") {
                temp.ten =
                    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
                        fieldValues.ten
                    )
                        ? ""
                        : "Vui lòng không nhập số hay kí tự đặc biệt";
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
            if (isJson(account)) {
                setIdNv(JSON.parse(account).user_id);
            } else {
                setIdNv(account.user_id)
            }
        }
    }, [account])

    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        const booking_info = {
            maHoaDon: "PThoteloca" + String(moment.tz(new Date(), "Asia/Ho_Chi_Minh").format("DDMMYYhhmmss")),
            list_room_hotel: roomSelect,
            list_service: serviceSelect,
            nhanVienid: idNv,
            khachHangid: idCustomer,
            bill: values,
            tienCoc: deposit,
            trangThai: 1,
            ngayLap: moment.tz(new Date, "Asia/Ho_Chi_Minh").format(),
            ngayVao: moment.tz(checkin, "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(checkout, "Asia/Ho_Chi_Minh").format(),
            yeuCau: values.yeuCau,
            count: count,
            phiDv: phiDv,
            phiPhong: phiPhong
        }
        if (validate()) {
            if (roomSelect.length === 0) {
                setTextAlert("Vui lòng chọn ít nhất 1 phòng")
                console.log("jaajja")
                handleClickOpen()
                return
            }
            if (checkin < new Date(new Date().getTime() - 10 * 60000)) {
                setTextAlert("Ngày vào phải lớn hơn ngày hiện tại")
                handleClickOpen()
                return
            }
            if (checkout < checkin) {
                setTextAlert("Ngày ra không được nhỏ hơn ngày vào")
                handleClickOpen()
                return
            }

            if (booking_info.khachHangid === 0) {
                actionCustomer.addCustomer(booking_info.bill).then((res) => {
                    booking_info.khachHangid = res.data.id
                })
            }
            console.log(booking_info)
            setTimeout(() => {
                navigate("/admin/booking-infomation", { state: booking_info });
            }, 2000)
        };
    }

    useEffect(() => {
        dispatch(actionService.fetchAllService())
    }, [])

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

    useEffect(() => {
        let depo = 0;
        let dv = 0
        if (roomSelect.length > 0) {
            roomSelect.forEach((e) => {
                depo += e.loaiPhongid.donGia
            })
            setPhiPhong(depo)
        }
        if (serviceSelect.length > 0) {
            serviceSelect.forEach((e) => {
                dv += e.donGia * e.soLuong
            })
            setPhiDv(dv)
        }
        let numberDate = countDate();
        let count = numberDate.days;
        if (numberDate.days < 0)
            count = 0
        else if (numberDate.days === 0) {
            if (numberDate.hours === 0 && numberDate.minutes === 0)
                count = 0
            else if (numberDate.hours < 12)
                count = 0.5
            else
                count = 1
        }
        else {
            if (numberDate.hours >= 18)
                count += 1
            else if (numberDate.hours >= 6)
                count += 0.5
        }
        setCount(count)
        setDeposit(depo * count + dv)

    }, [roomSelect][serviceSelect])
    const onChangeCheckIn = (e) => {
        setCheckIn(e)
        setRoomSelect([])
        setDeposit(phiDv)
        let room_find = {
            ngayVao: moment.tz(e, "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(checkout, "Asia/Ho_Chi_Minh").format()
        }
        dispatch(actions.get_empty_room(room_find))
    }

    const countDate = () => {

        let offset = new Date(checkout).getTime() - new Date(checkin).getTime();

        const days = Math.floor(offset / 1000 / 60 / 60 / 24);

        offset -= days * 1000 * 60 * 60 * 24; // giảm offset đi

        const hours = Math.floor(offset / 1000 / 60 / 60);

        offset -= hours * 1000 * 60 * 60; // giảm offset đi

        const minutes = Math.floor(offset / 1000 / 60);

        offset -= minutes * 1000 * 60;

        const seconds = Math.floor(offset / 1000);

        return {
            days,
            hours,
            minutes
        }
    }

    const onChangeCheckOut = (e) => {
        setCheckOut(e)
        setRoomSelect([])
        setDeposit(phiDv)
        let room_find = {
            ngayVao: moment.tz(checkin, "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(e, "Asia/Ho_Chi_Minh").format()
        }
        dispatch(actions.get_empty_room(room_find))
    }
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
                                    <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns} >
                                        <DateTimePicker
                                            helperText=" "
                                            inputFormat="dd/MM/yyyy hh:mm a"
                                            disableOpenPicker={true}
                                            readOnly={true}
                                            renderInput={(props) => <TextField {...props} fullWidth helperText=" " />}
                                            label="Ngày lập"
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns}>
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
                                    <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            inputFormat="dd/MM/yyyy hh:mm a"
                                            renderInput={(props) => <TextField {...props} fullWidth helperText=" " />}
                                            label="Ngày Ra"
                                            value={checkout}
                                            onChange={(newValue) => onChangeCheckOut(newValue)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <span style={{ marginLeft: 10, color: 'green', fontStyle: 'italic' }}>{countDate().days} ngày {countDate().hours} giờ {countDate().minutes} phút</span>
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
                                <Grid xs={9} item>

                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth size="small" style={{ marginBottom: 30 }}>
                                        <InputLabel id="demo-simple-select-label">Loại phòng</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={lp}
                                            label="Loại phòng"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={0}>Tất cả các loại phòng</MenuItem>
                                            {
                                                listCategoryShow.map((e, i) => (
                                                    <MenuItem key={i} value={e.id}>{e.ten}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={4} >
                                        {list_room_hotel.length > 0 ?
                                            list_room_hotel.map((e, i) => {
                                                return (
                                                    <Grid item xs={2} key={i} style={{ justifyContent: 'center', textAlign: 'center' }}>
                                                        <img src={imga} alt="bk" width={"30%"} />
                                                        <p style={{ color: 'black', fontWeight: 'bold' }}>{e.ten}</p>
                                                        <Chip label={e.loaiPhongid.ten} color="secondary"></Chip>
                                                        <Checkbox
                                                            style={{ position: 'absolute' }}
                                                            key={i}
                                                            value={e.id} onChange={(el, checked) => handleRoom(el, checked)}
                                                            checked={roomSelect.filter(({ id }) => id === e.id).length > 0 ? true : false}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                            ) :
                                            <Grid item xs={12}>
                                                <p style={{ color: 'red', fontWeight: 'bold' }}>Hiện tại không có phòng nào trống trong khoảng thời gian này</p>
                                            </Grid>
                                        }
                                    </Grid>
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
                                                </div>
                                                <span className="div-lable-span">Thêm các dịch vụ mới</span>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    {
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
                                        </div>
                                    }
                                </Grid>
                                <Grid item xs={8} style={{ textAlign: 'left' }}></Grid>
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>Số ngày ở : </span>
                                </Grid>
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>{count} Ngày</span>
                                </Grid>
                                <Grid item xs={8} style={{ textAlign: 'right' }}></Grid>
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>Tiền phòng : </span>
                                </Grid>
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>{new Intl.NumberFormat('en-Vn').format(phiPhong) + " VND"}</span>
                                </Grid>
                                <Grid item xs={8} style={{ textAlign: 'right' }}></Grid>
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>Phí dịch vụ : </span>
                                </Grid>
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>{new Intl.NumberFormat('en-Vn').format(phiDv) + " VND"}</span>
                                </Grid>
                                <Grid item xs={8} style={{ textAlign: 'right' }}></Grid>
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>TỔNG TIỀN CỌC PHẢI TRẢ: </span>
                                </Grid>
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <span style={{ color: "black", fontSize: 17, fontWeight: 'bold' }}>{new Intl.NumberFormat('en-Vn').format(deposit) + " VND"}</span>
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
            </Formsy >
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
                    <CancelOutlinedIcon color='error' sx={{ fontSize: 70 }} />
                    <span style={{ fontSize: 15, fontWeight: 'bold' }}>{textAlert}</span>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Paper >
    );
}
