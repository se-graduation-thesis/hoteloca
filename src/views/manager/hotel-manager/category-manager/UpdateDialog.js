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
import * as actions from "actions/category.action"

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
            setAlertOpen(true)
        };

    }
    useEffect(() => {
        if (props.id) {
            actions.findById(props.id).then((res) => {
                setValues({
                    id: res.data.id,
                    tenLoaiPhong: res.data.tenLoaiPhong,
                    trangthai: res.data.trangthai,
                    khachSanid: res.data.khachSanid.id,
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
                            id="tenLoaiPhong"
                            label="Tên Loại Phòng"
                            variant="outlined"
                            helperText=" "
                            name="tenLoaiPhong"
                            type="text"
                            fullWidth
                            value={values.tenLoaiPhong || ''}
                            onChange={handleInputChange}
                            inputProps={{ readOnly: disabled }}
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
                                        value={values.khachSanid || ''}
                                        inputProps={{ readOnly: disabled }}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={1} >ABC</MenuItem>
                                        <MenuItem value={3} >Khang</MenuItem>
                                        <MenuItem value={4} >Haha</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <div><br></br></div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        name="trangthai"
                                        label="Trạng thái"
                                        onChange={handleInputChange}
                                        value={values.trangthai || ''}
                                        inputProps={{ readOnly: disabled }}
                                    // inputProps={{ readOnly: disabled }}
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
                            Sửa loại phòng
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
