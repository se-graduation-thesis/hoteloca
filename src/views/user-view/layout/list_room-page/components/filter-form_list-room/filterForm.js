import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Divider, Grid, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from "moment-timezone";
import * as actions from 'actions/room.action'

export default function FilterForm() {
    const [checkIn, setCheckIn] = useState(new Date);
    const [checkOut, setCheckOut] = useState(new Date((new Date()).valueOf() + 1000 * 3600 * 24));
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const onFind = () => {
        let room_find = {
            trangThai: 0,
            ngayVao: moment.tz(new Date(), "Asia/Ho_Chi_Minh").format(),
            ngayRa: moment.tz(new Date((new Date()).valueOf() + 1000 * 3600 * 24), "Asia/Ho_Chi_Minh").format()
        }
        dispatch(actions.get_empty_room(room_find))
    }

    return (
        <div style={{ border: '1px solid Chocolate', padding: "10px 10px" }}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Check - In"
                            value={checkIn}
                            minDate={new Date()}
                            onChange={(newValue) => {
                                setCheckIn(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Check - Out"
                            value={checkOut}
                            minDate={checkIn}
                            onChange={(newValue) => {
                                setCheckOut(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" sx={{ height: 52, backgroundColor: 'Chocolate', color: 'white' }} fullWidth>Tìm kiếm</Button>
                </Grid>
            </Grid>
        </div>
    )
}