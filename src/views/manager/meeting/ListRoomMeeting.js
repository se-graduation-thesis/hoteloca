import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import * as actions from "actions/category.action"
import './listmeet.css'
import { useNavigate } from 'react-router';
import firebase from "views/pages/authentication/auth-forms/firebase";
import InputIcon from '@mui/icons-material/Input';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function CategoryManager() {
    const dispatch = useDispatch();
    const [listRoomOnline, setListRoomOnline] = React.useState([])
    useEffect(() => {
        dispatch(actions.fetchAllCategory())
    }, [])
    const createRoomMeeting = () => {
        let fireb = firebase.database().ref().push();
        let link = window.location.protocol + "//" + window.location.host + "/admin/meeting?id=" + fireb.key
        window.location.href = link
    }
    const joinMeeting = (id) => {
        let link = window.location.protocol + "//" + window.location.host + "/admin/meeting?id=" + id
        window.location.href = link
    }
    useEffect(() => {
        firebase.database().ref().on('value', (snapshot) => {
            let newUserState = [];
            snapshot.forEach(data => {
                let valTemp = data.val()
                console.log("aaa", valTemp)
                newUserState.push({
                    id: data.key,
                })
            })
            setListRoomOnline(newUserState)
        })
    }, [])
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container style={{ marginTop: 100, marginLeft: 50 }}>
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <p className='headerSpan'>Cuộc họp video chất lượng</p>
                            <p className='headerSpan'>tạo phòng họp mới để cùng  </p>
                            <p className='headerSpan'>tương tác với mọi người.</p>
                            <p className='note'>Ứng dụng họp mặt trên Hoteloca — tổ chức các cuộc họp nội bộ nhanh chóng tiện lợi</p>

                        </Grid>
                        {
                            listRoomOnline.filter(({ id }) => id !== 'participants').map((e, i) => (
                                <Grid key={i} item xs={3}>
                                    <Card onClick={() => joinMeeting(e.id)} className='card' style={{ boxShadow: 2, backgroundColor: '#c8facd', border: '2px solid #e6e6e6', height: 150, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <InputIcon style={{ fontSize: 40, color: 'green' }} /><br></br>
                                            <MoreHorizIcon /><br></br>

                                            <Button variant='contained' color="secondary">Tham gia ngay</Button>
                                        </div>
                                    </Card>
                                </Grid>
                            ))

                        }
                        <Grid item xs={3}>
                            <Card onClick={createRoomMeeting} className='card' style={{ backgroundColor: 'white', boxShadow: 2, border: '2px solid #e6e6e6', height: 150, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <AddIcon style={{ fontSize: 40, color: '#3e59ab' }} /><br></br>
                                    <p style={{ color: '#3e59ab', fontWeight: 'bold' }}>Tạo phòng họp mới</p>
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <img className='imgCus' src='https://revup.vn/wp-content/uploads/bien-ban-cuoc-hop-2.png' alt='hopmat' />
                </Grid>
            </Grid>

        </Paper >
    );
}
