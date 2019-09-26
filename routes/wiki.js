const express = require('express')
const router = express.Router()
const addPage = require('../views/addPage')
const mainPage = require('../views/main')
const { Page } = require("../models");
const wikiPage = require("../views/wikipage")

router.post('/', async (req, res, next) => {
  const newPage = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await newPage.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/', (req, res, next) => {
  res.send(mainPage())
});

router.post('/', (req, res, next) => {
  res.json(req.body);
});

router.get('/add', (req, res, next) => {
  res.send(addPage())
});

router.get('/:slug', async (req, res, next) => {
  try {
    const currentPage = await Page.findOne({
      where: { slug: req.params.slug }
    });
    // console.log(req.params.slug)
    // console.log(currentPage)
    res.json(currentPage)
  } catch (error) { next(error) }
});

module.exports = router
