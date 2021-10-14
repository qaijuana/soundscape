import React, { useState, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom"
import Newsfeed from './Newsfeed'
// import TopCharts from "./TopCharts"
import BrowseSamples from "./BrowseSamples"
import Copyright from "./Copyright"
import {
    Box, Container, Grid, Toolbar
} from '@mui/material'
// import MediaControlCard from "./MediaCard"


function MainContent(props) {

    const host = 'freesound.org';
    const sound_id = props.sound_id;
    const setSound_id = props.setSound_id;
    const username = props.username;
    const pack_id = props.pack_id;
    const uri = {
        base: `https://${host}/apiv2`,
        token: "&token=",
        //! SEARCH
        textSearch: '/search/text/',
        textQuery: "?query=",
        contentSearch: '/search/content/',
        combinedSearch: '/sounds/search/combined/',

        filter: "&filter=",
        //! SORT TEXT SEARCH
        sort: "/sort=",
        defaultTextSearch: "score",
        mostRated: "rating_desc",
        leastRated: "rating_asc",
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

    const searchResult = props.searchResult;
    const setSearchResult = props.setSearchResult
    const defaultUrl = uri.base + uri.textSearch + uri.textQuery + searchResult;
    const [url, setUrl] = useState(defaultUrl)
    const [api, setAPI] = useState([])
    const [status, setStatus] = useState("idle")


    useEffect(() => {
        setUrl(defaultUrl)
    }, [defaultUrl])

    useEffect(() => {

        setStatus("pending");
        const fetchSamples = async () => {
            try {
                const res = await fetch(
                    url + uri.token + process.env.REACT_APP_FREESOUND_KEY
                );
                const data = await res.json();
                setStatus("resolved");
                setAPI(data);
            } catch (error) {
                setStatus("error")
            }
        };
        fetchSamples();
    }, [url, defaultUrl, uri.token])






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

                    <Route exact path="/">
                        <Newsfeed url={uri} />

                        {/* <TopCharts url={uri} /> */}
                    </Route>

                    {/* <MediaControlCard 
                        uri={uri}
                        sound_id={sound_id}
                    /> */}

                    <Route path="/browse">
                        <BrowseSamples
                            uri={uri}
                            status={status}
                            api={api}
                            setUrl={setUrl}
                            url={url}
                            defaultUrl={defaultUrl}
                            setSound_id={setSound_id}
                            searchResult={searchResult}
                            setSearchResult={setSearchResult}
                        />
                    </Route>

                    <Route path="/catagories">
                        <Newsfeed url={uri} />
                        <BrowseSamples
                            uri={uri}
                            status={status}
                            api={api}
                            setUrl={setUrl}
                            url={url}
                            defaultUrl={defaultUrl}
                            setSound_id={setSound_id}
                            searchResult={searchResult}
                            setSearchResult={setSearchResult}
                        />
                    </Route>
                    <Redirect to="/browse" />

                </Grid>

                <Copyright sx={{ pt: 4 }} />

            </Container>

        </Box>
    )
}

export default MainContent