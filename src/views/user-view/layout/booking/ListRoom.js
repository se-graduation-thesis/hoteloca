import { Chip, Grid } from "@mui/material";
import { useNavigate } from "react-router";
export default function RoomItem({ room }) {
    const navigate = useNavigate()
    return (
        <Grid container style={{ border: '2px solid purple', padding: 20 }} >
            <Grid item xs={4}>
                <img src={room.hinhAnh}
                    alt="image"
                    style={{ maxWidth: "100%" }} />
            </Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={7.5}>
                <div className="room-title" style={{ marginTop: -10 }}>
                    <h4 style={{ color: 'black' }}>{room.ten}</h4>
                    <Chip label={room.loaiPhongid.ten} color="secondary"></Chip>
                    <p style={{ wordBreak: 'break-all', color: "black" }}>{room.moTa}</p>
                    <ul>
                        <li style={{ color: "black" }}><b>Số người: </b>{room.loaiPhongid.soNguoi} </li>
                        <li style={{ color: "black" }}><b>Số giường: </b> {room.loaiPhongid.soGiuong} </li>
                    </ul>
                </div>
            </Grid>
        </Grid>
    );
}