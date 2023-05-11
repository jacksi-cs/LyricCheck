import Container from 'react-bootstrap/esm/Container';
import Button from '@mui/material/Button';
import ArtistGenres from './visualizations/ArtistGenres';
import LyricProfanities from './visualizations/LyricProfanities';
import CountryProfanities from './visualizations/CountryProfanities';

function refreshPage() {
  window.location.reload(false);
}

function OurD3Visuals() {
  return <div className='center'>
    <Container style={{ paddingTop: '8px', paddingBottom: '25px' }}>
      <h2>Words ranked by profanity</h2>
      <Button
        type="submit"
        variant="contained"
        style={{ backgroundColor: "#061993" }}
        onClick={refreshPage}
      >
        Change Words
      </Button>
      <Container style={{ paddingTop: '25px' }}>
        <LyricProfanities width={750} height={750} />
      </Container>
    </Container>

    <Container style={{ paddingBottom: '25px' }}>
      <h2>Artist genres ranked by popularity</h2>
      <ArtistGenres width={750} height={750} color='navy' />
    </Container>

    <Container style={{ paddingBottom: '25px' }}>
      <h2>Countries ranked by profanity</h2>
      <CountryProfanities width={600} height={600} color='navy' />
    </Container>
  </div>
}

export default OurD3Visuals;
