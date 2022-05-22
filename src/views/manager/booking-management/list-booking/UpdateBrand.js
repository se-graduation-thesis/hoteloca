import * as React from 'react';

import { Alert, AlertTitle, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';

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
import { Edit } from '@mui/icons-material';

const initialFieldValues = {
    tenKhachSan: "",
    diaChi: "",
    trangthai: "",
    soDienThoai: ""
};
export default function UpdateBrand(props) {
    const dispatch = useDispatch();
    const brand = useSelector((state) => state.brand.brand_by_id);
    let vertical = 'top';
    let horizontal = 'right';
    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])

    const [edit, setEdit] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [displayButton, setDisplayButton] = useState('none')
    const getDistrict = (a) => {
        setDistrict(a.districts)
        setWards([])
    }
    const getWards = (a) => {
        setWards(a.wards)
    }
    const [alertOpen, setAlertOpen] = useState(false);

    const onEdit = () => {
        setDisabled(false)
        setEdit(!edit)
        setDisplayButton('block')
    }
    const onCloseEdit = () => {
        setDisabled(true)
        setDisplayButton('none')
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };
    const handleCloseUpdate = (event, reason) => {
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
            // if (fieldValues.soDienThoai !== "") {
            //     temp.soDienThoai =
            //         /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
            //             fieldValues.soDienThoai
            //         )
            //             ? ""
            //             : "Số điện thoại sai định dạng";
            // }
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
                id: values.id,
                tenKhachSan: values.tenKhachSan,
                diaChi: JSON.stringify({
                    no: values.diaChi,
                    ward: values.ward,
                    district: values.district,
                    city: values.city
                }),
                trangthai: values.trangthai,
                soDienThoai: values.soDienThoai
            }
            dispatch(actions.insertBrand(brand_save))
            setAlertOpen(true)
        };

    }
    useEffect(() => {
        if (props.id) {
            actions.findById(props.id).then((res) => {
                setValues({
                    id: res.data.id,
                    tenKhachSan: res.data.tenKhachSan,
                    diaChi: JSON.parse(res.data.diaChi).no,
                    trangthai: res.data.trangthai,
                    soDienThoai: res.data.soDienThoai,
                    city: JSON.parse(res.data.diaChi).city,
                    district: JSON.parse(res.data.diaChi).district,
                    ward: JSON.parse(res.data.diaChi).ward,
                })

            })
        }
    }, [props.id])
    return (
        <>
            <Dialog keepMounted open={props.open} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <p>Thêm chi nhánh</p>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                            <IconButton onClick={onEdit} aria-label="delete" color="primary">
                                <Edit />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
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
                            inputProps={{ readOnly: disabled }}
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
                            inputProps={{ readOnly: disabled }}
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
                                        // id="demo-simple-select"
                                        name="city"
                                        label="Tỉnh / Thành phố"
                                        inputProps={{ readOnly: disabled }}
                                        value={values.city || ''}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={values.city}>{values.city}</MenuItem>
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
                                        name="district"
                                        label="Quận / Huyện"
                                        onChange={handleInputChange}
                                        inputProps={{ readOnly: disabled }}
                                        value={values.district || ''}
                                    >

                                        <MenuItem value={values.district}>{values.district}</MenuItem>
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
                                        label="Xã / Phường"
                                        onChange={handleInputChange}
                                        inputProps={{ readOnly: disabled }}
                                        value={values.ward || ''}
                                    >
                                        <MenuItem value={values.ward}>{values.ward}</MenuItem>
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
                                    inputProps={{ readOnly: disabled }}
                                    onChange={handleInputChange}
                                    {...(errors.diaChi && { error: true, helperText: errors.diaChi })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        name="trangthai"
                                        label="Trạng thái"
                                        onChange={handleInputChange}
                                        value={values.trangthai}
                                        inputProps={{ readOnly: disabled }}
                                    >
                                        <MenuItem value={'Đang hoạt động'} >{'Đang hoạt động'} </MenuItem>
                                        <MenuItem value={'Tạm ngưng'} >{'Tạm ngưng'} </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div><br></br></div>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="secondary"
                            type="submit"
                            style={{ display: displayButton }}
                        >
                            Sửa chi nhánh
                        </Button>
                    </Formsy>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { props.isShowForm(); onCloseEdit() }}>Đóng</Button>
                </DialogActions>
            </Dialog>
            <Snackbar autoHideDuration={2000} open={alertOpen} anchorOrigin={{ vertical, horizontal }} onClose={handleCloseUpdate} >
                <Alert severity="success"><AlertTitle>Thành công</AlertTitle>
                    Thông báo — <strong>Thêm chi nhánh thành công</strong></Alert>
            </Snackbar>
        </>

    );
}
