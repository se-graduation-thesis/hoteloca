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
import * as actions from "actions/category.action"


const initialFieldValues = {
    tenLoaiPhong: "",
    trangthai: "Đang hoạt động",
    khachSanid: 0,
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
        if ("tenLoaiPhong" in fieldValues) {
            if (fieldValues.tenLoaiPhong === "") {
                temp.tenLoaiPhong = fieldValues.tenLoaiPhong ? "" : "Tên khách sạn không được để trống";
            }
            if (fieldValues.tenLoaiPhong !== "") {
                temp.tenLoaiPhong =
                    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
                        fieldValues.tenLoaiPhong
                    )
                        ? ""
                        : "Tên khách sạn không chứa chữ số hoặc kí tự đặc biệt";
            }
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
            dispatch(actions.insertCategory(values))
            resetForm()
            setAlertOpen(true)
        };
        console.log(values)
    }
    return (
        <>
            <Dialog keepMounted open={props.open} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle>Thêm chi nhánh</DialogTitle>
                <DialogContent style={{ padding: 30 }}>
                    <Formsy onSubmit={handleSubmit} >
                        <TextField
                            id="tenLoaiPhong"
                            label="Tên Loại Phòng"
                            variant="outlined"
                            helperText=" "
                            name="tenLoaiPhong"
                            type="text"
                            fullWidth
                            value={values.tenLoaiPhong}
                            onChange={handleInputChange}
                            {...(errors.tenLoaiPhong && { error: true, helperText: errors.tenLoaiPhong })}
                        />
                        <div><br></br></div>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Chi nhánh</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        name="khachSanid"
                                        label="Chi nhánh"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={1} >ABC</MenuItem>
                                        <MenuItem value={3} >Khang</MenuItem>
                                        <MenuItem value={4} >Haha</MenuItem>
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
                        >
                            Thêm loại phòng
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
