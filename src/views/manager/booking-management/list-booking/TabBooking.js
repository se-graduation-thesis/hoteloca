import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ListBooking from './ListBooking'
import BookingFinish from './BookingFinish';
import { useEffect, useState } from "react"
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BookingLate from './BookingLate';
import { AssignmentLate } from '@mui/icons-material';
import BookingCancellation from './BookingCancellation';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, height: '100%' }} >
                    <div sx={{ p: 3, height: '100%' }}>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const useStyles = makeStyles({
        wrapper: {
            flexDirection: 'row',
        },
    });
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
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
        <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
            <Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    aria-label="secondary tabs example"
                >
                    <Tab style={{ padding: 20 }}
                        className={classes.wrapper}
                        icon={<EventAvailableIcon />}
                        label="Danh sách đơn đặt hiện có" {...a11yProps(0)} />

                    <Tab style={{ padding: 20 }}
                        className={classes.wrapper}
                        icon={<ReceiptLongIcon />} AssignmentLate
                        label="Danh sách đơn đặt đã hoàn thành" {...a11yProps(1)} />

                    <Tab style={{ padding: 20 }}
                        className={classes.wrapper}
                        icon={<AssignmentLate />}
                        label="Danh sách đơn đặt đã quá hạn" {...a11yProps(2)} />

                    <Tab style={{ padding: 20 }}
                        className={classes.wrapper}
                        icon={<PlaylistRemoveIcon />}
                        label="Danh sách đơn đặt đã hủy" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <Grid container spacing={2} style={{ margin: 20 }}>
                <Grid item xs={2}>
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

                <Grid item xs={2}>
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

                <Grid item xs={2}>
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
            </Grid>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <ListBooking monthSelect={monthSelect} yearSelect={yearSelect} daySelect={daySelect} />
                </TabPanel>
                {/* <TabPanel value={value} index={1} dir={theme.direction}>
                    
                </TabPanel> */}
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <BookingFinish monthSelect={monthSelect} yearSelect={yearSelect} daySelect={daySelect} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <BookingLate monthSelect={monthSelect} yearSelect={yearSelect} daySelect={daySelect} />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <BookingCancellation monthSelect={monthSelect} yearSelect={yearSelect} daySelect={daySelect} />
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
