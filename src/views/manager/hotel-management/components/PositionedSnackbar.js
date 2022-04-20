import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function PositionedSnackbar(props) {
    const [state, setState] = React.useState({
        vertical: 'top',
        horizontal: 'right',
    });

    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };


    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={props.open}
                onClose={handleClose}
                // message={props.message}
                key={vertical + horizontal}
            >
                <Alert variant="filled" severity="success">{props.message}</Alert>
            </Snackbar>
        </div>
    );
}
