import axios from 'axios';

export const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

export const formDataApi = axios.create({
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const URLEncodedApi = axios.create({
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});
