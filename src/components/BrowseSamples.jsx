import React from 'react';
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

  const handleClick = (e) => {
    console.log("Clicked Row", e)
  }

  const handleID = (e) => {
    props.nowPlaying(e);
    console.log("ID", e)
  }


  const SampleList = (e) => {
    return (
      <TableBody >
        {results?.map((row) => (
            <TableRow onClick={() => handleID(row.id)} key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.tags.join(", ")}</TableCell>
              <TableCell align="right">{row.license}</TableCell>
            </TableRow>

    ))}
      </TableBody>
    )
  }



  return (
    <Grid item xs={12}>
    {props.status === "resolved" ? (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>New Sounds</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contributor</TableCell>
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
            <Link align="left" color="primary" href="#" onClick={() => { console.log("prev"); props.urlMod(prevPage) }} sx={{ mt: 3 }}>
              Previous
            </Link>
            <Link align="right" color="primary" href="#" onClick={() => { console.log("next"); props.urlMod(nextPage) }} sx={{ mt: 3 }}>
              Next
            </Link>
          </Stack>

        </Paper>
        ) : <CircularProgress justifyContent="center" />}
        </Grid>
  )
}

export default BrowseSamples;