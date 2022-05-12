import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ButtonGroup, AlertTitle, FormControl, Snackbar, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography, Checkbox } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PaidIcon from '@mui/icons-material/Paid';
import { useDispatch, useSelector } from 'react-redux';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as actions from 'actions/room.action'
import * as actionPhongTN from 'actions/phongTN.action';
import useForm from './useForm'
import * as actionCustomer from 'actions/customer.action';
import * as actionService from 'actions/service.action';
import moment from "moment-timezone";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { nations } from "assets/nation"
import { useNavigate } from 'react-router';
import Formsy from 'formsy-react';
import * as cus_actions from "actions/customer.action"
import imga from "assets/images/icons/room.png"
import * as actionBillDetail from 'actions/bill-detail.action';
import * as actionBill from 'actions/bill.action';
import * as actionBillService from 'actions/bill-service.action';
import * as actionBillDetailService from 'actions/bill-service-detail.action';
import * as actionManager from 'actions/manager.action';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import da from 'date-fns/locale/da/index';
import img from "./paypal.png";
import Payment from './Payment';
import CustomerInfo from './CustomerInfo'
const steps = ['Thông tin đặt phòng', 'Chọn phòng', 'Thông tin khách hàng', 'Thanh toán'];
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const colors = ["primary", "secondary", "info", "error", "success"]
export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const account = useSelector((state) => state.account.userAuth);
    const customer = useSelector((state) => state.customer.customer);
    const handleReset = () => {
        setActiveStep(0);
    };
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const services = useSelector(state => state.service.services);
    const room = useSelector((state) => state.room.empty_room);
    const [checkin, setCheckIn] = useState(new Date)
    const [payment, setPayment] = useState(new Date)
    const [checkout, setCheckOut] = useState(new Date((new Date()).valueOf() + 1000 * 3600 * 24))
    const [list_room_hotel, setListRoomHotel] = useState([]);
    const [serviceSelect, setServiceSelect] = useState([]);
    const [roomSelect, setRoomSelect] = useState([]);
    const [deposit, setDeposit] = useState(0);
    const [open, setOpen] = useState(false);
    const [listService, setListService] = useState([])
    const [open1, setOpen1] = React.useState(false);
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
            onFindTime()
        } else if (activeStep === 1) {
            if (roomSelect.length === 0) {
                return
            }
        } else if (activeStep === 2) {
            let a = {
                ngayVao: checkin,
                ngayRa: checkout,
                listRoom: roomSelect,
                nhanVienid: customer,
                soNgay: Math.round(DaysBetween(checkin, checkout)),
                tienCoc: deposit
            }
            setPayment(a)
        } else if (activeStep === 3) {
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

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };
    const handleClickOpen = () => {
        setOpen1(true);
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
        }
        if (serviceSelect.length > 0) {
            serviceSelect.forEach((e) => {
                dv += e.donGia * e.soLuong
            })
        }
        let day = Math.round(DaysBetween(checkin, checkout))
        setDeposit(depo * day + dv)

    }, [roomSelect][serviceSelect])
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
            // list_service: serviceSelect,
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
            // if (booking_info.list_service.length) {
            //     const billService = {
            //         ngayLap: moment.tz(new Date, "Asia/Ho_Chi_Minh").format(),
            //         tongTien: 0,
            //         ghiChu: "",
            //         phieuThueid: phieuThueid
            //     }
            //     actionBillService.add_bill_service(billService).then((response) => {
            //         booking_info.list_service.forEach((item) => {
            //             dispatch(actionBillDetailService.add_bill_service_detail({
            //                 dichVuid: item.id,
            //                 soLuong: item.soLuong,
            //                 hoaDonDichVuid: response.data.id
            //             }))
            //         })
            //     })
            // }
            setTimeout(() => {
                setOpen(true)
            }, 3000)
        }
        )


    }

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
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Hoàn thành
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
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
                                        <Grid container spacing={8}>
                                            <Grid xs={12} item><h2>2. CHỌN PHÒNG</h2></Grid>
                                            {list_room_hotel.length > 0 ?
                                                list_room_hotel.map((e, i) => {
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
                                                ) :
                                                <Grid item xs={12}>
                                                    <p style={{ color: 'red', fontWeight: 'bold' }}>Hiện tại không có phòng nào trống trong khoảng thời gian này</p>
                                                </Grid>

                                            }
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
                                                        <div style={{ padding: 10, marginBottom: 20, backgroundColor: "white", display: 'flex', alignItems: 'center', border: "1px solid #c7c7c7", borderRadius: 5 }}>
                                                            <img src={img} style={{ width: 80 }} />
                                                            <span style={{ marginLeft: 20, color: "black", fontWeight: 'bold' }}>Cổng thanh toán Paypal</span>
                                                        </div>
                                                        <div>
                                                            <Button variant="contained" size="large">
                                                                Xác nhận thanh toán
                                                            </Button>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                            }
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Trở lại
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext}>
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
