import axios from '../utils/axiosInstance';

export const createShortLink = async (url: string, code?: string) => {
  const { data } = await axios.post('/api/links', { url, code });
  return data;
};

export const listLinks = async () => {
  const { data } = await axios.get('/api/links');
  return data.links;
};

export const getLink = async (code: string) => {
  const { data } = await axios.get(`/api/links/${code}`);
  return data;
};

export const deleteLink = async (code: string) => {
  await axios.delete(`/api/links/${code}`);
};
