import * as React from 'react';

import { Alert, AlertTitle, Button, FormControl, Grid, InputLabel, InputAdornment, Select, Snackbar, TextField, MenuItem, IconButton } from '@mui/material';

import Formsy from "formsy-react";
//Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useForm from './useForm';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { address } from 'assets/address';
import * as actions from "actions/account.action"
import * as actionsCustomer from "actions/customer.action"
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Slide from '@mui/material/Slide';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { useLocation, useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const initialFieldValues = {
    diaChi: "",
    matKhau: "",
    ho: "",
    ten: "",
    dienThoai: "",
    taiKhoan: "",
    email: "",
    quyen: 1,
    trangthai: 1,
    cmnd: "",
    quocTich: "Viet Nam",
    diaChi: "",
    city: "",
    district: "",
    ward: ""
};
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
    const listCus = useSelector((state) => state.customer.customers);
    const [listCusCompare, setListCuscompare] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [age, setAge] = useState('');

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // const handleClose = () => {
    //     setOpen(false);
    // };
    function handleClick() {
        setAlertOpen(true);
    }
    useEffect(() => {
        dispatch(actionsCustomer.fetchAllCustomer());
    }, [])

    useEffect(() => {
        if (listCus) {
            setListCuscompare(listCus)
        }
    }, [listCus])

    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const googleHandler = async () => {
        console.error('Register');
    };

    const getDistrict = (a) => {
        setDistrict(a.districts)
        setWards([])
    }
    const getWards = (a) => {
        setWards(a.wards)
    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("cmnd" in fieldValues) {
            let err = 0;
            listCusCompare.map((user) => {
                if (
                    user.cmnd.toLowerCase() === fieldValues.cmnd.toLowerCase()
                ) {
                    err = err + 1;
                }
            });
            if (fieldValues.cmnd === "") {
                temp.cmnd = fieldValues.cmnd ? "" : "Số chứng minh nhân dân hoặc căn cước công dân không được để trống";
            }
            if (fieldValues.cmnd !== "") {
                temp.cmnd = /^[0-9]\w{8,12}$/.test(fieldValues.cmnd)
                    ? ""
                    : "Số chứng minh nhân dân hoặc căn cước công dân là số chỉ 9 hoặc 12 kí tự";
            }
            if (err >= 1) {
                err < 1
                    ? (temp.cmnd = "")
                    : (temp.cmnd = "Số chứng minh nhân dân hoặc căn cước công dân này đã tồn tại");
            }
        }
        if ("dienThoai" in fieldValues) {
            let err = 0;
            listCusCompare.map((user) => {
                if (
                    user.dienThoai.toLowerCase() === fieldValues.dienThoai.toLowerCase()
                ) {
                    err = err + 1;
                }
            });
            if (fieldValues.dienThoai === "") {
                temp.dienThoai = fieldValues.dienThoai ? "" : "Số điện thoại không được để trống";
            }
            if (fieldValues.dienThoai !== "") {
                temp.dienThoai = /^[0-9]\w{9,11}$/.test(fieldValues.dienThoai)
                    ? ""
                    : "Số điện thoại chỉ chứ 10 hoặc 11 chữ số";
            }
            if (err >= 1) {
                err < 1
                    ? (temp.dienThoai = "")
                    : (temp.dienThoai = "Số điện thoại này đã được sử dụng");
            }
        }
        if ("email" in fieldValues) {
            let err = 0;
            listCusCompare.map((user) => {
                if (
                    user.email.toLowerCase() === fieldValues.email.toLowerCase()
                ) {
                    err = err + 1;
                }
            });
            if (fieldValues.email === "") {
                temp.email = fieldValues.email ? "" : "Email không được để trống";
            }
            if (fieldValues.email !== "") {
                temp.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValues.email)
                    ? ""
                    : "Định dạng email không đúng";
            }
            if (err >= 1) {
                err < 1
                    ? (temp.email = "")
                    : (temp.email = "Email này đã tồn tại");
            }
        }
        if ("ho" in fieldValues) {
            if (fieldValues.ho === "") {
                temp.ho = fieldValues.ho ? "" : "Họ không được để trống";
            }
            if (fieldValues.ho !== "") {
                temp.ho =
                    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
                        fieldValues.ho
                    )
                        ? ""
                        : "Vui lòng không nhập số hay kí tự đặc biệt";
            }
        }
        if ("ten" in fieldValues) {
            if (fieldValues.ten === "") {
                temp.ten = fieldValues.ten ? "" : "Tên không được để trống";
            }
            if (fieldValues.ten !== "") {
                temp.ten =
                    /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/.test(
                        fieldValues.ten
                    )
                        ? ""
                        : "Vui lòng không nhập số hay kí tự đặc biệt";
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
            dispatch(actionsCustomer.save_customer(values))
            handleClick();
            // resetForm();
        }
    };


    return (
        <>
            <Dialog keepMounted open={props.open} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle>Thêm Khách Hàng</DialogTitle>
                <DialogContent style={{ padding: 30 }}>
                    <Formsy onSubmit={handleSubmit} >
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    m={2} pt={3}
                                    fullWidth
                                    id="first-name"
                                    label="Họ *"
                                    name="ho"
                                    autoComplete='off'
                                    variant="outlined"
                                    value={values.ho}
                                    onChange={handleInputChange}
                                    {...(errors.ho && {
                                        error: true,
                                        helperText: errors.ho,
                                    })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="last-name"
                                    label="Tên *"
                                    name="ten"
                                    variant="outlined"
                                    fullWidth
                                    autoComplete='off'
                                    value={values.ten}
                                    onChange={handleInputChange}
                                    {...(errors.ten && { error: true, helperText: errors.ten })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="cmnd *"
                                    label="CMND/CCCD"
                                    name="cmnd"
                                    variant="outlined"
                                    fullWidth
                                    autoComplete='off'
                                    value={values.cmnd}
                                    onChange={handleInputChange}
                                    {...(errors.cmnd && { error: true, helperText: errors.cmnd })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="age"
                                    label="Số điện thoại *"
                                    variant="outlined"
                                    name="dienThoai"
                                    type="text"
                                    fullWidth
                                    autoComplete='off'
                                    value={values.dienThoai}
                                    onChange={handleInputChange}
                                    {...(errors.dienThoai && { error: true, helperText: errors.dienThoai })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="email"
                                    label="Email *"
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                    autoComplete='off'
                                    value={values.email}
                                    onChange={handleInputChange}
                                    {...(errors.email && { error: true, helperText: errors.email })}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Tỉnh / Thành phố</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Tỉnh / Thành phố"
                                        defaultValue={""}
                                        name="city"
                                        onChange={handleInputChange}
                                    >
                                        {
                                            address.map((a) => (
                                                <MenuItem key={a.id} value={a.name} onClick={() => getDistrict(a)}>{a.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Quận / Huyện</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Quận / Huyện"
                                        defaultValue={""}
                                        name="district"
                                        onChange={handleInputChange}
                                    >
                                        {
                                            district.map((a) => (
                                                <MenuItem key={a.id} value={a.name} onClick={() => getWards(a)}>{a.name} </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Xã / Phường</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Xã / Phường"
                                        defaultValue={""}
                                        name="ward"
                                        onChange={handleInputChange}
                                    >
                                        {
                                            wards.map((a) => (
                                                <MenuItem key={a.id} value={a.prefix + " " + a.name} > {a.prefix + " " + a.name} </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="address"
                                    label="Địa chỉ"
                                    name="diaChi"
                                    variant="outlined"
                                    fullWidth
                                    autoComplete='off'
                                    value={values.diaChi}
                                    onChange={handleInputChange}
                                // {...(errors.address && { error: true, helperText: errors.address })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                >
                                    Thêm khách hàng
                                </Button>
                            </Grid>
                        </Grid>
                    </Formsy >
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { props.isShowForm(), resetForm() }}>Đóng</Button>
                </DialogActions>
            </Dialog>
            <Snackbar autoHideDuration={2000} open={alertOpen} anchorOrigin={{ vertical, horizontal }} onClose={handleClose} >
                <Alert severity="success"><AlertTitle>Thành công</AlertTitle>
                    Thông báo — <strong>Thêm khách hàng thành công</strong></Alert>
            </Snackbar>
        </>

    );
}
