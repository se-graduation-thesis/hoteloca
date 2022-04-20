import { IconWifi, IconCar, IconTrash, IconSwimming } from '@tabler/icons';
import './ServiceHomePage.css';
export default function ServiceHomePage() {

    return (
        <div className="bodySerHome">
            <div className="item">
                <IconWifi style={{ width: 50, height: 50 }} strokeWidth="1" color='#303030' />
                <p style={{ fontSize: 17, textAlign: 'center', color: '#303030' }}>WiFi Miễn Phí</p>
            </div>

            <div className="item">
                <IconCar style={{ width: 50, height: 50 }} strokeWidth="1" color='#303030' />
                <p style={{ fontSize: 17, textAlign: 'center', color: '#303030' }}>Đỗ Xe Miễn Phí</p>
            </div>

            <div className="item">
                <IconSwimming style={{ width: 50, height: 50 }} strokeWidth="1" color='#303030' />
                <p style={{ fontSize: 17, textAlign: 'center', color: '#303030' }}>Dịch Vụ Hồ Bơi</p>
            </div>

            <div className="item">
                <IconTrash style={{ width: 50, height: 50 }} strokeWidth="1" color='#303030' />
                <p style={{ fontSize: 17, textAlign: 'center', color: '#303030' }}>Dịch Vụ Dọn Dẹp</p>
            </div>
        </div>
    );
}