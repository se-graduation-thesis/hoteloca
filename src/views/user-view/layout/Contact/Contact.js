
import './contact.css'
import { Grid, Paper, TextField, Button } from '@mui/material';
export default function StaffInfo() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ width: '75%', overflow: 'hidden', height: '100%', pl: 5, pr: 5, mt: 5, p: 10 }}>
                <h3>TRANG LIÊN HỆ</h3>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <img src='https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg' style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField label="Tên" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Email" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Lời nhắn" variant="outlined" fullWidth multiline rows={8} />
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'right' }}>
                                <Button variant="contained">Gửi</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}