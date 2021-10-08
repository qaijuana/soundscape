import React, { useState, useEffect } from 'react';
import { Grid, Paper } from "@mui/material"

function TopCharts(props) {
    const [api, setAPI] = useState([])

    useEffect(() => {
        const fetchSamples = async () => {
            const res = await fetch(
                props.url.base + props.url.textSearch + props.url.textQuery + props.url.token + process.env.REACT_APP_FREESOUND_KEY
            );
            const data = await res.json();
            setAPI(data.results)
        }
        fetchSamples();
    }, [])

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
                {api}
            </Paper>
        </Grid>

    )

}

export default TopCharts;