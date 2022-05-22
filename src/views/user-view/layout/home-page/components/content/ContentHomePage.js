import { Container, Grid } from "@mui/material";
import './ContentHomePage.css';

export default function ContentHomePage() {

    return (
        <div className="body-content__homepage">
            <div className="gray-homepage">
                <Container className="homepage__container">
                    <h1 style={{ fontSize: 40 }}>HOTELOKA - Cho Thuê Khách Sạn Tại Việt Nam</h1>
                    <span style={{ fontSize: 25, lineHeight: 1 }}>
                        Mọi điều ở đây đều đa sắc, kể cả các khách sạn ở thành phố Hồ Chí Minh. Dù bạn có tìm kiếm một khách sạn sang trọng, một resort nghỉ dưỡng yên bình, hay một homestay mang đậm trải nghiệm địa phương thì Sài Gòn vẫn sẽ khiến bạn hài lòng. Nếu đang mơ về một chuyến khám phá đầy lý thú, còn chờ gì nữa mà không chọn ngay một khách sạn ở thành phố Hồ Chí Minh! Đảm bảo sẽ có vô vàn bất ngờ đang chờ bạn đến trải nghiệm đấy!
                    </span>
                </Container>
            </div>

            <div className="white-homepage">
                <Container className="homepage__container">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <h1 style={{ fontSize: 35 }}>Tại sao đặt phòng của chúng tôi</h1>
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
                                    “Mình vừa trải qua kỳ nghỉ 3 ngày 2 đêm tại Khách sạn.
                                    Thực sự mình rất ấn tượng và cực kỳ happy vì đã gặp được những con người ở đây thân thiện và khách sạn
                                    hoàn toàn hoàn hảo theo ý muốn của mình.
                                    Từ Lễ Tân tới Quản lý, tất cả đều quá chuyên nghiệp, phòng ốc cực kỳ sạch sẽ và làm mình cùng bạn bè rất hài lòng. Nếu có quay lại, nhất định sẽ chọn King's finger làm nơi nghĩ dưỡng. Thân chào!”
                                </i></p>
                                <p style={{ textAlign: 'right' }}>Hoài Giang</p>
                            </div> <br />

                            <div style={{ paddingRight: 50 }}>
                                <p style={{ fontSize: 15 }}><i>
                                    “Đã có chuyến công tác ở đây và nghỉ tại khách sạn vài ngày.Ở đây khá gần biển và trung tâm, có hồ bơi khá đẹp trên tầng thượng. Các bạn nhân viên lễ tân niềm nở và luôn hướng dẫn nhiệt tình khiến tôi rất thoải mái khi ở đây!”
                                </i></p>
                                <p style={{ textAlign: 'right' }}>Thanh Hoài Nguyễn</p>
                            </div> <br />

                            <div style={{ paddingRight: 50 }}>
                                <p style={{ fontSize: 15 }}><i>
                                    “Mến gửi các bạn dịch vụ tại Hoteloca, chị vừa cùng gia đình ở tai khách sạn, dịch vụ tại khách sạn các em rất tốt, nhân viên cũng rất thân thiện, từ các bạn đặt phòng, làm phòng tới những nhân viên chị gặp gỡ hàng ngày
                                    Bể bơi của khách sạn cũng rất tốt, bọn nhỏ cũng rất thích và dành rất nhiều thời gian ở đây
                                    Chị cũng nhận được rất nhiều hỗ trợ từ việc thanh toán, điều chỉnh, hay bất kỳ vấn đề gì liên quan đến phòng, các bạn lúc nào cũng hỗ trợ rất tốt
                                    Cám ơn các em rất nhiều và mong rằng Hoteloca sẽ còn phát triển mạnh hơn nữa”
                                </i></p>
                                <p style={{ textAlign: 'right' }}>Minh Như</p>
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