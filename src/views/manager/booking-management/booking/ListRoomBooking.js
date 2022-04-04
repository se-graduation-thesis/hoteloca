import Paper from '@mui/material/Paper';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CellWifiOutlinedIcon from '@mui/icons-material/CellWifiOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import * as actions from 'actions/room.action'
import { Link } from 'react-router-dom';

export default function BrandManager() {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account.userAuth);
    const room = useSelector((state) => state.room.room_by_brand);
    const [list_room_hotel, setListRoomHotel] = useState([])
    useEffect(() => {
        if (account) {
            try {
                dispatch(actions.get_all_room_by_brand(JSON.parse(account).khachsan_id))
            } catch {
                console.log("a")
            }
        }

    }, [account])
    useEffect(() => {
        if (room) {
            setListRoomHotel(room)
        }
    })
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h3 style={{ marginTop: 8 }}>DANH SÁCH PHÒNG</h3>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Chi nhánh</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            name="city"
                            label="Chi nhánh"
                        >

                            <MenuItem value="123">123</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Loại Phòng</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            name="city"
                            label="Chi nhánh"
                        >

                            <MenuItem value="123">123</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} style={{ padding: 10, textAlign: "right" }}>
                    <Button color="secondary" variant="contained">Tìm kiếm</Button>
                </Grid>
            </Grid>

            <>
                <Grid container spacing={1} style={{ marginTop: 10, padding: 10 }}>
                    {
                        list_room_hotel.map((e, i) => (
                            <Grid item xs={3} key={i}>
                                < Link to="/admin/booking-calendar" style={{ textDecoration: 'none' }}>
                                    <Card style={{ backgroundColor: "#e3f2fd", border: '2px solid #e6e6e6' }}>
                                        <CardContent>
                                            <Typography variant="body2"
                                                style={{
                                                    color: "black",
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                PHÒNG: {e.tenPhong}
                                            </Typography>
                                            <br></br>
                                            <Chip
                                                icon={e.trangThai === 1 ? < CheckCircleOutlinedIcon /> : <CancelOutlinedIcon />}
                                                label={e.trangThai === 1 ? "Đang hoạt động" : "Tạm ngưng"}
                                                color={e.trangThai === 1 ? "info" : "warning"}
                                            />
                                        </CardContent>
                                        <CardActions disableSpacing>
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
                                        </CardActions>
                                    </Card>
                                </Link>
                            </Grid>
                        ))
                    }

                </Grid>
            </>
        </Paper >

    );
}
