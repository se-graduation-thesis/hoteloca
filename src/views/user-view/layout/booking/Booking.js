import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Chip from '@mui/material/Chip';
import { useState, useEffect } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Checkbox, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as actions from 'actions/room.action'
import * as actionService from 'actions/service.action';
import moment from "moment-timezone";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { useNavigate, useLocation } from 'react-router';
import * as cus_actions from "actions/customer.action"
import * as actionBillDetail from 'actions/bill-detail.action';
import * as actionBill from 'actions/bill.action';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import * as actionsCategory from "actions/category.action"
import './booking.css'
import Payment from './Payment';
import PayPal from "./PayPal.js"
import CustomerInfo from './CustomerInfo'
import ListRoom from './ListRoom'
import SuccessBooking from './SuccessBooking'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const steps = ['Thông tin đặt phòng', 'Chọn phòng', 'Thông tin khách hàng', 'Thanh toán'];
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const colors = ["primary", "secondary", "info", "error", "success"]
export default function HorizontalLinearStepper() {
    const { state } = useLocation()
    const dispatch = useDispatch()
    const account = useSelector((state) => state.account.userAuth);
    const customer = useSelector((state) => state.customer.customer);
    const room = useSelector((state) => state.room.empty_room);
    const listCategory = useSelector((state) => state.category.listCategory);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [checkin, setCheckIn] = useState(new Date)
    const [payment, setPayment] = useState(new Date)
    const [checkout, setCheckOut] = useState(new Date((new Date()).valueOf() + 1000 * 3600 * 24))
    const [list_room_hotel, setListRoomHotel] = useState([]);
    const [roomSelect, setRoomSelect] = useState([]);
    const [deposit, setDeposit] = useState(0);
    const [open, setOpen] = useState(false);
    const [listCategoryShow, setListCategory] = useState([])
    const [lp, setCategory] = useState(0);
    const [success, onSuccess] = useState(false)

    const increment = () => {
        onSuccess(true)
    }
    const handleReset = () => {
        setActiveStep(0);
    };
    useEffect(() => {
        if (state) {
            let list_state_room = []
            list_state_room.push(state)
            setRoomSelect(list_state_room)
            setActiveStep(2)
        }
    }, state)

    useEffect(() => {
        if (account) {
            if (isJson(account)) {
                dispatch(cus_actions.getCustomerById(JSON.parse(account).user_id))
            } else {
                dispatch(cus_actions.getCustomerById(account.user_id))
            }

        }
    }, account)

    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if (activeStep === 0) {
            setRoomSelect([])
            onFindTime()
        } else if (activeStep === 1) {
            if (roomSelect.length === 0) {
                return
            }
        } else if (activeStep === 2) {
            let bill_add = {
                ngayVao: checkin,
                ngayRa: checkout,
                listRoom: roomSelect,
                nhanVienid: customer,
                soNgay: Math.round(DaysBetween(checkin, checkout)),
                tienCoc: deposit
            }
            setPayment(bill_add)
        } else if (activeStep === 3) {
            if (success === false) {
                return
            }
            onSubmit()
        }
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClose = () => {
        setOpen1(false);
        setOpen(false)
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
            setListRoomHotel(set_list_room)
        }
    }, [room])

    useEffect(() => {
        if (success === true) {
            handleNext()
        }
    }, [success])

    useEffect(() => {
        dispatch(actionService.fetchAllService())
    }, [])

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
        let day = Math.round(DaysBetween(checkin, checkout))
        setDeposit(depo * day)

    }, [roomSelect])

    const onFindTime = () => {
        let room_find = {
            ngayVao: moment.tz(checkin, "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(checkout, "Asia/Ho_Chi_Minh").format()
        }
        dispatch(actions.get_empty_room(room_find))
    }

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
    const onChangeCheckOut = (e) => {
        setCheckOut(e)
    }
    const onChangeCheckIn = (e) => {
        setCheckIn(e)
    }

    const onSubmit = () => {
        const booking_info = {
            list_room_hotel: roomSelect,
            nhanVienid: 1,
            khachHangid: customer,
            tienCoc: deposit,
            trangThai: 1,
            ngayLap: moment.tz(new Date, "Asia/Ho_Chi_Minh").format(),
            ngayVao: moment.tz(checkin, "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(checkout, "Asia/Ho_Chi_Minh").format(),
            yeuCau: "Khong"
        }
        actionBill.addBill(booking_info).then((response) => {
            const phieuThueid = response.data;
            booking_info.list_room_hotel.forEach((e) => {
                const billDetail = {
                    phieuThueid: phieuThueid.id,
                    phongId: e.id,
                    ngayVao: phieuThueid.ngayVao,
                    ngayRa: phieuThueid.ngayRa
                }
                dispatch(actionBillDetail.addBillDetail(billDetail));
            })
            setTimeout(() => {
                setOpen(true)
            }, 3000)
        }
        )
    }

    useEffect(() => {
        dispatch(actionsCategory.fetchAllCategory())
    }, [])
    useEffect(() => {
        if (listCategory) {
            setListCategory(listCategory)
        }
    }, [listCategory])
    useEffect(() => {
        if (room) {
            if (lp === 0) {
                setListRoomHotel(room.filter(({ trangThaiHomNay }) => trangThaiHomNay === 1))
            }
            else {
                setListRoomHotel(room.filter(({ trangThaiHomNay, loaiPhongid }) => trangThaiHomNay === 1 && loaiPhongid.id === lp))
            }
        }
    }, [room])
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const onFind = () => {
        let room_find = {
            trangThai: 0,
            ngayVao: moment.tz(checkin, "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(checkout, "Asia/Ho_Chi_Minh").format()
        }
        dispatch(actions.get_empty_room(room_find))
    }
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    let limit = Math.max(document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

    return (
        <div style={{ alignContent: "center", display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <Box sx={{ width: '70%', mt: 10 }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps} >
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <SuccessBooking />
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset} variant='contained' color='secondary'>Tiếp tục đặt phòng</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div style={{ marginTop: 50, minHeight: 400 }}>
                            {activeStep === 0 ?
                                <Grid container spacing={5}>
                                    <Grid item xs={12}><h2>1. CHỌN NGÀY</h2></Grid>
                                    <Grid item xs={6}>
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
                                    <Grid item xs={6}>
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
                                </Grid> :
                                activeStep === 1 ?
                                    <>
                                        <Grid container spacing={4}>
                                            <Grid xs={12} item><h2>2. CHỌN PHÒNG</h2></Grid>

                                            <Grid xs={6} item>
                                                <FormControl fullWidth>
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
                                            <Grid item xs={6}>
                                                <Button onClick={onFind} variant="contained" sx={{ height: 52, backgroundColor: 'Chocolate', color: 'white' }}>Tìm kiếm</Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {
                                                    roomSelect.map((e) => (
                                                        <Chip style={{ margin: 10 }} label={e.ten + "( " + e.loaiPhongid.ten + " )"} color="secondary"></Chip>
                                                    ))
                                                }
                                            </Grid>
                                            {list_room_hotel.length > 0 ?
                                                list_room_hotel.map((e, i) => {
                                                    return (
                                                        <Grid item xs={10} key={i}>
                                                            <Grid container>
                                                                <Grid item xs={10}>
                                                                    <ListRoom room={e} />
                                                                </Grid>
                                                                <Grid item xs={2} style={{
                                                                    borderTop: '2px solid purple',
                                                                    borderRight: '2px solid purple',
                                                                    borderBottom: '2px solid purple',
                                                                    padding: 10,
                                                                    display: 'flex',
                                                                    textAlign: 'center',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <div>
                                                                        <span style={{ color: 'black', fontWeight: 'bold' }}>Chọn phòng</span>
                                                                        <Checkbox
                                                                            value={e.id} onChange={(el, checked) => handleRoom(el, checked)}
                                                                            defaultChecked={roomSelect.filter(({ id }) => id === e.id).length > 0 ? true : false}
                                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                                        />
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                }
                                                ) :
                                                <Grid item xs={10}>
                                                    <p style={{ color: 'red', fontWeight: 'bold' }}>Hiện tại không có phòng nào trống trong khoảng thời gian này</p>
                                                </Grid>
                                            }
                                            <Grid item xs={2} className={scrollPosition < limit - 1500 ? "deposit_po" : "deposit"}>
                                                <Grid container className="item">
                                                    <Grid item xs={12} style={{ textAlign: 'center' }} >
                                                        <p style={{ color: 'black' }}>{roomSelect.length} Phòng</p>
                                                        <p style={{ color: 'black', fontSize: 20 }}>{new Intl.NumberFormat('en-Vn').format(deposit) + " VND"}</p>
                                                        <p style={{ color: 'black' }}>{Math.round(DaysBetween(checkin, checkout))} Ngày</p>
                                                    </Grid>
                                                    <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 20 }}>
                                                        {
                                                            scrollPosition < limit - 1500 ?
                                                                <Button onClick={handleNext} variant='contained' style={{ backgroundColor: "chocolate" }}>
                                                                    Tiếp theo
                                                                </Button> :
                                                                <CalendarMonthIcon color='secondary' />
                                                        }

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} style={{ textAlign: 'right' }}>
                                                <span style={{ color: "black", fontSize: 18, fontWeight: 'bold' }}>TIỀN CỌC : </span>
                                                <span style={{ color: "black", fontSize: 18, fontWeight: 'bold' }}>{new Intl.NumberFormat('en-Vn').format(deposit) + " VND"}</span>
                                            </Grid>
                                        </Grid></> :
                                    activeStep == 2 ?
                                        <>
                                            <CustomerInfo />
                                        </>
                                        :
                                        <>
                                            <Payment payment={payment} />
                                            <Grid container>
                                                <Grid item xs={12} >
                                                    <h3>Thanh Toán</h3>
                                                    <Grid item xs={12} style={{ backgroundColor: "#fafafa", padding: 20, border: "1px solid #c7c7c7" }}>
                                                        <PayPal deposit={deposit} onClick={increment} />
                                                        <div>
                                                            {
                                                                success ?
                                                                    <Alert variant="filled" severity="success">Hóa đơn đã được thanh toán</Alert>
                                                                    : <Alert variant="filled" severity="error">Vui lòng thanh toán hóa đơn</Alert>
                                                            }
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                            }
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="secondary"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                variant='contained'
                            >
                                Trở lại
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} variant='contained' color="secondary">
                                {activeStep === steps.length - 1 ? 'Kết thúc' : 'Tiếp theo'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
                <Dialog
                    open={open}
                    maxWidth={'xs'}
                    fullWidth={true}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CheckCircleTwoToneIcon color='success' sx={{ fontSize: 70 }} />
                        <span style={{ fontSize: 18, fontWeight: 'bold' }}>Đặt phòng thành công</span>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}
