import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MediaControlCard(props) {
    const theme = useTheme();
    const sound_id = props.sound_id
    const uri = props.uri
    const mediaUrl = uri.base + uri.sound
    const [url, setUrl] = useState(mediaUrl)
    const [api, setAPI] = useState([])
    const [status, setStatus] = useState("idle")
    




    useEffect(() => {
        setUrl(mediaUrl)
    }, [mediaUrl])


    useEffect(() => {

        setStatus("pending");
        const fetchSamples = async () => {
            try {
                const res = await fetch(
                    `https://freesound.org/apiv2/sounds/${sound_id}` + uri.token + process.env.REACT_APP_FREESOUND_KEY
                );
                const data = await res.json();
                setStatus("resolved");
                setAPI(data);
                console.log("media control, api", api)
                console.log("mediaUrl", mediaUrl);
            } catch (error) {
                setStatus("error")
            }
        };
        fetchSamples();
    }, [url, uri.token])

    // console.log("mediacontrolcard, api", api)
    // console.log("mediacontrolcard, url", url)

    return (
        <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            Live From Space
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Mac Miller
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                        </IconButton>
                        <IconButton aria-label="play/pause">
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <IconButton aria-label="next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                        </IconButton>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="/static/images/cards/live-from-space.jpg"
                    alt="Live from space album cover"
                />
            </Card>
        </Grid>
    );
}
