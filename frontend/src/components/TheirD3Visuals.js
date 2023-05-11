import Container from "react-bootstrap/Container";

import TuitionWins from './visualizations/theirs/TuitionWins';

function TheirD3Visuals() {
  return (
    <Container style={{ paddingBottom: '75px' }}>
      <TuitionWins width={1000} height={1000} />
    </Container>
  );
}

export default TheirD3Visuals;