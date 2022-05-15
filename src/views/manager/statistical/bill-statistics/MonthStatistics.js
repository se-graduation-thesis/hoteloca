import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Edit from '@mui/icons-material/Edit';
// import InsertBrandDialog from './InsertDialog'
// import UpdateBrand from './UpdateDialog'

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/payment.action"
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import moment from 'moment-timezone'

ChartJS.register(...registerables);

export default function MonthStatistics({ yearSelect }) {
    const dispatch = useDispatch();
    const listPayment = useSelector((state) => state.payment.all_payment);
    const [listPaymentShow, setListPayment] = useState([])
    const listMonth = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ]
    useEffect(() => {
        dispatch(actions.get_all())
    }, [])
    useEffect(() => {
        if (listPayment) {
            let list_month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            let list_price = []
            list_month.forEach((e1) => {
                let price = 0;
                listPayment.forEach((e) => {
                    let month = moment(e.ngayThanhToan).month() + 1;
                    let year = moment(e.ngayThanhToan).year();
                    let year_now = yearSelect
                    if (month == e1 && year_now === year) {
                        price += e.tongTienThanhToan
                    }
                })
                list_price.push(price)
            })

            setListPayment(list_price)
        }
    }, [listPayment, yearSelect])
    console.log(listPayment)
    return (
        <>
            <h3>Biểu đồ doanh số theo tháng trong năm {yearSelect}</h3>
            <Bar
                data={{
                    labels: listMonth,
                    datasets: [
                        {
                            label: "Doanh thu (VND)",
                            backgroundColor: [
                                "#ad5a00",
                            ],
                            data: listPaymentShow
                        }
                    ]
                }}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Predicted world population (millions) in 2050"
                    }
                }}
            />
        </>
    );
}
