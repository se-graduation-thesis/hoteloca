import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import * as React from 'react';
// import InsertBrandDialog from './InsertDialog'
// import UpdateBrand from './UpdateDialog'

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/payment.action"
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: "#008810 ",
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: "#00580A",
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
        height: 210,
        background: "#00580A",
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

const CardDay = ({ isLoading, daySelect, monthSelect, yearSelect }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const listPayment = useSelector((state) => state.payment.pay_day);
    const [listShow, setListShow] = useState([]);
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const [tong, setTong] = useState(0);

    useEffect(() => {
        dispatch(actions.get_all_day(daySelect, monthSelect, yearSelect))
    }, [daySelect, monthSelect, yearSelect])
    useEffect(() => {
        if (listPayment) {
            setListShow(listPayment)
        }
    }, [listPayment])

    useEffect(() => {
        let tongTt = 0;
        listShow.forEach((e) => {
            tongTt += e.tongTienThanhToan
        })
        setTong(tongTt)
    }, [listShow])

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: "white"
                                    }}
                                >
                                    Tổng doanh thu trong ngày {daySelect} / {monthSelect} /{yearSelect}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '1.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            {new Intl.NumberFormat('en-Vn').format(tong) + " VND"}
                                        </Typography>
                                    </Grid>
                                    <Grid item>

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

CardDay.propTypes = {
    isLoading: PropTypes.bool
};

export default CardDay;
