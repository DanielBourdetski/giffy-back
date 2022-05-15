const axios = require('axios').default;
const express = require('express');
const router = express.Router();

require('dotenv').config();

const baseURL = 'https://api.giphy.com/v1/';
const key = `?api_key=${process.env.API_KEY}&`;

const actionsLocation = {
  SEARCH: 'gifs/search',
  GET_GIF: 'gifs/',
  GET_GIFS: 'gifs',
  GET_CATEGORIES: 'gifs/categories',
  GET_TRENDS: 'gifs/trending',
};

for (let action in actionsLocation) {
  if (action === 'GET_GIF') continue;
  actionsLocation[action] += key;
}

//  /gifs/search?q=
router.get('/search', async (req, res) => {
  const q = req.query.q;
  try {
    const results = await axios.get(`${baseURL}${actionsLocation.SEARCH}q=${q}`);

    const { data } = results.data;

    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

//  /gifs/gif?id=
router.get('/gif', async (req, res) => {
  const id = req.query.id;

  try {
    const results = await axios.get(`${baseURL}${actionsLocation.GET_GIF}${id}${key}`);
    const { data } = results;

    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

//  /gifs/gifs?ids=id1,id2
router.get('/gifs', async (req, res) => {
  // TODO get rid of spaces in ids:  ids -> .split(' ') -> .trim() -> .join('')
  const ids = req.query.ids;
  const amountOfIds = ids.split(',').length;

  try {
    const results = await axios.get(`${baseURL}${actionsLocation.GET_GIFS}ids=${ids}`);
    const { data } = results;

    const gotAllResults = data.data.length === amountOfIds;

    dataPack = { ...data, got_all_results: gotAllResults };

    res.send(dataPack);
  } catch (err) {
    res.send(err);
  }
});

//  /gifs/categories
//  can search categories using basic search at '/search'
router.get('/categories', async (_, res) => {
  try {
    const results = await axios.get(`${baseURL}${actionsLocation.GET_CATEGORIES}`);
    const { data } = results;

    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

//  gifs/trending
router.get('/trending', async (_, res) => {
  try {
    const results = await axios.get(`${baseURL}${actionsLocation.GET_TRENDS}`);
    const { data } = results;

    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
