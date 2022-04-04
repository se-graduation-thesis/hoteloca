import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Divider, Grid, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";




export default function FilterForm() {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);

    return (
        <div style={{ border: '1px solid Chocolate', padding: "10px 10px" }}>
            <Grid container spacing={1}>
                <Grid item xs={2.5}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
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

                <Grid item xs={2.5}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
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

                <Grid item xs={2.5}>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        defaultValue={1}
                        type="number"
                        startAdornment={<InputAdornment position="start">Người lớn</InputAdornment>}
                    />
                </Grid>

                <Grid item xs={2.5}>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        defaultValue={0}
                        type="number"
                        startAdornment={<InputAdornment position="start">Trẻ em</InputAdornment>}
                    />
                </Grid>

                <Grid item xs={2}>
                    <Button variant="contained" sx={{ height: 52, backgroundColor: 'Chocolate', color: 'white' }} fullWidth>Tìm kiếm</Button>
                </Grid>
            </Grid>
        </div>
    )
}