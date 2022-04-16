import * as React from 'react';

import { Alert, AlertTitle, Button, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';

import Formsy from "formsy-react";
//Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useForm from './useForm';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/brand.action"
import { address } from 'assets/address';

const initialFieldValues = {
    tenKhachSan: "",
    diaChi: "",
    trangthai: "",
    soDienThoai: ""
};
export default function InsertBrandDialog(props) {
    const dispatch = useDispatch();
    let vertical = 'top';
    let horizontal = 'right';
    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])

    const getDistrict = (a) => {
        setDistrict(a.districts)
        setWards([])
    }
    const getWards = (a) => {
        setWards(a.wards)
    }
    const [alertOpen, setAlertOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };
    // ADD BRAND MANAGER
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("tenKhachSan" in fieldValues) {
            if (fieldValues.tenKhachSan === "") {
                temp.tenKhachSan = fieldValues.tenKhachSan ? "" : "Tên khách sạn không được để trống";
            }
            if (fieldValues.tenKhachSan !== "") {
                temp.tenKhachSan =
                    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
                        fieldValues.tenKhachSan
                    )
                        ? ""
                        : "Tên khách sạn không chứa chữ số hoặc kí tự đặc biệt";
            }
        }
        if ("soDienThoai" in fieldValues) {
            if (fieldValues.soDienThoai === "") {
                temp.soDienThoai = fieldValues.soDienThoai ? "" : "Số điện thoại không được để trống";
            }
        }
        if ("diaChi" in fieldValues) {
            temp.diaChi = fieldValues.diaChi ? "" : "Địa chỉ không được để trống";
        }

        setErrors({
            ...temp,
        });

        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFieldValues, validate, 0);

    const handleSubmit = (e) => {
        if (validate()) {
            let brand_save = {
                tenKhachSan: values.tenKhachSan,
                diaChi: JSON.stringify({
                    no: values.diaChi,
                    ward: values.ward,
                    district: values.district,
                    city: values.city
                }),
                trangthai: "Đang hoạt động",
                soDienThoai: values.soDienThoai
            }
            dispatch(actions.insertBrand(brand_save))
            resetForm()
            setAlertOpen(true)
        };
        // console.log(values)
    }
    return (
        <>
            <Dialog keepMounted open={props.open} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle>Thêm chi nhánh</DialogTitle>
                <DialogContent style={{ padding: 30 }}>
                    <Formsy onSubmit={handleSubmit} >
                        <TextField
                            id="Tenkhachsan"
                            label="Tên Khách Sạn"
                            variant="outlined"
                            helperText=" "
                            name="tenKhachSan"
                            type="text"
                            fullWidth
                            value={values.tenKhachSan}
                            onChange={handleInputChange}
                            {...(errors.tenKhachSan && { error: true, helperText: errors.tenKhachSan })}
                        />
                        <div><br></br></div>
                        <TextField
                            id="sodienthoai"
                            label="Số điện thoại"
                            name="soDienThoai"
                            variant="outlined"
                            fullWidth
                            helperText=" "
                            value={values.soDienThoai}
                            onChange={handleInputChange}
                            {...(errors.soDienThoai && { error: true, helperText: errors.soDienThoai })}
                        />
                        <div><br></br></div>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Tỉnh / Thành phố</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        name="city"
                                        label="Tỉnh / Thành phố"
                                        defaultValue=""
                                        onChange={handleInputChange}
                                    >
                                        {
                                            address ?
                                                address.map((a, i) => (
                                                    <MenuItem key={i} value={a.name} onClick={() => getDistrict(a)}>{a.name}</MenuItem>
                                                )) :
                                                <></>
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Quận / Huyện</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        defaultValue=""
                                        name="district"
                                        label="Quận / Huyện"
                                        onChange={handleInputChange}
                                    >
                                        {district ?
                                            district.map((a, i) => (
                                                <MenuItem key={i} value={a.name} onClick={() => getWards(a)}>{a.name} </MenuItem>
                                            )) :
                                            <></>
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Xã / Phường</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        name="ward"
                                        defaultValue=""
                                        label="Xã / Phường"
                                        onChange={handleInputChange}
                                    >
                                        {
                                            wards ?
                                                wards.map((a, i) => (
                                                    <MenuItem key={i} value={a.prefix + " " + a.name} > {a.prefix + " " + a.name} </MenuItem>
                                                )) :
                                                <></>
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <div><br></br></div>
                                <TextField
                                    id="diachi"
                                    label="Số nhà / Đường"
                                    name="diaChi"
                                    variant="outlined"
                                    fullWidth
                                    helperText=" "
                                    value={values.diaChi}
                                    onChange={handleInputChange}
                                    {...(errors.diaChi && { error: true, helperText: errors.diaChi })}
                                />
                            </Grid>
                        </Grid>
                        <div><br></br></div>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Thêm chi nhánh
                        </Button>
                    </Formsy>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { props.isShowForm(), resetForm() }}>Đóng</Button>
                </DialogActions>
            </Dialog>
            <Snackbar autoHideDuration={2000} open={alertOpen} anchorOrigin={{ vertical, horizontal }} onClose={handleClose} >
                <Alert severity="success"><AlertTitle>Thành công</AlertTitle>
                    Thông báo — <strong>Thêm chi nhánh thành công</strong></Alert>
            </Snackbar>
        </>

    );
}
