import { Checkbox, Chip, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from "react";

export default function ServiceInfo() {

    const [open, setOpen] = useState(false);

    const [chipData, setChipData] = useState([
        { id: 0, label: 'Wifi', color: "primary", donGia: 120000, trangThai: 'Hoạt động' },
        { id: 1, label: 'Dọn phòng', color: "secondary", donGia: 120000, trangThai: 'Hoạt động' },
        { id: 2, label: 'Hồ bơi', color: "info", donGia: 120000, trangThai: 'Hoạt động' },
        { id: 3, label: 'Massage', color: "error", donGia: 120000, trangThai: 'Hoạt động' },
        { id: 4, label: 'Xông hơi', color: "success", donGia: 120000, trangThai: 'Hoạt động' },
    ]);

    const columns = [
        // { field: 'id', headerName: 'id', width: 70 },
        { field: 'label', headerName: 'Tên Dịch Vụ', width: 130 },
        { field: 'donGia', headerName: 'Đơn Giá', width: 130, type: 'number' },
        { field: 'trangThai', headerName: 'Trạng Thai', width: 130 }
    ];

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginTop: 5 }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Thông tin Dịch vụ</Typography>
                    <p>Các dịch vụ đang có sẵn tại phòng</p>
                    {
                        chipData.map((e) => (
                            <Chip style={{ margin: 5 }} key={e.id} color={e.color} label={e.label} />
                        ))
                    }
                    <br></br>
                    <div className="div-add">
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
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {chipData.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.label}
                                            </TableCell>
                                            <TableCell align="center">{row.donGia}</TableCell>
                                            <TableCell align="center"><Checkbox /></TableCell>
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