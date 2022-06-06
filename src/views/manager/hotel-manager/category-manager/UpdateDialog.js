
import { Alert, AlertTitle, Button, FormControl, Grid, IconButton, InputAdornment, MenuItem, Select, Snackbar, TextField } from '@mui/material';

import Formsy from "formsy-react";
//Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useForm from './useForm';
import NumberFormat from 'react-number-format';
import { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/category.action"
import * as actionsUploadFile from 'actions/upload.action';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { Edit } from '@mui/icons-material';
import * as brandActions from "actions/brand.action"
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
export default function UpdateBrand(props) {
    const dispatch = useDispatch();
    let vertical = 'top';
    let horizontal = 'right';

    const [edit, setEdit] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [displayButton, setDisplayButton] = useState('none')
    const [alertOpen, setAlertOpen] = useState(false);
    const [tenLp, setTenLp] = useState('');
    const listCategory = useSelector((state) => state.category.listCategory);
    const [listCategoryShow, setListCategory] = useState([])
    const account = useSelector((state) => state.account.userAuth);
    const imgRef = useRef();

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
    useEffect(() => {
        setImage(values.hinhAnh);
    }, [values.hinhAnh])

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

    console.log(values)

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
                        if (typeof values.donGia !== "number") {
                            values.donGia = Number(values.donGia.replaceAll(',', ''))
                        }
                        dispatch(actions.insertCategory(values))
                        setAlertOpen(true)
                        resetForm()

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
                if (typeof values.donGia !== "number") {
                    values.donGia = Number(values.donGia.replaceAll(',', ''))
                }
                dispatch(actions.insertCategory(values))
                setAlertOpen(true)
                resetForm()

            }

        };
        props.isShowForm();

    }
    useEffect(() => {
        if (props.id) {
            actions.findById(props.id).then((res) => {
                let dienTich = {}
                try {
                    dienTich = JSON.parse(res.data.dienTich)
                } catch {
                    console.log("err")
                }
                setValues({
                    id: res.data.id,
                    ten: res.data.ten,
                    soNguoi: res.data.soNguoi,
                    soGiuong: res.data.soGiuong,
                    donGia: res.data.donGia,
                    chieuDai: dienTich.chieudai,
                    chieuRong: dienTich.chieurong,
                    moTa: res.data.moTa,
                    hinhAnh: res.data.hinhAnh
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
                            <p>Sửa Loại Phòng</p>
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

                        <Grid container spacing={1}>
                            <Grid item xs={12}>
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
                                    InputProps={{ inputProps: { min: 0, max: 20 }, readOnly: disabled }}
                                    fullWidth
                                    value={values.soNguoi || ''}
                                    onChange={handleInputChange}
                                    {...(errors.soNguoi && { error: true, helperText: errors.soNguoi })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="soGiuong"
                                    label="Số Giường *"
                                    variant="outlined"
                                    autoComplete='off'
                                    helperText=" "
                                    name="soGiuong"
                                    type="number"
                                    fullWidth
                                    InputProps={{ inputProps: { min: 0, max: 20, readOnly: disabled } }}
                                    value={values.soGiuong || ''}
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
                                        inputProps: { min: 0, max: 100 }, readOnly: disabled
                                    }}
                                    value={values.chieuDai || ''}
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
                                    value={values.chieuRong || ''}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">Mét</InputAdornment>,
                                        inputProps: { min: 0, max: 100 },
                                        readOnly: disabled
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
                                    type="t"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                        readOnly: disabled
                                    }}
                                    inputProps={{
                                        maxLength: 15,
                                    }}
                                    fullWidth
                                    value={values.donGia || ''}
                                    onChange={handleInputChange}
                                    {...(errors.donGia && { error: true, helperText: errors.donGia })} />
                                {/* <TextField
                                   
                                /> */}
                            </Grid>
                            <Grid item xs={12} style={{ display: displayButton }}>
                                <input ref={imgRef} hidden accept="image/*" id="contained-button-file" onChange={handleImage} type="file" />
                                <Button variant="contained" component="span" onClick={() => imgRef.current.click()}>
                                    Thay Ảnh
                                </Button>

                                {image &&
                                    <IconButton onClick={handleIma}>
                                        <DeleteForeverIcon sx={{ fontSize: 40 }} />
                                    </IconButton>
                                }

                            </Grid>
                            <Grid item xs={12}>
                                {image &&
                                    <img src={image} alt="" style={{ width: 490, height: 350 }} />
                                }
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
                                    value={values.moTa || ''}
                                    InputProps={{
                                        readOnly: disabled
                                    }}
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
