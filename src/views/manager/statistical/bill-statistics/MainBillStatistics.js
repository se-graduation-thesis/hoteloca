import * as React from 'react';
import Paper from '@mui/material/Paper';

import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
// import InsertBrandDialog from './InsertDialog'
// import UpdateBrand from './UpdateDialog'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DayStatistics from './DayStatistics';
import MonthStatistics from './MonthStatistics'
import YearStatistics from './YearStatistics'
import CardDay from "./CardDay"
import CardWeek from "./CardWeek"
import CardYear from "./CardYear"
import MostCategoryRoom from "./MostCategoryRoom"
export default function MainBillStatistics() {
    const [monthSelect, setMonth] = React.useState(new Date().getMonth() + 1);
    const [yearSelect, setYearSelect] = React.useState(new Date().getFullYear());
    const [daySelect, setDaySelect] = React.useState(new Date().getDate());
    const [list_year, setListYear] = React.useState([]);
    const [list_day, setListDay] = React.useState([]);

    const list_month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    useEffect(() => {
        const year = new Date().getFullYear();
        const years = [];
        for (let i = 2021; i <= year; i++) {
            years.push(i)
        }
        setListYear(years)
    }, [])

    const setNow = () => {
        setMonth(new Date().getMonth() + 1);
        setYearSelect(new Date().getFullYear());
        setDaySelect(new Date().getDate())
    }
    useEffect(() => {
        let month_find = monthSelect - 1
        const date = new Date(yearSelect, month_find, 1);
        const dates = [];
        while (date.getMonth() === month_find) {
            dates.push(new Date(date).getDate());
            date.setDate(date.getDate() + 1);
        }
        setListDay(dates)
    }, [yearSelect, monthSelect])
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }} style={{ padding: 20 }}>
            <Grid container spacing={3} style={{ marginTop: 10, padding: 10 }}>
                <Grid item xs={12}>
                    <h2>THỐNG KÊ DOANH THU</h2>
                </Grid>
                <Grid item xs={4}>
                    <CardDay monthSelect={monthSelect} yearSelect={yearSelect} daySelect={daySelect} />
                </Grid>
                <Grid item xs={4}>
                    <CardWeek monthSelect={monthSelect} yearSelect={yearSelect} />
                </Grid>
                <Grid item xs={4}>
                    <CardYear yearSelect={yearSelect} />
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Ngày</InputLabel>
                                <Select
                                    labelId="ngay"
                                    id="demo-simple-select"
                                    value={daySelect}
                                    size='small'
                                    label="Ngày"
                                    onChange={(e) => setDaySelect(e.target.value)}
                                >
                                    {
                                        list_day.map((e, i) => (
                                            <MenuItem key={i} value={e}>Ngày {e}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={monthSelect}
                                    size='small'
                                    label="Tháng"
                                    onChange={(e) => setMonth(e.target.value)}
                                >
                                    {
                                        list_month.map((e, i) => (
                                            <MenuItem key={i} value={e}>Tháng {e}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Năm</InputLabel>
                                <Select
                                    labelId="demo-simple"
                                    id="demo-simple"
                                    value={yearSelect}
                                    size='small'
                                    label="Năm"
                                    onChange={(e) => setYearSelect(e.target.value)}
                                >
                                    {
                                        list_year.map((e, i) => (
                                            <MenuItem key={i} value={e}>{e}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color='secondary' onClick={setNow}>Hiện tại</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <MonthStatistics monthSelect={monthSelect} yearSelect={yearSelect} />
                        </Grid>
                        <Grid item xs={6}>
                            <YearStatistics monthSelect={monthSelect} yearSelect={yearSelect} />
                        </Grid>
                        <Grid item xs={12}>
                            <DayStatistics monthSelect={monthSelect} yearSelect={yearSelect} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{ height: 55 }}>
                        </Grid>
                        <Grid item xs={12}>
                            <MostCategoryRoom monthSelect={monthSelect} yearSelect={yearSelect} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper >

    );
}
