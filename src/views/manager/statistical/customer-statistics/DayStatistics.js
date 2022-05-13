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
import moment from "moment";
// import InsertBrandDialog from './InsertDialog'
// import UpdateBrand from './UpdateDialog'

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/payment.action"
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'
ChartJS.register(...registerables);
export default function DayStatistics() {
    const dispatch = useDispatch();
    return (
        <Bar
            data={{
                labels: [
                    "Africa",
                    "Asia",
                    "Europe",
                    "Latin America",
                    "North America"
                ],
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: [
                            "#3e95cd",
                        ],
                        data: [2478, 5267, 734, 784, 433]
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
    );
}
