import 'react-slideshow-image/dist/styles.css'
import React from 'react';
import { Slide } from 'react-slideshow-image';
import './CarouselRoomDetail.css'

const slideImages = [
    'https://hoteloca.s3.ap-southeast-1.amazonaws.com/dd32d9b188d86d6d8dc40d1ff9a0ebf6-15728512315071030248829.jpg',
    'https://hoteloca.s3.ap-southeast-1.amazonaws.com/220320909.jpg',
    'https://hoteloca.s3.ap-southeast-1.amazonaws.com/khach-san-dat-vang-tuong-lai-u-am.jpg',
];
export default function CarouselRoomDetail() {

    return (
        <div className='bodyCarousel'>
            <Slide easing="ease" style={{ height: "100%" }}>
                {
                    slideImages.map((item, index) =>
                        <div style={{ height: "100%" }} className="each-slide" key={index}>
                            <div style={{ 'backgroundImage': `url(${item})`, height: 600 }}>
                            </div>
                        </div>)
                }
            </Slide>
        </div>
    );
}