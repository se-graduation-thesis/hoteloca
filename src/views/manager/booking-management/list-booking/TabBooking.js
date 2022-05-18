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
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <ListBooking />
                </TabPanel>
                {/* <TabPanel value={value} index={1} dir={theme.direction}>
                    
                </TabPanel> */}
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <BookingFinish />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <BookingLate />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <BookingCancellation />
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
