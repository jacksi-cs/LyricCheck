import Container from "react-bootstrap/Container";
import perspective from "./images/about-lyriccheck/perspective-ex.png";

function AboutLyricCheck() {
  return (
    <>
      <Container style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <h1 class="text-center">Profanity Metrics</h1>
        <h2>How are songs rated based on profanity?</h2>
        <img src={perspective} alt="perspective example" width="70%" height="70%"></img>
        <p>
          We pull the profanity metrics from <a href="https://perspectiveapi.com/">Perspective API</a>, 
          which evaluates song lyrics on several categories. We focus on the following categories:&nbsp;
          <b>Severe Toxicity</b>, <b>Profanity</b>, <b>Sexually Explicit</b>, and <b>Identity Attack</b>. We also include an average
          profanity score of each song based on these four categories, which is what we use to rank songs, 
          artists, and countries based on their profanity score.. Below is a description of the four
          categories, taken directly from the Perspective API site.
        </p>
        <h4>Severe Toxicity</h4>
        <p>
          A very hateful, aggressive, disrespectful comment or otherwise very likely to make a user leave 
          a discussion or give up on sharing their perspective. This attribute is much less sensitive to 
          more mild forms of toxicity, such as comments that include positive uses of curse words.
        </p>
        <h4>Profanity</h4>
        <p>
          Swear words, curse words, or other obscene or profane language.
        </p>
        <h4>Sexually Explicit</h4>
        <p>
          Contains references to sexual acts, body parts, or other lewd content.
        </p>
        <h4>Identity Attack</h4>
        <p>
          Negative or hateful comments targeting someone because of their identity.
        </p>  
      </Container>

      <Container style={{ paddingBottom: '75px' }}>
        <h1 class="text-center">Views</h1>
        <h2>Where do view counts come from?</h2>
        <p>
          The view count for all songs are provided by Last.fm.
          For more information, please refer to&nbsp;
          <a href="https://www.last.fm/about">last.fm/about</a>.
        </p>
      </Container>
    </>
  );
}

export default AboutLyricCheck;