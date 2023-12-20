import Box from '@mui/material/Box';
import Sidenav from '../component/Sidenav';
import Navbar from '../component/Navbar';
import Grid from '@mui/material/Grid';
import Outside from '../component/Outside';

function Home() {
    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            hehe
                        </Grid>
                        <Grid item xs={4}>
                            <Outside />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default Home;
