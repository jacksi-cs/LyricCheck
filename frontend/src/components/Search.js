import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import ArtistTable from "./ranking-pages/ArtistTable";
import SongTable from "./ranking-pages/SongTable";
import CountryTable from "./ranking-pages/CountryTable";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function Search() {
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    setFilters({
      search: search
    });
  }
  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
  }
};

  const tables = useMemo(() => {
    return <>
      <h2>Songs</h2>
      <SongTable filters={filters} />
      <Divider></Divider>
      <h2>Artists</h2>
      <ArtistTable filters={filters} />
      <Divider></Divider>
      <h2>Countries</h2>
      <CountryTable filters={filters} />
    </>
  }, [filters]);

  return (
    <Box sx={{ p: 5 }}>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setSearch(e.target.value)}
                label="Search" fullWidth
                onKeyPress={handleKeypress}
              />
            </Grid>
            <Grid item style={{ display: "flex" }}>
            </Grid>
            <Grid item xs={12}>
              <Divider></Divider>
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
        </form>
      <Stack spacing={2} style={{ width: '100%' }} >
        {tables}
      </Stack>
    </Box>
  );
}

export default Search;