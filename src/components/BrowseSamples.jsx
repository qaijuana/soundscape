import {
  Grid,
  Paper,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material"
import Title from "./Title"


function handleClick(event) {
  event.preventDefault();
}

//! add use state for sort to enable sort by "TABLEHEAD"
//! onClick Row to grab "ID" to fetch :Sound Instances: and setNowPlaying to audition
//! onClick EACH tags for "FILTER"

function BrowseSamples(props) {
  return (
    <Grid item xs={12}>
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
          <TableBody>
            {props.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.tags.join(", ")}</TableCell>
                <TableCell align="right">{row.license}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={handleClick} sx={{ mt: 3 }}>
          More 
        </Link>
      </Paper>
    </Grid>
  )
}

export default BrowseSamples;