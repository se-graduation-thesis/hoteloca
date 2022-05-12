import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { address } from 'assets/address';
import { nations } from "assets/nation"
import { useEffect, useState } from "react";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const er = {
    ho: null,
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
        ho: null,
        ten: null,
        cmnd: null,
        diaChi: null,
        dienThoai: null,
        email: null,
        quocTich: null,
        soHoChieu: null
    });

    const [disable, setDisable] = useState(false);

    useEffect(() => {
        completed['0'] ? setDisable(true) : setDisable(false)
    }, [completed])

    const handleCheckValidation = () => {
        // const reNum = new RegExp(/\d+$/);
        const reCMND = new RegExp(/^((\d{9})|(\d{12}))$/);
        const reSDT = new RegExp(/^(0\d{9})$/);
        const reEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        const reHo = new RegExp(/^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+$/);
        const reTen = new RegExp(/^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]{1,15}(?: [a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+){0,6}$/);

        let cmnd = null;
        let dienThoai = null;
        let email = null;
        let ho = null;
        let ten = null;
        let kt = false;

        if (!reCMND.test(customer.cmnd)) {
            cmnd = 'Số chứng minh nhân dân hoặc căn cước công dân là số chỉ 9 hoặc 12 kí tự';
            kt = true;
        }

        if (!reSDT.test(customer.dienThoai)) {
            dienThoai = 'Số điện thoại chỉ chứa 10 số';
            kt = true;
        }

        if (!reEmail.test(customer.email)) {
            email = 'Định dạng email không đúng';
            kt = true;
        }

        if (!reHo.test(customer.ho)) {
            ho = 'Vui lòng không nhập số hay kí tự đặc biệt';
            kt = true;
        }


        if (!reTen.test(customer.ten)) {
            ten = 'Vui lòng không nhập số hay kí tự đặc biệt';
            kt = true;
        }

        setError({ ...error, cmnd: cmnd, ho: ho, ten: ten, dienThoai: dienThoai, email: email })

        return !kt;
    }

    useEffect(() => {
        if (customer.id !== undefined)
            setError(er)
    }, [customer.id])

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
        if (customer.diaChi !== '') {
            const data = JSON.parse(customer.diaChi);
            setTinh(data.city);
            setDistrict(address.filter(e => e.name === data.city)[0].districts);
            setHuyen(data.district)
            setXa(data.ward);
            setDiaChi(data.diaChi);
        }
    }, [customer.diaChi])

    useEffect(() => {
        if (huyen !== '' && district.length)
            setWards(district.filter(e => e.name === huyen)[0]?.wards);
    }, [district])

    const getDistrict = (a) => {
        setDistrict(a.districts)
        setHuyen('')
        setWards([])
    }

    const getWards = (a) => {
        setWards(a.wards)
        setXa('');
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginTop: 5 }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Khách hàng</Typography>
                </Grid>

                {/* CMND - Quốc tịch */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.cmnd}
                        autoFocus
                        id="outlined-basic"
                        label="CMND/CCCD *"
                        variant="outlined"
                        autoComplete="off"
                        fullWidth
                        inputProps={{ readOnly: disable, }}

                        onChange={(e) => handleCustomer('cmnd', e.target.value)}
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
                            value={customer.quocTich}
                            label="Quốc Tịch *"
                            autoComplete="off"
                            inputProps={{ readOnly: disable, }}
                            onChange={(e) => handleCustomer('quocTich', e.target.value)}
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
                    customer.quocTich !== "Viet Nam" ?
                        <Grid item xs={12} sx={{ marginTop: 2 }}>
                            <TextField
                                value={customer.soHoChieu}
                                id="outlined-basic"
                                label="Số Hộ Chiếu *"
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                inputProps={{ readOnly: disable, }}

                                onChange={(e) => handleCustomer('soHoChieu', e.target.value)}
                            />
                        </Grid> : <></>
                }

                {/* HỌ - Tên */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.ho}
                        id="outlined-basic"
                        label="Họ *"
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        inputProps={{ readOnly: disable, }}

                        onChange={(e) => handleCustomer('ho', e.target.value)}
                    />
                    {error.ho && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ho}</span></>}
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.ten}
                        id="outlined-basic"
                        label="Tên *"
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        inputProps={{ readOnly: disable, }}

                        onChange={(e) => handleCustomer('ten', e.target.value)}
                    />
                    {error.ten && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ten}</span></>}

                </Grid>

                {/* Dien Thoai - Email */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.dienThoai}
                        id="outlined-basic"
                        label="Điện Thoại *"
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        inputProps={{ readOnly: disable, }}

                        onChange={(e) => handleCustomer('dienThoai', e.target.value)}
                    />
                    {error.dienThoai && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.dienThoai}</span></>}
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.email}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        inputProps={{ readOnly: disable, }}

                        onChange={(e) => handleCustomer('email', e.target.value)}
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