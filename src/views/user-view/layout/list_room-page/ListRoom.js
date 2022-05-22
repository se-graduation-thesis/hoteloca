import { Container } from "@mui/material";
import FilterForm from "./components/filter-form_list-room/filterForm";
import RoomItem from "./components/room_list-room/RoomItem";
import Rooms from "./components/room_list-room/Rooms";
import './ListRoom.css'
import { useLocation } from "react-router";

export default function ListRoom() {
    const { state } = useLocation()
    return (
        <div className="body-listRoom">
            <Container sx={{ color: '#303030', mt: 5 }}>
                <h1 style={{ fontSize: 35, paddingLeft: 20 }}>Danh Sách Phòng</h1>
                <Container maxWidth="lg" sx={{ mt: 10 }}>
                    <div className="listroom-listroom">
                        <Rooms checkTime={state} />
                    </div>
                </Container>
            </Container>
        </div>
    )
}