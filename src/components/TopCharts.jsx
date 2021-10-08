import { Grid, Paper } from "@mui/material"

function TopCharts() {
    return (
        <Grid item xs={12} md={4} lg={3}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
            >
                What the fuck is up
            </Paper>
        </Grid>

    )

}

export default TopCharts;