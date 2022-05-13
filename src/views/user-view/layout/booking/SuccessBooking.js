
import { useState, useEffect, useRef } from 'react';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
export default function SuccessBooking({ onClick, deposit }) {
    const navigate = useNavigate()
    return (
        <div style={{ width: "100%", height: "500px" }}>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 200 }}>
                <CheckCircleTwoToneIcon color='success' sx={{ fontSize: 80 }} />
                <span style={{ fontSize: 25, fontWeight: 'bold' }}>Đặt phòng thành công</span>
            </div>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                <Button onClick={() => navigate("/list-bill")} variant='contained' color='secondary'>{">> Xem các hóa đơn đặt phòng"}</Button>
            </div>
        </div>
    );
}
