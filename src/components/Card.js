import React from 'react';

// styles
import '@/components/Card.css';

const Card = ({ item }) => {
  const {
    adult,
    backdrop_path,
    genre_ids,
    id,
    media_type,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
    tv,
    first_air_date,
    name,
    origin_country,
    original_name,
    gender,
    known_for,
    known_for_department,
    profile_path
  } = item;

  return (
    <div className='ml-card'>
      <p>{title || name}</p>
      <p>{overview}</p>
      <br />
    </div>
  );
};

export default Card;