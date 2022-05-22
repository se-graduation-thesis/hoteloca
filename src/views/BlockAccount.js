import LockIcon from '@mui/icons-material/Lock';
import { Button, Paper } from '@mui/material';
import { fontSize } from '@mui/system';
import { useNavigate } from 'react-router';
export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div style={{ height: 700, width: '100%', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <LockIcon style={{ fontSize: 150 }} />
            <h1 style={{ color: 'black', fontWeight: 'bold' }}>Tài khoản của bạn đã bị khóa</h1>
            <p>Chúng tôi phát hiện hoạt động bất thường trên tài khoản của bạn, vui lòng liên hệ chúng tôi qua số điện thoại 0976553787 để tiến hành mở khóa tài khoản</p>
            <Button color='secondary' variant='outlined' onClick={() => navigate("/login")}> {">>"} Trở lại trang đăng nhập</Button>
        </div >
    );
}