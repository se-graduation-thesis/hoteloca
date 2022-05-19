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
import ListBooking from './ListBill'
import ListBillCanceling from './ListBillCanceling'
import ListBillSuccess from './ListBillSuccess'
import { useEffect, useState } from "react"
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AssignmentLate } from '@mui/icons-material';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div style={{ margin: 30, width: "1200px" }}>
                    {children}
                </div>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
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
        <div style={{ justifyContent: 'center', height: 700, marginTop: 20 }}>
            <h2 style={{ marginLeft: 200, paddingTop: 50 }}>QUẢN LÝ CÁC PHIẾU THUÊ</h2>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', justifyContent: 'center', width: '100%', marginTop: 5 }}
            >

                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Các phiếu thuê đang đặt" {...a11yProps(0)}
                        style={{ padding: 30 }}
                    />
                    <Tab style={{ padding: 30 }} label="Các phiếu thuê đang chờ hủy" {...a11yProps(1)} />
                    <Tab style={{ padding: 30 }} label="Các phiếu thuê đã hoàn thành" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <ListBooking />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ListBillCanceling />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ListBillSuccess />
                </TabPanel>
            </Box>
        </div >
    );
}
