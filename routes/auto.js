import express from 'express';
import path from 'path';
const router = express.Router();

import Users from 'models/Users';
import Auto from 'models/Auto';

router.get('/app', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
})

router.get('/users', async (req, res, next) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/marks', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { make_id: { $ne: null } }},
      {$sort: { make_id: -1 } },
      {$group: {_id: '$make_id', label: { $first: '$make' }}},
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/models/:markId', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { make_id: +req.params.markId }},
      {$group: {_id: '$model_id', label: { $first: '$model' }}}
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/years/:modelId', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { model_id: +req.params.modelId }},
      {$group: {_id: '$year', label: { $first: '$year' }}}
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/body/:modelId/:year', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { model_id: +req.params.modelId, year: +req.params.year }},
      {$group: {_id: '$body_id', label: { $first: '$body' }}}
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/generation/:modelId/:year/:bodyId', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { model_id: +req.params.modelId, year: +req.params.year, body_id: +req.params.bodyId}},
      {$group: {_id: '$generation_id', label: { $first: '$generation' }}}
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/trim/:modelId/:year/:bodyId/:generationId', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { model_id: +req.params.modelId, year: +req.params.year, body_id: +req.params.bodyId, generation_id: +req.params.generationId}},
      {$group: {_id: '$trim_id', label: { $first: '$trim' }}}
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/one/:autoId', async (req, res, next) => {
  try {
    const model = await Auto.findOne({ _id: req.params.autoId }).limit(5)
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/add', async (req, res, next) => {
  try {
    const mark = await Mark.create({ name: 'Ваз', id_car_mark: 0 });
  } catch ({ message }) {
    console.log(message);
  }
  res.end('Done');
});

export default router;