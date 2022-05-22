import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import * as actionsManager from 'actions/manager.action'
import { useEffect } from 'react';
// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const account = useSelector((state) => state.account.userAuth);
    const employeeId = isJson(account) ? JSON.parse(account).user_id : account.user_id;
    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    const manager = useSelector(state => state.manager.manager)
    useEffect(() => {
        dispatch(actionsManager.findById(employeeId))
    }, [])
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false} style={{ height: 600 }}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Chào mừng! {manager?.ho + " " + manager?.ten}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>

                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Avatar
                                    src={manager?.hinhAnh}
                                    sx={{ width: 130, height: 130 }}
                                />
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                <p style={{ color: 'black', fontWeight: 'bold' }}>Tên người dùng</p>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                <p>{manager?.ho + " " + manager?.ten}</p>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                <p style={{ color: 'black', fontWeight: 'bold' }}>Số điện thoại</p>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                <p>{manager?.dienThoai}</p>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                <p style={{ color: 'black', fontWeight: 'bold' }}>Email</p>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                <p>{manager?.email}</p>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
