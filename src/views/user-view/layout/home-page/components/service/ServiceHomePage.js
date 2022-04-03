import { IconWifi, IconLamp, IconCar, IconTrash, IconSwimming } from '@tabler/icons';
import './ServiceHomePage.css';
export default function ServiceHomePage() {

    return (
        <div className="bodySerHome">
            <div className="item">
                <IconWifi style={{ width: 60, height: 60 }} strokeWidth="1" />
                <p style={{ fontSize: 18, textAlign: 'center' }}>WiFi Miễn Phí</p>
            </div>

            <div className="item">
                <IconLamp style={{ width: 60, height: 60 }} strokeWidth="1" />
                <p style={{ fontSize: 18, textAlign: 'center' }}>Đầy Đủ Nội Thất</p>
            </div>

            <div className="item">
                <IconCar style={{ width: 60, height: 60 }} strokeWidth="1" />
                <p style={{ fontSize: 18, textAlign: 'center' }}>Đỗ Xe Miễn Phí</p>
            </div>

            <div className="item">
                <IconSwimming style={{ width: 60, height: 60 }} strokeWidth="1" />
                <p style={{ fontSize: 18, textAlign: 'center' }}>Dịch Vụ Hồ Bơi</p>
            </div>

            <div className="item">
                <IconTrash style={{ width: 60, height: 60 }} strokeWidth="1" />
                <p style={{ fontSize: 18, textAlign: 'center' }}>Dịch Vụ Dọn Dẹp</p>
            </div>
        </div>
    );
}