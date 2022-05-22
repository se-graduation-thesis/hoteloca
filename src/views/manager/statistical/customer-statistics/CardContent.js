import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import * as React from 'react';
// import InsertBrandDialog from './InsertDialog'
// import UpdateBrand from './UpdateDialog'

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/customer.action"
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

export default function CardContent(props) {
    const dispatch = useDispatch();

    const listCustomer = useSelector((state) => state.customer);

    const dateObj = new Date();
    const [tong, setTong] = useState(0);
    const [backgroundColor, setBackGroundColor] = useState("#008810")
    const [loai, setLoai] = useState();
    useEffect(() => {
        if (props.type === "day")
            setLoai("customerByDay")
        else if (props.type === "month")
            setLoai("customerByMonth")
        else if (props.type === "year")
            setLoai("customerByYear")
    }, [props.type])

    useEffect(() => {
        if (props.type === "month")
            setBackGroundColor("#ad5a00")
        else if (props.type === "year")
            setBackGroundColor("#0089a8")
    }, [props.type])

    useEffect(() => {
        if (props.type === "day")
            dispatch(actions.getKhachHangByDay(props.yearSelect, props.monthSelect, props.daySelect))
        else if (props.type === "month")
            dispatch(actions.getKhachHangByMonth(props.yearSelect, props.monthSelect))
        else if (props.type === "year")
            dispatch(actions.getKhachHangByYear(props.yearSelect))

    }, [props.daySelect, props.monthSelect, props.yearSelect, props.type])

    useEffect(() => {
        setTong(listCustomer[loai]?.length)
    }, [listCustomer[loai]])

    return (
        <>
            <CardWrapper border={false} content={false} style={{ height: 150, backgroundColor, }}>
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
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography sx={{ fontSize: '1.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                        {new Intl.NumberFormat('en-Vn').format(tong) + " Người"}
                                    </Typography>
                                </Grid>
                                <Grid item>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>
        </>
    );
};
