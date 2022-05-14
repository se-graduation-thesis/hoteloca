import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { address } from 'assets/address';
import { nations } from "assets/nation"
import { useEffect, useState } from "react";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import * as actionCustomer from 'actions/customer.action';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";


const er = {
    ten: null,
    cmnd: null,
    diaChi: null,
    dienThoai: null,
    email: null,
    quocTich: null,
    soHoChieu: null
}

export default function CustomerInfo({ customer, handleCustomer, complete, handleCompleteButton, handleComplete, completed }) {

    const [error, setError] = useState({
        ten: null,
        cmnd: null,
        diaChi: null,
        dienThoai: null,
        email: null,
        quocTich: null,
        soHoChieu: null
    });

    const dispatch = useDispatch();
    const listCus = useSelector((state) => state.customer.customers);
    useEffect(() => {
        dispatch(actionCustomer.fetchAllCustomer());
    }, [])

    const [data, setData] = useState({
        ho: '',
        ten: '',
        cmnd: '',
        gioiTinh: true,
        diaChi: '',
        dienThoai: '',
        email: '',
        quocTich: 'Viet Nam',
        soHoChieu: '',
        trangThai: 1,
        ngayThamGia: moment.tz(new Date(), "Asia/Ho_Chi_Minh").format(),
        password: ''
    })

    useEffect(() => {
        setData(customer)
    }, [customer])

    const [hoTen, setHoTen] = useState('');

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const cus = listCus.filter(e => e.cmnd === data.cmnd);
        if (cus.length) {
            setData(cus[0]);
            setHoTen(cus[0].ho + ' ' + cus[0].ten);
        }
        else if (data.id !== undefined)
            setData({ ...data, id: undefined })
    }, [data.cmnd])

    const [disable, setDisable] = useState(false);

    useEffect(() => {
        if (completed['0'] || data.id !== undefined)
            setDisable(true)
        else
            setDisable(false)
    }, [completed, data.id])

    const handleCheckValidation = () => {
        // const reNum = new RegExp(/\d+$/);
        const reCMND = new RegExp(/^((\d{9})|(\d{12}))$/);
        const reSDT = new RegExp(/^(0\d{9})$/);
        const reEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        const reTen = new RegExp(/^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){1,6}$/);

        let cmnd = null;
        let dienThoai = null;
        let email = null;
        let ho = null;
        let ten = null;
        let kt = false;

        if (!reCMND.test(data.cmnd)) {
            cmnd = 'Số chứng minh nhân dân hoặc căn cước công dân là số chỉ 9 hoặc 12 kí tự';
            kt = true;
        }

        if (!reSDT.test(data.dienThoai)) {
            dienThoai = 'Số điện thoại chỉ chứa 10 số';
            kt = true;
        }

        if (!reEmail.test(data.email)) {
            email = 'Định dạng email không đúng';
            kt = true;
        }


        if (!reTen.test(hoTen)) {
            ten = 'Họ & Tên phải có 2 từ trở lên';
            kt = true;
        }

        setError({ ...error, cmnd: cmnd, ten: ten, dienThoai: dienThoai, email: email })

        return !kt;
    }

    useEffect(() => {
        if (data.id !== undefined)
            setError(er)
    }, [data.id])

    useEffect(() => {
        if (complete === true) {
            handleCompleteButton(false);
            if (handleCheckValidation()) {
                let address = JSON.stringify({
                    diaChi: diaChi,
                    city: tinh,
                    district: huyen,
                    ward: xa
                })
                handleCustomer('diaChi', address)
                data.ho = hoTen.split(' ')[0]
                data.ten = hoTen.split(' ').slice(1).join(' ')
                data.diaChi = address;
                handleCustomer(data)
                handleComplete();
            }
        }
    }, [complete === true])

    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])
    const [tinh, setTinh] = useState('');
    const [huyen, setHuyen] = useState('');
    const [xa, setXa] = useState('');
    const [diaChi, setDiaChi] = useState('');

    useEffect(() => {
        if (data.diaChi !== '' && data.diaChi != undefined) {
            const object = JSON.parse(data.diaChi);
            setTinh(object.city);
            setDistrict(address.filter(e => e.name === object.city)[0].districts);
            setHuyen(object.district)
            setXa(object.ward);
            setDiaChi(object.diaChi);
        }
    }, [data.diaChi])

    useEffect(() => {
        if (huyen !== '' && district.length)
            setWards(district.filter(e => e.name === huyen)[0]?.wards);
    }, [district])

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
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginTop: 5 }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Khách hàng</Typography>
                </Grid>

                {/* CMND - Quốc tịch */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={data.cmnd}
                        autoFocus
                        id="outlined-basic"
                        label="CMND/CCCD *"
                        variant="outlined"
                        autoComplete="off"
                        name="cmnd"
                        fullWidth
                        inputProps={{ readOnly: completed['0'], }}

                        onChange={handleData}
                    />
                    {error.cmnd && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.cmnd}</span></>}
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="qt">Quốc tịch</InputLabel>
                        <Select
                            labelId="qt"
                            id="qt"
                            name="quocTich"
                            value={data.quocTich}
                            label="Quốc Tịch *"
                            autoComplete="off"
                            inputProps={{ readOnly: disable, }}
                            onChange={handleData}
                        >
                            {
                                nations.map((e, i) => (
                                    <MenuItem key={i} value={e.name}>{e.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    {error.quocTich && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.quocTich}</span></>}
                </Grid>
                {
                    data.quocTich !== "Viet Nam" ?
                        <Grid item xs={12} sx={{ marginTop: 2 }}>
                            <TextField
                                value={data.soHoChieu}
                                id="outlined-basic"
                                label="Số Hộ Chiếu *"
                                name="soHoChieu"
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                inputProps={{ readOnly: disable, }}

                                onChange={handleData}
                            />
                        </Grid> : <></>
                }

                {/* HỌ - Tên */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={hoTen}
                        id="outlined-basic"
                        label="Họ ten*"
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        inputProps={{ readOnly: disable, }}

                        onChange={(e) => setHoTen(e.target.value)}
                    />
                    {error.ten && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ten}</span></>}
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Giới Tính</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="gioiTinh"
                            value={data.gioiTinh}
                            label="Giới Tính"
                            inputProps={{ readOnly: disable, }}

                            onChange={handleData}
                        >
                            <MenuItem value={false}>Nữ</MenuItem>
                            <MenuItem value={true}>Nam</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Dien Thoai - Email */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={data.dienThoai}
                        name="dienThoai"
                        id="outlined-basic"
                        label="Điện Thoại *"
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        inputProps={{ readOnly: disable, }}

                        onChange={handleData}
                    />
                    {error.dienThoai && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.dienThoai}</span></>}
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={data.email}
                        name="email"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        inputProps={{ readOnly: disable, }}

                        onChange={handleData}
                    />
                    {error.email && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.email}</span></>}
                </Grid>

                {/* Địa Chỉ */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tỉnh / Thành phố</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Tỉnh / Thành phố"
                            value={tinh}
                            inputProps={{ readOnly: disable, }}
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
                            inputProps={{ readOnly: disable, }}
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
                            inputProps={{ readOnly: disable, }}
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
                        id="outlined-basic"
                        label="Địa chỉ"
                        variant="outlined"
                        fullWidth

                        autoComplete="off"
                        inputProps={{ readOnly: disable, }}
                        onChange={(e) => setDiaChi(e.target.value)}
                    />
                    {error.diaChi && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.diaChi}</span></>}
                </Grid>
            </Grid>
        </>
    );
}