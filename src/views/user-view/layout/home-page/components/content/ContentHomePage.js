import { Container, Grid } from "@mui/material";
import './ContentHomePage.css';

export default function ContentHomePage() {

    return (
        <div className="body-content__homepage">
            <div className="gray-homepage">
                <Container className="homepage__container">
                    <h1 style={{ fontSize: 40 }}>HOTELOKA - Cho Thuê Khách Sạn Tại Việt Nam</h1>
                    <span style={{ fontSize: 25, lineHeight: 1 }}>
                        I'm a paragraph. Click here to add your own text and edit me.
                        It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.
                        Feel free to drag and drop me anywhere you like on your page.
                        I’m a great place for you to tell a story and let your users know a little more about you.
                    </span>
                </Container>
            </div>

            <div className="white-homepage">
                <Container className="homepage__container">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <h1 style={{ fontSize: 35 }}>Why book with us</h1>
                            <ul style={{ fontSize: 20, lineHeight: 1.5 }}>
                                <li>Phòng rộng rãi - thoáng mát</li>
                                <li>View đẹp với cảnh biển</li>
                                <li>Chăm sóc chu đáo</li>
                                <li>Phòng rộng rãi - thoáng mát</li>
                                <li>View đẹp với cảnh biển</li>
                                <li>Chăm sóc chu đáo</li>
                            </ul>
                        </Grid>

                        <Grid item xs={6}>
                            <img src="https://www.hoteljob.vn/files/Pic/Th%C3%A1ng%204/Khach-san-la-gi-01.jpg" />
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <div className="gray-homepage">
                <Container className="homepage__container">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <h1 style={{ fontSize: 35, lineHeight: 1 }}>Mọi người nói những điều tốt đẹp nhất ...</h1>
                            <div style={{ paddingRight: 50 }}>
                                <p style={{ fontSize: 15 }}><i>
                                    “I'm a testimonial.
                                    Click to edit me and add text that says something nice about you and your services.
                                    Let your customers review you and tell their friends how great you are.”
                                </i></p>
                                <p style={{ textAlign: 'right' }}>Adam Kant</p>
                            </div> <br />

                            <div style={{ paddingRight: 50 }}>
                                <p style={{ fontSize: 15 }}><i>
                                    “I'm a testimonial.
                                    Click to edit me and add text that says something nice about you and your services.
                                    Let your customers review you and tell their friends how great you are.”
                                </i></p>
                                <p style={{ textAlign: 'right' }}>Adam Kant</p>
                            </div> <br />

                            <div style={{ paddingRight: 50 }}>
                                <p style={{ fontSize: 15 }}><i>
                                    “I'm a testimonial.
                                    Click to edit me and add text that says something nice about you and your services.
                                    Let your customers review you and tell their friends how great you are.”
                                </i></p>
                                <p style={{ textAlign: 'right' }}>Adam Kant</p>
                            </div> <br />
                        </Grid>

                        <Grid item xs={6}>
                            <div>
                                <img style={{ width: 610, height: 300 }}
                                    src="https://ezcloud.vn/wp-content/uploads/2019/03/kinh-doanh-khach-san-1.jpg" />
                                <img style={{ width: 610, height: 300 }}
                                    src="https://pix10.agoda.net/hotelImages/2817185/-1/4406a970306a452300f94532410dab2c.jpg?ca=10&ce=1&s=1024x768" />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}