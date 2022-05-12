import { Button, Chip, Grid } from "@mui/material";
import { IconPhone, IconSnowflake, IconToolsKitchen2, IconWifi } from "@tabler/icons"
import { useNavigate } from "react-router";
import DetailsIcon from '@mui/icons-material/Details';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function RoomItem({ room }) {
    const navigate = useNavigate()
    const toDetail = () => {
        navigate("/list-room/room-detail", { state: room })
    }
    return (
        <div className="body-room__list-room" style={{ borderBottom: '1px solid Chocolate', paddingBottom: 30, marginTop: 30 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <img src={room.hinhAnh}
                        alt="image"
                        style={{ maxWidth: "100%" }} />
                </Grid>

                <Grid item xs={5.5}>
                    <div className="room-title" style={{ borderBottom: '1px solid Chocolate', marginTop: -10 }}>
                        <h2 style={{ color: '#505050' }}>{room.ten}</h2>
                        <Chip label={room.loaiPhongid.ten} color="success"></Chip>
                        <p style={{ wordBreak: 'break-all' }}>{room.moTa}</p>
                        <ul>
                            <li>Số người: {room.loaiPhongid.soNguoi} </li>
                            <li><span>Số giường:</span> {room.loaiPhongid.soGiuong} </li>
                        </ul>
                    </div>
                    <div className="room-service" style={{ paddingTop: 5 }}>
                        <IconSnowflake strokeWidth="1" style={{ marginRight: 10 }} />
                        <IconWifi strokeWidth="1" style={{ marginRight: 10, width: 30, height: 30 }} />
                        <IconPhone strokeWidth="1" style={{ marginRight: 10, width: 30, height: 30 }} />
                        <IconToolsKitchen2 strokeWidth="1" style={{ marginRight: 10, width: 30, height: 30 }} />
                    </div>
                </Grid>

                <Grid item xs={2.5}>
                    <div style={{ textAlign: 'center', marginTop: 20, display: 'inline-grid' }}>
                        <h1 style={{ fontSize: 20 }}>{new Intl.NumberFormat('en-Vn').format(room?.loaiPhongid.donGia) + " VND"}</h1>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: 'pubble', color: 'white' }}
                            onClick={toDetail}
                            startIcon={<ShoppingCartCheckoutIcon />}
                        >
                            Đặt phòng
                        </Button>
                        <br></br>
                        <Button
                            variant="contained"
                            startIcon={<FavoriteIcon />}
                            sx={{ backgroundColor: 'red', color: 'white' }}
                            onClick={toDetail}>
                            Yêu thích
                        </Button>
                        <br></br>
                        <Button
                            variant="contained"
                            startIcon={<DetailsIcon />}
                            sx={{ backgroundColor: 'Chocolate', color: 'white' }}
                            onClick={toDetail}>
                            Xem thêm
                        </Button>

                    </div>
                </Grid>
            </Grid>
        </div>
    );
}