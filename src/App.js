import { useSelector, useDispatch } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import * as actions from "./actions/account.action"

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';

// ==============================|| APP ||============================== //

const App = () => {
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    useEffect(() => {
        dispatch(actions.fetchAllAccount())
    }, [])
    const account = useSelector((state) => state.account.listAccount)
    console.log(account)
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
