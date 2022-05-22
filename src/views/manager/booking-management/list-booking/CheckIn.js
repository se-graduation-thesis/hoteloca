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


    const handleClose = () => {
        props.handleCheckInState(false)
    };

    const formatCash = (str) => {
        if (str === '') return '';
        return String(str).split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }


    const submit = () => {
        if (Number(giveMoney) < Number(advanceFee))
            setErr("Số tiền phải lớn hơn tiền phụ thu")
        else {
            dispatch(actions.updateBill(props.checkInObject.id));

            handleClose()

            setSnackbarState(true);
            setTimeout(function () {
                setSnackbarState(false);
            }, 3000);
            setErr("")
        }
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 18, backgroundColor: 'yellow' }}>CHECK - IN</DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        {
                            props.checkInObject?.count?.days >= 0 ?
                                <Grid item xs={12}>
                                    <i>Trễ {props.checkInObject?.count?.hours} giờ {props.checkInObject?.count?.minutes} phút</i>
                                </Grid> : <></>
                        }
                        <Grid item xs={6}>
                            <h3>Khách Hàng</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>{props.checkInObject?.khachhang}</h3>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        <Grid item xs={6}>
                            <h3>Tiền Cọc</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>{formatCash(props.checkInObject?.tienCoc)}</h3>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        <Grid item xs={6}>
                            <h3 style={{ color: 'orange' }}>Phí Phụ Thu</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3 style={{ color: 'orange' }}>{formatCash(advanceFee)}</h3>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        <Grid item xs={6}>
                            <h3 style={{ color: 'green' }}>Tiền Khách Đưa</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={giveMoney}
                                onChange={e => setGiveMoney(e.target.value)}
                                name="giveMoney"
                                id="formatted-numberformat-input"
                                InputProps={{
                                    inputComponent: NumberFormatCustom, style: { fontSize: 18 }
                                }}
                                variant="standard"
                            />
                            {err && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{err}</span></>}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        <Grid item xs={6}>
                            <h3 style={{ color: '#2196f3' }}>Tiền Hoàn Lại</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={refundMoney}
                                name="giveMoney"
                                id="formatted-numberformat-input"
                                InputProps={{
                                    readOnly: true, inputComponent: NumberFormatCustom, style: { fontSize: 18 }
                                }}
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Hủy</Button>
                    <Button variant="contained" style={{ backgroundColor: 'yellow', color: 'black' }} onClick={submit}>Check - In</Button>
                </DialogActions>
            </Dialog>

            <div>
                <PositionedSnackbar open={snackbarState} message={"Check-In Thành Công."} />
            </div>
        </div>
    );
}
