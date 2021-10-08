import Newsfeed from './Newsfeed'
import TopCharts from "./TopCharts"
import BrowseSamples from "./BrowseSamples"
import Copyright from "./Copyright"
import {
    Box, Container, Grid, Toolbar
} from '@mui/material'

function MainContent(props) {
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>

                    <Newsfeed />

                    <TopCharts />

                    <BrowseSamples data={props.data} />

                </Grid>

                <Copyright sx={{ pt: 4 }} />

            </Container>

        </Box>
    )
}

export default MainContent