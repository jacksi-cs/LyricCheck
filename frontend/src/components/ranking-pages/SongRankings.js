import React, { useState, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Accordion from "react-bootstrap/Accordion";
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel'
import SongTable from './SongTable';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"

const marks = [
  {
    value: 0
  },
  {
    value: 100
  },
  {
    value: 1000
  },
  {
    value: 100000
  },
  {
    value: 500000
  },
  {
    value: 1000000
  },
  {
    value: 2500000
  },
  {
    value: 5000000
  },
  {
    value: 7500000
  },
  {
    value: 10000000
  },
  {
    value: 12500000
  },
  {
    value: 15000000
  },
  {
    value: 17500000
  },
  {
    value: 20000000
  }

]


// , search: search, listensGreaterThan: views, genres: genres, profanityToxicGreaterThan: toxicity, profanitySexuallyExplictGreaterThan: sexually_explicit, profanityProfanityGreaterThan: profanity, profanityIdentityAttackGreaterThan: identity_attack
function SongRankings() {

  const [search, setSearch] = useState("")
  const [genres, setGenres] = useState([])
  const [views, setViews] = useState(0)
  const [toxicity, setToxicity] = useState(0)
  const [sexually_explicit, setSexuallyExplicit] = useState(0)
  const [profanity, setProfanity] = useState(0)
  const [identity_attack, setIdentityAttack] = useState(0)
  const [filters, setFilters] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilters({
      search: search, listensGreaterThan: views, genres: genres, profanityToxicGreaterThan: toxicity, profanitySexuallyExplictGreaterThan: sexually_explicit, profanityProfanityGreaterThan: profanity, profanityIdentityAttackGreaterThan: identity_attack
    })
  }


  const table = useMemo(() => {
    return <SongTable filters={filters} />
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
                    <TextField // https://www.youtube.com/watch?v=sTdt2cJS2dg
                      onChange={(e) => setSearch(e.target.value)}
                      //setSearch(e.target.value)}
                      label="Search"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs='auto'>
                    <InputLabel id="genre-select-label">Genres</InputLabel>
                    <Select labelId="genre-select-label"
                      fullWidth
                      id="genre-select"
                      value={genres}
                      label="Genres"
                      multiple={true}
                      onChange={(e) => setGenres(e.target.value)}
                    >
                      <MenuItem value="pop">Pop</MenuItem>
                      <MenuItem value="electronic">Electronic</MenuItem>
                      <MenuItem value="rock">Rock</MenuItem>
                      <MenuItem value="Hip-Hop">Hip-Hop</MenuItem>
                      <MenuItem value="indie">Indie</MenuItem>
                      <MenuItem value="rnb">RnB</MenuItem>
                      <MenuItem value="soul">Soul</MenuItem>
                      <MenuItem value="seen live">Seen Live</MenuItem>
                      <MenuItem value="classic rock">Classic Rock</MenuItem>
                      <MenuItem value="folk">Folk</MenuItem>
                      <MenuItem value="jazz">Jazz</MenuItem>
                      <MenuItem value="female vocalists">Female Vocalists</MenuItem>
                      <MenuItem value="singer-songwriter">Singer-songwriter</MenuItem>
                      <MenuItem value="trip-hop">Trip-hop</MenuItem>
                      <MenuItem value="japanese">Japanese</MenuItem>
                      <MenuItem value="alternative rock">Alternative Rock</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs='auto'>
                    Views (GTE)
                    <Slider
                      aria-label="Views"
                      defaultValue={views}
                      // getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={null}
                      marks={marks}
                      min={0}
                      max={20000000}
                      track='inverted'
                      size='small'
                      onChange={(e) => setViews(e.target.value)}
                    />
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

export default SongRankings;
