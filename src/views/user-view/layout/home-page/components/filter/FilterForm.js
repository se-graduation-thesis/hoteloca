import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { Button, Container, Grid, Stack, TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";

export default function FilterForm() {
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());


    return (
        <Container>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <p style={{ color: 'white', fontSize: 16 }}>Check In</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    // label="For desktop"
                                    value={checkIn}
                                    minDate={new Date()}
                                    onChange={(newValue) => {
                                        setCheckIn(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={5}>
                        <p style={{ color: 'white', fontSize: 16 }}>Check Out</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    // label="For desktop"
                                    value={checkOut}
                                    minDate={new Date(checkIn)}
                                    onChange={(newValue) => {
                                        setCheckOut(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2}>
                        <p style={{ color: 'white', fontSize: 16 }}>&emsp;</p>
                        <Button variant="contained" sx={{ height: 52, backgroundColor: 'white', color: 'black' }} fullWidth>Tìm kiếm</Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}