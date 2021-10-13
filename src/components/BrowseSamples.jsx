import React, { useState } from 'react';
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
  Stack
} from "@mui/material"
import Title from "./Title"
import CircularProgress from "./CircularProgress"




//! add use state for sort to enable sort by "TABLEHEAD"
//! onClick Row to grab "ID" to fetch :Sound Instances: and setNowPlaying to audition
//! onClick EACH tags for "FILTER"

function BrowseSamples(props) {
  const results = props.api?.results
  const prevPage = props.api?.previous
  const nextPage = props.api?.next
  const searchResult = props.searchResult
  const setUrl = props.setUrl
  const url = props.url;
  const uri = props.uri;
  const [tags, setTags] = useState([])

  const handleID = (e) => {
    props.setSound_id(e);
  }



  const handleTag = (e) => {
    const tagValue = e.target.innerText;
    if (tags.includes(tagValue) === false) {
      tags.push(tagValue);
      setTags(tags);
      setUrl(url + uri.filter + (tags.map((newTag) => {
        return ("tag:" + newTag + " ")
      })).join(""))
    }
  }

  const removeTag = (e) => {
    const result = tags.filter(event => event !== e.target.innerText)
    setTags(result)
    setUrl(url + uri.filter + (tags.map((newTag) => {
      return ("tag:" + newTag + " ")
    })).join(""))

  }

  const SampleList = (e) => {
    return (
      <TableBody >
        {results?.map((row) => (
          <TableRow onClick={() => handleID(row.id)} key={row.id}>
            <TableCell>{row.username}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.tags.map((e) => {
              return (
                <button key={e} onClick={handleTag}>{e}</button>
              )
            })}</TableCell>
            <TableCell align="right">{row.license}</TableCell>
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
            <button key={i} onClick={removeTag}>{event}</button>
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
            <Title>{searchResult === "" ? "New Sounds" : `Searching for '${searchResult}'`}</Title>
            <SelectTags />
          </Stack>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Artist</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>License</TableCell>
              </TableRow>
            </TableHead>


            <SampleList />

          </Table>

          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Link align="left" color="primary" component={RouterLink} to="/browse" onClick={() => { setUrl(prevPage) }} sx={{ mt: 3 }}>
              {prevPage !== null ? "Previous" : ""}

            </Link>
            <Link align="right" color="primary" component={RouterLink} to="/browse" onClick={() => { setUrl(nextPage) }} sx={{ mt: 3 }}>
              {nextPage !== null ? "Next" : ""}
            </Link>
          </Stack>

        </Paper>
      ) : <CircularProgress alignItems="center" />}
    </Grid>
  )
}

export default BrowseSamples;