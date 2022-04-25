import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PhoneIcon from '@mui/icons-material/Phone';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { makeStyles } from '@mui/styles';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ListBooking from './ListBooking'
import BookingFinish from './BookingFinish';
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
                    {/* <Tab style={{ padding: 20 }}
                        className={classes.wrapper}
                        icon={<AddTaskIcon />}
                        label="Danh sách đơn đặt chờ duyệt" {...a11yProps(1)} /> */}
                    <Tab style={{ padding: 20 }}
                        className={classes.wrapper}
                        icon={<ReceiptLongIcon />}
                        label="Danh sách đơn đặt đã hoàn thành" {...a11yProps(1)} />
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
            </SwipeableViews>
        </Box>
    );
}
