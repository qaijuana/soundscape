import React, { useState, useEffect } from 'react';
import Newsfeed from './Newsfeed'
import TopCharts from "./TopCharts"
import BrowseSamples from "./BrowseSamples"
import Copyright from "./Copyright"
import {
    Box, Container, Grid, Toolbar
} from '@mui/material'

const host = 'freesound.org';
const sound_id = "" //! UseState
const username = "" //! UseState
const pack_id = ""  //! UseState
const url = {
    base: `https://${host}/apiv2`,
    token: "&token=",
    //! SEARCH
    textSearch: '/search/text/',
    textQuery: "?query=",
    contentSearch: '/search/content/',
    combinedSearch: '/sounds/search/combined/',
    //! SORT TEXT SEARCH
    sort: "/sort=",
    defaultTextSearch: "score",
    mostRated: "rating_desc",
    leastReated: "rating_asc",
    mostDownload: "downloads_desc",
    leastDownload: "downloads_asc",
    newestAdd: "created_desc",
    oldestAdd: "created_asc",
    longestDuration: "duration_desc",
    shortestDuration: "duration_asc",
    //! SOUND INSTANCES
    sound: `/sounds/${sound_id}/`,
    soundAnalysis: `/sounds/${sound_id}/analysis/`,
    similarSounds: `/sounds/${sound_id}/similar/`,
    me: '/me/',
    user: `/users/${username}/`,
    userSounds: `/users/${username}/sounds/`,
    userPacks: `/users/${username}/packs/`,
    packSounds: `/packs/${pack_id}/sounds/`,
    pack: `/packs/${pack_id}/`,

};

function MainContent(props) {
    const theSearch = props.search;
    console.log("maincontent", theSearch)
    // const [searchValue, setSearchValue] = useState("")
    const urlLink = url.base + url.textSearch + url.textQuery + theSearch + url.token
    const [api, setAPI] = useState([])
    const [status, setStatus] = useState("idle")
    const results = api.results
    console.log("URL", urlLink)

    useEffect(() => {

        setStatus("pending");
        const fetchSamples = async () => {
            try {
                const res = await fetch(
                    urlLink + process.env.REACT_APP_FREESOUND_KEY
                );
                const data = await res.json();
                setStatus("resolved");
                setAPI(data);
            } catch (error) {
                setStatus("error")
            }
        };
        fetchSamples();
    }, [theSearch])






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

                    {/* <Newsfeed url={url} /> */}

                    {/* <TopCharts url={url} /> */}

                    <BrowseSamples
                        status={status}
                        results={results}

                    />

                </Grid>

                <Copyright sx={{ pt: 4 }} />

            </Container>

        </Box>
    )
}

export default MainContent