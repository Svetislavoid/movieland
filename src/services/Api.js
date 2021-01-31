import axios from 'axios';

// #SG: See where acceess token should be stored
export const config = {
  baseURL: 'https://api.themoviedb.org/3',
  headers: { Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}` }
};

export default () => {
  const instance = axios.create(config);

  return instance;
};
