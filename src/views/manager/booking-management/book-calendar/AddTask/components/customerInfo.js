import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { address } from 'assets/address';
import { useState } from "react";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


export default function CustomerInfo({ customer, handleCustomer }) {

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

    const reNum = new RegExp(/\d+$/);
    const reCMND = new RegExp(/\d{9,12}$/);
    const reString = new RegExp(/\w+/);

    const handleCheckValidation = (type, name, tam) => {

        let value = null;

        if (!type.test(name)) {
            value = tam + ' là chuỗi ký tự';
        }

        setError({ ...error, [tam]: value })

    }

    const [district, setDistrict] = useState([])
    const [wards, setWards] = useState([])
    const [tinh, setTinh] = useState('');
    const [huyen, setHuyen] = useState('');
    const [xa, setXa] = useState('');

    const getDistrict = (a) => {
        setDistrict(a.districts)
        setWards([])
    }

    const getWards = (a) => {
        setWards(a.wards)
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginTop: 5 }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Khách hàng</Typography>
                </Grid>

                {/* HỌ - Tên */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.ho}
                        id="outlined-basic"
                        label="Họ"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => handleCustomer('ho', e.target.value)}
                        onBlur={() => handleCheckValidation(reString, customer.ho, 'ho')}
                    />
                    {error.ho && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ho}</span></>}
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.ten}
                        id="outlined-basic"
                        label="Tên"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => handleCustomer('ten', e.target.value)}
                        onBlur={() => handleCheckValidation(reString, customer.ten, 'ten')}
                    />
                    {error.ten && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.ten}</span></>}

                </Grid>

                {/* CMND - Quốc tịch */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.cmnd}
                        autoFocus
                        id="outlined-basic"
                        label="Chứng Minh Nhân Dân"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => handleCustomer('cmnd', e.target.value)}
                        onBlur={() => handleCheckValidation(reCMND, customer.cmnd, 'cmnd')}
                    />
                    {error.cmnd && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.cmnd}</span></>}
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.quocTich}
                        id="outlined-basic"
                        label="Quốc Tịch"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => handleCustomer('quocTich', e.target.value)}
                        onBlur={() => handleCheckValidation(reString, customer.quocTich, 'quocTich')}
                    />
                    {error.quocTich && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.quocTich}</span></>}
                </Grid>
                {
                    customer.quocTich !== "Việt Nam" ?
                        <Grid item xs={12} sx={{ marginTop: 2 }}>
                            <TextField
                                value={customer.soHoChieu}
                                id="outlined-basic"
                                label="Số Hộ Chiếu"
                                variant="outlined"
                                fullWidth

                                onChange={(e) => handleCustomer('soHoChieu', e.target.value)}
                                onBlur={() => handleCheckValidation(reNum, customer.soHoChieu, 'soHoChieu')}
                            />
                        </Grid> : <></>
                }

                {/* Dien Thoai - Email */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.dienThoai}
                        id="outlined-basic"
                        label="Điện Thoại"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => handleCustomer('dienThoai', e.target.value)}
                        onBlur={() => handleCheckValidation(reNum, customer.dienThoai, 'dienThoai')}
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
                        value={customer.diaChi}
                        id="outlined-basic"
                        label="Địa chỉ"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => handleCustomer('diaChi', e.target.value)}
                    />
                    {error.diaChi && <><WarningAmberIcon fontSize='small' color='error' style={{ marginBottom: -5 }} /> <span style={{ color: 'red' }}>{error.diaChi}</span></>}
                </Grid>
            </Grid>
        </>
    );
}