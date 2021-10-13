import * as React from 'react';
import {
  Box, Stack, Slider
} from "@mui/material"
import {
  VolumeUp, VolumeDown
} from "@mui/icons-material"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';


function MediaPlayer() {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const PlayCircle = <PlayCircleIcon/>
  return (
    
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="left">
        {PlayCircle}
        <PauseCircleIcon/>
        <VolumeDown color="inherit" />
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
        <VolumeUp color="inherit" />

      </Stack>
    </Box>
  );
}

export default MediaPlayer;
