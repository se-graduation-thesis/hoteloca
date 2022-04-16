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

import * as brandActions from "actions/brand.action"


const initialFieldValues = {
    tenLoaiPhong: "",
    trangthai: "Đang hoạt động",
    khachSanid: 0,
};
export default function InsertBrandDialog(props) {
    const dispatch = useDispatch();
    let vertical = 'top';
    let horizontal = 'right';

    const listBrand = useSelector((state) => state.brand.listBrand);
    const [listBrandShow, setListBrand] = useState([])
    const listCategory = useSelector((state) => state.category.listCategoryByBrand);
    const [listCategoryShow, setListCategory] = useState([])
    const account = useSelector((state) => state.account.userAuth);
    useEffect(() => {
        dispatch(brandActions.fetchAllBrand())
    }, [])
    useEffect(() => {
        setListBrand(listBrand)
    }, [listBrand])
    const [alertOpen, setAlertOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    useEffect(() => {
        dispatch(actions.fetchAllCategoryByBrand(JSON.parse(account).khachsan_id))
    }, [account])

    useEffect(() => {
        if (listCategory) {
            listCategory.forEach((e, i) => {
                e.stt = i + 1
            })
            setListCategory(listCategory)
        }
    }, [listCategory])


    // ADD BRAND MANAGER
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("tenLoaiPhong" in fieldValues) {
            let err = 0;
            listCategoryShow.map((u) => {
                if (
                    u.tenLoaiPhong.toLowerCase() === fieldValues.tenLoaiPhong.toLowerCase()
                ) {
                    err = err + 1;
                }
            });
            if (err >= 1) {
                err < 1
                    ? (temp.tenLoaiPhong = "")
                    : (temp.tenLoaiPhong = "Loại phòng này đã có");
            }
            else if (fieldValues.tenLoaiPhong === "") {
                temp.tenLoaiPhong = fieldValues.tenLoaiPhong ? "" : "Tên loại phòng không được để trống";
            }
            else if (fieldValues.tenLoaiPhong !== "") {
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
                                        defaultValue=""
                                        onChange={handleInputChange}
                                    >
                                        {
                                            listBrandShow.map((e, i) => (
                                                <MenuItem key={i} value={e.id} >{e.tenKhachSan}</MenuItem>
                                            ))
                                        }
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
