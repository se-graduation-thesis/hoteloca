import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import * as React from 'react';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/payment.action"
// project imports
import MainCard from 'ui-component/cards/MainCard';



const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: "#0089a8 ",
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: "#00596e",
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
        background: "#00596e",
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

export default function CardYear({ yearSelect }) {
    const dispatch = useDispatch();
    const listPayment = useSelector((state) => state.payment.pay_year);
    const [listShow, setListShow] = useState([]);
    const [tong, setTong] = useState(0);

    useEffect(() => {
        dispatch(actions.get_all_year(yearSelect))
    }, [yearSelect])
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
            <CardWrapper border={false} content={false} style={{ height: 150 }}>
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
                                Tổng doanh thu trong năm {yearSelect}
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
        </>
    );
};


