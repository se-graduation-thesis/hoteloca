import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import EarningCard1 from './EarningCard1';
import CountRoom from './CountRoom';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import Carousel from './carousel/Carousel'
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} md={4} sm={4} xs={4}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={6} md={4} sm={4} xs={4}>
                        <CountRoom isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <Carousel />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
