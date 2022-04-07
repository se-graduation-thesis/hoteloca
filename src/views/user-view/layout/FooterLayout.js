import { Container, Grid } from "@mui/material"

export default function FooterLayout() {

    return (
        <div style={footerBody}>
            <Container fixed>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <h2>Liên Hệ Chúng Tôi</h2>
                        <p>Email: hoai.se.iuh@gmail.com</p>
                        <p>Tel: 0353.784.735</p>
                    </Grid>

                    <Grid item xs={4}>
                        <h2>Địa Chỉ</h2>
                        <p>294/65 Đường số 8, Phường 11 <br /> Q. Gò Vấp, Tp.HCM</p>
                    </Grid>

                    <Grid item xs={4}>
                        <h2>Chúng Tôi Chấp Nhận</h2>
                        <img alt="logoBank" style={{ width: 50, height: 25, marginRight: 10 }}
                            src="https://alodaohan.com/wp-content/uploads/2020/11/the-mastercard-la-gi-4.jpg" />
                        <img alt="logoBank" style={{ width: 50, height: 25, backgroundColor: 'white', marginRight: 10 }}
                            src="https://loghi-famosi.com/wp-content/uploads/2020/04/Visa-Logo-2006-2014.png" />
                        <img alt="logoBank" style={{ width: 50, height: 25, marginRight: 10 }}
                            src="https://tuhocmmo.com/wp-content/uploads/2017/07/paypal-logo.png" />
                        <img alt="logoBank" style={{ width: 50, height: 25, marginRight: 10 }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCqrXIIv_FDc07Mj7tl-gTSRkkRXLbcSYobg&usqp=CAU" />

                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

const footerBody = {
    backgroundColor: 'black',
    color: 'white',
    paddingLeft: 50,
    marginTop: 100,
    position: 'relative'
}