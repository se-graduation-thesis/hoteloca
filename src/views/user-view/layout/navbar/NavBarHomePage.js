import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBarHomePage.css'

export default function NavBarHomePage() {

    const [active, setActive] = useState({
        home: 'active',
        listRoom: null,
        view: null,
        about: null,
        contact: null
    })

    const handleActive = (prop) => {
        setActive({ ...active, home: null, listRoom: null, view: null, about: null, contact: null, [prop]: 'active' });
    }

    return (
        <div className='containerNav'>
            <nav className="bodyNav">
                <ul>
                    <li>
                        <Link to="/home" style={{ textDecoration: 'none' }}>
                            <p className={'title ' + active.home} style={{ borderLeft: 'none' }} onClick={() => handleActive('home')}>Trang chủ</p>
                        </Link>
                    </li>
                    <li style={{ borderLeft: '1px solid #D0D0D0' }}>
                        <Link to="/home/list-room" style={{ textDecoration: 'none' }}>
                            <p className={'title ' + active.listRoom} onClick={() => handleActive('listRoom')}>Phòng</p>
                        </Link>
                    </li>
                    <li style={{ borderLeft: '1px solid #D0D0D0' }}>
                        <Link to="#" style={{ textDecoration: 'none' }}>
                            <p className={'title ' + active.view} onClick={() => handleActive('view')} >Phong Cảnh</p>
                        </Link>
                    </li>
                    <li style={{ borderLeft: '1px solid #D0D0D0' }}>
                        <Link to="#" style={{ textDecoration: 'none' }}>
                            <p className={'title ' + active.about} onClick={() => handleActive('about')}>Giới Thiệu</p>
                        </Link>
                    </li>
                    <li style={{ borderLeft: '1px solid #D0D0D0' }}>
                        <Link to="#" style={{ textDecoration: 'none' }}>
                            <p className={'title ' + active.contact} onClick={() => handleActive('contact')}>Liên Hệ</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div >
    );
}