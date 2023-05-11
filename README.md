# Lyric Check
**RESTful APIs Used:** Perspective, Spotify, Last.FM, REST Countries, MusixMatch
  
  
LyricCheck is a web based tool that consolidates data on top artists (monthly listeners), charting songs, artist bios, song lyrics, and a profanity score. Using Perspective's NLP model to grade song lyrics, it also provides insight on the profanity preferences over time, based on location, and based on artists. There are sites that tackle one or even part of one responsibility that we hope our project will accomplish, but there are severe patches of information missing from each. By also making use of a profanity grade, our project can provide valuable insight into the worrying NSFW trend of modern day pop culture.

## GitLab Pipelines

https://gitlab.com/kenjinakachi/lyriccheck/-/pipelines

## Website Link

https://www.lyriccheck.me

## Comments

- The majority of failing CI Pipelines for Phase 2 is a result of commenting out “test” from the stages section of the .gitlab-ci.yml file. This was done to avoid wasting our free minutes for the GitLab pipeline runner.
- The setup for the About page was partially inspired by the team WeLikeSportz. Their codebase is linked here: https://gitlab.com/debbiew27/WeLikeSportz/
- The backend EB setup referenced the following guide: https://github.com/forbesye/cs373/blob/main/Flask_AWS_Deploy.md, therefore our backend/Dockerfile, backend/nginx.conf, backend/start.sh, and backend/uwsgi.ini files are all inspired by that resource.
- TexasVotes was referenced: https://gitlab.com/forbesye/fitsbits.
- Backend API and calling the backend api was referenced from: https://flask-restless-ng.readthedocs.io/en/latest/. Some code from the documentations was used.
- Material UI code was referenced from: https://mui.com/. Some code from the documentations was used.
- React Bootstrap code was referenced from: https://react-bootstrap.github.io/. Some code from the documentations was used.
- Jest Testing code was referenced from: https://jestjs.io/docs/api/. Some code from the documentations was used.
- Chai Testing code was referenced from: https://www.chaijs.com/api/. Some code from the documentations was used.
- SQL was referenced from: https://www.postgresql.org/docs/current. Some code from the documentations was used.
- Dockerfile code was referenced from https://docs.docker.com/engine/reference/builder/. Some code from the documentations was used.
- ESLint code was referenced from the ESLint documentation.
- API scraping code was referenced from their respective documentations. Some code from the documentations was used.
- npm/pip packages were referenced from their respective documentations. Some code from the documentations was used.
- Tools were referenced from their respective documentations. Some code from the documentations was used.
- A few lines of code were referenced from StackOverflow.
