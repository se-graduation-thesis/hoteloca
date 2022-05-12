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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

const steps = ['Thông tin đặt phòng', 'Chọn phòng', 'Thông tin khách hàng', 'Thanh toán'];
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const colors = ["primary", "secondary", "info", "error", "success"]
export default function CustomerInfo() {
    const disabled = true
    const dispatch = useDispatch()
    const account = useSelector((state) => state.account.userAuth);
    const customer = useSelector((state) => state.customer.customer);
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
    return (
        <div>
            <Grid container spacing={1}>
                <Grid xs={12} item style={{ paddingBottom: 30 }}><h2>3. THÔNG TIN KHÁCH HÀNG</h2></Grid>
                <Grid item xs={6}>
                    <TextField
                        id="cmnd"
                        label="Chứng minh nhân dân *"
                        variant="outlined"
                        helperText=" "
                        name="cmnd"
                        type="text"
                        value={customer?.cmnd}
                        fullWidth
                        inputProps={{ readOnly: disabled }}
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="ho"
                        label="Họ người dùng *"
                        variant="outlined"
                        helperText=" "
                        name="ho"
                        type="text"
                        value={customer?.ho}
                        inputProps={{ readOnly: disabled }}
                        fullWidth
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="ten"
                        label="Tên người dùng *"
                        variant="outlined"
                        helperText=" "
                        name="ten"
                        type="text"
                        fullWidth
                        value={customer?.ten}
                        inputProps={{ readOnly: disabled }}
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="dienthoai"
                        label="Số điện thoại *"
                        variant="outlined"
                        helperText=" "
                        name="dienThoai"
                        type="text"
                        value={customer?.dienThoai}
                        fullWidth
                        inputProps={{ readOnly: disabled }}
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="email"
                        label="Email *"
                        variant="outlined"
                        helperText=" "
                        name="email"
                        type="text"
                        fullWidth
                        value={customer?.email}
                        inputProps={{ readOnly: disabled }}
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="qt">Quốc tịch</InputLabel>
                        <Select
                            labelId="qt"
                            id="qt"
                            defaultValue="Viet Nam"
                            name="quocTich"
                            inputProps={{ readOnly: disabled }}
                            label="Quốc tịch"
                        >

                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div >
    );
}
