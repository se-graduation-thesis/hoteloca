import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Hoteloka from 'assets/images/logo.png'
import { width } from '@mui/system';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <img src={Hoteloka} style={{ width: 100 }} />
    </ButtonBase>
);

export default LogoSection;
