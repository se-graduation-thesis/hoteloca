import * as React from 'react';

import { Alert, AlertTitle, Button, FormControl, Grid, InputLabel, InputAdornment, Select, Snackbar, TextField, IconButton } from '@mui/material';

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
import NumberFormat from 'react-number-format';
import * as brandActions from "actions/brand.action"
import { styled } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import * as actionsUploadFile from 'actions/upload.action';


const initialFieldValues = {
    ten: "",
    trangThai: 0,
    soNguoi: "",
    soGiuong: "",
    chieuDai: "",
    chieuRong: "",
    donGia: "",
    moTa: "",
    hinhAnh: "",
};
const Input = styled('input')({
    display: 'none',
});

export default function InsertBrandDialog(props) {
    const dispatch = useDispatch();
    let vertical = 'top';
    let horizontal = 'right';


    const listCategory = useSelector((state) => state.category.listCategory);
    const [listCategoryShow, setListCategory] = useState([])
    const account = useSelector((state) => state.account.userAuth);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

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
        if ("ten" in fieldValues) {
            let err = 0;
            listCategoryShow.map((u) => {
                if (
                    u.ten.toLowerCase() === fieldValues.ten.toLowerCase()
                ) {
                    err = err + 1;
                }
            });
            if (err >= 1) {
                err < 1
                    ? (temp.ten = "")
                    : (temp.ten = "Loại phòng này đã có");
            }
            else if (fieldValues.ten === "") {
                temp.ten = fieldValues.ten ? "" : "Tên loại phòng không được để trống";
            }
            else if (fieldValues.ten !== "") {
                temp.ten =
                    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
                        fieldValues.ten
                    )
                        ? ""
                        : "Tên khách sạn không chứa chữ số hoặc kí tự đặc biệt";
            }
        }
        if ("soNguoi" in fieldValues) {
            temp.soNguoi = fieldValues.soNguoi ? "" : "Số người không được để trống";
        }
        if ("soGiuong" in fieldValues) {
            temp.soGiuong = fieldValues.soGiuong ? "" : "Số giường không được để trống";
        }
        if ("chieuDai" in fieldValues) {
            temp.chieuDai = fieldValues.chieuDai ? "" : "Chiều dài không được để trống";
        }
        if ("chieuRong" in fieldValues) {
            temp.chieuRong = fieldValues.chieuRong ? "" : "Chiều rộng không được để trống";
        }
        if ("donGia" in fieldValues) {
            temp.donGia = fieldValues.donGia ? "" : "Giá loại phòng không được để trống";
        }
        setErrors({
            ...temp,
        });

        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFieldValues, validate, 0);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const handleIma = () => {
        setImage(null);
        setFile(null);
    }

    const handleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            let file1 = e.target.files[0];
            setFile(file1)
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file1);
        }
    }


    const handleSubmit = (e) => {

        if (validate()) {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                actionsUploadFile.upload(formData)
                    .then((response) => {
                        values.hinhAnh = response.data;
                        let dientich = {
                            chieudai: values.chieuDai,
                            chieurong: values.chieuRong
                        }
                        values.dienTich = JSON.stringify(dientich)
                        values.donGia = Number(values.donGia.replaceAll(',', ''))
                        dispatch(actions.insertCategory(values))
                        resetForm()
                        setAlertOpen(true)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                let dientich = {
                    chieudai: values.chieuDai,
                    chieurong: values.chieuRong
                }
                values.dienTich = JSON.stringify(dientich)
                values.donGia = Number(values.donGia.replaceAll(',', ''))
                dispatch(actions.insertCategory(values))
                resetForm()
                setAlertOpen(true)
            }
        };
    }


    return (
        <>
            <Dialog keepMounted open={props.open} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle>Thêm chi nhánh</DialogTitle>
                <DialogContent style={{ padding: 30 }}>
                    <Formsy onSubmit={handleSubmit} >
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    id="ten"
                                    label="Tên Loại Phòng *"
                                    variant="outlined"
                                    helperText=" "
                                    name="ten"
                                    type="text"
                                    fullWidth
                                    autoComplete='off'
                                    value={values.ten}
                                    onChange={handleInputChange}
                                    {...(errors.ten && { error: true, helperText: errors.ten })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="soNguoi"
                                    label="Số người *"
                                    variant="outlined"
                                    helperText=" "
                                    name="soNguoi"
                                    type="number"
                                    autoComplete='off'
                                    InputProps={{ inputProps: { min: 0, max: 20 } }}
                                    fullWidth
                                    value={values.soNguoi}
                                    onChange={handleInputChange}
                                    {...(errors.soNguoi && { error: true, helperText: errors.soNguoi })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="soGiuong"
                                    label="Số Phòng *"
                                    variant="outlined"
                                    autoComplete='off'
                                    helperText=" "
                                    name="soGiuong"
                                    type="number"
                                    fullWidth
                                    InputProps={{ inputProps: { min: 0, max: 20 } }}
                                    value={values.soGiuong}
                                    onChange={handleInputChange}
                                    {...(errors.soGiuong && { error: true, helperText: errors.soGiuong })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="chieuDai"
                                    label="Chiều dài phòng (m) *"
                                    variant="outlined"
                                    autoComplete='off'
                                    helperText=" "
                                    name="chieuDai"
                                    type="number"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">Mét</InputAdornment>,
                                        inputProps: { min: 0, max: 100 }
                                    }}
                                    value={values.chieuDai}
                                    onChange={handleInputChange}
                                    {...(errors.chieuDai && { error: true, helperText: errors.chieuDai })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="chieuRong"
                                    label="Chiều rộng phòng (m) *"
                                    variant="outlined"
                                    autoComplete='off'
                                    helperText=" "
                                    name="chieuRong"
                                    type="number"
                                    fullWidth
                                    value={values.chieuRong}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">Mét</InputAdornment>,
                                        inputProps: { min: 0, max: 100 }
                                    }}
                                    onChange={handleInputChange}
                                    {...(errors.chieuRong && { error: true, helperText: errors.chieuRong })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <NumberFormat customInput={TextField}
                                    thousandSeparator={true}
                                    id="donGia"
                                    label="Giá phòng *"
                                    variant="outlined"
                                    helperText=" "
                                    autoComplete='off'
                                    name="donGia"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                    }}
                                    inputProps={{
                                        maxLength: 15,
                                    }}
                                    fullWidth
                                    value={values.donGia}
                                    onChange={handleInputChange}
                                    {...(errors.donGia && { error: true, helperText: errors.donGia })} />
                                {/* <TextField
                                   
                                /> */}
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" onChange={handleImage} type="file" />
                                    <Button variant="contained" component="span">
                                        Thêm Ảnh
                                    </Button>
                                </label>

                                {image &&
                                    <IconButton onClick={handleIma}>
                                        <DeleteForeverIcon sx={{ fontSize: 40 }} />
                                    </IconButton>
                                }

                            </Grid>
                            <Grid item xs={12}>
                                {image && <div style={{ display: 'block' }}>
                                    <img src={image} alt="" style={{ width: 490, height: 350 }} />
                                </div>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="ten"
                                    label="Mô tả"
                                    variant="outlined"
                                    helperText=" "
                                    multiline
                                    name="moTa"
                                    autoComplete='off'
                                    rows={8}
                                    type="text"
                                    fullWidth
                                    value={values.moTa}
                                    onChange={handleInputChange}
                                    {...(errors.moTa && { error: true, helperText: errors.moTa })}
                                />
                            </Grid>
                        </Grid>
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
