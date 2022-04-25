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

import * as brandActions from "actions/brand.action"
const initialFieldValues = {
    ten: "",
    diaChi: "",
    trangthai: "",
    soDienThoai: ""
};
export default function UpdateBrand(props) {
    const dispatch = useDispatch();
    const listBrand = useSelector((state) => state.brand.listBrand);
    const [listBrandShow, setListBrand] = useState([])

    let vertical = 'top';
    let horizontal = 'right';

    const [edit, setEdit] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [displayButton, setDisplayButton] = useState('none')
    const [alertOpen, setAlertOpen] = useState(false);
    const [tenLp, setTenLp] = useState('');
    const listCategory = useSelector((state) => state.category.listCategoryByBrand);
    const [listCategoryShow, setListCategory] = useState([])
    const account = useSelector((state) => state.account.userAuth);

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
                    u.ten.toLowerCase() === fieldValues.ten.toLowerCase() && fieldValues.ten !== tenLp
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
                temp.ten = fieldValues.ten ? "" : "Tên khách sạn không được để trống";
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
                    ten: res.data.ten,
                }),
                    setTenLp(res.data.ten)
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
                            id="ten"
                            label="Tên Loại Phòng"
                            variant="outlined"
                            helperText=" "
                            name="ten"
                            type="text"
                            fullWidth
                            value={values.ten || ''}
                            onChange={handleInputChange}
                            inputProps={{ readOnly: disabled }}
                            {...(errors.ten && { error: true, helperText: errors.ten })}
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <div><br></br></div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        name="trangThai"
                                        label="Trạng thái"
                                        defaultValue=""
                                        onChange={handleInputChange}
                                        value={values.trangThai || ''}
                                        inputProps={{ readOnly: disabled }}
                                    >
                                        <MenuItem value={1} >{'Đang hoạt động'} </MenuItem>
                                        <MenuItem value={2} >{'Tạm ngưng'} </MenuItem>
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
