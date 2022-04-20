import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "actions/room.action";
import RoomItem from "./RoomItem";

const room = [
    {
        id: 1,
        title: 'Junior Suite',
        img: 'https://static.wixstatic.com/media/fde015_6c05c2f649564c37a7b5acfd3a848e5b.jpg/v1/fill/w_240,h_170,q_85,usm_0.66_1.00_0.01/fde015_6c05c2f649564c37a7b5acfd3a848e5b.jpg',
        price: '2.500'
    },
    {
        id: 2,
        title: 'Standard Room',
        img: 'https://static.wixstatic.com/media/fde015_597c7d9710e44a9d91514e0ac84fb653.jpg/v1/fill/w_240,h_170,q_85,usm_0.66_1.00_0.01/fde015_597c7d9710e44a9d91514e0ac84fb653.jpg',
        price: '1.500'
    },
    {
        id: 3,
        title: 'Superior Room',
        img: 'https://static.wixstatic.com/media/fde015_6159dcce72024a789a3df21e95e8d495.jpg/v1/fill/w_240,h_170,q_85,usm_0.66_1.00_0.01/fde015_6159dcce72024a789a3df21e95e8d495.jpg',
        price: '2.500'
    },

]

export default function Rooms() {
    const dispatch = useDispatch();

    const rooms = useSelector((state) => state.room.rooms);
    useEffect(() => {
        dispatch(actions.fetchAllRoomByCategory(0, 1))
    }, [])

    return (

        rooms.map((item) => <RoomItem key={item.id} room={item} />)

    )
}