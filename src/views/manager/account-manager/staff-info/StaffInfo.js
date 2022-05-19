import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { styled } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect, useState } from "react";
import { address } from 'assets/address';
import * as actions from "actions/manager.action"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import PositionedSnackbar from "../components/PositionedSnackbar";
import UpdatePhone from "./component/UpdatePhone";
import UpdateEmail from "./component/UpdateEmail";
import * as actionsUploadFile from 'actions/upload.action';
import { vi } from "date-fns/locale";
import UpdatePassword from "./component/UpdatePassword";

const marginTop = 3;

const Input = styled('input')({
    display: 'none',
});

export default function StaffInfo() {

    const dispatch = useDispatch();
    // const { employeeId } = useParams();
    const account = useSelector((state) => state.account.userAuth);
    const employeeId = isJson(account) ? JSON.parse(account).user_id : account.user_id;
    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    const manager = useSelector(state => state.manager.manager)
    useEffect(() => {
        dispatch(actions.findById(employeeId))
    }, [])

    const [data, setData] = useState({
        gioiTinh: true,
    })
    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])
    const [tinh, setTinh] = useState('');
    const [huyen, setHuyen] = useState('');
    const [xa, setXa] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [ten, setTen] = useState('')
    const [confirm, setConfirm] = useState(false);
    const [snackbarState, setSnackbarState] = useState(false);
    const [image, setImage] = useState("/broken-image.jpg")
    const [file, setFile] = useState(null);

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

    // -------------------- component
    const [openPhone, setOpenPhone] = useState(false);
    const [openEmail, setOpenEmail] = useState(false);
    const [openPass, setOpenPass] = useState(false);
    const handleOpenPhone = value => setOpenPhone(value);
    const handleOpenEmail = value => setOpenEmail(value);
    const handleOpenPass = value => setOpenPass(value);
    // -------------------------------------------------

    address.sort(function (a, b) {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    })

    const getDistrict = (a) => {
        setDistrict(a.districts)
        setHuyen('')
        setWards([])
    }

    useEffect(() => {
        district.sort(function (a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        })
    }, [district])

    const getWards = (a) => {
        setWards(a.wards)
        setXa('');
    }

    useEffect(() => {
        wards.sort(function (a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        })
    }, [wards])

    useEffect(() => {
        if (huyen !== '' && district.length)
            setWards(district.filter(e => e.name === huyen)[0]?.wards);
    }, [district])
    useEffect(() => {
        if (manager) {
            try {
                let object = JSON.parse(manager.diaChi);
                setTinh(object.city);
                setDistrict(address.filter(e => e.name === object.city)[0].districts);
                setHuyen(object.district);
                setXa(object.ward);
                setDiaChi(object.diaChi)
            } catch {
            }

            setTen(manager.ho + ' ' + manager.ten)
            setImage(manager.hinhAnh)
            setData(manager)
            console.log(manager)
        }
    }, [manager])
    console.log(image)

    const [error, setError] = useState({
        cmnd: null,
        ten: null,
        ngaySinh: null
    });

    const handleCheckValidation = () => {
        // const reNum = new RegExp(/\d+$/);
        const reCMND = new RegExp(/^((\d{9})|(\d{12}))$/);
        const reTen = new RegExp(/^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){1,6}$/);

        let cmnd = null;
        let name = null;
        let ngaySinh = null;
        let kt = false;

        if (!reCMND.test(data.cmnd)) {
            cmnd = 'Số chứng minh nhân dân hoặc căn cước công dân là số chỉ 9 hoặc 12 kí tự';
            kt = true;
        }

        if (!reTen.test(ten)) {
            name = 'Họ & Tên gồm hai từ trở lên';
            kt = true;
        }

        let currentDate = new Date();
        let birth = new Date(data.ngaySinh)

        if ((currentDate.getFullYear() - birth.getFullYear()) < 18) {
            ngaySinh = 'Nhân viên phải trên 18 tuổi';
            kt = true;
        } else if ((currentDate.getFullYear() - birth.getFullYear()) === 18) {
            if (currentDate.getMonth() > birth.getMonth()) {
                ngaySinh = 'Nhân viên phải trên 18 tuổi';
                kt = true;
            } else if (currentDate.getMonth() === birth.getMonth()) {
                if (currentDate.getDate() > birth.getDate()) {
                    ngaySinh = 'Nhân viên phải trên 18 tuổi';
                    kt = true;
                }
            }
        }

        setError({ ...error, cmnd: cmnd, ten: name, ngaySinh: ngaySinh })
        return !kt;

    }

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const validation = () => {
        if (handleCheckValidation())
            setConfirm(true);
    }

    const handleDiachi = () => {
        let address = JSON.stringify({
            diaChi: diaChi,
            city: tinh,
            district: huyen,
            ward: xa
        })
        data.ho = ten.split(' ')[0]
        data.ten = ten.split(' ').slice(1).join(' ')
        data.diaChi = address;
        submit();
    }

    const submit = () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            actionsUploadFile.upload(formData)
                .then((response) => {
                    console.log(">", response);
                    data.hinhAnh = response.data;
                    console.log(">>", data)
                    dispatch(actions.add_Employee(data))

                    setConfirm(false);

                    setSnackbarState(true);
                    setTimeout(function () {
                        setSnackbarState(false);
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            dispatch(actions.add_Employee(data))

            setConfirm(false);

            setSnackbarState(true);
            setTimeout(function () {
                setSnackbarState(false);
            }, 3000);
        }
    }

    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', pl: 5, pr: 5 }}>
                <Grid container spacing={1} style={{ marginTop: 10, padding: 20 }}>
                    <Grid item xs={7} style={{ borderRight: "1px solid LightGray", paddingRight: 50 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h3 style={{ marginTop: 8 }}>THÔNG TIN CÁ NHÂN</h3>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <label htmlFor="icon-button-file">
                                            <Input accept="image/*" onChange={handleImage} id="icon-button-file" type="file" />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <Avatar
                                                    src={image}
                                                    sx={{ width: 130, height: 130 }}
                                                />
                                            </IconButton>
                                        </label>

                                    </Grid>

                                    {/* NAME - ID */}
                                    <Grid item xs={9}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3.5}>
                                                <p style={{ fontSize: 16 }}>Họ & Tên</p>
                                            </Grid>
                                            <Grid item xs={8.5}>
                                                <TextField id="outlined-basic" value={ten} fullWidth variant="outlined" name="ten" onChange={e => setTen(e.target.value)} />
                                                {error.ten && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ten}</span></>}
                                            </Grid>
                                            <Grid item xs={3.5} sx={{ marginTop }}>
                                                <p style={{ fontSize: 16 }}>CMND/CCCD</p>
                                            </Grid>
                                            <Grid item xs={8.5} sx={{ marginTop }}>
                                                <TextField id="outlined-basic" value={data?.cmnd} name="cmnd" fullWidth variant="outlined" onChange={handleData} />
                                                {error.cmnd && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.cmnd}</span></>}
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/* BIRTHDAY */}
                                    <Grid item xs={12} sx={{ marginTop }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <p style={{ fontSize: 16 }}>Ngày Sinh</p>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        views={['day']}
                                                        label="Ngày"
                                                        inputFormat="dd"
                                                        value={data?.ngaySinh}
                                                        onChange={(newValue) => {
                                                            setData({ ...data, ngaySinh: newValue })
                                                        }}
                                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                                    />
                                                </LocalizationProvider>
                                                {error.ngaySinh && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ngaySinh}</span></>}
                                            </Grid>
                                            <Grid item xs={3}>
                                                <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        views={['month']}
                                                        label="Tháng"
                                                        inputFormat="MM"
                                                        value={data?.ngaySinh}
                                                        onChange={(newValue) => {
                                                            setData({ ...data, ngaySinh: newValue })
                                                        }}
                                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        views={['year']}
                                                        label="Năm"
                                                        inputFormat="yyyy"
                                                        value={data?.ngaySinh}
                                                        onChange={(newValue) => {
                                                            setData({ ...data, ngaySinh: newValue })
                                                        }}
                                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/* GENDER */}
                                    <Grid item xs={12} sx={{ marginTop }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <p style={{ fontSize: 16 }}>Giới tính</p>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                        value={data?.gioiTinh}
                                                    >
                                                        <FormControlLabel value={true} control={<Radio />} label="Nam" />
                                                        <FormControlLabel value={false} control={<Radio />} label="Nữ" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/* ADDRESS */}
                                    <Grid item xs={12} sx={{ marginTop }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <p style={{ fontSize: 16 }}>Địa chỉ</p>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4} sx={{ marginTop: 2 }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Tỉnh / Thành phố</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Tỉnh / Thành phố"
                                                                value={tinh}
                                                                onChange={(e) => setTinh(e.target.value)}
                                                            >
                                                                {
                                                                    address.map((a) => (
                                                                        <MenuItem key={a.id} value={a.name} onClick={() => getDistrict(a)}>{a.name}</MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={4} sx={{ marginTop: 2 }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Quận / Huyện</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Quận / Huyện"
                                                                value={huyen}
                                                                onChange={(e) => setHuyen(e.target.value)}
                                                            >
                                                                {
                                                                    district.map((a) => (
                                                                        <MenuItem key={a.id} value={a.name} onClick={() => getWards(a)}>{a.name} </MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={4} sx={{ marginTop: 2 }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Xã / Phường</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Xã / Phường"
                                                                value={xa}
                                                                onChange={(e) => setXa(e.target.value)}
                                                            >
                                                                {
                                                                    wards.map((a) => (
                                                                        <MenuItem key={a.id} value={a.name} > {a.prefix + " " + a.name} </MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                                                        <TextField
                                                            value={diaChi}
                                                            id="outlined-basic"
                                                            label="Địa chỉ"
                                                            variant="outlined"
                                                            fullWidth

                                                            onChange={(e) => setDiaChi(e.target.value)}
                                                        />
                                                        {/* {error.diaChi && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.diaChi}</span></>} */}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/* BUTTON */}
                                    <Grid item xs={12} sx={{ marginTop }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                {/* <p style={{ fontSize: 16 }}>Giới tính</p> */}
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Button onClick={validation} variant="contained" fullWidth>LƯU THAY ĐỔI</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={5} style={{ paddingLeft: 50 }}>
                        <Grid container spacing={2}>
                            {/* NUMBER PHONE - EMAIL TITLE */}
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <h3 style={{ marginTop: 8 }}>SỐ ĐIỆN THOẠI VÀ EMAIL</h3>
                                    </Grid>

                                    {/* NUMBER PHONE*/}
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={1}>
                                                <PhoneIcon />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography sx={{ fontSize: 18 }}>Số điện thoại</Typography>
                                                <Typography sx={{ fontSize: 18 }}>{data?.dienThoai}</Typography>
                                            </Grid>
                                            {/* <Grid item xs={3}>
                                                <Button variant="outlined" onClick={() => handleOpenPhone(true)}>Cập nhật</Button>
                                            </Grid> */}
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sx={{ marginTop }}>
                                        <Divider />
                                    </Grid>

                                    {/* EMAIL */}
                                    <Grid item xs={12} sx={{ marginTop }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={1}>
                                                <EmailIcon />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography sx={{ fontSize: 18 }}>Địa chỉ Email</Typography>
                                                <Typography sx={{ fontSize: 18 }}>{data?.email}</Typography>
                                            </Grid>
                                            {/* <Grid item xs={3}>
                                                <Button variant="outlined" onClick={() => handleOpenEmail(true)}>Cập nhật</Button>
                                            </Grid> */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* SECURIRY TITLE */}
                            <Grid item xs={12} sx={{ marginTop: 5 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <h3 style={{ marginTop: 8 }}>BẢO MẬT</h3>
                                    </Grid>

                                    {/* SECURIRY*/}
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={1}>
                                                <LockIcon />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography sx={{ fontSize: 18 }}>Đổi mật khẩu</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant="outlined" onClick={() => handleOpenPass(true)}>Cập nhật</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            <div>
                <div>
                    <Dialog
                        open={confirm}
                        onClose={() => setConfirm(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{ fontSize: 16 }}>
                            {"Bạn chắc chắn muốn thay đổi thông tin?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Thông tin của bạn sẽ được thay đổi và cập nhật lại toàn bộ trong hệ thống.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirm(false)}>Hủy</Button>
                            <Button autoFocus onClick={handleDiachi}>
                                Đồng ý
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <div>
                    <PositionedSnackbar open={snackbarState} message={"Cập nhật Thành Công."} />
                </div>

                <div>
                    <UpdatePhone open={openPhone} handleOpenPhone={handleOpenPhone} object={data} />
                    <UpdateEmail open={openEmail} handleOpenEmail={handleOpenEmail} object={data} />
                    <UpdatePassword open={openPass} handleOpenEmail={handleOpenPass} />
                </div>
            </div>
        </div>
    )
}