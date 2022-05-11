import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Badge, Box, Chip, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import moment from "moment-timezone";
// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import * as actions from 'actions/room.action'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: "#000c75",
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 150,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 150,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading }) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const room = useSelector((state) => state.room.empty_room);
    const [list_room_hotel, setListRoomHotel] = useState([]);
    useEffect(() => {
        let room_find = {
            trangThai: 0,
            ngayVao: moment.tz(new Date(), "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(new Date((new Date()).valueOf() + 1000 * 3600 * 24), "Asia/Ho_Chi_Minh").format()
        }
        dispatch(actions.get_empty_room(room_find))
    }, [])
    useEffect(() => {
        if (room) {
            setListRoomHotel(room)
        }
    }, [room])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(list_room_hotel)
    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>

                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.mediumAvatar,
                                                backgroundColor: theme.palette.secondary.dark,
                                                color: theme.palette.secondary[200],
                                                zIndex: 1
                                            }}
                                            aria-controls="menu-earning-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <MeetingRoomIcon fontSize="inherit" />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item xs={7} >
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 500, mr: 1, mb: 0.75 }}>
                                            Tổng số phòng
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5} >
                                        <Chip color={'primary'} label={list_room_hotel.length + " Phòng"} sx={{ fontSize: '1rem', fontWeight: 500, mr: 1, mb: 0.75 }} />
                                    </Grid>
                                    <Grid item xs={7} >
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 500, mr: 1, mb: 0.75 }}>
                                            Phòng đang sử dụng
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5} >
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 500, mr: 1 }}>
                                            <Chip color={'success'} label={list_room_hotel.filter(({ trangThaiHomNay }) => trangThaiHomNay === 0).length + " Phòng"} sx={{ fontSize: '1rem', fontWeight: 500, mr: 1, mb: 0.75 }} />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 500, mr: 1, mb: 0.75 }}>
                                            Phòng trống
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5} >
                                        <Chip color={'error'} label={list_room_hotel.filter(({ trangThaiHomNay }) => trangThaiHomNay === 1).length + " Phòng"} sx={{ fontSize: '1rem', fontWeight: 500, mr: 1, mb: 0.75 }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
