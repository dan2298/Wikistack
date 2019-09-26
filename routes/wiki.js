const express = require('express')
const router = express.Router()
const addPage = require('../views/addPage')
const mainPage = require('../views/main')
const { Page } = require("../models");

router.post('/', async (req, res, next) => {

  const newPage = new Page({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(newPage.title)
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

module.exports = router
