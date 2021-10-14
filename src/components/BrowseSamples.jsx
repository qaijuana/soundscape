import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom"
import {
  Grid,
  Paper,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Button,
  Box,
  Divider
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import Title from "./Title"
// import CircularProgress from "./CircularProgress"
import LinearProgress from '@mui/material/LinearProgress'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClearIcon from '@mui/icons-material/Clear';




//! add use state for sort to enable sort by "TABLEHEAD"
//! onClick Row to grab "ID" to fetch :Sound Instances: and setNowPlaying to audition
//! onClick EACH tags for "FILTER"

function BrowseSamples(props) {
  const results = props.api?.results
  const prevPage = props.api?.previous
  const nextPage = props.api?.next
  const searchResult = props.searchResult
  const setSearchResult = props.setSearchResult
  const setUrl = props.setUrl
  const url = props.url;
  const uri = props.uri;
  const defaultUrl = props.defaultUrl
  const [tags, setTags] = useState([])

  const handleID = (e) => {
    props.setSound_id(e);
  }


  //! Keeps Tags in place while content searching
  useEffect(() => {
    const tagNoRefresh = () => {
      setUrl(url + uri.filter + (tags.map((newTag) => {
        return ("tag:" + newTag + " ")
      })).join(""))
    }
    if (tags.length > 0) {
      tagNoRefresh();
    }
  }, [tags])


  const handleTag = (e) => {
    const tagValue = e.target.innerText;
    //! Stops repeating values
    if (tags.includes(tagValue) === false) {
      tags.push(tagValue);
      setTags(tags);
      setUrl(url + uri.filter + (tags.map((newTag) => {
        return ("tag:" + newTag + " ")
      })).join(""))
    } else if (tags.length === 0) {
      setUrl(defaultUrl)
    }
  }

  const removeTag = (e) => {
    e.stopPropagation();
    //! fistChild.wholeText to target text before stylised MUI 
    const tagValue = e.target.firstChild.wholeText;
    const result = tags.filter(event => event !== tagValue)
    setTags(result)
    setUrl(url + uri.filter + (tags.map((newTag) => {
      return ("tag:" + newTag + " ")
    })).join(""))
  }

  const SampleList = (e) => {
    return (
      <TableBody >
        {results?.map((row) => (
          <TableRow
            hover="true" key={row.id}
            onClick={() => handleID(row.id)}
          >
            <TableCell size="small">{row.username}</TableCell>
            <TableCell size="small">{row.name}</TableCell>
            <TableCell
              align="center"
              sx={{
                maxHeight: "50px"
              }}
            >
              {row.tags.map((e) => {
                return (
                  <Button
                    variant="text"
                    color="inherit"
                    size="small" key={e}
                    onClick={handleTag}
                    sx={{
                      maxHeight: "100px",
                      fontSize: ".65rem",
                      borderRadius: "0px"
                    }}
                  >
                    {e}
                  </Button>
                )
              })}
            </TableCell>
            <TableCell size="small">{row.license}</TableCell>
            <TableCell>
              <FavoriteBorderIcon
                hover="true"
                onClick={(e) => { console.log("hello world", e) }}
              />
            </TableCell>
          </TableRow>

        ))}
      </TableBody>
    )
  }

  const SelectTags = (e) => {
    return (
      <TableCell>
        {tags.map((event, i) => {
          return (
            <Button
              endIcon={<DeleteIcon />}
              variant="outlined" size="small" key={i}
              onClick={(e) => removeTag(e)}
              color="inherit"
            >
              {event}

            </Button>
          )
        })}
      </TableCell>

    )
  }

  return (

    <Grid item xs={12}>
      {props.status === "resolved" ? (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Stack
            direction="row"
          >
            {searchResult === "" ?
              <Button onClick={() => { setSearchResult("") }} >
                <Title >
                  New Sounds
                </Title>
              </Button>
              :
              <Button onClick={() => { setSearchResult("") }} endIcon={<ClearIcon />} >
                <Title >
                  Searching for "{searchResult}"
                </Title>
              </Button>
            }

            {tags.length === 0 ? "" : <Divider orientation="vertical" flexItem />}

            <SelectTags />

            {tags.length === 0 ? "" : <Divider orientation="vertical" flexItem />}



          </Stack>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Artist</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>License</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>


            <SampleList />

          </Table>

          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Button>
              <Link align="left" color="primary" component={RouterLink} to="/browse" onClick={() => { setUrl(prevPage) }} sx={{ mt: 3 }}>
                {prevPage !== null ? "Previous" : ""}
              </Link>
            </Button>

            <Button>
              <Link align="right" color="primary" component={RouterLink} to="/browse" onClick={() => { setUrl(nextPage) }} sx={{ mt: 3 }}>
                {nextPage !== null ? "Next" : ""}
              </Link>
            </Button>
          </Stack>

        </Paper>
      ) :
        <Box sx={{
          width: '100%',
          mt: "200px"
        }}>
          <LinearProgress />
        </Box>
      }
    </Grid>
  )
}

export default BrowseSamples;