import { useState, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Accordion from "react-bootstrap/Accordion";
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel'
import CountryTable from './CountryTable';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

function CountryRankings() {
  const [search, setSearch] = useState("");
  const [regions, setRegions] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [toxicity, setToxicity] = useState(0);
  const [sexually_explicit, setSexuallyExplicit] = useState(0)
  const [profanity, setProfanity] = useState(0)
  const [identity_attack, setIdentityAttack] = useState(0)
  const [filters, setFilters] = useState({})


  const handleSubmit = (e) => {
    e.preventDefault()
    setFilters({
      search: search, regions: regions, topArtists: topArtists, profanityToxicGreaterThan: toxicity, profanitySexuallyExplictGreaterThan: sexually_explicit, profanityProfanityGreaterThan: profanity, profanityIdentityAttackGreaterThan: identity_attack
    })
  }


  const table = useMemo(() => {
    return <CountryTable filters={filters} />
  }, [filters]);

  return (
    <Container fluid>
      <Row></Row>
      <Stack spacing={2} style={{ width: '100%' }}>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Search and Filter</Accordion.Header>
            <Accordion.Body>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid spacing={2} sx={{ m: 2 }}>
                  <Grid item xs='auto'>
                    <TextField
                      onChange={(e) => setSearch(e.target.value)}
                      label="Search"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs='auto'>
                    <InputLabel id="region-select-label">Regions</InputLabel>
                    <Select labelId="region-select-label"
                      fullWidth
                      id="region-select"
                      value={regions}
                      label="Regions"
                      multiple={true}
                      onChange={(e) => setRegions(e.target.value)}
                    >
                      <MenuItem value="Europe">Europe</MenuItem>
                      <MenuItem value="Oceania">Oceania</MenuItem>
                      <MenuItem value="Americas">Americas</MenuItem>
                      <MenuItem value="Africa">Africa</MenuItem>
                      <MenuItem value="Asia">Asia</MenuItem>
                      <MenuItem value="Antarctic">Antarctic</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs='auto'>
                    <InputLabel id="top-artist-select-label">Top Artists</InputLabel>
                    <Select labelId="top-artist-select-label"
                      fullWidth
                      id="top-artist-select"
                      value={topArtists}
                      label="Top Artists"
                      multiple={true}
                      onChange={(e) => setTopArtists(e.target.value)}
                    >
                      <MenuItem value="Coldplay">Coldplay</MenuItem>
                      <MenuItem value="Radiohead">Radiohead</MenuItem>
                      <MenuItem value="Queen">Queen</MenuItem>
                      <MenuItem value="David Bowie">David Bowie</MenuItem>
                      <MenuItem value="Rihanna">Rihanna</MenuItem>
                      <MenuItem value="Drake">Drake</MenuItem>
                      <MenuItem value="The Weeknd">The Weeknd</MenuItem>
                      <MenuItem value="Daft Punk">Daft Punk</MenuItem>
                      <MenuItem value="Kanye West">Kanye West</MenuItem>
                      <MenuItem value="Linkin Park">Linkin Park</MenuItem>
                      <MenuItem value="The Beatles">The Beatles</MenuItem>
                      <MenuItem value="Lana Del Rey">Lana Del Rey</MenuItem>
                      <MenuItem value="Adele">Adele</MenuItem>
                      <MenuItem value="Michael Jackson">Michael Jackson</MenuItem>
                      <MenuItem value="Ed Sheeran">Ed Sheeran</MenuItem>
                      <MenuItem value="Taylor Swift">Taylor Swift</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs='auto'>
                    Toxicity (GTE)
                    <Slider
                      aria-label="Toxicity"
                      defaultValue={toxicity}
                      // getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={0.1}
                      marks
                      min={0}
                      max={1}
                      track='inverted'
                      size='small'
                      onChange={(e) => setToxicity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs='auto'>
                    Sexually Explicit (GTE)
                    <Slider
                      aria-label="Sexually Explicit"
                      defaultValue={sexually_explicit}
                      // getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={0.1}
                      marks
                      min={0}
                      max={1}
                      track='inverted'
                      size='small'
                      onChange={(e) => setSexuallyExplicit(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs='auto'>
                    Profanity (GTE)
                    <Slider
                      aria-label="Profanity"
                      defaultValue={profanity}
                      // getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={0.1}
                      marks
                      min={0}
                      max={1}
                      track='inverted'
                      size='small'
                      onChange={(e) => setProfanity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs='auto'>
                    Identity Attack (GTE)
                    <Slider
                      aria-label="Identity Attack"
                      defaultValue={identity_attack}
                      // getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={0.1}
                      marks
                      min={0}
                      max={1}
                      track='inverted'
                      size='small'
                      onChange={(e) => setIdentityAttack(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs='auto'>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{backgroundColor: "#061993"}}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {table}
      </Stack>
    </Container>
  );
}

export default CountryRankings;
