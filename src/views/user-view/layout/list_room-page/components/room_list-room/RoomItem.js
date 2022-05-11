import { Button, Grid } from "@mui/material";
import { IconPhone, IconSnowflake, IconToolsKitchen2, IconWifi } from "@tabler/icons"
import { Link } from "react-router-dom";

export default function RoomItem({ room }) {

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
                        <p>Phòng cơ sở của chúng tôi cung cấp tầm nhìn ngoạn mục của đường chân trời.</p>
                        <ul>
                            <li>Size: 24 m2</li>
                            <li>Giường: 2 giường đôi </li>
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
                    <div style={{ textAlign: 'center', marginTop: 50 }}>
                        From
                        <h1 style={{ fontSize: 30 }}>{room.donGia}</h1>
                        <Link to="/home/list-room/room-detail" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" sx={{ backgroundColor: 'Chocolate', color: 'white' }}>Thêm Thông Tin</Button>
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}