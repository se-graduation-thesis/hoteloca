import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { forwardRef, useEffect, useState } from 'react';
import { Divider, Grid } from '@mui/material';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import * as actions from 'actions/bill.action';
import { useDispatch } from 'react-redux';
import PositionedSnackbar from 'views/manager/hotel-management/components/PositionedSnackbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as pay_actions from "actions/payment.action";
import Select from '@mui/material/Select';
import * as actionsBillDetail from "actions/bill-detail.action"
import moment from "moment-timezone"
const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=""
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function CheckIn(props) {

    const dispatch = useDispatch();

    const [giveMoney, setGiveMoney] = useState('')
    const [refundMoney, setRefundMoney] = useState('')
    const [advanceFee, setAdvanceFee] = useState(0)
    const [snackbarState, setSnackbarState] = useState(false);
    const [err, setErr] = useState("");
    const [option, setOption] = useState("1")
    const [per, setPer] = useState(100);
    const [tienHoan, setTienHoan] = useState(0)
    const [tienThu, setTienThu] = useState(0)

    useEffect(() => {
        setOption("1")
        setPer(100)
    }, [])

    const handleChange = (event) => {
        setPer(event.target.value);
    };
    const list_numner = () => {
        let list_p = []
        for (let i = 0; i <= 100; i += 5) {
            list_p.push(i)
        }
        return list_p
    }
    let listPercent = list_numner()

    useEffect(() => {
        if (Number(giveMoney) > Number(advanceFee))
            setRefundMoney(Number(giveMoney) - Number(advanceFee))
        else
            setRefundMoney(0)
    }, [giveMoney])

    useEffect(() => {
        let tong = 0
        props.checkInObject?.chiTietPhieuThueList?.map((e) => {
            let donGia = e.phongId.loaiPhongid.donGia;
            tong += donGia
        })
        setAdvanceFee(tong);
    }, [props.checkInObject])

    console.log(props.cancelObject)

    const handleClose = () => {
        props.handleCancelState(false)
    };

    const formatCash = (str) => {
        if (str === '') return '';
        return String(str).split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

    useEffect(() => {
        if (option === "1") {
            setTienHoan(props.cancelObject?.tienCoc)
            setTienThu(0)
        } else if (option === "2") {
            setTienHoan(props.cancelObject?.tienCoc * per / 100)
            setTienThu(props.cancelObject?.tienCoc - props.cancelObject?.tienCoc * per / 100)
        }
    }, [option, per, props.cancelObject])

    const submit = () => {
        console.log(props.cancelObject.id)
        dispatch(actions.updateStateOfBill(props.cancelObject.id, 6))
        // setListBillByStatusShow(listBillByStatusShow.filter(e => e.id !== billCancelId))

        let payment = {
            maThanhToan: "TThoteloca" + String(moment.tz(new Date(), "Asia/Ho_Chi_Minh").format("DDMMYYhhmmss")),
            tongTienDichVu: 0,
            tongTienThanhToan: tienThu,
            ngayThanhToan: new Date(),
            phieuThueid: props.cancelObject.id,
            ghiChu: per === 0 ? "Khách hàng hủy đơn không hoàn tiền" : "Khách hàng hủy đơn hoàn tiền " + per + "%"
        }
        console.log(payment)
        dispatch(pay_actions.addPay(payment))

        // setConfirm(false);

        setSnackbarState(true);
        setTimeout(function () {
            setSnackbarState(false);
        }, 3000);
    }
    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 18, backgroundColor: '#820101', color: 'white' }}>HỦY ĐẶT PHÒNG</DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        {
                            props.cancelObject?.count?.days >= 0 ?
                                <Grid item xs={12}>
                                    <i>Trễ {props.cancelObject?.count?.hours} giờ {props.cancelObject?.count?.minutes} phút</i>
                                </Grid> : <></>
                        }
                        <Grid item xs={6}>
                            <h3>Khách Hàng</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>{props.cancelObject?.khachhang}</h3>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        <Grid item xs={6}>
                            <h3>Tiền Cọc</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>{formatCash(props.cancelObject?.tienCoc)} VND</h3>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} sx={{ width: 400 }}>
                        <Grid item xs={12}>
                            <h3>Hình thức hủy</h3>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={option}
                                    onChange={(e) => setOption(e.target.value)}
                                >
                                    <FormControlLabel value={"1"} control={<Radio />} label="Không thu" />
                                    <FormControlLabel value={"2"} control={<Radio />} label="Thu tiền" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        <Grid item xs={12} style={{ marginTop: 20 }}>
                            {
                                option === "1" ?
                                    <></> :
                                    <FormControl size="small" fullWidth >
                                        <InputLabel id="demo-select-small">Chọn mức tiền gửi lại</InputLabel>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={per}
                                            label="Chọn mức tiền gửi lại"
                                            onChange={handleChange}
                                        >
                                            {
                                                listPercent.map((e) => (
                                                    <MenuItem value={e}>{e} %</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                            }
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} sx={{ width: 400 }}>
                        <Grid item xs={6}>
                            <h3 style={{ color: 'red' }}>Tiền thu</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>{formatCash(tienThu)} VND</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3 style={{ color: '#2196f3' }}>Tiền Hoàn Lại</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>{formatCash(tienHoan)} VND</h3>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Hủy thao tác</Button>
                    <Button variant="contained" style={{ backgroundColor: '#820101', color: 'white' }} onClick={submit}>Hủy đặt phòng</Button>
                </DialogActions>
            </Dialog>

            <div>
                <PositionedSnackbar open={snackbarState} message={"Check-In Thành Công."} />
            </div>
        </div>
    );
}
