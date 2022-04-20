import 'react-slideshow-image/dist/styles.css'
import React from 'react';
import { Slide } from 'react-slideshow-image';
import './CarouselRoomDetail.css'

const slideImages = [
    'https://vinapad.com/wp-content/uploads/2019/05/noi-that-khach-san-acoustic-3.jpg',
    'https://thietkenoithatkhachsan.com/Portals/88/xNews/uploads/2017/10/12/04.jpg',
    'https://noithatcnc.com/wp-content/uploads/2020/03/thiet-ke-noi-that-khach-san-3-sao-4-sao-5-sao9-1.jpg.webp',
    'https://2sao.vietnamnetjsc.vn/images/2020/09/12/15/32/nha-ve-sinh-1.png',
    'https://static.wixstatic.com/media/fde015_de93aa6357c14c439e80f661e7a71e67.jpg/v1/fill/w_649,h_408,q_85,usm_0.66_1.00_0.01/fde015_de93aa6357c14c439e80f661e7a71e67.jpg'
];
export default function CarouselRoomDetail() {

    return (
        <div className='bodyCarousel'>
            <div>
                <Slide easing="ease">
                    {
                        slideImages.map((item, index) =>
                            <div className="each-slide" key={index}>
                                <div style={{ 'backgroundImage': `url(${item})` }}>
                                </div>
                            </div>)
                    }
                </Slide>

                <div style={{ marginTop: 10 }}>
                    {slideImages.map((item, index) =>
                        <img key={index} src={item} style={{ width: 80, height: 80, marginRight: 5 }} />
                    )}
                </div>
            </div>
        </div>
    );
}