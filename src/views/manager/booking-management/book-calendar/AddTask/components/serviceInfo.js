import { Checkbox, Chip, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionPhongTN from 'actions/phongTN.action';
import * as actionService from 'actions/service.action';

const colors = ["primary", "secondary", "info", "error", "success"]

export default function ServiceInfo({ token }) {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const tienNghiList = useSelector(state => state.phongTN.tienNghiList);
    useEffect(() => {
        dispatch(actionPhongTN.getByPhong(token));
    }, [])

    const services = useSelector(state => state.service.services);
    useEffect(() => {
        dispatch(actionService.fetchAllService())
    }, [])

    const [serviceSelect, setServiceSelect] = useState([]);


    const handleService = (e, checked) => {
        let i = null;
        let tam = services.filter(item => item.id === Number(e.target.value))[0];
        let arr = null;
        if (checked === true) {
            setServiceSelect([...serviceSelect, tam]);
        }
        else {
            arr = serviceSelect.filter(item => item.id !== Number(e.target.value));
            setServiceSelect(arr);
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginTop: 5 }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Tiện nghi</Typography>
                    <p>Các Tiện nghi đang có sẵn tại phòng</p>
                    {
                        tienNghiList.map((e, index) => (
                            <Chip style={{ margin: 5 }} key={e.id} color={colors[index]} label={e.tienNghiid.ten} />
                        ))
                    }
                    <br></br>
                    <div className="div-add" style={{ marginTop: 30 }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Dịch vụ</Typography>
                        <div style={{ width: "100%" }}>
                            {
                                serviceSelect.map((e, index) => (
                                    <Chip style={{ margin: 5 }} key={e.id} color={colors[index]} label={e.ten} />
                                ))
                            }
                        </div>
                        <span className="div-lable-span">Thêm các dịch vụ mới</span>
                        <IconButton aria-label="delete" color="secondary" onClick={() => setOpen(!open)}>
                            {!open ? <AddCircleOutlineIcon /> : <RemoveCircleOutlineIcon />}
                        </IconButton>
                    </div>
                </Grid>
            </Grid>

            {
                open ?
                    <div style={{ marginTop: 30 }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center  ' }}>Bảng danh sách các Dịch vụ</Typography>
                        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tên</TableCell>
                                        <TableCell align="center">Đơn Giá</TableCell>
                                        <TableCell align="center">Mô Tả</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {services.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.ten}
                                            </TableCell>
                                            <TableCell align="center">{row.donGia}</TableCell>
                                            <TableCell align="center">{row.moTa}</TableCell>
                                            <TableCell align="center"><Checkbox value={row.id} onChange={(e, checked) => handleService(e, checked)} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div> : <></>
            }
        </>
    )
}