import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { address } from 'assets/address';
import * as actions from "actions/manager.action"
import moment from "moment-timezone";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import PositionedSnackbar from "../components/PositionedSnackbar";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import NumberFormat from "react-number-format";
import PropTypes from 'prop-types';
import { vi } from "date-fns/locale";


const width = 800;

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=""
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function EditEmployeeForm(props) {

    const dispatch = useDispatch();
    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])
    const [tinh, setTinh] = useState('');
    const [huyen, setHuyen] = useState('');
    const [xa, setXa] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [snackbarState, setSnackbarState] = useState(false);

    const bophans = useSelector(state => state.bophan.bophans);
    const listAccount = useSelector((state) => state.manager.listManager);

    const [error, setError] = useState({
        cmnd: null,
        sdt: null,
        email: null,
        ho: null,
        ten: null,
        ngaySinh: null
    });

    const handleCMND = (event) => {
        setEmployee({ ...employee, cmnd: event.target.value });

        let checkCMND = listAccount.filter(e => e.cmnd === event.target.value);

        (checkCMND.length > 0 && checkCMND[0].id !== props.item.id) ?
            setError({ ...error, cmnd: 'CMND/CCCD đã tồn tại.' }) :
            setError({ ...error, cmnd: null })
    }

    const getDistrict = (a) => {
        setDistrict(a.districts)
        setHuyen('')
        setWards([])
    }

    const getWards = (a) => {
        setWards(a.wards)
        setXa('');
    }

    const [employee, setEmployee] = useState({});

    useEffect(() => {
        if (huyen !== '' && district.length)
            setWards(district.filter(e => e.name === huyen)[0]?.wards);
    }, [district])

    useEffect(() => {
        if (props.item) {
            let object = JSON.parse(props.item.address);
            setTinh(object.city);
            setDistrict(address.filter(e => e.name === object.city)[0].districts);
            setHuyen(object.district);
            setXa(object.ward);
            setDiaChi(object.diaChi);
        }
        setEmployee({
            id: props.item?.id,
            ho: props.item?.ho,
            ten: props.item?.ten,
            gioiTinh: Number(props.item?.gioiTinh),
            ngaySinh: moment.tz(props.item?.ngaySinh, "Asia/Ho_Chi_Minh").format(),
            cmnd: props.item?.cmnd,
            dienThoai: props.item?.dienThoai,
            email: props.item?.email,
            diaChi: props.item?.address,
            boPhanid: Number(props.item?.boPhan.id),
            luong: props.item?.luong,
            trangThai: props.item?.trangThai,
            ngayVaoLam: moment.tz(props.item?.ngayVaoLam, "Asia/Ho_Chi_Minh").format(),
            taiKhoanid: props.item?.taiKhoanid
        })
    }, [props.item])

    const handleClose = () => {
        props.isShowEditForm(false);
    }

    const handleCheckValidation = () => {
        // const reNum = new RegExp(/\d+$/);
        const reCMND = new RegExp(/^((\d{9})|(\d{12}))$/);
        const reSDT = new RegExp(/^(0\d{9})$/);
        const reEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        const reHo = new RegExp(/^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+$/);
        const reTen = new RegExp(/^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/);

        let cmnd = null;
        let sdt = null;
        let email = null;
        let ho = null;
        let ten = null;
        let ngaySinh = null;
        let kt = false;

        if (!reCMND.test(employee.cmnd.trim())) {
            cmnd = 'Số chứng minh nhân dân hoặc căn cước công dân là số chỉ 9 hoặc 12 kí tự';
            kt = true;
        } else setEmployee({ ...employee, cmnd: employee.cmnd.trim() })

        if (!reSDT.test(employee.dienThoai.trim())) {
            sdt = 'Số điện thoại chỉ chứa 10 số';
            kt = true;
        } else setEmployee({ ...employee, dienThoai: employee.dienThoai.trim() })

        if (!reEmail.test(employee.email.trim())) {
            email = 'Định dạng email không đúng';
            kt = true;
        } else setEmployee({ ...employee, email: employee.email.trim() })

        if (!reHo.test(employee.ho.trim())) {
            ho = 'Vui lòng không nhập số hay kí tự đặc biệt';
            kt = true;
        } else setEmployee({ ...employee, ho: employee.ho.trim() })


        if (!reTen.test(employee.ten.trim())) {
            ten = 'Vui lòng không nhập số hay kí tự đặc biệt';
            kt = true;
        } else setEmployee({ ...employee, ten: employee.ten.trim() })

        let currentDate = new Date();
        let birth = new Date(employee.ngaySinh)

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

        setError({ ...error, cmnd: cmnd, ho: ho, ten: ten, sdt: sdt, email: email, ngaySinh: ngaySinh })
        return !kt;

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
        // setEmployee({ ...employee, diaChi: address })
        employee.diaChi = address;
        submit();
    }

    const submit = () => {
        dispatch(actions.add_Employee(employee));

        handleClose();
        setConfirm(false);

        setSnackbarState(true);
        setTimeout(function () {
            setSnackbarState(false);
        }, 3000);
    }

    const formatCash = (str) => {
        if (str === '') return '';
        return String(str).split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }
    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} maxWidth='1000px' >
                <DialogTitle sx={{ fontSize: 18 }}>
                    {props.isView ?
                        <>
                            CHI TIẾT PHÒNG
                            <Button style={{ float: 'right' }}
                                onClick={() => props.handleIsView(false)}
                                variant="outlined"
                            >
                                Chỉnh sửa
                            </Button>
                        </>
                        : "CẬP NHẬT NHÂN VIÊN"}
                </DialogTitle>
                <Divider />

                <DialogContent>
                    <Grid container spacing={2} sx={{ width }}>
                        {/* Họ - tên */}
                        <Grid item xs={6}>
                            <TextField
                                value={employee.ho}
                                inputProps={{ readOnly: props.isView, }}
                                autoFocus
                                autoComplete="off"
                                id="outlined-basic"
                                label="Họ Nhân Viên"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setEmployee({ ...employee, ho: e.target.value })}
                            />
                            {error.ho && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ho}</span></>}
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={employee.ten}
                                inputProps={{ readOnly: props.isView, }}
                                autoComplete="off"
                                id="outlined-basic"
                                label="Tên Nhân Viên"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setEmployee({ ...employee, ten: e.target.value })}
                            />
                            {error.ten && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ten}</span></>}
                        </Grid>

                        {/* CMND - Gioi Tinh */}
                        <Grid item xs={6}>
                            <TextField
                                value={employee.cmnd}
                                inputProps={{ readOnly: props.isView, }}
                                autoComplete="off"
                                id="outlined-basic"
                                label="CMND/CCCD"
                                variant="outlined"
                                fullWidth

                                onChange={handleCMND}
                            />
                            {error.cmnd && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.cmnd}</span></>}
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Giới Tính</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={employee.gioiTinh}
                                    label="Giới Tính"
                                    inputProps={{ readOnly: props.isView, }}

                                    onChange={e => setEmployee({ ...employee, gioiTinh: e.target.value })}
                                >
                                    <MenuItem value={0}>Nữ</MenuItem>
                                    <MenuItem value={1}>Nam</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Ngày Sinh - Ngày Vào Làm */}
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                            <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    renderInput={(props) => <TextField {...props} fullWidth />}
                                    inputFormat="dd/MM/yyyy"
                                    label="Ngày Sinh"
                                    value={employee.ngaySinh}
                                    onChange={(newValue) => {
                                        setEmployee({ ...employee, ngaySinh: moment.tz(newValue, "Asia/Ho_Chi_Minh").format() })
                                    }}
                                />
                            </LocalizationProvider>
                            {error.ngaySinh && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ngaySinh}</span></>}
                        </Grid>

                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                            <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    renderInput={(props) => <TextField {...props} fullWidth />}
                                    inputFormat="dd/MM/yyyy"
                                    label="Ngày Vào Làm"
                                    value={employee.ngayVaoLam}
                                    onChange={(newValue) => {
                                        setEmployee({ ...employee, ngayVaoLam: moment.tz(newValue, "Asia/Ho_Chi_Minh").format() })
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        {/* SDT - Email */}
                        <Grid item xs={6}>
                            <TextField
                                value={employee.dienThoai}
                                inputProps={{ readOnly: props.isView, }}
                                autoComplete="off"
                                id="outlined-basic"
                                label="Số Điện Thoại"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setEmployee({ ...employee, dienThoai: e.target.value })}
                            />
                            {error.dienThoai && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.dienThoai}</span></>}
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={employee.email}
                                inputProps={{ readOnly: props.isView, }}
                                autoComplete="off"
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                            />
                            {error.email && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.email}</span></>}
                        </Grid>

                        {/* Luong - Bộ Phận */}
                        <Grid item xs={6}>
                            <TextField
                                label="Lương"
                                value={employee.luong}
                                onChange={(e) => setEmployee({ ...employee, luong: e.target.value })}
                                name="luong"
                                id="outlined-basic"
                                variant="outlined"
                                autoComplete="off"
                                fullWidth
                                InputProps={{
                                    readOnly: props.isView, inputComponent: NumberFormatCustom,
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Bộ Phận</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={employee.boPhanid}
                                    label="Bộ Phận"
                                    inputProps={{ readOnly: props.isView, }}

                                    onChange={e => setEmployee({ ...employee, boPhanid: e.target.value })}
                                >
                                    {bophans.map((item) => <MenuItem key={item.id} value={item.id}>{item.ten}</MenuItem>)}

                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Đia Chi */}
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
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
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
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
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
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
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                            <TextField
                                value={diaChi}
                                autoComplete="off"
                                id="outlined-basic"
                                label="Địa chỉ"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => setDiaChi(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Hủy</Button>
                    {
                        !props.isView ?
                            <Button onClick={validation} variant="outlined">Cập nhật</Button> : <></>
                    }
                </DialogActions>
            </Dialog >

            <div>
                <div>
                    <Dialog
                        open={confirm}
                        onClose={() => setConfirm(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{ fontSize: 16 }}>
                            {"Bạn chắc chắn muốn thay đổi thông tin Nhân Viên?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Thông tin Nhân Viên sẽ được thay đổi và cập nhật lại toàn bộ trong hệ thống.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirm(false)}>Hủy</Button>
                            <Button onClick={handleDiachi} autoFocus>
                                Đồng ý
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div>
                <PositionedSnackbar open={snackbarState} message={"Cập nhật Thành Công."} />
            </div>
        </div >
    )
}