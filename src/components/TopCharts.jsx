import React, { useState, useEffect } from 'react';
import { Grid, Paper } from "@mui/material"
import CircularProgress from "./CircularProgress"

function TopCharts(props) {
    const [api, setAPI] = useState([])
    const [status, setStatus] = useState("idle")
    const URL = props.url
    const results = api.results

    useEffect(() => {
        setStatus("pending");
        const fetchSamples = async () => {
            try {
                const res = await fetch(
                    URL.base + URL.textSearch + URL.textQuery + URL.token + process.env.REACT_APP_FREESOUND_KEY
                );
                const data = await res.json();
                setStatus("resolved");
                setAPI(data);
            } catch (error) {
                setStatus("error")
            }
        };
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
                {status === "resolved" ? (results?.map((e) => (e.name))) : <CircularProgress justifyContent="center" /> }

            </Paper>
        </Grid>

    )

}

export default TopCharts;