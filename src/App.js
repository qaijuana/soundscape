import React, { useState, useEffect } from 'react';
import './App.css';
// import SearchAppBar from "./components/SearchAppBar"
import Dashboard from "./components/Dashboard"

const host = 'freesound.org';
const sound_id = ""
const username = ""
const pack_id = ""
const url = {
  base: `https://${host}/apiv2`,
  textSearch: '/search/text/',
  contentSearch: '/search/content/',
  combinedSearch: '/sounds/search/combined/',
  sound: `/sounds/${sound_id}/`,
  soundAnalysis: `/sounds/${sound_id}/analysis/`,
  similarSounds: `/sounds/${sound_id}/similar/`,
  comments: `/sounds/${sound_id}/comments/`,
  download: `/sounds/${sound_id}/download/`,
  upload: '/sounds/upload/',
  describe: `/sounds/${sound_id}/describe/`,
  pending: '/sounds/pending_uploads/',
  bookmark: `/sounds/${sound_id}/bookmark/`,
  rate: `/sounds/${sound_id}/rate/`,
  comment: `/sounds/${sound_id}/comment/`,
  authorize: '/oauth2/authorize/',
  logout: '/api-auth/logout/',
  logoutAuthorize: '/oauth2/logout_and_authorize/',
  me: '/me/',
  user: `/users/${username}/`,
  userSounds: `/users/${username}/sounds/`,
  userPacks: `/users/${username}/packs/`,
  userBookmarkCategories: `/users/${username}/bookmark_categories/`,
  userBookmarkCategorySounds: `/users/${username}/bookmark_categories/<category_id>/sounds/`,
  pack: `/packs/${pack_id}/`,
  packSounds: `/packs/${pack_id}/sounds/`,
  packDownload: `/packs/${pack_id}/download/`
};

function App() {
  const [api, setAPI] = useState([])

  useEffect(() => {
    const fetchSamples = async () => {
      const res = await fetch(
        url.base + url.textSearch + "?query=" + process.env.REACT_APP_FREESOUND_KEY
      );
      const data = await res.json();
      setAPI(data.results)
    }
    fetchSamples();
  }, [])






  return (
    <Dashboard url={url} data={api} />
  );
}

export default App;
