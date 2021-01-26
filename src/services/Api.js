import axios from "axios";

export const config = {
  baseURL: `base_tmbd_api`,
};

export default () => {
  let instance = axios.create(config);

  return instance;
};
