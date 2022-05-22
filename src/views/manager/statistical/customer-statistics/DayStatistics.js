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

export default function DayStatistics({ monthSelect, yearSelect }) {
    const dispatch = useDispatch();
    const listCustomer = useSelector((state) => state.customer.customerByMonth);
    const [listShow, setListShow] = useState([])

    const getAllDaysInMonth = (year, month) => {
        const date = new Date(year, month, 1);

        const dates = [];

        while (date.getMonth() === month) {
            dates.push(new Date(date).getDate());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }
    let day_in_month = getAllDaysInMonth(yearSelect, monthSelect - 1)
    useEffect(() => {
        if (listCustomer) {
            let counts = []
            day_in_month.forEach((e1) => {
                let count = 0;
                listCustomer.forEach((e) => {
                    let day = moment(e.ngayThamGia).date();
                    let month = moment(e.ngayThamGia).month() + 1;
                    let year = moment(e.ngayThamGia).year();
                    let year_now = yearSelect
                    let month_now = monthSelect
                    if (year_now === year && month_now == month && e1 === day) {
                        count += 1
                    }

                })
                counts.push(count)
            })

            setListShow(counts)
        }
    }, [listCustomer, monthSelect, yearSelect])
    return (
        <>
            <h3>Biểu đồ số lượng khách hàng trong Tháng {monthSelect} / {yearSelect}</h3>
            <Bar
                data={{
                    labels: day_in_month,
                    datasets: [
                        {
                            label: "Số Người",
                            backgroundColor: [
                                "#008810",
                            ],
                            data: listShow
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
