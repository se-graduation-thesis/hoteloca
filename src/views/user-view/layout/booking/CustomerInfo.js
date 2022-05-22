import * as React from 'react';
import { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import * as cus_actions from "actions/customer.action"
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
                    <TextField
                        id="email"
                        label="Email *"
                        variant="outlined"
                        helperText=" "
                        name="email"
                        type="text"
                        fullWidth
                        value={customer?.quocTich}
                        inputProps={{ readOnly: disabled }}
                        autoComplete='off'
                    />
                </Grid>
            </Grid>
        </div >
    );
}
