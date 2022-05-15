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
import * as actions from "actions/customer.action"
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import moment from 'moment-timezone'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
ChartJS.register(...registerables);

export default function MostCustomer({ monthSelect, yearSelect }) {
    const dispatch = useDispatch();
    const listCustomer = useSelector((state) => state.customer);
    const [listShow, setListShow] = useState([])
    const [choose, setChoose] = React.useState(1);

    const handleChange = (event) => {
        setChoose(event.target.value);
    };

    useEffect(() => {
        if (choose === 1)
            dispatch(actions.topKhachHangByMonth(yearSelect, monthSelect))
        else if (choose === 2)
            dispatch(actions.topKhachHangByYear(yearSelect))
    }, [monthSelect, yearSelect, choose])

    useEffect(() => {
        if (choose === 1)
            setListShow(listCustomer.topByMonth)
        else if (choose === 2)
            setListShow(listCustomer.topByYear)
    }, [listCustomer])

    return (
        <>
            {
                choose === 1 ?
                    <h3>Danh sách các khách hàng cứ trú nhiều nhất trong tháng {monthSelect} / {yearSelect}</h3> :
                    <h3>Danh sách các khách hàng cứ trú nhiều nhất trong năm {yearSelect}</h3>
            }

            <FormControl sx={{ m: 1, minWidth: 80 }} size='small'>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={choose}
                    onChange={handleChange}
                    autoWidth
                >
                    <MenuItem value={1}>Tháng</MenuItem>
                    <MenuItem value={2}>Năm</MenuItem>
                </Select>
            </FormControl>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Hạng</TableCell>
                            <TableCell >Tên khách hàng</TableCell>
                            <TableCell >Số điện thoại</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listShow?.slice(0, 3).map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">
                                    {
                                        i === 0 ?
                                            <WorkspacePremiumIcon style={{ color: 'gold' }} />
                                            : i === 1 ? <WorkspacePremiumIcon />
                                                : i === 2 ? <WorkspacePremiumIcon style={{ color: '#B87333' }} />
                                                    : <WorkspacePremiumIcon style={{ color: 'silver' }} />
                                    }
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.ho} {row.ten}
                                </TableCell>
                                <TableCell>{row.dienThoai}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
