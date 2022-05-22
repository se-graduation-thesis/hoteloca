import * as React from "react"
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { Button, Container, Grid, Stack, TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import { useNavigate } from "react-router";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
export default function FilterForm() {
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date((new Date()).valueOf() + 1000 * 3600 * 24));
    const [open1, setOpen1] = React.useState(false);
    const [textAlert, setTextAlert] = useState("");
    const navigate = useNavigate()
    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    const onSearch = () => {
        if (checkIn < new Date(new Date().getTime() - 10 * 60000)) {
            handleClickOpen1()
            setTextAlert("Ngày vào phải lớn hơn hoặc bằng ngày hiện tại")
            return
        }
        if (checkOut < checkIn) {
            handleClickOpen1()
            setTextAlert("Ngày ra phải lớn hơn ngày vào")
            return
        }
        let check = {
            checkin: checkIn,
            checkOut: checkOut
        }
        navigate("/list-room", { state: check })
    }
    return (
        <Container>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <p style={{ color: 'white', fontSize: 16 }}>Ngày vào</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        helperText=" "
                                        inputFormat="dd/MM/yyyy hh:mm a"
                                        renderInput={(props) => <TextField {...props} fullWidth helperText=" " />}
                                        value={checkIn}
                                        onChange={(newValue) => setCheckIn(newValue)}
                                    />
                                </LocalizationProvider>
                            </Stack>
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={5}>
                        <p style={{ color: 'white', fontSize: 16 }}>Ngày ra</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        helperText=" "
                                        inputFormat="dd/MM/yyyy hh:mm a"
                                        renderInput={(props) => <TextField {...props} fullWidth helperText=" " />}
                                        value={checkOut}
                                        onChange={(newValue) => setCheckOut(newValue)}
                                    />
                                </LocalizationProvider>
                            </Stack>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2}>
                        <p style={{ color: 'white', fontSize: 16 }}>&emsp;</p>
                        <Button variant="contained" sx={{ height: 52, backgroundColor: 'white', color: 'black' }} onClick={onSearch} fullWidth>Tìm kiếm</Button>
                    </Grid>
                </Grid>
            </div>
            <Dialog
                open={open1}
                maxWidth={'xs'}
                fullWidth={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose1}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CancelOutlinedIcon color='error' sx={{ fontSize: 70 }} />
                    <span style={{ fontSize: 15, fontWeight: 'bold' }}>{textAlert}</span>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Container>
    )
}