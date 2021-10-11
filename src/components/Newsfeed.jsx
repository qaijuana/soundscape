import { Grid, Paper } from "@mui/material"


function Newsfeed() {

    return (
        <Grid item xs={12} md={8} lg={9}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
            >
                news
            </Paper>
        </Grid>
    )
}

export default Newsfeed;