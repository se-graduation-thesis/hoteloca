import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
import './NavBarHomePage.css'
import DialogCustom from '../DialogCustom'
export default function NavBarHomePage() {
    const navigate = useNavigate()
    const account = useSelector((state) => state.account.userAuth);
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
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const onAddBill = () => {
        if (!account) {
            setOpen(true)
            return
        }
        navigate("/user-booking")
    }
    return (
        <>
            <div className='containerNav'>
                <nav className="bodyNav">
                    <ul>
                        <li>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <p className={'title ' + active.home} style={{ borderLeft: 'none', color: 'white' }} onClick={() => handleActive('home')}>Trang chủ</p>
                            </Link>
                        </li>
                        <li style={{ borderLeft: '1px solid #D0D0D0' }}>
                            <Link to="/list-room" style={{ textDecoration: 'none', color: 'white' }}>
                                <p className={'title ' + active.listRoom} onClick={() => handleActive('listRoom')}>Phòng</p>
                            </Link>
                        </li>
                        <li style={{ borderLeft: '1px solid #D0D0D0' }}>
                            <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>
                                <p className={'title ' + active.view} onClick={() => handleActive('view')} >Về chúng tôi</p>
                            </Link>
                        </li>
                        <li style={{ borderLeft: '1px solid #D0D0D0' }}>
                            <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>
                                <p className={'title ' + active.about} onClick={() => handleActive('about')}>Liên hệ</p>
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div >
            <div class="box" onClick={onAddBill} >
                <span>ĐẶT PHÒNG</span>
            </div>
            <DialogCustom open_dialog={open} handleClose={handleClose} />
        </>
    );
}