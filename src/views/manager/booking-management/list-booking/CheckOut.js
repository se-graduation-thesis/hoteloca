import { Button, Card, CardActions, CardContent, Chip, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "actions/bill-detail.action"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import CellWifiOutlinedIcon from '@mui/icons-material/CellWifiOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function Checkout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { bill } = useParams();
    const billDetails = useSelector(state => state.bill_detail.billDetailByBill);

    useEffect(() => {
        dispatch(actions.getBillDetailByBill(bill))
    }, [])

    const handleCheckOut = (id) => {
        let list = billDetails.filter(e => (e.trangThai === 1 || e.trangThai === 3));
        console.log(list.length, ' - ', billDetails.length - 1)
        list.length === 1 ?
            navigate(`/admin/booking-payment/${bill}`) :
            dispatch(actions.updateBillDetail(id));
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h3 style={{ marginTop: 8 }}>Danh sách các phòng được đặt</h3>
                </Grid>
            </Grid>

            <>
                <Grid container spacing={1} style={{ padding: 10 }}>
                    {billDetails.map((e, i) => (
                        <Grid item xs={3} key={i}>
                            {/* < Link to="/admin/booking-calendar/" style={{ textDecoration: 'none' }}> */}
                            <Card style={e.trangThai === 1 ? { backgroundColor: "#e3f2fd", border: '2px solid #e6e6e6' } : { backgroundColor: "#fceebb", border: '2px solid #e6e6e6' }}
                            >

                                <CardContent >
                                    <Typography variant="body2"
                                        style={{
                                            color: "black",
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                            width: "100%"
                                        }}
                                    >
                                        PHÒNG: {e.phongId.ten}
                                    </Typography>
                                    <br></br>
                                    <Chip
                                        icon={(e.trangThai === 1 || e.trangThai === 3) ? < CheckCircleOutlinedIcon /> : <CancelOutlinedIcon />}
                                        label={(e.trangThai === 1 || e.trangThai === 3) ? "Có người" : "Đã trả phòng"}
                                        color={(e.trangThai === 1 || e.trangThai === 3) ? "error" : "primary"}
                                    />
                                    <br></br>
                                    <div style={{ marginTop: 20 }}>
                                        <span style={{ fontWeight: "bold" }}>Loại phòng: </span> <span>{e.phongId.loaiPhongid.ten}</span>
                                    </div>
                                    <div style={{ marginTop: 5 }}>
                                        <span style={{ fontWeight: "bold" }}>Số giường: </span> <span>{e.phongId.loaiPhongid.soGiuong}</span>
                                    </div>
                                    <div style={{ marginTop: 5 }}>
                                        <span style={{ fontWeight: "bold" }}>Số người: </span> <span>{e.phongId.loaiPhongid.soNguoi}</span>
                                    </div>
                                </CardContent>

                                <CardActions >
                                    <IconButton size="small" aria-label="add to favorites">
                                        <CellWifiOutlinedIcon style={{
                                            color: "black",
                                        }} />
                                    </IconButton>
                                    <IconButton size="small" aria-label="share">
                                        <AcUnitOutlinedIcon style={{
                                            color: "black",
                                        }} />
                                    </IconButton>
                                    <Button onClick={() => handleCheckOut(e.id)} variant="contained" style={{ marginLeft: 120 }} color="success" size="large" disabled={(e.trangThai === 1 || e.trangThai === 3) ? false : true}>Trả Phòng</Button>

                                </CardActions>
                            </Card>
                            {/* </Link> */}
                        </Grid>
                    ))
                    }

                </Grid>
            </>
        </Paper>
    )
}