import 'react-slideshow-image/dist/styles.css'
import React from 'react';
import { Slide } from 'react-slideshow-image';
import './CarouselHomePage.css'
import FilterForm from '../filter/FilterForm';

const slideImages = [
    'https://static.wixstatic.com/media/84770f_f8aeada90d784d5d868193585d51892b~mv2.jpg/v1/fill/w_1719,h_714,al_c,q_85,enc_auto/84770f_f8aeada90d784d5d868193585d51892b~mv2.jpg',
    'https://static.wixstatic.com/media/84770f_2c60fb4ce8234a92a93ab6e7e98bbef5~mv2.jpg/v1/fill/w_1517,h_630,al_c,q_85,enc_auto/84770f_2c60fb4ce8234a92a93ab6e7e98bbef5~mv2.jpg',
    'https://static.wixstatic.com/media/84770f_9e54eedc9e384fdd976f8f6f3cd79afe~mv2.jpg/v1/fill/w_1204,h_500,al_c,q_85,enc_auto/84770f_9e54eedc9e384fdd976f8f6f3cd79afe~mv2.jpg'
];
export default function CarouselHomePage() {

    return (
        <div className='bodyCarousel'>
            <div>
                <Slide easing="ease">
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
                            <div className='titleImage'>
                                <span style={{ fontSize: 60, fontWeight: 'bold' }}>Thành Phố Gác Xếp</span>
                                <span style={{ fontSize: 40 }}>Cảm thấy như ở nhà khi bạn đi bất cứ đâu.</span>
                            </div>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
                            <div className='titleImage'>
                                <span style={{ fontSize: 60, fontWeight: 'bold' }}>Thành Phố Gác Xếp</span>
                                <span style={{ fontSize: 40 }}>Cảm thấy như ở nhà khi bạn đi bất cứ đâu.</span>
                            </div>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
                            <div className='titleImage'>
                                <span style={{ fontSize: 60, fontWeight: 'bold' }}>Thành Phố Gác Xếp</span>
                                <span style={{ fontSize: 40 }}>Cảm thấy như ở nhà khi bạn đi bất cứ đâu.</span>
                            </div>
                        </div>
                    </div>
                </Slide>
            </div>
            <div className='filter'>
                <FilterForm />
            </div>
        </div>
    );
}