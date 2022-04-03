import './NavBarHomePage.css'

export default function NavBarHomePage() {

    return (
        <div style={{ display: 'block', visibility: 'inherit', overflowX: 'visible' }}>
            <nav className="bodyNav">
                <ul>
                    <li><p className='title' style={{ borderLeft: 'none' }}>Trang chủ</p></li>
                    <li style={{ borderLeft: '1px solid #D0D0D0' }}><p className='title' >Phòng</p></li>
                    <li style={{ borderLeft: '1px solid #D0D0D0' }}><p className='title'>Phong cảnh</p></li>
                    <li style={{ borderLeft: '1px solid #D0D0D0' }}><p className='title'>About</p></li>
                    <li style={{ borderLeft: '1px solid #D0D0D0' }}><p className='title'>Liên Hệ</p></li>
                </ul>
            </nav>
        </div>
    );
}