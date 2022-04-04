import { Container } from "@mui/material";
import FilterForm from "./components/filter-form_list-room/filterForm";
import RoomItem from "./components/room_list-room/RoomItem";
import Rooms from "./components/room_list-room/Rooms";
import './ListRoom.css'


export default function ListRoom() {

    return (
        <div className="body-listRoom">
            <Container sx={{ color: '#303030', mt: 5 }}>
                <h1 style={{ fontSize: 35, paddingLeft: 60 }}>Danh Sách Phòng</h1>
                <Container maxWidth="md" sx={{ mt: 10 }}>
                    <h2 style={{ color: "#707070" }}>Những Căn Phòng Của Chúng Tôi</h2>

                    <hr style={{ border: '1px solid Chocolate' }} />

                    <div className="filterForm-listroom">
                        <FilterForm />
                    </div>

                    <hr maxWidth="1" style={{ border: '1px solid Chocolate' }} />

                    <div className="listroom-listroom">
                        <Rooms />
                    </div>
                </Container>
            </Container>
        </div>
    )
}