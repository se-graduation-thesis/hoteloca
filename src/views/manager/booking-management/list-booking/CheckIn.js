import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, useEffect, useState } from 'react';
import { Divider, Grid } from '@mui/material';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

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
    const [open, setOpen] = useState(true);

    const [giveMoney, setGiveMoney] = useState('')
    const [refundMoney, setRefundMoney] = useState('')

    useEffect(() => {
        if (Number(giveMoney) > Number(1250000))
            setRefundMoney(Number(giveMoney) - Number(1250000))
        else
            setRefundMoney(0)
    }, [giveMoney])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.handleCheckInState(false)
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 18, backgroundColor: 'yellow' }}>CHECK - IN</DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        <Grid item xs={6}>
                            <h3>Khách Hàng</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>Nguyễn Thanh Hoài</h3>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        <Grid item xs={6}>
                            <h3>Tiền Cọc</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>1,250,000</h3>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        <Grid item xs={6}>
                            <h3 style={{ color: 'orange' }}>Phí Dự Trù</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h3 style={{ color: 'orange' }}>1,250,000</h3>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        <Grid item xs={6}>
                            <h3 style={{ color: 'orange' }}>Tiền Khách Đưa</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={giveMoney}
                                onChange={e => setGiveMoney(e.target.value)}
                                name="giveMoney"
                                id="formatted-numberformat-input"
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ width: 400 }}>
                        <Grid item xs={6}>
                            <h3 style={{ color: 'orange' }}>Tiền Hoàn Lại</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={refundMoney}
                                name="giveMoney"
                                id="formatted-numberformat-input"
                                InputProps={{
                                    readOnly: true, inputComponent: NumberFormatCustom,
                                }}
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
