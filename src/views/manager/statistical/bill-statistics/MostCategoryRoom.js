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
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
ChartJS.register(...registerables);

export default function MonthStatistics({ monthSelect, yearSelect }) {
    const dispatch = useDispatch();
    const listPayment = useSelector((state) => state.payment.all_payment);
    const [listPaymentShow, setListPayment] = useState([])
    const [choose, setChoose] = React.useState(1);

    const handleChange = (event) => {
        setChoose(event.target.value);
    };

    useEffect(() => {
        dispatch(actions.get_all())
    }, [])
    useEffect(() => {
        if (listPayment) {
            let listRoom = [];
            const list = [];
            const list_count = []

            listPayment.forEach((e) => {
                let month = moment(e.ngayThanhToan).month() + 1;
                let year = moment(e.ngayThanhToan).year();
                if (choose === 1) {
                    if (month === monthSelect && year === yearSelect) {
                        e?.phieuThueid?.chiTietPhieuThueList.forEach((e1) => {
                            listRoom.push(e1.phongId.loaiPhongid)
                        })
                    }
                } else if (choose === 2) {
                    if (year === yearSelect) {
                        e?.phieuThueid?.chiTietPhieuThueList.forEach((e1) => {
                            listRoom.push(e1.phongId.loaiPhongid)
                        })
                    }
                }
            })
            listRoom.forEach((e) => {
                e.tong = listRoom.filter(({ id }) => id === e.id).length
                list.push(e)
            })
            list.forEach((e) => {
                if (list_count.filter(e1 => e1.id === e.id).length < 1) {
                    list_count.push(e);
                }
            });
            setListPayment(list_count.sort((a, b) => b.tong - a.tong).slice(0, 5))
        }
    }, [listPayment, monthSelect, yearSelect, choose])

    return (
        <>
            {
                choose === 1 ?
                    <h3>Danh sách các loại phòng được sử dụng nhiều nhất trong tháng {monthSelect} / {yearSelect}</h3> :
                    <h3>Danh sách các loại phòng được sử dụng nhiều nhất trong năm {yearSelect}</h3>
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
                            <TableCell align="right">Tên loại phòng</TableCell>
                            <TableCell align="right">Số lượt đặt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listPaymentShow.map((row, i) => (
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
                                    {row.ten}
                                </TableCell>
                                <TableCell align="right">{row.tong}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
