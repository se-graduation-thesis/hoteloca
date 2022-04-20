import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { address } from 'assets/address';
import { useState } from "react";

export default function CustomerInfo() {

    const [customer, setCustomer] = useState({
        ho: '',
        ten: '',
        cmnd: '',
        diaChi: '',
        dienThoai: '',
        email: '',
        quocTich: 'Việt Nam',
        soHoChieu: '',
        trangThai: 1,
        password: ''
    })

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
                <Grid item xs={6}>
                    <TextField
                        value={customer.ho}
                        id="outlined-basic"
                        label="Họ"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => setCustomer({ ...customer, ho: e.target.value })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={customer.ten}
                        id="outlined-basic"
                        label="Tên"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => setCustomer({ ...customer, ten: e.target.value })}
                    />
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

                        onChange={(e) => setCustomer({ ...customer, cmnd: e.target.value })}
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.quocTich}
                        id="outlined-basic"
                        label="Quốc Tịch"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => setCustomer({ ...customer, quocTich: e.target.value })}
                    />
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

                                onChange={(e) => setCustomer({ ...customer, soHoChieu: e.target.value })}
                            />
                        </Grid> : <></>
                }

                {/* CMND - Quốc tịch */}
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.dienThoai}
                        id="outlined-basic"
                        label="Điện Thoại"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => setCustomer({ ...customer, dienThoai: e.target.value })}
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <TextField
                        value={customer.email}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        fullWidth

                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    />
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

                        onChange={(e) => setCustomer({ ...customer, diaChi: e.target.value })}
                    />
                </Grid>
            </Grid>
        </>
    );
}