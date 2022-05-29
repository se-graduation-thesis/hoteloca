// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';

// assets
import User1 from 'assets/images/users/user-round.svg';
import { useEffect, useState } from 'react';
// import firepadRef from './firebase';
import firebase from 'views/pages/authentication/auth-forms/firebase'
// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
    const theme = useTheme();
    const [listRoomOnline, setListRoomOnline] = useState([])
    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        marginRight: '5px'
    };

    const chipWarningSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light
    };
    useEffect(() => {
        firebase.database().ref().on('value', (snapshot) => {
            let newUserState = [];
            snapshot.forEach(data => {
                console.log("hahah", data.val())
                newUserState.push({
                    id: data.key,
                })
            })
            setListRoomOnline(newUserState.filter(({ id }) => id !== 'participants'))
        })
    }, [])
    const joinMeeting = (id) => {
        let link = window.location.protocol + "//" + window.location.host + "/admin/meeting?id=" + id
        window.location.href = link
    }
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {
                listRoomOnline.length > 0 ?
                    listRoomOnline.map((e, i) => (
                        <ListItemWrapper key={i}>
                            <ListItem alignItems="center">
                                <ListItemAvatar>
                                    <Avatar alt="John Doe" />
                                </ListItemAvatar>
                                <ListItemText primary="Hệ thống" />
                                <ListItemSecondaryAction>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item xs={12}>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                Tạo phòng
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Grid container direction="column" className="list-container">
                                <Grid item xs={12} sx={{ pb: 2 }}>
                                    <Typography variant="subtitle2">Mời bạn tham gia vào cuộc họp cùng chúng tôi</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Button size='small' color='secondary' variant='contained' onClick={() => joinMeeting(e.id)}>Tham gia</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItemWrapper>
                    ))

                    : <ListItemWrapper> Không có thông báo nào trong thời điểm hiện tại</ListItemWrapper>
            }

        </List>
    );
};

export default NotificationList;
