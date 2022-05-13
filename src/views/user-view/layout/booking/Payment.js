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
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import da from 'date-fns/locale/da/index';
import img from "./paypal.png";
export default function Payment({ payment }) {
    const disabled = true
    const payment_show = payment
    return (
        <div >
            <Grid container>
                <Grid item xs={12}>
                    <h2>4. THANH TOÁN</h2>
                </Grid>
                <Grid item xs={12} style={{ backgroundColor: "#fafafa", padding: 20, border: "1px solid #c7c7c7" }}>
                    <p><b>Nhận phòng: </b> {moment(payment_show?.ngayVao).format("DD/MM/yyy hh:mm a")}</p>
                    <p><b>Trả phòng: </b>{moment(payment_show?.ngayRa).format("DD/MM/yyy hh:mm a")}</p>
                </Grid>
                <Grid item xs={12}>
                    <h3>Chi tiết đặt phòng</h3>
                </Grid>
                <Grid item xs={12} style={{ backgroundColor: "#fafafa", padding: 20, border: "1px solid #c7c7c7" }}>
                    {
                        payment_show?.listRoom.map((e) => (
                            <span style={{ color: "black", fontWeight: "bold", paddingRight: 20 }}>{e.ten + "( " + e.loaiPhongid.ten + " )"} </span>

                        ))
                    }

                    <p style={{ color: "black", fontWeight: "bold" }}>Số ngày: {payment_show.soNgay} </p>
                    <div style={{ width: "100%", textAlign: "right" }}>
                        <p style={{ color: "black", fontWeight: "bold" }}>Tổng tiền {new Intl.NumberFormat('en-Vn').format(payment_show.tienCoc) + " VND"} </p>
                    </div>
                </Grid>
                <Grid item xs={12}>

                    <Grid container >
                        <Grid item xs={6} >
                            <h3>Tổng giá trị</h3>
                        </Grid>
                        <Grid item xs={6} >
                            <h3>Thông tin khách hàng</h3>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <Grid container spacing={1}>
                        <Grid item xs={6} >
                            <Grid container >
                                <Grid item xs={12} style={{ backgroundColor: "#fafafa", padding: 20, border: "1px solid #c7c7c7" }}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <p>Giá phòng</p>
                                        </Grid>
                                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                                            <p>{new Intl.NumberFormat('en-Vn').format(payment_show.tienCoc) + " VND"}</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p style={{ color: "black", fontWeight: "bold" }}>Tổng giá</p>
                                        </Grid>
                                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                                            <p style={{ color: "black", fontWeight: "bold" }}>{new Intl.NumberFormat('en-Vn').format(payment_show.tienCoc) + " VND"}</p>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <p >Giá bao gồm thuế</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <p></p>
                                </Grid>
                                <Grid item xs={12} style={{ backgroundColor: "#fafafa", padding: 20, border: "1px solid #c7c7c7" }}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <p style={{ color: "black", fontWeight: "bold" }}>Số tiền đặt cọc</p>
                                        </Grid>
                                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                                            <p style={{ color: "black", fontWeight: "bold" }}>{new Intl.NumberFormat('en-Vn').format(payment_show.tienCoc) + " VND"}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} style={{ height: "revert" }} >
                            <Grid container style={{ height: "100%" }}>
                                <Grid container style={{ backgroundColor: "#fafafa", padding: 20, border: "1px solid #c7c7c7" }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="cmnd"
                                            label="Chứng minh nhân dân *"
                                            variant="outlined"
                                            helperText=" "
                                            name="cmnd"
                                            type="text"
                                            value={payment?.nhanVienid.cmnd}
                                            fullWidth
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
                                            value={payment?.nhanVienid.ho}
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
                                            value={payment?.nhanVienid.ten}
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
                                            fullWidth
                                            value={payment?.nhanVienid.dienThoai}
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
                                            value={payment?.nhanVienid.email}
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
                                                value={payment?.nhanVienid.quocTich}
                                                inputProps={{ readOnly: disabled }}
                                                label="Quốc tịch"
                                            >

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );
}
