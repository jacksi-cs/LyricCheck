ALTER TABLE songs
  ADD profanity_average float;

UPDATE songs
  SET profanity_average = ((profanity_toxicity +
    profanity_sexually_explicit +
    profanity_profanity +
    profanity_identity_attack) / 4)
  WHERE profanity_toxicity IS NOT NULL;


ALTER TABLE artists
  ADD profanity_average float;

UPDATE artists
  SET profanity_average = ((profanity_toxicity +
    profanity_sexually_explicit +
    profanity_profanity +
    profanity_identity_attack) / 4)
  WHERE profanity_toxicity IS NOT NULL;

ALTER TABLE countries
  ADD profanity_average float;

UPDATE countries
  SET profanity_average = ((profanity_toxicity +
    profanity_sexually_explicit +
    profanity_profanity +
    profanity_identity_attack) / 4)
  WHERE profanity_toxicity IS NOT NULL;
